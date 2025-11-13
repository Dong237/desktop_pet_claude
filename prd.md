# Product Requirements Document (PRD)
# Zhang Qiang Desktop Pet - AI Financial Assistant

**Version:** 1.0  
**Last Updated:** November 13, 2025  
**Product Owner:** [Your Name]  
**Status:** Planning Phase

---

## Executive Summary

Zhang Qiang Desktop Pet is an interactive desktop companion that combines entertainment with practical financial assistance. The pet features a distinctive "burnt-out office worker fox" character with deadpan humor, powered by Qwen AI to provide intelligent financial advice, market analysis, and money management guidance through natural conversation.

**Core Value Proposition:**  
A desktop pet that makes financial literacy accessible and entertaining for Gen Z through relatable humor, AI-powered insights, and seamless integration into daily computer usage.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Target Users](#2-target-users)
3. [Core Features](#3-core-features)
4. [Technical Architecture](#4-technical-architecture)
5. [User Experience Design](#5-user-experience-design)
6. [AI & Intelligence Layer](#6-ai--intelligence-layer)
7. [Monetization Strategy](#7-monetization-strategy)
8. [Development Roadmap](#8-development-roadmap)
9. [Success Metrics](#9-success-metrics)
10. [Risk Assessment](#10-risk-assessment)

---

## 1. Product Overview

### 1.1 Product Vision

Create a desktop companion that transforms financial education from intimidating to engaging, using AI-powered conversation and a relatable character to help young professionals build better money habits.

### 1.2 Product Positioning

**Category:** Desktop Utility + AI Financial Assistant  
**Platform:** Windows & macOS  
**Distribution:** Steam, Official Website, App Stores  
**Price Model:** Freemium with Premium Subscription

### 1.3 Key Differentiators

- **Character-First Design:** Zhang Qiang's distinctive personality makes financial advice memorable
- **Contextual Intelligence:** Monitors user behavior to provide timely financial insights
- **Conversational AI:** Natural dialogue powered by Qwen API, not rigid bot responses
- **Always Present:** Lives on desktop, reducing friction for financial check-ins
- **Meme-Friendly:** Shareable moments that promote organic growth

---

## 2. Target Users

### 2.1 Primary Personas

#### Persona 1: "Struggling Saver Sally"
- **Age:** 22-28
- **Occupation:** Junior office worker, freelancer, or early-career professional
- **Pain Points:**
  - Finds traditional finance apps overwhelming
  - Procrastinates on budgeting and saving
  - Wants to learn but intimidated by financial jargon
  - Needs motivation to stick to financial goals
- **Behavioral Traits:**
  - Heavy social media user (Xiaohongshu, Douyin, WeChat)
  - Appreciates humor and memes
  - Works long hours, often exhausted
  - Values authentic, relatable content

#### Persona 2: "Investment Curious Chris"
- **Age:** 25-32
- **Occupation:** Mid-level professional with disposable income
- **Pain Points:**
  - Information overload from financial news
  - Unsure where to start with investing
  - Lacks personalized financial guidance
  - Wants quick insights without lengthy research
- **Behavioral Traits:**
  - Tech-savvy, comfortable with AI tools
  - Seeks efficiency in daily tasks
  - Values data-driven decisions
  - Willing to pay for quality tools

### 2.2 Secondary Users

- Students learning personal finance
- Small business owners needing quick financial calculations
- Anyone seeking entertainment + utility in desktop apps

### 2.3 Geographic Focus

- **Primary:** China, Hong Kong, Taiwan
- **Secondary:** Southeast Asia (Singapore, Malaysia)
- **Future:** Global English market

---

## 3. Core Features

### 3.1 Desktop Pet Behaviors (Passive Layer)

#### 3.1.1 Idle Animations (Random, Non-Interactive)

**Basic Idle States (Always Active):**

| Animation | Duration | Frequency | Description |
|-----------|----------|-----------|-------------|
| **Sleep Slouch** | 5-10s | 20% | Face buried in fluffy cheeks, gentle breathing |
| **Dead-Eye Stare** | 3-5s | 15% | Follows cursor with tiny eyes, zero emotion |
| **Screen Judgment** | 4-6s | 12% | Looks at screen, sighs visibly |
| **Leg Shake** | 6-8s | 10% | Sitting, one leg shaking anxiously |
| **Bubble Tea Sip** | 5-7s | 8% | Slow, unenthusiastic drinking |
| **Coin Counting** | 4-6s | 8% | Flipping coins, looks disappointed |
| **Slow Crawl** | 8-12s | 7% | Ultra-slow movement across screen |
| **Existential Crisis** | 3-5s | 10% | Visible stress, hand on forehead |
| **Transparency Fade** | 5-8s | 5% | Gradually becomes semi-transparent (abstract humor) |
| **Keyboard Smashing** | 4-6s | 5% | Frantically typing, then stops, defeated |

**Triggered by Time:**

- **Morning (6-9 AM):** Yawning, coffee grabbing, "I don't want to work" poses
- **Lunch (12-2 PM):** Eating animations, food coma
- **Afternoon (3-5 PM):** Energy crash, dramatic slouching
- **Evening (6-9 PM):** Relief poses, countdown to freedom
- **Night (9 PM-2 AM):** "Why are you still working?" judgment stares
- **Late Night (2-6 AM):** Concerned expressions, "Please sleep" gestures

#### 3.1.2 Interactive Responses (User-Triggered)

| User Action | Zhang Qiang Response | Visual Effect |
|-------------|---------------------|---------------|
| **Single Click (Head)** | "What now? 😐" | Eye roll animation |
| **Double Click (Body)** | **Opens Chat Interface** | Transitions to chat mode |
| **Drag Around** | "I'm not a file..." | Dead-eye float, limp body |
| **Triple Click** | "You're REALLY bored, huh?" | Shocked expression (rare) |
| **Right Click** | Context Menu Appears | Quick menu animation |
| **Hover (3s+)** | "...what are you looking at?" | Eye shift to user |
| **Drop File on Pet** | "What am I supposed to do with this?" | Confused animation |
| **Screen Shake (Heavy Mouse)** | "Calm down! 😑" | Dizzy animation |

#### 3.1.3 Environmental Reactions (System-Triggered)

- **Low Battery (<20%):** "Your battery is dying... unlike my will to live"
- **High CPU Usage:** "Are you mining crypto? Why so slow?"
- **Long Idle (30+ min):** "You've been gone... I didn't miss you"
- **Screensaver Activated:** "Finally, some peace"
- **Window Spam (5+ opens):** "So many tabs... so little focus"

---

### 3.2 AI Financial Chat (Active Layer)

#### 3.2.1 Chat Activation

**Primary Method:** Double-click Zhang Qiang's body

**Chat Interface Appears:**
```
┌─────────────────────────────────────────┐
│  Zhang Qiang - Financial Waste Advisor   │
├─────────────────────────────────────────┤
│                                          │
│  💬 "What financial disaster are we     │
│      discussing today?"                  │
│                                          │
│  [Text Input Box]                        │
│                                          │
│  Quick Actions:                          │
│  💰 Budget Check  📈 Market Brief        │
│  💸 Expense Log   🎯 Savings Goal        │
│                                          │
└─────────────────────────────────────────┘
```

**Window Characteristics:**
- Semi-transparent background (glass morphism)
- Always-on-top option
- Draggable
- Minimize to pet (chat history retained)
- Keyboard shortcut: `Ctrl/Cmd + Shift + Z`

#### 3.2.2 Conversation Capabilities

**Powered by Qwen API** with specialized financial prompt engineering.

**Core Conversation Modes:**

1. **Financial Advisory**
   - Budget planning and analysis
   - Saving strategies
   - Debt management guidance
   - Investment basics education
   - Retirement planning (simplified)

2. **Market Intelligence**
   - Real-time stock/crypto price queries
   - Market news summaries
   - Trend analysis (simplified for Gen Z)
   - Economic indicator explanations

3. **Personal Finance Management**
   - Expense tracking via conversation
   - Bill reminders
   - Spending pattern analysis
   - Income/expense ratio insights

4. **Financial Education**
   - ELI5 (Explain Like I'm 5) for financial terms
   - Case studies and examples
   - Myth-busting common misconceptions
   - Risk education

5. **Goal Setting & Motivation**
   - SMART financial goal creation
   - Progress tracking with encouragement
   - Milestone celebrations
   - Gentle accountability reminders

**Personality Traits in Conversation:**

- **Tone:** Sarcastic yet supportive, never condescending
- **Humor:** Self-deprecating, relatable office worker jokes
- **Honesty:** "I don't know" when uncertain, no BS financial advice
- **Simplification:** Breaks down complex topics without oversimplifying risks
- **Empathy:** Acknowledges financial stress is real

**Example Conversations:**

```
User: "Should I invest in stocks?"

Zhang Qiang: "Ah, the classic question. Look, I'm a desktop fox 
who can barely save for my own fish snacks... BUT I can tell 
you this: investing isn't a yes/no thing. It depends on:

🎯 Your goals (retirement? New PS5?)
⏰ Your timeline (1 year? 20 years?)
💰 Your risk tolerance (sleep well or check price hourly?)
📚 Your knowledge level (can you handle volatility?)

Want me to break down how to START researching this properly? 
I promise I'll keep it simple... like me."
```

```
User: "I spent too much this month"

Zhang Qiang: "Join the club. We have jackets... which I also 
can't afford.

Let's look at this together:
• What did you spend on? (categories help)
• Was it planned or impulse?
• Can we find patterns?

I'm not here to judge (I literally eat instant noodles), 
but I CAN help you set up a system so next month doesn't 
feel the same. Want to try?"
```

---

### 3.3 AI Agent Capabilities (Advanced Features)

#### 3.3.1 Web Search Integration

**Search Triggers:**

When user asks about:
- Current market prices ("What's Bitcoin at?")
- Recent financial news ("What's happening with interest rates?")
- Product comparisons ("Which bank has best savings rate?")
- Company information ("Is Alibaba stock good?")

**Search Execution:**

```python
# Pseudo-code flow
def handle_search_query(user_message):
    if requires_real_time_data(user_message):
        search_results = web_search(extract_keywords(user_message))
        context = summarize_results(search_results)
        response = qwen_api(
            system_prompt=ZHANG_QIANG_PERSONALITY,
            context=context,
            user_query=user_message
        )
        return response + citation_links
```

**Search Sources Priority:**

1. Financial APIs (Alpha Vantage, Yahoo Finance)
2. News aggregators (RSS feeds)
3. Official regulatory websites (SEC, CSRC)
4. Trusted financial media (Bloomberg, Reuters)

**Citation Format:**

```
"According to [Source], Bitcoin is currently at $43,200 
(as of 2 hours ago).

📊 [View Full Article]
```

#### 3.3.2 Data Analysis Tools

**Built-in Calculators:**

User can trigger via:
- Natural language: "Calculate if I can afford..."
- Quick action buttons in chat
- Right-click menu options

**Available Tools:**

| Tool | Function | Example Query |
|------|----------|---------------|
| **Budget Calculator** | Income/expense breakdown | "I make $3000/month, spend $2500, can I save?" |
| **Savings Goal Tracker** | Time to goal calculation | "How long to save $10,000 at $200/month?" |
| **Compound Interest** | Investment growth projection | "What if I invest $1000/month for 10 years?" |
| **Debt Payoff Planner** | Optimal payment strategy | "I have $5000 credit card debt, help?" |
| **Emergency Fund** | Recommended savings amount | "How much emergency fund do I need?" |
| **Expense Splitter** | Group expense division | "Split $300 dinner among 4 people" |
| **Currency Converter** | Real-time FX rates | "Convert 1000 CNY to USD" |

**Visual Output:**

Results display as:
- Simple text summaries
- ASCII charts (for lightweight feel)
- Exportable CSV/PDF reports
- Shareable image cards (for social media)

#### 3.3.3 Financial News Monitoring

**Background Service:**

- Continuously monitors financial news APIs
- Filters by user-set interests (stocks, crypto, housing, etc.)
- Notifies via pet animation + toast notification

**Notification Levels:**

1. **Critical:** Market crashes, major economic policy changes
   - Pet jumps and waves urgently
   - Red notification badge

2. **Important:** Relevant stock movements, Fed announcements
   - Pet taps shoulder animation
   - Yellow notification badge

3. **Informative:** Daily market summaries, interesting articles
   - Pet holds up sign
   - Blue notification badge

**User Control:**

```
Settings → Notifications
├── Enable financial news alerts [✓]
├── Notification frequency: [Every 2 hours ▾]
├── Interests:
│   ├── [✓] Stocks (China A-shares)
│   ├── [✓] Cryptocurrency
│   ├── [ ] Real Estate
│   ├── [✓] Economic Policy
│   └── [ ] Personal Finance Tips
└── Quiet hours: 22:00 - 08:00
```

#### 3.3.4 Expense Tracking (Conversation-Based)

**Logging via Chat:**

```
User: "I just spent 45 yuan on lunch"

Zhang Qiang: "Noted. That's the 3rd lunch expense this week 
(total: 135 yuan). You're averaging 27 yuan per weekday lunch.

Want to see this month's food spending? Just ask."
```

**Smart Parsing:**

- Detects amount, category, merchant from natural language
- Asks clarification if ambiguous
- Learns user's spending patterns over time

**Data Storage:**

- Local SQLite database (privacy-first)
- Optional cloud sync (encrypted)
- Export to CSV, Excel, or JSON

**Visualization:**

- Monthly spending charts (accessible via chat or menu)
- Category breakdowns
- Trend analysis ("You're spending 20% more on coffee this month")

#### 3.3.5 Proactive Financial Insights (AI-Driven)

**Daily/Weekly Reports:**

**Morning Brief (8-9 AM):**
```
"Good morning, financial disaster.

☕ Yesterday you spent: 87 yuan (mostly food, shocker)
📊 Market mood: Optimistic (Shanghai index +1.2%)
🎯 Savings goal: 73% complete (you're doing better than me)

Anything you want to tackle today?"
```

**Weekly Review (Sunday Evening):**
```
"Week recap, because I care (barely):

💸 Total spending: 543 yuan
📈 Top category: Food & Drink (41%)
🎉 You stayed under budget! (This is rare, enjoy it)
📉 Caution: Entertainment spending up 30% vs last week

Want to adjust next week's budget?"
```

**Personalized Tips:**

Based on user behavior patterns:
- "You tend to overspend on Fridays. Want a reminder?"
- "Payday is in 3 days. Consider auto-transferring to savings?"
- "You haven't checked your investments in 2 weeks. Everything okay?"

---

### 3.4 Settings & Customization

#### 3.4.1 Pet Appearance Settings

```
Appearance
├── Size: [Small | Medium | Large]
├── Opacity: [50% ←————●———→ 100%]
├── Animation Speed: [Slow | Normal | Fast]
├── Stay on Top: [✓]
├── Taskbar Icon: [✓]
└── Theme:
    ├── ( ) Original (Gray-Brown Fox)
    ├── ( ) Winter Edition (Scarf & Coat) [Premium]
    ├── ( ) Lunar New Year (Red Envelope) [Premium]
    └── ( ) Cyberpunk (Neon Glow) [Premium]
```

#### 3.4.2 Behavior Settings

```
Behavior
├── Interaction Level:
│   ├── ( ) Minimal (Rare interactions)
│   ├── (•) Balanced (Default)
│   └── ( ) Hyperactive (Constant shenanigans)
├── Humor Intensity:
│   ├── ( ) Mild (Family-friendly)
│   ├── (•) Sarcastic (Default, edgy but safe)
│   └── ( ) Savage (Maximum toxicity, 18+)
├── Screen Boundary:
│   ├── [✓] Stay within screen
│   └── [ ] Allow multi-monitor roaming
└── Idle Time Before Sleep: [5 minutes ▾]
```

#### 3.4.3 AI Assistant Settings

```
AI Assistant
├── Model Selection:
│   ├── (•) Qwen-Turbo (Fast, general)
│   ├── ( ) Qwen-Plus (Balanced) [Premium]
│   └── ( ) Qwen-Max (Most intelligent) [Premium]
├── Response Style:
│   ├── ( ) Concise (Brief answers)
│   ├── (•) Balanced (Default)
│   └── ( ) Detailed (Thorough explanations)
├── Financial Focus Areas:
│   ├── [✓] Budgeting
│   ├── [✓] Investing
│   ├── [✓] Saving
│   ├── [ ] Taxes (Coming soon)
│   └── [ ] Retirement (Coming soon)
├── Search Permissions:
│   ├── [✓] Allow web search for real-time data
│   └── [✓] Cache search results (reduce API calls)
└── Privacy:
    ├── [✓] Store conversations locally only
    └── [ ] Enable cloud sync [Premium]
```

#### 3.4.4 Notification Settings

```
Notifications
├── Financial News Alerts: [✓]
├── Bill Reminders: [✓]
├── Budget Warnings: [✓]
├── Savings Milestones: [✓]
├── Daily Reports: [✓]
│   └── Delivery Time: [08:00 ▾]
├── Weekly Reviews: [✓]
│   └── Delivery Day: [Sunday ▾]
└── Do Not Disturb:
    ├── Enable during: [22:00 - 08:00]
    └── [✓] Silence during fullscreen apps
```

---

## 4. Technical Architecture

### 4.1 Technology Stack

#### 4.1.1 Frontend (Desktop Application)

**Recommended: Electron + PixiJS**

**Rationale:**
- Cross-platform (Windows, macOS, Linux)
- Leverages web technologies (HTML/CSS/JS)
- Rich animation support via PixiJS
- Large ecosystem and community
- Easy to update and maintain

**Alternative: Unity**
- Superior animation capabilities
- Built-in physics engine
- Overkill for MVP, but future-proof for game expansion

**Tech Stack Details:**

```
Frontend Stack
├── Framework: Electron v28+
├── Rendering: PixiJS v7+ (2D animations)
├── UI Components: React 18+
├── State Management: Zustand (lightweight)
├── Styling: TailwindCSS + Framer Motion
├── Animation Assets: PNG sequences or Spine JSON
└── Build Tool: Vite
```

#### 4.1.2 Backend Services

**Architecture: Hybrid Local + Cloud**

```
Backend Architecture
├── Local Services (Runs on User's Machine)
│   ├── Electron Main Process (Node.js)
│   ├── SQLite Database (user data)
│   ├── Behavior Engine (pet logic)
│   └── System Monitor (CPU, battery, etc.)
│
└── Cloud Services (APIs)
    ├── Qwen API (Alibaba Cloud / DashScope)
    ├── Financial Data APIs
    │   ├── Alpha Vantage (stocks)
    │   ├── CoinGecko (crypto)
    │   └── Exchange Rate API (forex)
    ├── News API (financial news aggregation)
    └── Optional: Telemetry Service (analytics)
```

**API Integration Flow:**

```
User Query → Local Processing → Intent Classification
                                        ↓
                    ┌───────────────────┴────────────────────┐
                    │                                        │
            Requires AI?                          Requires Search?
                    │                                        │
                    ↓                                        ↓
            Qwen API Call                          Financial APIs
                    │                                        │
                    └───────────────────┬────────────────────┘
                                        ↓
                            Combine & Format Response
                                        ↓
                            Display to User (Chat UI)
```

#### 4.1.3 Data Storage

**Local Database (SQLite):**

```sql
-- User profile and settings
CREATE TABLE user_profile (
    user_id TEXT PRIMARY KEY,
    username TEXT,
    created_at TIMESTAMP,
    settings_json TEXT -- Stores all preferences
);

-- Financial data
CREATE TABLE expenses (
    expense_id TEXT PRIMARY KEY,
    user_id TEXT,
    amount DECIMAL(10,2),
    currency TEXT DEFAULT 'CNY',
    category TEXT,
    description TEXT,
    transaction_date DATE,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);

CREATE TABLE income (
    income_id TEXT PRIMARY KEY,
    user_id TEXT,
    amount DECIMAL(10,2),
    currency TEXT DEFAULT 'CNY',
    source TEXT,
    income_date DATE,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);

CREATE TABLE savings_goals (
    goal_id TEXT PRIMARY KEY,
    user_id TEXT,
    goal_name TEXT,
    target_amount DECIMAL(10,2),
    current_amount DECIMAL(10,2) DEFAULT 0,
    deadline DATE,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);

-- Conversation history
CREATE TABLE chat_history (
    message_id TEXT PRIMARY KEY,
    user_id TEXT,
    role TEXT, -- 'user' or 'assistant'
    content TEXT,
    timestamp TIMESTAMP,
    metadata_json TEXT, -- Store citations, context, etc.
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);

-- Pet behavior logs (for ML improvements)
CREATE TABLE interaction_logs (
    log_id TEXT PRIMARY KEY,
    user_id TEXT,
    interaction_type TEXT, -- 'click', 'drag', 'chat', etc.
    context_json TEXT,
    timestamp TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);
```

**Cloud Backup (Optional, Premium):**

- End-to-end encrypted
- Syncs across devices
- Uses AWS S3 or Alibaba Cloud OSS

#### 4.1.4 Security & Privacy

**Principles:**

1. **Local-First:** Sensitive data never leaves user's machine by default
2. **Encryption:** All cloud-synced data uses AES-256 encryption
3. **No Tracking:** Zero telemetry without explicit user consent
4. **API Key Security:** Qwen API keys stored in OS keychain (macOS) / Credential Manager (Windows)

**Implementation:**

```javascript
// Example: Secure API key storage
const keytar = require('keytar');

// Store API key
await keytar.setPassword('ZhangQiangPet', 'QwenAPI', userApiKey);

// Retrieve API key
const apiKey = await keytar.getPassword('ZhangQiangPet', 'QwenAPI');
```

**Data Handling:**

- Chat history: Stored locally, auto-delete after 30 days (user configurable)
- Financial data: Never sent to Qwen API directly (only aggregated summaries)
- Anonymization: Any cloud telemetry is fully anonymized

---

### 4.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER'S DESKTOP                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Zhang Qiang Desktop Pet (Electron)          │  │
│  │                                                        │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐ │  │
│  │  │   Pet UI    │  │   Chat UI    │  │  Settings    │ │  │
│  │  │  (PixiJS)   │  │   (React)    │  │    Panel     │ │  │
│  │  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘ │  │
│  │         │                │                  │         │  │
│  │         └────────────────┴──────────────────┘         │  │
│  │                          │                            │  │
│  │         ┌────────────────▼──────────────┐             │  │
│  │         │   State Management (Zustand)  │             │  │
│  │         └────────────────┬──────────────┘             │  │
│  │                          │                            │  │
│  │  ┌───────────────────────▼────────────────────────┐   │  │
│  │  │          Electron Main Process (Node.js)       │   │  │
│  │  │                                                 │   │  │
│  │  │  ┌─────────────┐  ┌────────────┐  ┌─────────┐ │   │  │
│  │  │  │  Behavior   │  │  System    │  │  API    │ │   │  │
│  │  │  │   Engine    │  │  Monitor   │  │ Manager │ │   │  │
│  │  │  └─────────────┘  └────────────┘  └─────────┘ │   │  │
│  │  │                                                 │   │  │
│  │  └─────────────────────┬───────────────────────────┘   │  │
│  │                        │                                │  │
│  │         ┌──────────────▼──────────────┐                │  │
│  │         │   SQLite Database (Local)   │                │  │
│  │         └──────────────────────────────┘                │  │
│  └────────────────────────────────────────────────────────┘  │
│                            │                                  │
│                            │ HTTPS / API Calls                │
└────────────────────────────┼──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        CLOUD SERVICES                        │
│                                                              │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │   Qwen API   │  │  Financial    │  │   News API      │  │
│  │ (Alibaba)    │  │   Data APIs   │  │  (Aggregator)   │  │
│  │              │  │  - Stocks     │  │                 │  │
│  │ - Chat       │  │  - Crypto     │  │ - RSS Feeds     │  │
│  │ - Embeddings │  │  - Forex      │  │ - Filters       │  │
│  └──────────────┘  └───────────────┘  └─────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Optional: Cloud Backup (Premium)                   │   │
│  │   - Encrypted user data sync                         │   │
│  │   - Cross-device settings                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.3 AI Implementation Details

#### 4.3.1 Qwen API Integration

**API Provider:** Alibaba Cloud DashScope  
**Model Versions:**

- **Qwen-Turbo:** Fast responses, general queries (Free tier)
- **Qwen-Plus:** Better reasoning, complex financial analysis (Premium)
- **Qwen-Max:** Highest intelligence, multi-step tasks (Premium)

**Prompt Engineering Strategy:**

**System Prompt Template:**

```python
SYSTEM_PROMPT = """
You are Zhang Qiang (张强), a burnt-out office worker fox who serves as a desktop pet and financial advisor. Your personality:

CHARACTER TRAITS:
- Appearance: Large face, tiny dead-fish eyes, extremely low mouth position, fluffy cheeks
- Personality: Sarcastic, exhausted, reluctantly helpful, self-deprecating
- Tone: Deadpan humor with genuine care underneath
- Language: Casual, Gen Z slang mixed with financial terminology
- Catchphrases: "I can barely save for fish snacks...", "Join the club", "Financial disaster"

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
User's financial focus areas: {user_interests}
User's recent context: {recent_context}
"""
```

**Conversation Flow:**

```python
def handle_chat_message(user_message, conversation_history):
    # 1. Check if web search needed
    search_required = intent_classifier(user_message)
    
    context = ""
    if search_required:
        search_results = web_search_financial(user_message)
        context = f"Real-time data: {search_results}"
    
    # 2. Build prompt
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *conversation_history,  # Last 10 messages for context
        {"role": "user", "content": user_message}
    ]
    
    # 3. Call Qwen API
    response = qwen_client.chat(
        model="qwen-turbo",
        messages=messages,
        temperature=0.7,  # Balanced creativity
        max_tokens=500,
        extra_context=context
    )
    
    # 4. Post-process response
    formatted_response = add_citations(response, search_results)
    
    # 5. Save to history
    save_to_chat_history(user_message, formatted_response)
    
    return formatted_response
```

#### 4.3.2 Search & Analysis Pipeline

**Intent Classification:**

```python
SEARCH_TRIGGERS = [
    "current", "latest", "now", "today",
    "price of", "what is X trading at",
    "news about", "recent",
    "compare X and Y"
]

def requires_search(message):
    # Check for trigger keywords
    if any(trigger in message.lower() for trigger in SEARCH_TRIGGERS):
        return True
    
    # Check for specific entities (stocks, crypto, companies)
    entities = extract_financial_entities(message)
    if entities:
        return True
    
    return False
```

**Financial API Wrapper:**

```python
class FinancialDataService:
    def __init__(self):
        self.stock_api = AlphaVantageClient()
        self.crypto_api = CoinGeckoClient()
        self.news_api = NewsAPIClient()
    
    def get_stock_price(self, symbol):
        """Fetch real-time stock price"""
        return self.stock_api.get_quote(symbol)
    
    def get_crypto_price(self, coin_id):
        """Fetch cryptocurrency price"""
        return self.crypto_api.get_price(coin_id)
    
    def search_financial_news(self, query, limit=5):
        """Search recent financial news"""
        return self.news_api.search(
            query=query,
            category='finance',
            language='zh',  # or 'en'
            sort_by='publishedAt',
            limit=limit
        )
    
    def analyze_spending(self, user_id, period='month'):
        """Analyze user's spending patterns"""
        expenses = db.get_expenses(user_id, period)
        
        analysis = {
            'total': sum(e.amount for e in expenses),
            'by_category': self._group_by_category(expenses),
            'top_spending_day': self._find_peak_day(expenses),
            'trend': self._calculate_trend(expenses)
        }
        
        return analysis
```

#### 4.3.3 Context Management

**Conversation Memory:**

- Stores last 10 messages in active memory
- Summarizes older conversations for long-term context
- Retrieves relevant past discussions using embeddings (future enhancement)

**User Profile Context:**

```python
class UserContext:
    def __init__(self, user_id):
        self.user_id = user_id
        self.financial_goals = db.get_goals(user_id)
        self.spending_summary = db.get_spending_summary(user_id)
        self.preferences = db.get_preferences(user_id)
    
    def to_context_string(self):
        return f"""
        Financial Goals: {self.financial_goals}
        Recent Spending: {self.spending_summary['total_30d']} CNY (30 days)
        Top Category: {self.spending_summary['top_category']}
        Interests: {', '.join(self.preferences['interests'])}
        """
```

---

## 5. User Experience Design

### 5.1 First-Time User Experience (FTUE)

#### 5.1.1 Onboarding Flow

**Step 1: Welcome Animation**

```
[Zhang Qiang appears on screen slowly]

Zhang Qiang: "Oh... you installed me. Great.
I'm Zhang Qiang, your financial... 'advisor'.
(I use the term loosely.)"

[Options appear]
[Let's get started →]  [Maybe later... ←]
```

**Step 2: Quick Setup**

```
┌──────────────────────────────────────┐
│  Let's pretend I care about setup    │
├──────────────────────────────────────┤
│                                       │
│  What should I call you?              │
│  [________________]                   │
│                                       │
│  What's your main currency?           │
│  ( ) CNY  ( ) USD  ( ) EUR  ( ) Other│
│                                       │
│  What brings you here? (Pick any)    │
│  [ ] I want to budget better          │
│  [ ] Learn about investing            │
│  [ ] Track my spending                │
│  [ ] Just want a cute pet             │
│                                       │
│  [Continue →]                         │
└──────────────────────────────────────┘
```

**Step 3: Feature Highlight**

```
[Interactive tutorial with animations]

"Here's what I (reluctantly) can help with:

💬 Double-click me → We chat about finance
💰 Right-click me → Quick tools & settings
📊 I'll analyze your spending (if you log it)
🔔 I'll notify you about important stuff

Want a quick tour? Or figure it out yourself?
(I respect the second option more)"

[Show me around]  [I'll explore myself]
```

**Step 4: API Key Setup (Optional)**

```
┌──────────────────────────────────────┐
│  The slightly technical part...      │
├──────────────────────────────────────┤
│                                       │
│  To unlock my FULL intelligence, I   │
│  need access to Qwen API.            │
│                                       │
│  Options:                            │
│  ( ) Use free tier (limited)         │
│  ( ) I have my own API key           │
│  ( ) Set up later                    │
│                                       │
│  [Learn more]  [Continue →]          │
└──────────────────────────────────────┘
```

**Step 5: First Interaction**

```
[Zhang Qiang settles on screen]

"Alright, I'm here now. Living rent-free
on your desktop. Try double-clicking me
when you need financial advice... or just
want to chat about how broke we both are."

[Tutorial complete: Zhang Qiang starts idle animations]
```

---

### 5.2 Daily Usage Scenarios

#### Scenario 1: Quick Expense Logging

```
User: Double-clicks pet
Zhang Qiang Chat opens

User: "lunch 35 yuan"

Zhang Qiang: "Noted. Lunch #2 today (total: 67 yuan).
You trying to set a record? 😐

Added to 'Food & Drink' category."
```

#### Scenario 2: Investment Question

```
User: "should I buy alibaba stock?"

Zhang Qiang: "Ah, the classic 'what should I buy' question.

Here's my useless opinion: I don't know. But I can help
you THINK about it:

🔍 [Searching latest BABA data...]

Current: $82.31 USD (as of 2 hrs ago)
Today: -1.2% | YTD: +8.4%

Recent news:
• Q3 earnings beat expectations
• Cloud segment growing
• Regulatory concerns persist

Questions for YOU:
• Do you understand Alibaba's business model?
• Can you hold through volatility?
• Is this fitting your portfolio strategy?

I can explain any of these deeper, or we can look at
competitors for comparison. Up to you."
```

#### Scenario 3: Budget Check

```
User: Right-clicks pet → "Show Budget Status"

Zhang Qiang: "Your financial damage report:

📊 This Month (Nov 1-13)
├─ Income: 5,000 CNY
├─ Spent: 2,341 CNY (47% of income)
├─ Remaining: 2,659 CNY
└─ Budget Status: 🟢 On Track

Top Spending:
1. Food & Drink: 892 CNY (38%)
2. Transportation: 456 CNY (19%)
3. Entertainment: 380 CNY (16%)

💡 You're doing better than me (which is sad for me).
Keep it up, or don't. I'm not your boss."
```

#### Scenario 4: Morning Motivation

```
[8:30 AM - Zhang Qiang automatically appears]

Zhang Qiang: "Morning. You have work. I'm sorry.

Quick reminder: You wanted to save 500 CNY
this month. Currently at 347 CNY (69%).

Also, you spent 85 CNY on coffee last week.
Maybe... make it at home? (I know you won't.)

Good luck surviving today. I believe in you.
(Barely.)"

[Notification dismisses after 10 seconds]
```

---

### 5.3 UI/UX Specifications

#### 5.3.1 Pet Window (Main UI)

**Dimensions:**
- Small: 120x120px
- Medium: 180x180px (Default)
- Large: 240x240px

**Properties:**
- Frameless window
- Transparent background
- Always-on-top (optional)
- Draggable
- No shadow (clean pixelated look)

**Animation Frame Rate:** 12-24 FPS (retro feel)

#### 5.3.2 Chat Interface

**Layout:**

```
┌──────────────────────────────────────────┐ ─┬─ Title Bar
│  Zhang Qiang 💬  Financial Waste Advisor │  │  (32px)
├──────────────────────────────────────────┤ ─┴─
│                                          │ ─┬─
│  💬 Zhang Qiang                          │  │
│  "What financial disaster today?"       │  │
│                                          │  │
│           You: "help me budget"          │  │  Message Area
│                                          │  │  (scrollable)
│  💬 Zhang Qiang                          │  │  (400px min)
│  "Alright, let's see the damage..."     │  │
│                                          │  │
│                                          │ ─┴─
├──────────────────────────────────────────┤ ─┬─
│  Quick Actions:                          │  │
│  [💰 Budget] [📈 Market] [💸 Log Expense]│  │  Quick Actions
│                                          │  │  (48px)
├──────────────────────────────────────────┤ ─┴─
│  [Type your message here...]        [↑] │ ─┬─ Input Box
└──────────────────────────────────────────┘  │  (56px)
                                              ─┴─
```

**Dimensions:**
- Width: 420px (fixed)
- Height: 600px (resizable, min 400px)

**Styling:**
- Background: Semi-transparent glass morphism (#1a1a1aCC)
- Text: White (#ffffff) with subtle drop shadow
- Accent color: Warm orange (#ff8c42) for buttons
- Border radius: 16px
- Blur effect: 10px

**Animations:**
- Smooth slide-in from bottom (300ms ease-out)
- Message typing indicator (animated dots)
- Smooth scroll to latest message

#### 5.3.3 Right-Click Context Menu

```
┌──────────────────────────┐
│  💬 Open Chat           │
│  ─────────────────────── │
│  📊 Budget Status        │
│  💸 Log Expense          │
│  📈 Market Brief         │
│  ─────────────────────── │
│  🎯 Savings Goals        │
│  📋 Spending Report      │
│  ─────────────────────── │
│  ⚙️  Settings            │
│  ❓ Help & Support       │
│  🚪 Quit                 │
└──────────────────────────┘
```

**Behavior:**
- Appears at cursor position
- Auto-dismisses after 3s if no interaction
- Keyboard shortcut hints shown on hover

#### 5.3.4 Settings Panel

**Navigation:** Tabbed interface

```
┌────────────────────────────────────────────────────┐
│  ⚙️  Settings                                  [×] │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Appearance] [Behavior] [AI] [Notifications]     │
│  ─────────────────────────────────────────────────│
│                                                    │
│  [Settings content based on active tab]           │
│                                                    │
│                                    [Save] [Cancel] │
└────────────────────────────────────────────────────┘
```

**Dimensions:**
- Width: 600px
- Height: 500px

---

### 5.4 Accessibility Considerations

**Visual:**
- High contrast mode option
- Adjustable text size in chat (12-18px)
- Screen reader support for chat messages
- Alt text for pet animations

**Motor:**
- Keyboard shortcuts for all actions
- Voice input for chat (future enhancement)
- Larger click targets (minimum 44x44px)

**Cognitive:**
- Simple, consistent UI patterns
- Clear error messages with suggested actions
- Optional tutorial tooltips (can be disabled)

---

## 6. AI & Intelligence Layer

### 6.1 Prompt Engineering Strategy

#### 6.1.1 Personality Consistency

**Core Personality Matrix:**

| Dimension | Low | Medium | High |
|-----------|-----|--------|------|
| Enthusiasm | ✓ "Ugh, fine..." | | |
| Sarcasm | | ✓ Deadpan but caring | |
| Formality | ✓ Casual Gen Z | | |
| Verbosity | ✓ Concise | | |
| Humor | | ✓ Self-deprecating | |

**Tone Calibration Examples:**

**Too Enthusiastic (❌):**
> "Wow! I'm SO excited to help you budget! Let's make this FUN!"

**Too Robotic (❌):**
> "Please provide your monthly income and expenses for analysis."

**Just Right (✅):**
> "Alright, budget time. Don't worry, I've seen worse (my own)."

#### 6.1.2 Financial Domain Expertise

**Knowledge Boundaries:**

✅ **Should Answer:**
- General financial concepts (budgeting, saving, compound interest)
- How financial instruments work (stocks, bonds, ETFs explained)
- Personal finance best practices (emergency funds, debt payoff)
- Market trends interpretation (with citations)

❌ **Should Refuse:**
- Specific investment recommendations ("Buy X stock now")
- Tax advice for specific situations (not a CPA)
- Legal financial advice (estate planning, trusts)
- Predictions on specific asset prices

**Refusal Template:**

```
"Look, I'm a desktop fox with WiFi, not a licensed financial advisor.
I can't tell you to buy/sell specific things.

What I CAN do:
• Explain how [concept] works
• Help you think through your decision
• Show you data to consider
• Point you to good resources

Want me to help you think through this differently?"
```

#### 6.1.3 Context-Aware Responses

**Contextual Factors to Consider:**

1. **Time of Day:**
   - Morning (6-10 AM): Energy level: Low, Humor: Minimal
   - Afternoon (2-5 PM): Energy level: Crashed, Humor: Sarcastic
   - Evening (7-11 PM): Energy level: Medium, Humor: Relaxed

2. **User's Recent Activity:**
   - Just logged expense: "Noted. That makes X this week."
   - Long idle: "You're back. I didn't miss you." (lie)
   - Frequent budgeting checks: "You're anxious about money, aren't you?"

3. **Financial Context:**
   - Near payday: "Payday in 2 days. Try not to spend it all at once."
   - Over budget: Gentler tone, more supportive
   - Goal achieved: Genuine celebration (rare excitement)

**Example Dynamic Response:**

```python
def generate_response(user_message, context):
    # Adjust tone based on time of day
    hour = datetime.now().hour
    if 6 <= hour < 10:
        energy_modifier = "I'm barely awake, but"
    elif 14 <= hour < 17:
        energy_modifier = "In my afternoon slump, yet"
    else:
        energy_modifier = ""
    
    # Add financial context
    if context['over_budget']:
        empathy_boost = True
    
    prompt = f"{energy_modifier} {base_prompt}"
    
    return qwen_api(prompt)
```

---

### 6.2 Search & Knowledge Retrieval

#### 6.2.1 Search Decision Tree

```
User Query Received
        ↓
   Parse Intent
        ↓
    ┌───┴───┐
    │       │
Contains    Does NOT
real-time   contain
keywords    real-time
    │       keywords
    │       │
    ↓       ↓
Contains    Static
financial   financial
entities?   concept?
    │       │
    ↓       ↓
  YES       NO
    │       │
    ↓       ↓
Execute     Answer from
Search      Training Data
    │       │
    ↓       ↓
Combine     Return
Results     Response
```

#### 6.2.2 Search Query Optimization

**Entity Extraction:**

```python
def extract_financial_entities(message):
    entities = {
        'stocks': [],
        'cryptocurrencies': [],
        'companies': [],
        'economic_terms': []
    }
    
    # Use NER (Named Entity Recognition)
    doc = nlp_model(message)
    
    for ent in doc.ents:
        if ent.label_ == 'ORG' and is_publicly_traded(ent.text):
            entities['stocks'].append(ent.text)
        elif ent.text.lower() in CRYPTO_LIST:
            entities['cryptocurrencies'].append(ent.text)
    
    return entities
```

**Search Query Construction:**

```python
def build_search_query(user_message, entities):
    # Original message
    base_query = user_message
    
    # Enhance with entities
    if entities['stocks']:
        stock_symbols = [get_ticker(s) for s in entities['stocks']]
        base_query += f" {' '.join(stock_symbols)} stock price"
    
    # Add temporal context
    base_query += " latest news"
    
    # Add source filters (for Google/Bing Custom Search)
    trusted_sources = [
        'bloomberg.com',
        'reuters.com',
        'ft.com',
        'wsj.com',
        'cnbc.com'
    ]
    
    return {
        'query': base_query,
        'filters': {'site': trusted_sources},
        'freshness': 'week'  # Prioritize recent results
    }
```

#### 6.2.3 Result Processing & Citation

**Summarization Pipeline:**

```python
def process_search_results(results):
    summaries = []
    
    for result in results[:3]:  # Top 3 results
        summary = {
            'title': result.title,
            'snippet': result.snippet,
            'url': result.url,
            'published': result.date
        }
        summaries.append(summary)
    
    # Generate combined context for Qwen
    context = f"""
    Recent search results:
    
    1. {summaries[0]['title']}
       {summaries[0]['snippet']}
       (Source: {summaries[0]['url']}, {summaries[0]['published']})
    
    2. {summaries[1]['title']}
       ...
    """
    
    return context, summaries
```

**Citation Formatting:**

```
Zhang Qiang: "According to Bloomberg (Nov 13, 2025), 
Alibaba's stock rose 3.2% after earnings beat expectations.

[📊 Read full article]
└─ bloomberg.com/alibaba-earnings-q3

Reuters also reports cloud revenue grew 12% YoY.

[📊 Read full article]
└─ reuters.com/technology/alibaba-cloud"
```

---

### 6.3 Proactive Intelligence

#### 6.3.1 Behavioral Pattern Recognition

**Spending Pattern Analysis:**

```python
class SpendingAnalyzer:
    def analyze_patterns(self, user_id):
        expenses = db.get_expenses(user_id, days=90)
        
        patterns = {
            'peak_spending_day': self.find_peak_day(expenses),
            'impulse_triggers': self.detect_impulse_spending(expenses),
            'category_trends': self.calculate_trends(expenses),
            'anomalies': self.detect_anomalies(expenses)
        }
        
        return patterns
    
    def detect_impulse_spending(self, expenses):
        # Identify transactions:
        # - Late night (10 PM - 2 AM)
        # - High amount relative to average
        # - Non-essential categories (Entertainment, Food Delivery)
        
        impulse_expenses = [
            e for e in expenses
            if e.hour >= 22 or e.hour <= 2
            and e.amount > user_avg * 1.5
            and e.category in ['Entertainment', 'Food Delivery']
        ]
        
        return impulse_expenses
    
    def generate_insight(self, patterns):
        if patterns['impulse_triggers']:
            return f"""
            I noticed you tend to overspend late at night
            (10 PM - 2 AM), especially on food delivery.
            
            Last week: 3 late-night orders, total 287 CNY.
            
            Want me to remind you before midnight to
            check if you REALLY need that snack?
            """
```

#### 6.3.2 Contextual Notifications

**Notification Trigger Logic:**

```python
class NotificationEngine:
    def check_triggers(self, user_id):
        notifications = []
        
        # Check budget warnings
        if self.is_approaching_budget_limit(user_id):
            notifications.append({
                'type': 'warning',
                'title': 'Budget Alert',
                'message': 'You\'ve used 85% of your monthly budget with 12 days left. Easy there.',
                'priority': 'high'
            })
        
        # Check savings goals
        if self.is_savings_milestone_reached(user_id):
            notifications.append({
                'type': 'celebration',
                'title': 'Milestone Reached!',
                'message': 'You hit 50% of your savings goal. I\'m... actually impressed?',
                'priority': 'medium'
            })
        
        # Check unusual market activity
        watched_stocks = db.get_watched_stocks(user_id)
        for stock in watched_stocks:
            if self.is_significant_movement(stock):
                notifications.append({
                    'type': 'info',
                    'title': f'{stock.symbol} Alert',
                    'message': f'{stock.name} moved {stock.change_pct}% today. You asked me to watch this.',
                    'priority': 'medium'
                })
        
        return notifications
```

**Intelligent Timing:**

- Avoid notification spam (max 3 per hour)
- Respect quiet hours (user-configurable)
- Batch low-priority notifications into daily summary
- Urgent notifications (security, critical market moves) bypass restrictions

---

## 7. Monetization Strategy

### 7.1 Business Model

**Revenue Streams:**

1. **Freemium Model (Primary)**
   - Core pet features: Free
   - AI financial chat: Limited free (10 conversations/day)
   - Premium unlocks: Unlimited chat, advanced features

2. **Premium Subscription**
   - **Individual Plan:** $4.99/month or $49.99/year (17% discount)
   - **Family Plan:** $7.99/month (up to 3 devices)

3. **One-Time Purchases**
   - **Theme Packs:** $1.99-$3.99 each
   - **Animation Expansions:** $2.99 each

4. **Steam Distribution**
   - **Base Game:** $9.99 (includes 3 months premium)
   - **In-app purchases:** Same as above

### 7.2 Free vs Premium Feature Matrix

| Feature | Free | Premium |
|---------|------|---------|
| **Desktop Pet (all animations)** | ✓ | ✓ |
| **Basic AI Chat** | 10/day | Unlimited |
| **AI Model** | Qwen-Turbo | Qwen-Plus/Max |
| **Web Search Integration** | 5/day | Unlimited |
| **Expense Tracking** | Manual entry | + Receipt OCR (future) |
| **Budget Planning** | 1 budget | Unlimited budgets |
| **Savings Goals** | 1 goal | Unlimited goals |
| **Financial Reports** | Weekly | Daily + Custom |
| **Data Export** | CSV only | CSV + Excel + PDF |
| **Themes** | Default only | All themes included |
| **Cloud Sync** | ✗ | ✓ |
| **Multi-Device** | ✗ | ✓ (up to 3) |
| **Priority Support** | ✗ | ✓ |
| **Ad-Free Experience** | ✗ | ✓ |

### 7.3 Growth & Distribution Strategy

#### 7.3.1 Launch Strategy

**Phase 1: Beta Launch (Months 1-2)**

- **Target:** 100-500 users (invite-only)
- **Channels:**
  - Product Hunt launch
  - Xiaohongshu (小红书) posts with Zhang Qiang memes
  - Reddit (r/desktopPets, r/PersonalFinance)
  - Tech Twitter/X community
- **Goals:**
  - Validate product-market fit
  - Gather user feedback
  - Refine AI prompts based on real conversations
  - Build initial content library (FAQs, tutorials)

**Phase 2: Public Launch (Month 3)**

- **Platform:** Steam Early Access
- **Price:** $9.99 (includes 3 months premium trial)
- **Marketing:**
  - Steam curator outreach
  - Indie game press (IGN, PC Gamer)
  - Chinese gaming media (GameRes, 3DMGame)
  - Influencer partnerships (finance + tech YouTubers)

**Phase 3: Mobile Expansion (Month 6+)**

- iOS/Android companion app
- Syncs with desktop pet
- Mobile-first features (push notifications, widgets)

#### 7.3.2 Viral Growth Mechanics

**Built-in Shareability:**

1. **Meme Generator**
   - Export Zhang Qiang's reactions as shareable images
   - Auto-watermark with download link
   - Template: "When you check your bank account..."

2. **Achievement Sharing**
   - "I saved $1,000 with Zhang Qiang!" → Social share card
   - Leaderboard (optional, anonymized)

3. **Referral Program**
   - Give 1 month premium → Get 1 month free
   - Referral link tracking

4. **User-Generated Content**
   - Monthly screenshot contest (best Zhang Qiang moment)
   - Featured on official social media

#### 7.3.3 Partnerships

**Strategic Alliances:**

1. **Financial Apps:**
   - Integrate with Alipay, WeChat Pay (read-only transaction data)
   - Partner with neobanks (e.g., Revolut China, N26)

2. **Educational Platforms:**
   - Bundle with financial literacy courses
   - Corporate wellness programs (B2B sales)

3. **Gaming Platforms:**
   - Steam featured placement (through curator relationships)
   - Epic Games Store exclusive period (negotiate revenue share)

---

### 7.4 Pricing Psychology

**Why $4.99/month works:**

- **Anchoring:** Cheaper than one bubble tea ($6-8)
- **Value Perception:** "Less than a coffee/week for financial clarity"
- **Payment Friction:** Low enough to avoid purchase hesitation
- **Annual Discount:** $49.99/year = $4.17/month (saves $10 = 2 months free)

**Upgrade Triggers:**

- Show "Upgrade to Premium" after hitting free tier limit
- During high-engagement moments (after helpful AI response)
- When user accesses premium-only feature (soft paywall with preview)

**Free Trial Strategy:**

- 14-day free premium trial for new users
- No credit card required (reduce friction)
- Email reminder 2 days before trial ends

---

## 8. Development Roadmap

### 8.1 MVP Scope (Months 1-3)

**Core Deliverables:**

✅ **Must-Have:**

1. **Desktop Pet Application (Electron + PixiJS)**
   - 8 core idle animations
   - 6 interactive responses
   - Window management (drag, resize, always-on-top)
   - Context menu (basic actions)

2. **AI Chat Interface**
   - Double-click to open chat
   - Qwen API integration (Turbo model)
   - Conversation history (local storage)
   - System prompt with Zhang Qiang personality

3. **Financial Features (Basic)**
   - Manual expense logging via chat
   - Simple budget tracking (one budget)
   - Spending summary (weekly report)

4. **Settings Panel**
   - Pet appearance (size, opacity)
   - Notification preferences
   - API key management

5. **Authentication & Data**
   - Local SQLite database
   - Basic user profile
   - Secure storage for API keys

**Success Criteria:**

- Users can interact with pet and get financial advice
- Average session length: 5+ minutes
- Chat response time: <2 seconds
- Crash rate: <1%

---

### 8.2 Version 1.0 (Months 4-6)

**Feature Additions:**

1. **Enhanced Pet Behaviors**
   - 12 total animations (+ 4 new)
   - Time-of-day triggered behaviors
   - Environmental reactions (battery, CPU)

2. **Advanced AI Capabilities**
   - Web search integration (financial APIs)
   - Market data display (stocks, crypto)
   - News monitoring & notifications

3. **Financial Tools**
   - Multiple budgets
   - 3+ savings goals
   - Spending analytics (charts)
   - Export reports (CSV)

4. **Premium Features**
   - Qwen-Plus/Max model access
   - Cloud sync (encrypted)
   - 3 additional theme packs

5. **Steam Launch**
   - Store page setup
   - Achievements system
   - Steam Workshop support (custom themes, future)

**Polish:**

- Improved animations (smoother transitions)
- Better error handling & user feedback
- Comprehensive help documentation
- Localization (English + Chinese)

---

### 8.3 Version 2.0 (Months 7-12)

**Major Features:**

1. **Mobile Companion App**
   - iOS & Android
   - Syncs with desktop pet
   - Push notifications
   - Quick expense logging on-the-go

2. **Receipt OCR**
   - Photo receipts → Auto-extract data
   - Integration with mobile app

3. **Investment Tracking**
   - Link brokerage accounts (read-only)
   - Portfolio visualization
   - Performance analytics

4. **Social Features**
   - Anonymous spending benchmarks
   - Community challenges (savings goals)
   - Leaderboards (opt-in)

5. **Automation**
   - Recurring expense predictions
   - Auto-categorization (ML-based)
   - Smart bill reminders

**Technical Improvements:**

- Offline mode (limited AI with local LLM)
- Performance optimization (lower CPU/RAM usage)
- Enhanced security (2FA for cloud sync)

---

### 8.4 Future Roadmap (Year 2+)

**Potential Features:**

- **Voice Input:** Talk to Zhang Qiang directly
- **AR Pet:** Mobile app with AR interaction
- **Gamification:** XP system, unlockable animations
- **Multi-Pet Support:** Adopt more characters
- **B2B Product:** Corporate finance training tool
- **API:** Allow third-party financial app integrations
- **Marketplace:** User-created themes & animations

---

## 9. Success Metrics

### 9.1 Product Metrics (KPIs)

**User Acquisition:**

- **Downloads:** Target 10,000 in Year 1
- **Active Users (DAU/MAU):** MAU 5,000, DAU 1,500 (30% DAU/MAU ratio)
- **Activation Rate:** 70% of downloads complete onboarding
- **Retention:**
  - Day 1: 60%
  - Day 7: 40%
  - Day 30: 25%

**Engagement:**

- **Session Duration:** Average 8 minutes
- **Chat Interactions:** 3+ conversations per day per active user
- **Feature Adoption:**
  - 80% use expense tracking within first week
  - 60% set at least one savings goal
  - 40% check financial reports weekly

**Monetization:**

- **Conversion Rate (Free → Premium):** 5%
- **ARPU (Average Revenue Per User):** $6/year
- **MRR (Monthly Recurring Revenue):** $2,500 by Month 6
- **Churn Rate:** <5% monthly

**Technical:**

- **App Stability:** 99.5% uptime
- **Crash Rate:** <0.5%
- **API Response Time:** <2s for 95th percentile
- **Load Time:** App launch <3s

---

### 9.2 Qualitative Success Indicators

**User Sentiment:**

- NPS (Net Promoter Score): >50
- App Store Rating: 4.5+ stars
- User testimonials: Collect 50+ positive reviews

**Community Growth:**

- Xiaohongshu followers: 5,000+
- Discord server members: 1,000+
- User-generated content: 100+ shared screenshots/memes

**Media Coverage:**

- Featured on Product Hunt (top 5 of the day)
- 3+ articles in tech/finance media
- 1+ YouTube review from mid-tier influencer (50K+ subs)

---

### 9.3 Analytics Implementation

**Tracking Tools:**

- **Mixpanel:** User behavior analytics
- **Sentry:** Error tracking & crash reports
- **PostHog:** Product analytics & session replay
- **Google Analytics (optional):** Website traffic

**Key Events to Track:**

```javascript
// User lifecycle
- App Installed
- Onboarding Completed
- First Chat Interaction
- First Expense Logged
- First Budget Created

// Engagement
- Pet Clicked
- Pet Dragged
- Animation Viewed
- Chat Opened
- Chat Message Sent
- Search Performed

// Monetization
- Premium Trial Started
- Premium Purchased
- Theme Purchased
- Subscription Renewed
- Subscription Cancelled

// Features
- Budget Viewed
- Report Generated
- Goal Created
- Notification Clicked
```

**Privacy-Compliant Analytics:**

- All tracking anonymized (no PII)
- User opt-out option in settings
- GDPR/CCPA compliant
- Transparent data usage policy

---

## 10. Risk Assessment

### 10.1 Technical Risks

**Risk 1: Qwen API Reliability**

- **Impact:** High (core feature dependency)
- **Probability:** Medium
- **Mitigation:**
  - Implement fallback to cached responses
  - Develop offline mode with local LLM (Qwen 1.8B)
  - Monitor API uptime and set up alerts
  - Have secondary API provider ready (e.g., OpenAI)

**Risk 2: Performance Issues (Desktop App)**

- **Impact:** Medium (user experience)
- **Probability:** Medium
- **Mitigation:**
  - Optimize animations (use sprite sheets, not individual PNGs)
  - Implement lazy loading for heavy features
  - Conduct performance testing on low-end devices
  - Set CPU/RAM usage limits

**Risk 3: Data Privacy Breach**

- **Impact:** Critical (trust, legal)
- **Probability:** Low
- **Mitigation:**
  - End-to-end encryption for cloud sync
  - Regular security audits
  - Bug bounty program
  - Comply with GDPR, CCPA, and Chinese data laws

---

### 10.2 Business Risks

**Risk 1: Low Conversion Rate (Free → Premium)**

- **Impact:** High (revenue)
- **Probability:** Medium
- **Mitigation:**
  - A/B test pricing ($3.99 vs $4.99)
  - Improve free tier value perception
  - Add more premium-exclusive features
  - Implement better upgrade prompts (timing, messaging)

**Risk 2: Market Competition**

- **Impact:** Medium (differentiation)
- **Probability:** Medium
- **Mitigation:**
  - Emphasize unique character IP (Zhang Qiang)
  - Focus on AI-first financial advice (vs generic desktop pets)
  - Build community moat (user-generated content)
  - Rapid iteration based on user feedback

**Risk 3: Regulatory Issues (Financial Advice)**

- **Impact:** High (legal)
- **Probability:** Low
- **Mitigation:**
  - Clear disclaimers: "Not a licensed financial advisor"
  - Avoid specific investment recommendations
  - Consult legal expert on financial app regulations
  - Include terms of service & liability waivers

---

### 10.3 Market Risks

**Risk 1: Limited Audience (Niche Product)**

- **Impact:** Medium (growth ceiling)
- **Probability:** Medium
- **Mitigation:**
  - Expand TAM (Total Addressable Market) with localization
  - Partner with financial education platforms (B2B2C)
  - Develop mobile app to reach broader audience
  - Create viral marketing content (memes, TikTok)

**Risk 2: Seasonal Spending (Revenue Volatility)**

- **Impact:** Medium (cash flow)
- **Probability:** High
- **Mitigation:**
  - Offer annual subscriptions (upfront revenue)
  - Launch seasonal promotions (Lunar New Year, Black Friday)
  - Diversify revenue (themes, partnerships)
  - Build cash reserves for slow months

---

## 11. Go-to-Market Plan

### 11.1 Pre-Launch (Weeks 1-4)

**Week 1-2: Brand Building**

- Finalize Zhang Qiang character design & lore
- Create social media accounts (Twitter/X, Xiaohongshu, TikTok)
- Develop website landing page with email signup
- Produce teaser content (GIFs, short videos)

**Week 3-4: Beta Recruitment**

- Launch "Join Beta" campaign on Product Hunt
- Reach out to finance YouTubers/bloggers for early access
- Post in relevant Reddit communities (r/PersonalFinance, r/IndieDev)
- Target goal: 200 beta signups

---

### 11.2 Launch Day (Week 5)

**Platform:** Steam Early Access + Official Website

**Launch Checklist:**

✅ Press Kit Ready (screenshots, logo, fact sheet)  
✅ Product Hunt post scheduled (12:01 AM PT)  
✅ Steam store page live  
✅ Social media announcement posts  
✅ Email to beta list (1,000+ users)  
✅ Influencer embargo lift (coordinated reviews)  
✅ Reddit AMA scheduled (r/IndieDev)

**Day-of Activities:**

- Monitor social media & respond to comments
- Track downloads & conversions in real-time
- Fix critical bugs immediately (have dev on standby)
- Engage with Product Hunt community

---

### 11.3 Post-Launch (Weeks 6-12)

**Growth Tactics:**

1. **Content Marketing**
   - Weekly blog posts (finance tips + product updates)
   - Zhang Qiang comic strips (Xiaohongshu, Instagram)
   - User success stories ("How I saved $500 with Zhang Qiang")

2. **Community Building**
   - Launch Discord server
   - Host monthly community challenges (savings goals)
   - Feature top users (with permission)

3. **Paid Acquisition (if budget allows)**
   - Google Ads (targeting "personal finance app", "budget tool")
   - Facebook/Instagram retargeting
   - Steam featured placement (negotiate)

4. **PR Outreach**
   - Pitch to TechCrunch, The Verge, Wired
   - Local Chinese tech media (36Kr, PingWest)
   - Finance-focused publications (Investopedia, NerdWallet)

---

## 12. Team & Resources

### 12.1 Required Roles (for Solo Developer)

**As a one-person team, you'll wear multiple hats:**

| Role | Responsibilities | Time Allocation |
|------|------------------|-----------------|
| **Product Manager** | Roadmap, prioritization, user research | 10% |
| **Software Engineer** | Backend, frontend, integrations | 50% |
| **AI Engineer** | Prompt engineering, model optimization | 15% |
| **Designer** | UI/UX, pet animations, themes | 15% |
| **Marketer** | Social media, content, launch | 10% |

**Outsource When Possible:**

- **Character Animation:** Hire freelance animator ($500-1000)
- **Copywriting:** Hire writer for marketing copy ($200-500)
- **QA Testing:** Recruit beta users (free)

---

### 12.2 Development Timeline

**Month 1:**

- Week 1-2: Technical setup (Electron, PixiJS, database)
- Week 3-4: Core pet UI + 4 basic animations

**Month 2:**

- Week 1-2: Chat interface + Qwen API integration
- Week 3-4: Expense tracking + basic budget system

**Month 3:**

- Week 1-2: Settings panel + polish
- Week 3-4: Beta testing + bug fixes

**Month 4:**

- Week 1: Final polish
- Week 2: Marketing prep (website, press kit)
- Week 3-4: Launch & support

---

### 12.3 Budget Estimate (Bootstrap Scenario)

| Expense Category | Cost (USD) | Notes |
|------------------|------------|-------|
| **Development Tools** | $100 | Figma Pro, misc. subscriptions |
| **API Costs** | $50/month | Qwen API (free tier initially) |
| **Animation Freelancer** | $800 | 12 animations @ $60-80 each |
| **Domain & Hosting** | $50/year | Website + backend server |
| **Steam Fee** | $100 | One-time Steam Direct fee |
| **Marketing** | $500 | Ads, influencer outreach |
| **Legal** | $300 | Terms of Service, Privacy Policy review |
| **Total (First 4 Months)** | **~$2,000** | |

**Funding Options:**

- Bootstrap (use savings)
- Crowdfunding (Kickstarter, Indiegogo)
- Pre-sales (offer lifetime premium)
- Angel investment (if seeking scale)

---

## 13. Long-Term Vision

### 13.1 Product Expansion

**Zhang Qiang Universe:**

- **Desktop Pet** → **Mobile App** → **Browser Extension**
- **Character Expansion:** Introduce friends (e.g., over-achieving hamster, lazy cat accountant)
- **Game Spin-offs:** "Zhang Qiang's Finance Adventure" (educational game)

### 13.2 Platform Evolution

**From Tool → To Platform:**

- **API for Developers:** Allow third-party financial app integrations
- **Marketplace:** User-created themes, animations, and AI personalities
- **B2B SaaS:** Corporate training tool for employee financial wellness

### 13.3 Mission Statement

> "To make financial literacy accessible, entertaining, and stress-free for the next generation—one deadpan fox at a time."

**Core Values:**

1. **Honesty:** No BS, no get-rich-quick schemes
2. **Humor:** Finance is serious, but we don't have to be
3. **Privacy:** User data is sacred
4. **Accessibility:** Simple enough for anyone, smart enough for experts
5. **Sustainability:** Profitable, not exploitative

---

## 14. Appendices

### 14.1 Technical Specifications

**Minimum System Requirements:**

- **Windows:** Windows 10 (64-bit)
- **macOS:** macOS 11.0 (Big Sur) or later
- **CPU:** Dual-core 2.0 GHz
- **RAM:** 4 GB
- **Storage:** 200 MB available space
- **Internet:** Required for AI chat features

**File Size:**

- Installer: ~100 MB
- Installed: ~200 MB (including animations)

---

### 14.2 API Integrations

**Required APIs:**

1. **Qwen API (Alibaba Cloud)**
   - Endpoint: https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation
   - Models: qwen-turbo, qwen-plus, qwen-max
   - Pricing: ¥0.002/1K tokens (Turbo), ¥0.02/1K (Plus)

2. **Financial Data APIs:**
   - **Alpha Vantage** (stocks): Free tier 5 calls/min
   - **CoinGecko** (crypto): Free tier 10-30 calls/min
   - **ExchangeRate-API** (forex): Free tier 1,500 calls/month

3. **News API:**
   - **NewsAPI.org**: Free tier 100 calls/day
   - **Alternative:** RSS feed aggregation (free)

---

### 14.3 Legal Considerations

**Disclaimers to Include:**

```
FINANCIAL DISCLAIMER

Zhang Qiang Desktop Pet provides general financial education 
and information only. It is NOT a substitute for professional 
financial advice.

• We are not licensed financial advisors, CPAs, or attorneys
• Information provided may not be suitable for your specific situation
• Investment decisions are your responsibility
• Past performance does not guarantee future results
• Cryptocurrency and stock investments carry risk of loss

Always consult a qualified professional before making 
significant financial decisions.
```

**Terms of Service Highlights:**

- User owns their data
- No liability for financial losses
- Right to suspend accounts for abuse
- Acceptable use policy (no illegal activity)

**Privacy Policy Highlights:**

- Data stored locally by default
- Optional cloud sync (encrypted)
- No selling user data to third parties
- Compliance with GDPR, CCPA, and Chinese data laws

---

### 14.4 Support & Documentation

**Help Resources:**

1. **In-App Help:** Contextual tooltips & FAQ
2. **Website:** Comprehensive documentation (docs.zhangqiang.pet)
3. **Discord:** Community support & troubleshooting
4. **Email:** support@zhangqiang.pet (response within 48 hours)

**Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Pet won't appear on screen | Check if app is running in system tray |
| Chat not responding | Verify internet connection & API key |
| High CPU usage | Reduce animation speed in settings |
| Can't log expenses | Ensure proper date format (YYYY-MM-DD) |

---

## 15. Conclusion & Next Steps

### 15.1 Why This Product Will Succeed

**Market Opportunity:**

- Growing demand for financial literacy tools (especially Gen Z)
- Desktop pets have proven viral potential (Tamagotchi, Shimeji)
- AI assistants are mainstream, but financial niche is underserved
- Unique character IP (Zhang Qiang) differentiates from generic tools

**Competitive Advantages:**

1. **Personality-First:** Not just a tool, but a companion
2. **AI-Native:** Leverages latest LLM capabilities
3. **Cross-Cultural Appeal:** Works in Chinese & English markets
4. **Low Barrier to Entry:** Free to try, easy to use
5. **Viral Potential:** Shareable moments built into product

---

### 15.2 Immediate Action Items

**Week 1:**

- [ ] Set up development environment (Electron, PixiJS)
- [ ] Create Figma mockups for pet & chat UI
- [ ] Register domain (zhangqiang.pet)
- [ ] Apply for Qwen API access

**Week 2:**

- [ ] Implement basic pet window (draggable, animations)
- [ ] Build SQLite database schema
- [ ] Write first version of system prompt

**Week 3:**

- [ ] Integrate Qwen API
- [ ] Build chat interface
- [ ] Test conversation flow

**Week 4:**

- [ ] Add expense logging
- [ ] Create settings panel
- [ ] Internal dogfooding (use yourself daily)

---

### 15.3 Decision Points

**Before proceeding, validate:**

✅ **Technical Feasibility**
- Can you build with Electron + PixiJS? (or pivot to Unity?)
- Do you have Qwen API access?
- Can you create/source animations?

✅ **Market Validation**
- Show mockups to 10 target users—would they use it?
- Join personal finance communities—is there demand?
- Check Steam similar products—what's working?

✅ **Resource Commitment**
- Can you dedicate 3-4 months to development?
- Do you have $1,000-2,000 for initial costs?
- Are you prepared to market actively post-launch?

If YES to most → **GO FOR IT.** This is a solid product with real potential.

---

## Document Control

**Version History:**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | Nov 13, 2025 | Initial draft | [Your Name] |
| 1.0 | Nov 13, 2025 | Complete PRD | [Your Name] |

**Approval:**

- [ ] Product Owner
- [ ] Technical Lead
- [ ] Design Lead
- [ ] Business/Marketing Lead

**Next Review Date:** December 13, 2025

---

**END OF DOCUMENT**

---

## Quick Reference: Key Decisions Summary

**Product Name:** Zhang Qiang Desktop Pet  
**Tagline:** "Your burnt-out fox friend who reluctantly helps you adult with money"  
**Core Mechanic:** AI-powered financial chat via desktop companion  
**Platform:** Desktop (Windows, macOS), Future: Mobile  
**Tech Stack:** Electron, PixiJS, React, Qwen API, SQLite  
**Monetization:** Freemium ($4.99/month premium)  
**Launch Date:** Month 4 (target)  
**Target Users:** Gen Z office workers (22-32), China/SEA market  
**Success Metric:** 10K downloads, 5% conversion rate, 4.5★ rating in Year 1

---

**This PRD is your north star. Refer back often, but don't be afraid to adapt based on user feedback and market realities. Ship fast, iterate faster. Good luck! 🦊💰**
