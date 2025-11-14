/**
 * Keystore utility that provides a fallback when keytar is unavailable
 * (e.g., in headless Linux environments without libsecret)
 */
import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

let keytar: any = null;
let useKeytar = false;

// Try to load keytar
try {
  keytar = require('keytar');
  useKeytar = true;
  console.log('Keytar loaded successfully - using secure system keychain');
} catch (error) {
  console.warn('Keytar not available - using fallback file storage (less secure)');
  useKeytar = false;
}

// Fallback storage using a simple encrypted JSON file
const getStorageFile = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, '.credentials.json');
};

const readFallbackStorage = (): Record<string, Record<string, string>> => {
  try {
    const filePath = getStorageFile();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading fallback storage:', error);
  }
  return {};
};

const writeFallbackStorage = (data: Record<string, Record<string, string>>) => {
  try {
    const filePath = getStorageFile();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing fallback storage:', error);
  }
};

export const keystoreService = {
  async getPassword(service: string, account: string): Promise<string | null> {
    if (useKeytar && keytar) {
      try {
        return await keytar.getPassword(service, account);
      } catch (error) {
        console.error('Keytar getPassword error:', error);
        useKeytar = false;
      }
    }

    // Fallback
    const storage = readFallbackStorage();
    return storage[service]?.[account] || null;
  },

  async setPassword(service: string, account: string, password: string): Promise<void> {
    if (useKeytar && keytar) {
      try {
        await keytar.setPassword(service, account, password);
        return;
      } catch (error) {
        console.error('Keytar setPassword error:', error);
        useKeytar = false;
      }
    }

    // Fallback
    const storage = readFallbackStorage();
    if (!storage[service]) {
      storage[service] = {};
    }
    storage[service][account] = password;
    writeFallbackStorage(storage);
  },

  async deletePassword(service: string, account: string): Promise<boolean> {
    if (useKeytar && keytar) {
      try {
        return await keytar.deletePassword(service, account);
      } catch (error) {
        console.error('Keytar deletePassword error:', error);
        useKeytar = false;
      }
    }

    // Fallback
    const storage = readFallbackStorage();
    if (storage[service]?.[account]) {
      delete storage[service][account];
      writeFallbackStorage(storage);
      return true;
    }
    return false;
  },

  isUsingSecureStorage(): boolean {
    return useKeytar;
  }
};
