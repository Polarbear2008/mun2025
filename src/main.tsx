
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root without any badge injection
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Prevent any external badges from being injected
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      const addedNodes = Array.from(mutation.addedNodes);
      for (const node of addedNodes) {
        if (node instanceof HTMLElement) {
          // Remove any injected badges or brand elements
          if (node.getAttribute('data-lovable-badge') || 
              node.classList.contains('lovable-badge') ||
              node.id === 'lovable-badge' ||
              (node.tagName === 'DIV' && node.style.position === 'fixed' && node.style.bottom === '0')) {
            node.remove();
          }
        }
      }
    }
  }
});

// Start observing the document body for DOM changes
observer.observe(document.body, { childList: true, subtree: true });

createRoot(rootElement).render(<App />);
