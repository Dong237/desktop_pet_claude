import './styles/global.css';

let clickCount = 0;
let clickTimer: NodeJS.Timeout | null = null;
let hoverTimer: NodeJS.Timeout | null = null;

const petContainer = document.getElementById('pet-container')!;
const petImage = document.getElementById('pet-image') as HTMLImageElement;
const contextMenu = document.getElementById('context-menu')!;
const tooltip = document.getElementById('tooltip')!;

// Handle single, double, and triple clicks
petContainer.addEventListener('click', (e) => {
  clickCount++;

  if (clickTimer) clearTimeout(clickTimer);

  clickTimer = setTimeout(async () => {
    if (clickCount === 1) {
      // Single click - show tooltip
      showTooltip('What now? 😐', e.clientX, e.clientY);
      await logInteraction('click');
    } else if (clickCount === 2) {
      // Double click - open chat
      await window.electronAPI.openChatWindow();
      await logInteraction('double-click');
    } else if (clickCount >= 3) {
      // Triple click - shocked
      showTooltip("You're REALLY bored, huh?", e.clientX, e.clientY);
      await logInteraction('click');
    }

    clickCount = 0;
  }, 300);
});

// Handle right click (context menu)
petContainer.addEventListener('contextmenu', async (e) => {
  e.preventDefault();

  // Hide previous menu
  contextMenu.style.display = 'none';

  // Position menu
  const menuWidth = 200;
  const menuHeight = 250;
  let x = e.clientX;
  let y = e.clientY;

  // Adjust position if menu would go off screen
  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth;
  }
  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight;
  }

  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.style.display = 'block';

  await logInteraction('right-click');
});

// Handle context menu clicks
contextMenu.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('context-menu-item')) return;

  const action = target.getAttribute('data-action');
  contextMenu.style.display = 'none';

  switch (action) {
    case 'chat':
      await window.electronAPI.openChatWindow();
      break;
    case 'settings':
      await window.electronAPI.openSettingsWindow();
      break;
    case 'quit':
      await window.electronAPI.quitApp();
      break;
    case 'budget':
    case 'expense':
    case 'goals':
      await window.electronAPI.openChatWindow();
      break;
  }
});

// Handle hover
petContainer.addEventListener('mouseenter', () => {
  hoverTimer = setTimeout(() => {
    showTooltip('...what are you looking at?', petContainer.offsetWidth / 2, 10);
  }, 3000);
});

petContainer.addEventListener('mouseleave', () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
  hideTooltip();
});

// Close context menu when clicking outside
document.addEventListener('click', (e) => {
  if (!contextMenu.contains(e.target as Node)) {
    contextMenu.style.display = 'none';
  }
});

// Helper functions
function showTooltip(text: string, x: number, y: number) {
  tooltip.textContent = text;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y - 30}px`;
  tooltip.style.display = 'block';

  setTimeout(() => {
    hideTooltip();
  }, 2000);
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

async function logInteraction(type: string) {
  try {
    await window.electronAPI.logInteraction({
      interactionType: type as any,
      context: { timestamp: Date.now() },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to log interaction:', error);
  }
}

// Initialize
console.log('Zhang Qiang pet loaded!');
