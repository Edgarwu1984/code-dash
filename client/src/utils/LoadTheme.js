import { useEffect } from 'react';

export default function LoadTheme() {
  // DARK MODE HANDLER
  const root = document.documentElement.classList;
  const defaultTheme = localStorage.getItem('theme');

  useEffect(() => {
    if (!defaultTheme) {
      localStorage.setItem('theme', 'light');
      window.location.reload();
    } else if (defaultTheme === 'light') {
      root.add('light');
      root.remove('dark');
    } else if (defaultTheme === 'dark') {
      root.add('dark');
      root.remove('light');
    }
  }, [root, defaultTheme]);
}
