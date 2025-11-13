import { create } from 'zustand';
import type {
  UserProfile,
  ChatMessage,
  Expense,
  Budget,
  SavingsGoal,
  PetAnimation,
} from '../shared/types';

interface AppState {
  // User State
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;

  // Pet State
  currentAnimation: PetAnimation;
  setCurrentAnimation: (animation: PetAnimation) => void;
  petPosition: { x: number; y: number };
  setPetPosition: (position: { x: number; y: number }) => void;

  // Chat State
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;

  // Financial State
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;

  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;

  savingsGoals: SavingsGoal[];
  setSavingsGoals: (goals: SavingsGoal[]) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  hasApiKey: boolean;
  setHasApiKey: (hasKey: boolean) => void;

  // Actions
  loadUserProfile: () => Promise<void>;
  loadChatHistory: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  loadExpenses: (startDate?: string, endDate?: string) => Promise<void>;
  loadBudgets: () => Promise<void>;
  loadSavingsGoals: () => Promise<void>;
  checkApiKeyStatus: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  userProfile: null,
  currentAnimation: 'idle',
  petPosition: { x: 0, y: 0 },
  chatMessages: [],
  isTyping: false,
  expenses: [],
  budgets: [],
  savingsGoals: [],
  isLoading: false,
  error: null,
  hasApiKey: false,

  // Setters
  setUserProfile: (profile) => set({ userProfile: profile }),
  setCurrentAnimation: (animation) => set({ currentAnimation: animation }),
  setPetPosition: (position) => set({ petPosition: position }),
  setChatMessages: (messages) => set({ chatMessages: messages }),
  addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) => set((state) => ({ expenses: [expense, ...state.expenses] })),
  setBudgets: (budgets) => set({ budgets }),
  setSavingsGoals: (goals) => set({ savingsGoals: goals }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setHasApiKey: (hasKey) => set({ hasApiKey: hasKey }),

  // Actions
  updateUserProfile: async (updates) => {
    const currentProfile = get().userProfile;
    if (!currentProfile) return;

    const updatedProfile = { ...currentProfile, ...updates };
    const success = await window.electronAPI.updateUserProfile(updatedProfile);

    if (success) {
      set({ userProfile: updatedProfile });
    }
  },

  loadUserProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const profile = await window.electronAPI.getUserProfile();
      set({ userProfile: profile, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadChatHistory: async () => {
    try {
      const messages = await window.electronAPI.getChatHistory(50);
      set({ chatMessages: messages });
    } catch (error: any) {
      console.error('Failed to load chat history:', error);
    }
  },

  sendMessage: async (message) => {
    const userProfile = get().userProfile;
    if (!userProfile) {
      set({ error: 'User profile not loaded' });
      return;
    }

    // Add user message immediately
    const userMessage: ChatMessage = {
      messageId: Date.now().toString(),
      userId: userProfile.userId,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    get().addChatMessage(userMessage);
    set({ isTyping: true, error: null });

    try {
      const result = await window.electronAPI.sendChatMessage(message);

      // Add assistant response
      const assistantMessage: ChatMessage = {
        messageId: (Date.now() + 1).toString(),
        userId: userProfile.userId,
        role: 'assistant',
        content: result.response,
        timestamp: new Date().toISOString(),
        metadata: result.metadata,
      };

      get().addChatMessage(assistantMessage);

      // If expense was logged, reload expenses
      if (result.metadata?.expenseLogged) {
        get().loadExpenses();
      }
    } catch (error: any) {
      set({ error: error.message });
      const errorMessage: ChatMessage = {
        messageId: (Date.now() + 1).toString(),
        userId: userProfile.userId,
        role: 'assistant',
        content: `Ugh, something broke: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
      get().addChatMessage(errorMessage);
    } finally {
      set({ isTyping: false });
    }
  },

  loadExpenses: async (startDate, endDate) => {
    try {
      const expenses = await window.electronAPI.getExpenses(startDate, endDate);
      set({ expenses });
    } catch (error: any) {
      console.error('Failed to load expenses:', error);
    }
  },

  loadBudgets: async () => {
    try {
      const budgets = await window.electronAPI.getBudgets();
      set({ budgets });
    } catch (error: any) {
      console.error('Failed to load budgets:', error);
    }
  },

  loadSavingsGoals: async () => {
    try {
      const goals = await window.electronAPI.getSavingsGoals();
      set({ savingsGoals: goals });
    } catch (error: any) {
      console.error('Failed to load savings goals:', error);
    }
  },

  checkApiKeyStatus: async () => {
    try {
      const result = await window.electronAPI.getApiKeyStatus();
      set({ hasApiKey: result.hasApiKey });
    } catch (error: any) {
      console.error('Failed to check API key status:', error);
    }
  },
}));
