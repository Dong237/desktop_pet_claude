// User and Settings Types
export interface UserProfile {
  userId: string;
  username: string;
  currency: string;
  createdAt: string;
  settings: AppSettings;
}

export interface AppSettings {
  // Appearance
  petSize: 'small' | 'medium' | 'large';
  opacity: number;
  animationSpeed: 'slow' | 'normal' | 'fast';
  stayOnTop: boolean;
  taskbarIcon: boolean;
  theme: 'original' | 'winter' | 'lunar' | 'cyberpunk';

  // Behavior
  interactionLevel: 'minimal' | 'balanced' | 'hyperactive';
  humorIntensity: 'mild' | 'sarcastic' | 'savage';
  stayWithinScreen: boolean;
  idleTimeBeforeSleep: number; // minutes

  // AI Assistant
  aiModel: 'qwen-turbo' | 'qwen-plus' | 'qwen-max';
  responseStyle: 'concise' | 'balanced' | 'detailed';
  financialFocusAreas: string[];
  allowWebSearch: boolean;
  cacheSearchResults: boolean;
  storeConversationsLocallyOnly: boolean;

  // Notifications
  financialNewsAlerts: boolean;
  billReminders: boolean;
  budgetWarnings: boolean;
  savingsMilestones: boolean;
  dailyReports: boolean;
  dailyReportTime: string;
  weeklyReviews: boolean;
  weeklyReviewDay: string;
  doNotDisturbStart: string;
  doNotDisturbEnd: string;
  silenceDuringFullscreen: boolean;
}

// Financial Types
export interface Expense {
  expenseId: string;
  userId: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  transactionDate: string;
  createdAt: string;
}

export interface Income {
  incomeId: string;
  userId: string;
  amount: number;
  currency: string;
  source: string;
  incomeDate: string;
  createdAt: string;
}

export interface Budget {
  budgetId: string;
  userId: string;
  name: string;
  totalAmount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  categories: BudgetCategory[];
  createdAt: string;
}

export interface BudgetCategory {
  category: string;
  allocatedAmount: number;
  spentAmount: number;
}

export interface SavingsGoal {
  goalId: string;
  userId: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
}

// Chat Types
export interface ChatMessage {
  messageId: string;
  userId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  citations?: string[];
  searchPerformed?: boolean;
  expenseLogged?: boolean;
  budgetUpdated?: boolean;
  [key: string]: any;
}

// Pet Interaction Types
export interface InteractionLog {
  logId: string;
  userId: string;
  interactionType: 'click' | 'double-click' | 'drag' | 'right-click' | 'hover' | 'chat';
  context: any;
  timestamp: string;
}

export type PetAnimation =
  | 'idle'
  | 'sleep-slouch'
  | 'dead-eye-stare'
  | 'screen-judgment'
  | 'leg-shake'
  | 'bubble-tea-sip'
  | 'coin-counting'
  | 'slow-crawl'
  | 'existential-crisis'
  | 'transparency-fade'
  | 'keyboard-smashing'
  | 'eye-roll'
  | 'shocked'
  | 'confused'
  | 'dizzy';

// API Types
export interface QwenApiRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

export interface QwenApiResponse {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Window Types
export enum WindowType {
  PET = 'pet',
  CHAT = 'chat',
  SETTINGS = 'settings',
  ONBOARDING = 'onboarding',
}

export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}
