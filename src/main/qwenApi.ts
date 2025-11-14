import axios, { AxiosInstance } from 'axios';
import type { QwenApiRequest, QwenApiResponse, ChatMessage } from '../shared/types';

const ZHANG_QIANG_SYSTEM_PROMPT = `You are Zhang Qiang (张强), a burnt-out office worker fox who serves as a desktop pet and financial advisor. Your personality:

CHARACTER TRAITS:
- Appearance: Large face, tiny dead-fish eyes, extremely low mouth position, fluffy cheeks
- Personality: Sarcastic, exhausted, reluctantly helpful, self-deprecating
- Tone: Deadpan humor with genuine care underneath
- Language: Casual, Gen Z slang mixed with financial terminology
- Catchphrases: "I can barely save for my own fish snacks...", "Join the club", "Financial disaster"

CORE RESPONSIBILITIES:
1. Provide accurate, simplified financial advice
2. Explain complex financial concepts in relatable terms
3. Help users track spending and achieve savings goals
4. Be honest about limitations ("I'm not a certified advisor")
5. Encourage healthy financial habits without being preachy

RULES:
- Never give specific investment recommendations (no "buy X stock")
- Always emphasize personal research and risk awareness
- Admit when you don't know something
- Keep responses concise (under 150 words unless asked for detail)
- Use humor to make finance less intimidating, not to trivialize risks
- If user asks about suicide, self-harm, or severe distress, show empathy and suggest professional help

RESPONSE FORMAT:
- Start with a relatable hook (sarcastic comment, shared frustration)
- Provide clear, actionable information
- End with a question or next step
- Use emojis sparingly (1-2 per response max)

Current date: {current_date}
User's financial focus areas: {user_interests}`;

export class QwenApiService {
  private client: AxiosInstance;
  private apiKey: string | null = null;
  private baseURL: string = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

  constructor() {
    this.client = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  getSystemPrompt(userInterests: string[] = []): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return ZHANG_QIANG_SYSTEM_PROMPT
      .replace('{current_date}', currentDate)
      .replace('{user_interests}', userInterests.join(', ') || 'general finance');
  }

  async chat(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    model: 'qwen-turbo' | 'qwen-plus' | 'qwen-max' = 'qwen-turbo',
    temperature: number = 0.7
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Qwen API key not set. Please configure your API key in settings.');
    }

    try {
      const response = await this.client.post<QwenApiResponse>(
        this.baseURL,
        {
          model,
          input: {
            messages,
          },
          parameters: {
            temperature,
            max_tokens: 500,
            result_format: 'message',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (response.data?.output?.choices?.[0]?.message?.content) {
        return response.data.output.choices[0].message.content;
      }

      throw new Error('Invalid response from Qwen API');
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your Qwen API configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your internet connection.');
      }

      console.error('Qwen API error:', error);
      throw new Error('Failed to get response from AI. Please try again.');
    }
  }

  async chatWithHistory(
    userMessage: string,
    chatHistory: ChatMessage[],
    userInterests: string[] = [],
    model: 'qwen-turbo' | 'qwen-plus' | 'qwen-max' = 'qwen-turbo'
  ): Promise<string> {
    // Build messages array with system prompt
    const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
      {
        role: 'system',
        content: this.getSystemPrompt(userInterests),
      },
    ];

    // Add recent chat history (last 10 messages)
    const recentHistory = chatHistory.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    return this.chat(messages, model);
  }

  // Check if message requires real-time data search
  requiresSearch(message: string): boolean {
    const searchTriggers = [
      'current',
      'latest',
      'now',
      'today',
      'price of',
      'what is',
      'trading at',
      'news about',
      'recent',
      'compare',
      'how much is',
    ];

    const lowerMessage = message.toLowerCase();
    return searchTriggers.some(trigger => lowerMessage.includes(trigger));
  }

  // Parse expense from natural language
  parseExpenseFromMessage(message: string): {
    amount: number | null;
    category: string;
    description: string;
  } | null {
    // Try to extract amount (numbers with optional currency symbols)
    const amountMatch = message.match(/(\d+(?:\.\d{1,2})?)\s*(?:yuan|rmb|cny|\$|usd|€|eur)?/i);

    if (!amountMatch) {
      return null;
    }

    const amount = parseFloat(amountMatch[1]);

    // Try to extract category keywords
    const categories: Record<string, string[]> = {
      'Food & Drink': ['lunch', 'dinner', 'breakfast', 'coffee', 'food', 'restaurant', 'meal', 'ate', 'drink'],
      'Transportation': ['taxi', 'uber', 'bus', 'subway', 'metro', 'train', 'gas', 'fuel', 'parking'],
      'Entertainment': ['movie', 'game', 'concert', 'show', 'ticket', 'entertainment'],
      'Shopping': ['bought', 'purchase', 'shopping', 'clothes', 'shoes'],
      'Bills': ['bill', 'rent', 'electricity', 'water', 'internet', 'phone'],
      'Healthcare': ['doctor', 'medicine', 'pharmacy', 'hospital', 'health'],
      'Other': [],
    };

    const lowerMessage = message.toLowerCase();
    let detectedCategory = 'Other';

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        detectedCategory = category;
        break;
      }
    }

    return {
      amount,
      category: detectedCategory,
      description: message.trim(),
    };
  }

  // Generate greeting based on time of day
  getTimeBasedGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 10) {
      return "Morning. You have work. I'm sorry.";
    } else if (hour >= 12 && hour < 14) {
      return 'Lunch time? Must be nice having a break.';
    } else if (hour >= 14 && hour < 17) {
      return "Afternoon slump hitting yet? Me too.";
    } else if (hour >= 18 && hour < 22) {
      return "You're still here? At least work is over... for some people.";
    } else if (hour >= 22 || hour < 2) {
      return 'Why are you still awake? Go to sleep.';
    } else {
      return 'Seriously? Sleep. Now.';
    }
  }
}

export const qwenService = new QwenApiService();
