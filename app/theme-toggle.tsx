'use client';

import { useLayoutEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const storageKey = 'portfolio-theme';

export default function ThemeToggle() {
  useLayoutEffect(() => {
    let preference: string | null = null;
    try { preference = localStorage.getItem(storageKey); } catch {}
    const apply = () => {
      document.documentElement.dataset.theme =
        preference === 'dark' || preference === 'light'
          ? preference
          : 'dark';
    };
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) {
        preference = event.newValue;
        apply();
      }
    };
    apply();
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('storage', sync);
    };
  }, []);

  function toggle() {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch {}
  }

  return (
    <button className="theme-toggle" onClick={toggle} type="button">
      <span className="theme-to-dark"><Moon size={17} aria-hidden="true"/><span className="sr-only">Switch to dark mode</span></span>
      <span className="theme-to-light"><Sun size={17} aria-hidden="true"/><span className="sr-only">Switch to light mode</span></span>
    </button>
  );
}
