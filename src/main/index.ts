import { app, BrowserWindow, ipcMain, screen, Menu, Tray, nativeImage } from 'electron';
import * as path from 'path';
import { dbService } from './database';
import { qwenService } from './qwenApi';
import { keystoreService } from './keystore';

const SERVICE_NAME = 'ZhangQiangPet';
const QWEN_API_KEY_ACCOUNT = 'QwenAPI';

// Disable sandbox when running as root (for development)
if (process.getuid && process.getuid() === 0) {
  app.commandLine.appendSwitch('no-sandbox');
}

let petWindow: BrowserWindow | null = null;
let chatWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

async function loadApiKey() {
  try {
    const apiKey = await keystoreService.getPassword(SERVICE_NAME, QWEN_API_KEY_ACCOUNT);
    if (apiKey) {
      qwenService.setApiKey(apiKey);
    }
  } catch (error) {
    console.error('Failed to load API key:', error);
  }
}

function createPetWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  const userProfile = dbService.getUserProfile();
  const settings = userProfile?.settings;

  // Calculate pet window size based on settings
  let petSize = 180; // default medium
  if (settings?.petSize === 'small') petSize = 120;
  else if (settings?.petSize === 'large') petSize = 240;

  petWindow = new BrowserWindow({
    width: petSize,
    height: petSize,
    frame: false,
    transparent: true,
    alwaysOnTop: settings?.stayOnTop ?? true,
    skipTaskbar: !(settings?.taskbarIcon ?? true),
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    x: screenWidth - petSize - 100,
    y: screenHeight - petSize - 100,
  });

  // Set window opacity
  if (settings?.opacity) {
    petWindow.setOpacity(settings.opacity / 100);
  }

  if (process.env.NODE_ENV === 'development') {
    petWindow.loadURL('http://localhost:5173/pet.html');
    // petWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    petWindow.loadFile(path.join(__dirname, '../renderer/pet.html'));
  }

  // Make window draggable
  petWindow.setIgnoreMouseEvents(false);

  petWindow.on('closed', () => {
    petWindow = null;
  });

  // Log interaction
  petWindow.webContents.on('did-finish-load', () => {
    dbService.logInteraction({
      interactionType: 'click',
      context: { action: 'window-opened' },
      timestamp: new Date().toISOString(),
    });
  });
}

function createChatWindow() {
  if (chatWindow) {
    chatWindow.focus();
    return;
  }

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  chatWindow = new BrowserWindow({
    width: 420,
    height: 600,
    minWidth: 420,
    minHeight: 400,
    frame: true,
    transparent: false,
    alwaysOnTop: true,
    title: 'Zhang Qiang - Financial Waste Advisor',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    x: Math.floor((screenWidth - 420) / 2),
    y: Math.floor((screenHeight - 600) / 2),
  });

  if (process.env.NODE_ENV === 'development') {
    chatWindow.loadURL('http://localhost:5173/chat.html');
    // chatWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    chatWindow.loadFile(path.join(__dirname, '../renderer/chat.html'));
  }

  chatWindow.on('closed', () => {
    chatWindow = null;
  });

  // Log interaction
  dbService.logInteraction({
    interactionType: 'chat',
    context: { action: 'chat-opened' },
    timestamp: new Date().toISOString(),
  });
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  settingsWindow = new BrowserWindow({
    width: 600,
    height: 500,
    resizable: false,
    title: 'Settings - Zhang Qiang',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    x: Math.floor((screenWidth - 600) / 2),
    y: Math.floor((screenHeight - 500) / 2),
  });

  if (process.env.NODE_ENV === 'development') {
    settingsWindow.loadURL('http://localhost:5173/settings.html');
  } else {
    settingsWindow.loadFile(path.join(__dirname, '../renderer/settings.html'));
  }

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

function createTray() {
  // Create a simple tray icon (we'll use a placeholder for now)
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Pet',
      click: () => {
        if (petWindow) petWindow.show();
        else createPetWindow();
      },
    },
    {
      label: 'Open Chat',
      click: () => createChatWindow(),
    },
    { type: 'separator' },
    {
      label: 'Settings',
      click: () => createSettingsWindow(),
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => app.quit(),
    },
  ]);

  tray.setToolTip('Zhang Qiang Desktop Pet');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (petWindow) petWindow.show();
    else createPetWindow();
  });
}

// IPC Handlers
ipcMain.handle('get-user-profile', async () => {
  return dbService.getUserProfile();
});

ipcMain.handle('update-user-profile', async (_, profile) => {
  return dbService.updateUserProfile(profile);
});

ipcMain.handle('add-expense', async (_, expense) => {
  return dbService.addExpense(expense);
});

ipcMain.handle('get-expenses', async (_, startDate, endDate) => {
  return dbService.getExpenses(startDate, endDate);
});

ipcMain.handle('get-budgets', async () => {
  return dbService.getBudgets();
});

ipcMain.handle('create-budget', async (_, budget) => {
  return dbService.createBudget(budget);
});

ipcMain.handle('get-savings-goals', async () => {
  return dbService.getSavingsGoals();
});

ipcMain.handle('create-savings-goal', async (_, goal) => {
  return dbService.createSavingsGoal(goal);
});

ipcMain.handle('update-savings-goal', async (_, goalId, updates) => {
  return dbService.updateSavingsGoal(goalId, updates);
});

ipcMain.handle('get-chat-history', async (_, limit) => {
  return dbService.getChatHistory(limit);
});

ipcMain.handle('add-chat-message', async (_, message) => {
  return dbService.addChatMessage(message);
});

ipcMain.handle('send-chat-message', async (_, userMessage) => {
  try {
    const userProfile = dbService.getUserProfile();
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Save user message
    dbService.addChatMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    // Check if message contains expense information
    const expenseInfo = qwenService.parseExpenseFromMessage(userMessage);
    let metadata: any = {};

    if (expenseInfo && expenseInfo.amount) {
      // Log the expense
      const expense = dbService.addExpense({
        amount: expenseInfo.amount,
        currency: userProfile.currency,
        category: expenseInfo.category,
        description: expenseInfo.description,
        transactionDate: new Date().toISOString().split('T')[0],
      });

      metadata.expenseLogged = true;
      metadata.expense = expense;
    }

    // Get chat history
    const chatHistory = dbService.getChatHistory(20);

    // Get AI response
    const aiResponse = await qwenService.chatWithHistory(
      userMessage,
      chatHistory,
      userProfile.settings.financialFocusAreas,
      userProfile.settings.aiModel
    );

    // Save AI response
    dbService.addChatMessage({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    });

    return {
      response: aiResponse,
      metadata,
    };
  } catch (error: any) {
    console.error('Error processing chat message:', error);
    return {
      response: `Ugh, something went wrong: ${error.message}. Try again?`,
      error: true,
    };
  }
});

ipcMain.handle('log-interaction', async (_, interaction) => {
  dbService.logInteraction(interaction);
});

ipcMain.handle('open-chat-window', async () => {
  createChatWindow();
});

ipcMain.handle('open-settings-window', async () => {
  createSettingsWindow();
});

ipcMain.handle('get-api-key-status', async () => {
  try {
    const apiKey = await keystoreService.getPassword(SERVICE_NAME, QWEN_API_KEY_ACCOUNT);
    return { hasApiKey: !!apiKey };
  } catch (error) {
    return { hasApiKey: false };
  }
});

ipcMain.handle('save-api-key', async (_, apiKey: string) => {
  try {
    await keystoreService.setPassword(SERVICE_NAME, QWEN_API_KEY_ACCOUNT, apiKey);
    qwenService.setApiKey(apiKey);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-api-key', async () => {
  try {
    await keystoreService.deletePassword(SERVICE_NAME, QWEN_API_KEY_ACCOUNT);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('quit-app', () => {
  app.quit();
});

// App lifecycle
app.whenReady().then(async () => {
  await loadApiKey();
  createPetWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createPetWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Don't quit on macOS when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  dbService.close();
});

// Handle second instance
app.on('second-instance', () => {
  if (petWindow) {
    if (petWindow.isMinimized()) petWindow.restore();
    petWindow.focus();
  }
});
