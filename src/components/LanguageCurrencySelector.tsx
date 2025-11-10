'use client';

import { FaGlobe, FaDollarSign } from 'react-icons/fa';
import { useSettingsStore } from '@/store/settingsStore';
import type { Language, Currency } from '@/types';

export default function LanguageCurrencySelector() {
  const { language, currency, setLanguage, setCurrency } = useSettingsStore();

  const languages: { code: Language; name: string }[] = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
  ];

  const currencies: { code: Currency; symbol: string }[] = [
    { code: 'COP', symbol: '$' },
    { code: 'USD', symbol: '$' },
  ];

  return (
    <div className="flex items-center gap-3">
      {/* Selector de idioma */}
      <div className="relative">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
          <FaGlobe className="text-gray-600 dark:text-gray-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-sm outline-none cursor-pointer dark:text-white"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selector de moneda */}
      <div className="relative">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
          <FaDollarSign className="text-gray-600 dark:text-gray-400" />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-transparent text-sm outline-none cursor-pointer dark:text-white"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
