import { contextBridge, ipcRenderer } from 'electron';
import type {
  UserProfile,
  Expense,
  Budget,
  SavingsGoal,
  ChatMessage,
  InteractionLog,
} from '../shared/types';

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // User Profile
  getUserProfile: (): Promise<UserProfile | null> =>
    ipcRenderer.invoke('get-user-profile'),

  updateUserProfile: (profile: Partial<UserProfile>): Promise<boolean> =>
    ipcRenderer.invoke('update-user-profile', profile),

  // Expenses
  addExpense: (expense: Omit<Expense, 'expenseId' | 'userId' | 'createdAt'>): Promise<Expense> =>
    ipcRenderer.invoke('add-expense', expense),

  getExpenses: (startDate?: string, endDate?: string): Promise<Expense[]> =>
    ipcRenderer.invoke('get-expenses', startDate, endDate),

  // Budgets
  getBudgets: (): Promise<Budget[]> =>
    ipcRenderer.invoke('get-budgets'),

  createBudget: (budget: Omit<Budget, 'budgetId' | 'userId' | 'createdAt'>): Promise<Budget> =>
    ipcRenderer.invoke('create-budget', budget),

  // Savings Goals
  getSavingsGoals: (): Promise<SavingsGoal[]> =>
    ipcRenderer.invoke('get-savings-goals'),

  createSavingsGoal: (goal: Omit<SavingsGoal, 'goalId' | 'userId' | 'createdAt'>): Promise<SavingsGoal> =>
    ipcRenderer.invoke('create-savings-goal', goal),

  updateSavingsGoal: (
    goalId: string,
    updates: Partial<Pick<SavingsGoal, 'currentAmount' | 'targetAmount' | 'deadline'>>
  ): Promise<boolean> =>
    ipcRenderer.invoke('update-savings-goal', goalId, updates),

  // Chat
  getChatHistory: (limit?: number): Promise<ChatMessage[]> =>
    ipcRenderer.invoke('get-chat-history', limit),

  addChatMessage: (message: Omit<ChatMessage, 'messageId' | 'userId'>): Promise<ChatMessage> =>
    ipcRenderer.invoke('add-chat-message', message),

  sendChatMessage: (message: string): Promise<{
    response: string;
    metadata?: any;
    error?: boolean;
  }> =>
    ipcRenderer.invoke('send-chat-message', message),

  // Interactions
  logInteraction: (log: Omit<InteractionLog, 'logId' | 'userId'>): Promise<void> =>
    ipcRenderer.invoke('log-interaction', log),

  // Windows
  openChatWindow: (): Promise<void> =>
    ipcRenderer.invoke('open-chat-window'),

  openSettingsWindow: (): Promise<void> =>
    ipcRenderer.invoke('open-settings-window'),

  // API Key Management
  getApiKeyStatus: (): Promise<{ hasApiKey: boolean }> =>
    ipcRenderer.invoke('get-api-key-status'),

  saveApiKey: (apiKey: string): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('save-api-key', apiKey),

  deleteApiKey: (): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('delete-api-key'),

  // App Control
  quitApp: (): Promise<void> =>
    ipcRenderer.invoke('quit-app'),
});

// Type definitions for TypeScript
declare global {
  interface Window {
    electronAPI: {
      getUserProfile: () => Promise<UserProfile | null>;
      updateUserProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
      addExpense: (expense: Omit<Expense, 'expenseId' | 'userId' | 'createdAt'>) => Promise<Expense>;
      getExpenses: (startDate?: string, endDate?: string) => Promise<Expense[]>;
      getBudgets: () => Promise<Budget[]>;
      createBudget: (budget: Omit<Budget, 'budgetId' | 'userId' | 'createdAt'>) => Promise<Budget>;
      getSavingsGoals: () => Promise<SavingsGoal[]>;
      createSavingsGoal: (goal: Omit<SavingsGoal, 'goalId' | 'userId' | 'createdAt'>) => Promise<SavingsGoal>;
      updateSavingsGoal: (
        goalId: string,
        updates: Partial<Pick<SavingsGoal, 'currentAmount' | 'targetAmount' | 'deadline'>>
      ) => Promise<boolean>;
      getChatHistory: (limit?: number) => Promise<ChatMessage[]>;
      addChatMessage: (message: Omit<ChatMessage, 'messageId' | 'userId'>) => Promise<ChatMessage>;
      sendChatMessage: (message: string) => Promise<{
        response: string;
        metadata?: any;
        error?: boolean;
      }>;
      logInteraction: (log: Omit<InteractionLog, 'logId' | 'userId'>) => Promise<void>;
      openChatWindow: () => Promise<void>;
      openSettingsWindow: () => Promise<void>;
      getApiKeyStatus: () => Promise<{ hasApiKey: boolean }>;
      saveApiKey: (apiKey: string) => Promise<{ success: boolean; error?: string }>;
      deleteApiKey: () => Promise<{ success: boolean; error?: string }>;
      quitApp: () => Promise<void>;
    };
  }
}
