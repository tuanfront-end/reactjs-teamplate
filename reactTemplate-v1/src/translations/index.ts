import i18next from 'i18next';
import en from './en';
import vi from './vi';

export type I18n = typeof i18next & {
  t(key: keyof typeof en, options?: any): string;
};

i18next.init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const i18n: I18n = i18next;

export default i18n;
