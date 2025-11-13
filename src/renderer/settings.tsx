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
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            {/* Pet Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Pet Size</label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSettingChange('petSize', size)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      settings.petSize === size
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Opacity: {settings.opacity}%
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={settings.opacity}
                onChange={(e) => handleSettingChange('opacity', parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Animation Speed */}
            <div>
              <label className="block text-sm font-medium mb-2">Animation Speed</label>
              <div className="flex gap-2">
                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSettingChange('animationSpeed', speed)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      settings.animationSpeed === speed
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.stayOnTop}
                  onChange={(e) => handleSettingChange('stayOnTop', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Stay on top of other windows</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.taskbarIcon}
                  onChange={(e) => handleSettingChange('taskbarIcon', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Show in taskbar</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.stayWithinScreen}
                  onChange={(e) => handleSettingChange('stayWithinScreen', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Keep within screen boundaries</span>
              </label>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            {/* API Key Section */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-sm font-semibold mb-2">Qwen API Key</h3>
              <p className="text-xs text-gray-400 mb-3">
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
            <div>
              <label className="block text-sm font-medium mb-2">AI Model</label>
              <div className="space-y-2">
                {[
                  { value: 'qwen-turbo', label: 'Qwen-Turbo', desc: 'Fast, general queries (Free tier)' },
                  { value: 'qwen-plus', label: 'Qwen-Plus', desc: 'Better reasoning (Premium)' },
                  { value: 'qwen-max', label: 'Qwen-Max', desc: 'Highest intelligence (Premium)' },
                ].map((model) => (
                  <button
                    key={model.value}
                    onClick={() => handleSettingChange('aiModel', model.value)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      settings.aiModel === model.value
                        ? 'bg-orange-500/20 border border-orange-500/30'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="font-medium text-sm">{model.label}</div>
                    <div className="text-xs text-gray-400">{model.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Response Style */}
            <div>
              <label className="block text-sm font-medium mb-2">Response Style</label>
              <div className="flex gap-2">
                {(['concise', 'balanced', 'detailed'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => handleSettingChange('responseStyle', style)}
                    className={`flex-1 px-3 py-2 rounded-lg capitalize transition-colors ${
                      settings.responseStyle === style
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowWebSearch}
                  onChange={(e) => handleSettingChange('allowWebSearch', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Allow web search for real-time data</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.storeConversationsLocallyOnly}
                  onChange={(e) => handleSettingChange('storeConversationsLocallyOnly', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Store conversations locally only</span>
              </label>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.financialNewsAlerts}
                  onChange={(e) => handleSettingChange('financialNewsAlerts', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Financial news alerts</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.billReminders}
                  onChange={(e) => handleSettingChange('billReminders', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Bill reminders</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.budgetWarnings}
                  onChange={(e) => handleSettingChange('budgetWarnings', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Budget warnings</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.savingsMilestones}
                  onChange={(e) => handleSettingChange('savingsMilestones', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Savings milestones</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dailyReports}
                  onChange={(e) => handleSettingChange('dailyReports', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Daily reports</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.weeklyReviews}
                  onChange={(e) => handleSettingChange('weeklyReviews', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Weekly reviews</span>
              </label>
            </div>

            {/* Do Not Disturb */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-sm font-semibold mb-3">Do Not Disturb</h3>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">From</label>
                  <input
                    type="time"
                    value={settings.doNotDisturbStart}
                    onChange={(e) => handleSettingChange('doNotDisturbStart', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">To</label>
                  <input
                    type="time"
                    value={settings.doNotDisturbEnd}
                    onChange={(e) => handleSettingChange('doNotDisturbEnd', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
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
