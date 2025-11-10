import { useSettingsStore } from '@/store/settingsStore';
import { es } from '@/locales/es';
import { en } from '@/locales/en';

export function useTranslation() {
  const { language } = useSettingsStore();
  
  const translations = language === 'es' ? es : en;
  
  return { t: translations, language };
}
