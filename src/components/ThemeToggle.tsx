'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useSettingsStore } from '@/store/settingsStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useSettingsStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {theme === 'light' ? (
        <FaMoon className="text-gray-700 dark:text-gray-300" size={18} />
      ) : (
        <FaSun className="text-yellow-500" size={18} />
      )}
    </button>
  );
}
