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
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-xl">⚙️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Settings</h1>
            <p className="text-sm text-gray-500">Configure your financial assistant</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/60 backdrop-blur-md px-6 py-3 border-b border-gray-200/50">
        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'appearance'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          🎨 Appearance
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'ai'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          🤖 AI Assistant
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'notifications'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          🔔 Notifications
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Pet Appearance */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🦊 Pet Appearance
                </h3>
              </div>
              <div className="p-6 space-y-5">
                {/* Pet Size */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Pet Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSettingChange('petSize', size)}
                        className={`px-4 py-3 rounded-xl capitalize transition-all font-semibold text-sm ${
                          settings.petSize === size
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opacity */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700">Opacity</label>
                    <span className="text-sm font-bold text-blue-600">{settings.opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={settings.opacity}
                    onChange={(e) => handleSettingChange('opacity', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Animation Speed */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Animation Speed</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['slow', 'normal', 'fast'] as const).map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSettingChange('animationSpeed', speed)}
                        className={`px-4 py-3 rounded-xl capitalize transition-all font-semibold text-sm ${
                          settings.animationSpeed === speed
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Theme */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  💬 Chat Window Theme
                </h3>
                <p className="text-xs text-gray-500 mt-1">Choose a modern theme for your chat interface</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'glass', label: 'Glass', emoji: '✨', desc: 'Frosted glass' },
                    { value: 'magic', label: 'Magic', emoji: '🌟', desc: 'Cosmic gradient' },
                    { value: 'gradient', label: 'Gradient', emoji: '🌈', desc: 'Vibrant colors' },
                    { value: 'minimal', label: 'Minimal', emoji: '⚪', desc: 'Clean & simple' },
                    { value: 'apple', label: 'Apple', emoji: '🍎', desc: 'iMessage style' },
                    { value: 'whatsapp', label: 'WhatsApp', emoji: '💬', desc: 'Modern chat' },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleSettingChange('chatTheme', theme.value)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        settings.chatTheme === theme.value
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-500 shadow-md'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{theme.emoji}</div>
                      <div className="font-semibold text-sm text-gray-800">{theme.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{theme.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Window Behavior */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🪟 Window Behavior
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.stayOnTop}
                    onChange={(e) => handleSettingChange('stayOnTop', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">Stay on top</span>
                    <p className="text-xs text-gray-500 mt-0.5">Pet will always be visible above other windows</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.taskbarIcon}
                    onChange={(e) => handleSettingChange('taskbarIcon', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">Show in taskbar</span>
                    <p className="text-xs text-gray-500 mt-0.5">Display app icon in your taskbar</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.stayWithinScreen}
                    onChange={(e) => handleSettingChange('stayWithinScreen', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">Keep within screen</span>
                    <p className="text-xs text-gray-500 mt-0.5">Prevent pet from moving off screen boundaries</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* API Key Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🔑 API Configuration
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Required for AI chat. Get your key from{' '}
                  <a
                    href="https://dashscope.aliyun.com"
                    target="_blank"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Alibaba Cloud DashScope
                  </a>
                </p>
              </div>

              <div className="p-6">
                {hasApiKey ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-sm font-semibold text-green-800">API key configured</span>
                    </div>
                    <button
                      onClick={handleDeleteApiKey}
                      className="px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-semibold"
                    >
                      Delete Key
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                      >
                        {showApiKey ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <button
                      onClick={handleSaveApiKey}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-semibold transition-all text-white shadow-md hover:shadow-lg"
                    >
                      Save API Key
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AI Model Selection */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🤖 AI Model
                </h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { value: 'qwen-turbo', label: 'Qwen-Turbo', emoji: '⚡', desc: 'Fast, general queries (Free tier)' },
                  { value: 'qwen-plus', label: 'Qwen-Plus', emoji: '🧠', desc: 'Better reasoning (Premium)' },
                  { value: 'qwen-max', label: 'Qwen-Max', emoji: '🚀', desc: 'Highest intelligence (Premium)' },
                ].map((model) => (
                  <button
                    key={model.value}
                    onClick={() => handleSettingChange('aiModel', model.value)}
                    className={`w-full text-left p-4 rounded-xl transition-all border ${
                      settings.aiModel === model.value
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 border-2 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{model.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">{model.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{model.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Response Style */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  💬 Response Style
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2">
                  {(['concise', 'balanced', 'detailed'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => handleSettingChange('responseStyle', style)}
                      className={`px-4 py-3 rounded-xl capitalize transition-all font-semibold text-sm ${
                        settings.responseStyle === style
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🔒 Privacy & Permissions
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.allowWebSearch}
                    onChange={(e) => handleSettingChange('allowWebSearch', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">Web search</span>
                    <p className="text-xs text-gray-500 mt-0.5">Enable AI to search web for real-time information</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.storeConversationsLocallyOnly}
                    onChange={(e) => handleSettingChange('storeConversationsLocallyOnly', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">Local storage only</span>
                    <p className="text-xs text-gray-500 mt-0.5">Keep all chat history on your device</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  📬 Alert Preferences
                </h3>
                <p className="text-xs text-gray-500 mt-1">Choose what notifications you want to receive</p>
              </div>
              <div className="p-6 space-y-3">
                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.financialNewsAlerts}
                    onChange={(e) => handleSettingChange('financialNewsAlerts', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">📰 Financial news</span>
                    <p className="text-xs text-gray-500 mt-0.5">Important market updates and news</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.billReminders}
                    onChange={(e) => handleSettingChange('billReminders', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">📅 Bill reminders</span>
                    <p className="text-xs text-gray-500 mt-0.5">Never miss a payment deadline</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.budgetWarnings}
                    onChange={(e) => handleSettingChange('budgetWarnings', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">⚠️ Budget warnings</span>
                    <p className="text-xs text-gray-500 mt-0.5">Alert when approaching budget limits</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.savingsMilestones}
                    onChange={(e) => handleSettingChange('savingsMilestones', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">🎯 Savings milestones</span>
                    <p className="text-xs text-gray-500 mt-0.5">Celebrate your savings achievements</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.dailyReports}
                    onChange={(e) => handleSettingChange('dailyReports', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">📊 Daily reports</span>
                    <p className="text-xs text-gray-500 mt-0.5">Daily summary of your finances</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.weeklyReviews}
                    onChange={(e) => handleSettingChange('weeklyReviews', e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-blue-500 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800 block">📈 Weekly reviews</span>
                    <p className="text-xs text-gray-500 mt-0.5">Weekly overview of spending habits</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Do Not Disturb */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🌙 Do Not Disturb
                </h3>
                <p className="text-xs text-gray-500 mt-1">Set quiet hours to avoid notifications</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Start time</label>
                    <input
                      type="time"
                      value={settings.doNotDisturbStart}
                      onChange={(e) => handleSettingChange('doNotDisturbStart', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">End time</label>
                    <input
                      type="time"
                      value={settings.doNotDisturbEnd}
                      onChange={(e) => handleSettingChange('doNotDisturbEnd', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with save message */}
      {saveMessage && (
        <div className="px-6 py-4 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-sm">
          <div
            className={`text-sm font-medium flex items-center gap-2 ${
              saveMessage.includes('Failed') || saveMessage.includes('error')
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            <span>{saveMessage.includes('Failed') || saveMessage.includes('error') ? '❌' : '✅'}</span>
            {saveMessage}
          </div>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<SettingsWindow />);
