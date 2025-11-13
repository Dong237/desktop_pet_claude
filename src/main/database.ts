import Database from 'better-sqlite3';
import { app } from 'electron';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type {
  UserProfile,
  AppSettings,
  Expense,
  Income,
  Budget,
  SavingsGoal,
  ChatMessage,
  InteractionLog,
} from '../shared/types';

class DatabaseService {
  private db: Database.Database | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'zhangqiang.db');

    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');

    this.createTables();
    this.ensureDefaultUser();
  }

  private createTables() {
    if (!this.db) return;

    // User profile and settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_profile (
        user_id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        currency TEXT DEFAULT 'CNY',
        created_at TEXT NOT NULL,
        settings_json TEXT NOT NULL
      )
    `);

    // Expenses table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS expenses (
        expense_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'CNY',
        category TEXT NOT NULL,
        description TEXT,
        transaction_date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
      )
    `);

    // Income table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS income (
        income_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'CNY',
        source TEXT NOT NULL,
        income_date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
      )
    `);

    // Budgets table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS budgets (
        budget_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        total_amount REAL NOT NULL,
        period TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        categories_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
      )
    `);

    // Savings goals table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS savings_goals (
        goal_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        goal_name TEXT NOT NULL,
        target_amount REAL NOT NULL,
        current_amount REAL DEFAULT 0,
        deadline TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
      )
    `);

    // Chat history table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS chat_history (
        message_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        metadata_json TEXT,
        FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
      )
    `);

    // Interaction logs table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS interaction_logs (
        log_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        interaction_type TEXT NOT NULL,
        context_json TEXT,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
      )
    `);

    // Create indexes for better performance
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON expenses(user_id, transaction_date);
      CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
      CREATE INDEX IF NOT EXISTS idx_chat_user_timestamp ON chat_history(user_id, timestamp);
    `);
  }

  private ensureDefaultUser() {
    if (!this.db) return;

    const user = this.db.prepare('SELECT * FROM user_profile LIMIT 1').get();

    if (!user) {
      const defaultSettings: AppSettings = {
        petSize: 'medium',
        opacity: 100,
        animationSpeed: 'normal',
        stayOnTop: true,
        taskbarIcon: true,
        theme: 'original',
        interactionLevel: 'balanced',
        humorIntensity: 'sarcastic',
        stayWithinScreen: true,
        idleTimeBeforeSleep: 5,
        aiModel: 'qwen-turbo',
        responseStyle: 'balanced',
        financialFocusAreas: ['budgeting', 'investing', 'saving'],
        allowWebSearch: true,
        cacheSearchResults: true,
        storeConversationsLocallyOnly: true,
        financialNewsAlerts: true,
        billReminders: true,
        budgetWarnings: true,
        savingsMilestones: true,
        dailyReports: true,
        dailyReportTime: '08:00',
        weeklyReviews: true,
        weeklyReviewDay: 'Sunday',
        doNotDisturbStart: '22:00',
        doNotDisturbEnd: '08:00',
        silenceDuringFullscreen: true,
      };

      const userId = uuidv4();
      this.db.prepare(`
        INSERT INTO user_profile (user_id, username, currency, created_at, settings_json)
        VALUES (?, ?, ?, ?, ?)
      `).run(userId, 'User', 'CNY', new Date().toISOString(), JSON.stringify(defaultSettings));
    }
  }

  // User profile methods
  getUserProfile(): UserProfile | null {
    if (!this.db) return null;

    const row: any = this.db.prepare('SELECT * FROM user_profile LIMIT 1').get();
    if (!row) return null;

    return {
      userId: row.user_id,
      username: row.username,
      currency: row.currency,
      createdAt: row.created_at,
      settings: JSON.parse(row.settings_json),
    };
  }

  updateUserProfile(profile: Partial<UserProfile>): boolean {
    if (!this.db) return false;

    const current = this.getUserProfile();
    if (!current) return false;

    const updates: string[] = [];
    const values: any[] = [];

    if (profile.username) {
      updates.push('username = ?');
      values.push(profile.username);
    }
    if (profile.currency) {
      updates.push('currency = ?');
      values.push(profile.currency);
    }
    if (profile.settings) {
      updates.push('settings_json = ?');
      values.push(JSON.stringify(profile.settings));
    }

    if (updates.length === 0) return true;

    values.push(current.userId);
    this.db.prepare(`UPDATE user_profile SET ${updates.join(', ')} WHERE user_id = ?`).run(...values);

    return true;
  }

  // Expense methods
  addExpense(expense: Omit<Expense, 'expenseId' | 'userId' | 'createdAt'>): Expense {
    if (!this.db) throw new Error('Database not initialized');

    const user = this.getUserProfile();
    if (!user) throw new Error('User not found');

    const expenseId = uuidv4();
    const createdAt = new Date().toISOString();

    this.db.prepare(`
      INSERT INTO expenses (expense_id, user_id, amount, currency, category, description, transaction_date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      expenseId,
      user.userId,
      expense.amount,
      expense.currency || user.currency,
      expense.category,
      expense.description || '',
      expense.transactionDate,
      createdAt
    );

    return {
      expenseId,
      userId: user.userId,
      ...expense,
      currency: expense.currency || user.currency,
      description: expense.description || '',
      createdAt,
    };
  }

  getExpenses(startDate?: string, endDate?: string): Expense[] {
    if (!this.db) return [];

    const user = this.getUserProfile();
    if (!user) return [];

    let query = 'SELECT * FROM expenses WHERE user_id = ?';
    const params: any[] = [user.userId];

    if (startDate) {
      query += ' AND transaction_date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      query += ' AND transaction_date <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY transaction_date DESC';

    const rows: any[] = this.db.prepare(query).all(...params);

    return rows.map(row => ({
      expenseId: row.expense_id,
      userId: row.user_id,
      amount: row.amount,
      currency: row.currency,
      category: row.category,
      description: row.description,
      transactionDate: row.transaction_date,
      createdAt: row.created_at,
    }));
  }

  // Income methods
  addIncome(income: Omit<Income, 'incomeId' | 'userId' | 'createdAt'>): Income {
    if (!this.db) throw new Error('Database not initialized');

    const user = this.getUserProfile();
    if (!user) throw new Error('User not found');

    const incomeId = uuidv4();
    const createdAt = new Date().toISOString();

    this.db.prepare(`
      INSERT INTO income (income_id, user_id, amount, currency, source, income_date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      incomeId,
      user.userId,
      income.amount,
      income.currency || user.currency,
      income.source,
      income.incomeDate,
      createdAt
    );

    return {
      incomeId,
      userId: user.userId,
      ...income,
      currency: income.currency || user.currency,
      createdAt,
    };
  }

  // Budget methods
  createBudget(budget: Omit<Budget, 'budgetId' | 'userId' | 'createdAt'>): Budget {
    if (!this.db) throw new Error('Database not initialized');

    const user = this.getUserProfile();
    if (!user) throw new Error('User not found');

    const budgetId = uuidv4();
    const createdAt = new Date().toISOString();

    this.db.prepare(`
      INSERT INTO budgets (budget_id, user_id, name, total_amount, period, start_date, end_date, categories_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      budgetId,
      user.userId,
      budget.name,
      budget.totalAmount,
      budget.period,
      budget.startDate,
      budget.endDate,
      JSON.stringify(budget.categories),
      createdAt
    );

    return {
      budgetId,
      userId: user.userId,
      ...budget,
      createdAt,
    };
  }

  getBudgets(): Budget[] {
    if (!this.db) return [];

    const user = this.getUserProfile();
    if (!user) return [];

    const rows: any[] = this.db.prepare('SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC').all(user.userId);

    return rows.map(row => ({
      budgetId: row.budget_id,
      userId: row.user_id,
      name: row.name,
      totalAmount: row.total_amount,
      period: row.period,
      startDate: row.start_date,
      endDate: row.end_date,
      categories: JSON.parse(row.categories_json),
      createdAt: row.created_at,
    }));
  }

  // Savings goal methods
  createSavingsGoal(goal: Omit<SavingsGoal, 'goalId' | 'userId' | 'createdAt'>): SavingsGoal {
    if (!this.db) throw new Error('Database not initialized');

    const user = this.getUserProfile();
    if (!user) throw new Error('User not found');

    const goalId = uuidv4();
    const createdAt = new Date().toISOString();

    this.db.prepare(`
      INSERT INTO savings_goals (goal_id, user_id, goal_name, target_amount, current_amount, deadline, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(goalId, user.userId, goal.goalName, goal.targetAmount, goal.currentAmount, goal.deadline, createdAt);

    return {
      goalId,
      userId: user.userId,
      ...goal,
      createdAt,
    };
  }

  getSavingsGoals(): SavingsGoal[] {
    if (!this.db) return [];

    const user = this.getUserProfile();
    if (!user) return [];

    const rows: any[] = this.db.prepare('SELECT * FROM savings_goals WHERE user_id = ? ORDER BY deadline ASC').all(user.userId);

    return rows.map(row => ({
      goalId: row.goal_id,
      userId: row.user_id,
      goalName: row.goal_name,
      targetAmount: row.target_amount,
      currentAmount: row.current_amount,
      deadline: row.deadline,
      createdAt: row.created_at,
    }));
  }

  updateSavingsGoal(goalId: string, updates: Partial<Pick<SavingsGoal, 'currentAmount' | 'targetAmount' | 'deadline'>>): boolean {
    if (!this.db) return false;

    const updateFields: string[] = [];
    const values: any[] = [];

    if (updates.currentAmount !== undefined) {
      updateFields.push('current_amount = ?');
      values.push(updates.currentAmount);
    }
    if (updates.targetAmount !== undefined) {
      updateFields.push('target_amount = ?');
      values.push(updates.targetAmount);
    }
    if (updates.deadline !== undefined) {
      updateFields.push('deadline = ?');
      values.push(updates.deadline);
    }

    if (updateFields.length === 0) return true;

    values.push(goalId);
    this.db.prepare(`UPDATE savings_goals SET ${updateFields.join(', ')} WHERE goal_id = ?`).run(...values);

    return true;
  }

  // Chat history methods
  addChatMessage(message: Omit<ChatMessage, 'messageId' | 'userId'>): ChatMessage {
    if (!this.db) throw new Error('Database not initialized');

    const user = this.getUserProfile();
    if (!user) throw new Error('User not found');

    const messageId = uuidv4();

    this.db.prepare(`
      INSERT INTO chat_history (message_id, user_id, role, content, timestamp, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      messageId,
      user.userId,
      message.role,
      message.content,
      message.timestamp,
      message.metadata ? JSON.stringify(message.metadata) : null
    );

    return {
      messageId,
      userId: user.userId,
      ...message,
    };
  }

  getChatHistory(limit: number = 50): ChatMessage[] {
    if (!this.db) return [];

    const user = this.getUserProfile();
    if (!user) return [];

    const rows: any[] = this.db.prepare(
      'SELECT * FROM chat_history WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?'
    ).all(user.userId, limit);

    return rows.reverse().map(row => ({
      messageId: row.message_id,
      userId: row.user_id,
      role: row.role,
      content: row.content,
      timestamp: row.timestamp,
      metadata: row.metadata_json ? JSON.parse(row.metadata_json) : undefined,
    }));
  }

  clearOldChatHistory(daysOld: number = 30): number {
    if (!this.db) return 0;

    const user = this.getUserProfile();
    if (!user) return 0;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = this.db.prepare(
      'DELETE FROM chat_history WHERE user_id = ? AND timestamp < ?'
    ).run(user.userId, cutoffDate.toISOString());

    return result.changes;
  }

  // Interaction logging
  logInteraction(log: Omit<InteractionLog, 'logId' | 'userId'>): void {
    if (!this.db) return;

    const user = this.getUserProfile();
    if (!user) return;

    const logId = uuidv4();

    this.db.prepare(`
      INSERT INTO interaction_logs (log_id, user_id, interaction_type, context_json, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `).run(logId, user.userId, log.interactionType, JSON.stringify(log.context), log.timestamp);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const dbService = new DatabaseService();
