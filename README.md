# Zhang Qiang Desktop Pet - AI Financial Assistant

A desktop pet companion that combines entertainment with practical financial assistance, powered by Qwen AI.

![Zhang Qiang](./assets/zhangqiang.png)

## Features

### 🦊 Interactive Desktop Pet
- Frameless, transparent window that stays on your desktop
- Multiple animations and interactions
- Double-click to open chat
- Right-click for quick actions
- Draggable anywhere on screen

### 💬 AI-Powered Financial Chat
- Natural language financial advice powered by Qwen AI
- Expense tracking through conversation
- Budget planning and analysis
- Savings goal management
- Deadpan humor with genuine financial guidance

### 💰 Financial Features
- **Expense Tracking**: Log expenses by simply chatting ("I spent 50 yuan on lunch")
- **Budget Management**: Create and track budgets
- **Savings Goals**: Set and monitor savings targets
- **Spending Analysis**: Get insights on your spending patterns
- **Financial Reports**: Weekly and monthly summaries

### ⚙️ Customizable Settings
- Pet appearance (size, opacity, animation speed)
- AI model selection (Qwen-Turbo, Plus, Max)
- Notification preferences
- Privacy controls (local-only storage)

## Tech Stack

- **Framework**: Electron + Vite
- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Database**: SQLite (better-sqlite3)
- **AI**: Qwen API (Alibaba Cloud DashScope)
- **Security**: keytar for secure API key storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Qwen API key from [Alibaba Cloud DashScope](https://dashscope.aliyun.com)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd desktop_pet_claude
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm run dist
```

## Configuration

### API Key Setup

1. Launch the application
2. Open Settings (right-click pet → Settings)
3. Go to "AI Assistant" tab
4. Enter your Qwen API key
5. Save

The API key is securely stored in your system's keychain/credential manager.

## Usage

### Basic Interactions

- **Single Click**: Show a tooltip with Zhang Qiang's sarcastic comment
- **Double Click**: Open the chat interface
- **Right Click**: Show context menu with quick actions
- **Drag**: Move the pet around your desktop

### Chat Examples

```
"Help me budget"
"I spent 45 yuan on lunch"
"Show me my spending this month"
"Should I invest in stocks?"
"What's Bitcoin at?"
"How much should I save for emergencies?"
```

### Quick Actions

- **💰 Budget**: Check your current budget status
- **📈 Market**: Get market updates (when implemented)
- **💸 Log Expense**: Quick expense logging

## Project Structure

```
desktop_pet_claude/
├── src/
│   ├── main/              # Electron main process
│   │   ├── index.ts       # App entry point
│   │   ├── database.ts    # SQLite database service
│   │   └── qwenApi.ts     # Qwen API integration
│   ├── preload/           # Preload scripts (IPC bridge)
│   │   └── index.ts
│   ├── renderer/          # React frontend
│   │   ├── pet.html       # Pet window
│   │   ├── pet.tsx
│   │   ├── chat.html      # Chat window
│   │   ├── chat.tsx
│   │   ├── settings.html  # Settings window
│   │   ├── settings.tsx
│   │   ├── store.ts       # Zustand state management
│   │   └── styles/
│   │       └── global.css # TailwindCSS styles
│   └── shared/            # Shared types and utilities
│       └── types/
│           └── index.ts
├── assets/                # Images and resources
│   └── zhangqiang.png
├── prd.md                 # Product Requirements Document
└── package.json

```

## Database Schema

The app uses SQLite to store all data locally:

- `user_profile`: User settings and preferences
- `expenses`: Expense transactions
- `income`: Income records
- `budgets`: Budget configurations
- `savings_goals`: Savings targets
- `chat_history`: AI conversation history
- `interaction_logs`: Pet interaction analytics

All data is stored locally by default for privacy.

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview built app
- `npm run pack`: Package app (without installer)
- `npm run dist`: Create distributable installer

### Development Tips

- Hot reload is enabled for renderer process
- Main process requires restart when changed
- Use DevTools: Comment out `.webContents.openDevTools()` lines in `src/main/index.ts`

## Privacy & Security

- **Local-First**: All data stored locally by default
- **Secure API Key Storage**: Uses OS keychain/credential manager
- **No Tracking**: Zero telemetry without explicit consent
- **Encrypted Sync**: Optional cloud sync uses AES-256 encryption (coming soon)

## Personality

Zhang Qiang is characterized by:
- **Tone**: Sarcastic yet supportive, never condescending
- **Humor**: Self-deprecating, relatable office worker jokes
- **Honesty**: "I don't know" when uncertain, no BS financial advice
- **Empathy**: Acknowledges financial stress is real

Example quotes:
- "I can barely save for my own fish snacks..."
- "Join the club. We have jackets... which I also can't afford."
- "Morning. You have work. I'm sorry."

## Troubleshooting

### Pet window won't appear
- Check system tray - the app may be minimized
- Try `Ctrl+R` to reload
- Check if another instance is running

### Chat not responding
- Verify API key is set in Settings
- Check internet connection
- Ensure you haven't hit API rate limits

### High CPU usage
- Reduce animation speed in Settings
- Lower pet opacity
- Close unnecessary windows

## Roadmap

See [prd.md](./prd.md) for the complete product roadmap.

**MVP (Current):**
- ✅ Desktop pet with basic interactions
- ✅ AI chat interface
- ✅ Expense tracking
- ✅ Budget management
- ✅ Settings panel

**Version 1.0 (Future):**
- Web search integration for real-time data
- Market data display (stocks, crypto)
- Advanced spending analytics
- Multiple budgets and goals
- Premium features

**Version 2.0 (Future):**
- Mobile companion app
- Receipt OCR
- Investment tracking
- Social features
- Automation and smart reminders

## Contributing

This is a personal project, but suggestions and bug reports are welcome!

## License

MIT License - see LICENSE file for details

## Credits

- Character Design: Zhang Qiang (张强) the burnt-out office worker fox
- AI: Powered by Qwen API (Alibaba Cloud)
- Framework: Built with Electron, React, and TypeScript

## Disclaimer

**FINANCIAL DISCLAIMER**

Zhang Qiang Desktop Pet provides general financial education and information only. It is NOT a substitute for professional financial advice.

- We are not licensed financial advisors, CPAs, or attorneys
- Information provided may not be suitable for your specific situation
- Investment decisions are your responsibility
- Past performance does not guarantee future results
- Cryptocurrency and stock investments carry risk of loss

Always consult a qualified professional before making significant financial decisions.

---

**Made with ☕ and 😐 by the Zhang Qiang Team**

*"To make financial literacy accessible, entertaining, and stress-free for the next generation—one deadpan fox at a time."*
