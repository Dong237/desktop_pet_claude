import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { useAppStore } from './store';
import type { AppSettings } from '../shared/types';

type SettingsTab = 'appearance' | 'ai' | 'notifications';

const SettingsWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const { userProfile, loadUserProfile, updateUserProfile, hasApiKey, checkApiKeyStatus } = useAppStore();

  useEffect(() => {
    loadUserProfile();
    checkApiKeyStatus();
  }, []);

  const settings = userProfile?.settings;

  const handleSettingChange = async (key: keyof AppSettings, value: any) => {
    if (!userProfile) return;

    const updatedSettings = {
      ...userProfile.settings,
      [key]: value,
    };

    await updateUserProfile({
      settings: updatedSettings,
    });

    showSaveMessage('Settings saved!');
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      showSaveMessage('Please enter an API key', true);
      return;
    }

    const result = await window.electronAPI.saveApiKey(apiKey.trim());
    if (result.success) {
      setApiKey('');
      await checkApiKeyStatus();
      showSaveMessage('API key saved successfully!');
    } else {
      showSaveMessage(`Failed to save API key: ${result.error}`, true);
    }
  };

  const handleDeleteApiKey = async () => {
    if (!confirm('Are you sure you want to delete your API key?')) return;

    const result = await window.electronAPI.deleteApiKey();
    if (result.success) {
      await checkApiKeyStatus();
      showSaveMessage('API key deleted');
    } else {
      showSaveMessage(`Failed to delete API key: ${result.error}`, true);
    }
  };

  const showSaveMessage = (message: string, isError = false) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!userProfile || !settings) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#252525] border-b border-white/10 px-6 py-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-400">Configure Zhang Qiang to your preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#252525] px-6">
        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'appearance'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'ai'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          AI Assistant
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'notifications'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-8">
            {/* Pet Appearance */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-6">
              <h3 className="text-base font-semibold mb-4">Pet Appearance</h3>

              {/* Pet Size */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">Pet Size</label>
                <div className="flex gap-3">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSettingChange('petSize', size)}
                      className={`flex-1 px-4 py-3 rounded-lg capitalize transition-all font-medium ${
                        settings.petSize === size
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Opacity: {settings.opacity}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={settings.opacity}
                  onChange={(e) => handleSettingChange('opacity', parseInt(e.target.value))}
                  className="w-full accent-orange-500 h-2 rounded-lg"
                />
              </div>

              {/* Animation Speed */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">Animation Speed</label>
                <div className="flex gap-3">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSettingChange('animationSpeed', speed)}
                      className={`flex-1 px-4 py-3 rounded-lg capitalize transition-all font-medium ${
                        settings.animationSpeed === speed
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Theme */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold mb-3">Chat Window Theme</h3>
              <p className="text-xs text-gray-400 mb-4">Choose a modern theme for your chat interface</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'glass', label: 'Glass', emoji: '✨', desc: 'Frosted glass effect' },
                  { value: 'magic', label: 'Magic', emoji: '🌟', desc: 'Cosmic gradients' },
                  { value: 'gradient', label: 'Gradient', emoji: '🌈', desc: 'Vibrant colors' },
                  { value: 'minimal', label: 'Minimal', emoji: '⚪', desc: 'Clean & simple' },
                  { value: 'apple', label: 'Apple', emoji: '🍎', desc: 'iMessage style' },
                  { value: 'whatsapp', label: 'WhatsApp', emoji: '💬', desc: 'Modern chat' },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleSettingChange('chatTheme', theme.value)}
                    className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                      settings.chatTheme === theme.value
                        ? 'bg-gradient-to-br from-orange-500/30 to-pink-500/30 border-2 border-orange-500/50 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-2">{theme.emoji}</div>
                    <div className="font-medium text-sm">{theme.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{theme.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Window Behavior */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold mb-4">Window Behavior</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.stayOnTop}
                    onChange={(e) => handleSettingChange('stayOnTop', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Stay on top of other windows</span>
                    <p className="text-xs text-gray-400 mt-0.5">Pet will always be visible</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.taskbarIcon}
                    onChange={(e) => handleSettingChange('taskbarIcon', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Show in taskbar</span>
                    <p className="text-xs text-gray-400 mt-0.5">Display app icon in taskbar</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.stayWithinScreen}
                    onChange={(e) => handleSettingChange('stayWithinScreen', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Keep within screen boundaries</span>
                    <p className="text-xs text-gray-400 mt-0.5">Prevent pet from moving off screen</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-8">
            {/* API Key Section */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold mb-2">Qwen API Key</h3>
              <p className="text-xs text-gray-400 mb-4">
                Required for AI chat functionality. Get your key from{' '}
                <a
                  href="https://dashscope.aliyun.com"
                  target="_blank"
                  className="text-orange-500 hover:underline"
                >
                  Alibaba Cloud DashScope
                </a>
              </p>

              {hasApiKey ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-400">✓ API key is configured</span>
                  <button
                    onClick={handleDeleteApiKey}
                    className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors"
                    >
                      {showApiKey ? '🙈' : '👁️'}
                    </button>
                  </div>
                  <button
                    onClick={handleSaveApiKey}
                    className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded font-medium transition-colors"
                  >
                    Save API Key
                  </button>
                </div>
              )}
            </div>

            {/* AI Model Selection */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <label className="block text-base font-semibold mb-4">AI Model</label>
              <div className="space-y-3">
                {[
                  { value: 'qwen-turbo', label: 'Qwen-Turbo', emoji: '⚡', desc: 'Fast, general queries (Free tier)' },
                  { value: 'qwen-plus', label: 'Qwen-Plus', emoji: '🧠', desc: 'Better reasoning (Premium)' },
                  { value: 'qwen-max', label: 'Qwen-Max', emoji: '🚀', desc: 'Highest intelligence (Premium)' },
                ].map((model) => (
                  <button
                    key={model.value}
                    onClick={() => handleSettingChange('aiModel', model.value)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      settings.aiModel === model.value
                        ? 'bg-orange-500/20 border-2 border-orange-500/50 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{model.emoji}</span>
                      <div>
                        <div className="font-medium text-sm">{model.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{model.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Response Style */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <label className="block text-base font-semibold mb-4">Response Style</label>
              <div className="flex gap-3">
                {(['concise', 'balanced', 'detailed'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => handleSettingChange('responseStyle', style)}
                    className={`flex-1 px-4 py-3 rounded-lg capitalize transition-all font-medium ${
                      settings.responseStyle === style
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold mb-4">Permissions</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.allowWebSearch}
                    onChange={(e) => handleSettingChange('allowWebSearch', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Allow web search for real-time data</span>
                    <p className="text-xs text-gray-400 mt-0.5">Enable AI to search the web for current information</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.storeConversationsLocallyOnly}
                    onChange={(e) => handleSettingChange('storeConversationsLocallyOnly', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Store conversations locally only</span>
                    <p className="text-xs text-gray-400 mt-0.5">Keep all chat history on your device</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-8">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.financialNewsAlerts}
                    onChange={(e) => handleSettingChange('financialNewsAlerts', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Financial news alerts</span>
                    <p className="text-xs text-gray-400 mt-0.5">Get notified about important market updates</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.billReminders}
                    onChange={(e) => handleSettingChange('billReminders', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Bill reminders</span>
                    <p className="text-xs text-gray-400 mt-0.5">Never miss a payment deadline</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.budgetWarnings}
                    onChange={(e) => handleSettingChange('budgetWarnings', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Budget warnings</span>
                    <p className="text-xs text-gray-400 mt-0.5">Alert when approaching budget limits</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.savingsMilestones}
                    onChange={(e) => handleSettingChange('savingsMilestones', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Savings milestones</span>
                    <p className="text-xs text-gray-400 mt-0.5">Celebrate your savings achievements</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.dailyReports}
                    onChange={(e) => handleSettingChange('dailyReports', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Daily reports</span>
                    <p className="text-xs text-gray-400 mt-0.5">Daily summary of your finances</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.weeklyReviews}
                    onChange={(e) => handleSettingChange('weeklyReviews', e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <div>
                    <span className="text-sm font-medium">Weekly reviews</span>
                    <p className="text-xs text-gray-400 mt-0.5">Weekly overview of spending habits</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Do Not Disturb */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold mb-3">Do Not Disturb</h3>
              <p className="text-xs text-gray-400 mb-4">Set quiet hours to avoid notifications</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-2 font-medium">From</label>
                  <input
                    type="time"
                    value={settings.doNotDisturbStart}
                    onChange={(e) => handleSettingChange('doNotDisturbStart', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-2 font-medium">To</label>
                  <input
                    type="time"
                    value={settings.doNotDisturbEnd}
                    onChange={(e) => handleSettingChange('doNotDisturbEnd', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with save message */}
      {saveMessage && (
        <div className="px-6 py-3 bg-[#252525] border-t border-white/10">
          <div
            className={`text-sm ${
              saveMessage.includes('Failed') || saveMessage.includes('error')
                ? 'text-red-400'
                : 'text-green-400'
            }`}
          >
            {saveMessage}
          </div>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<SettingsWindow />);
