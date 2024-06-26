declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

import { createI18n, type I18nOptions } from 'vue-i18n';
import en from './locales/en.json';
import uk from './locales/uk.json';
import es from './locales/es.json';
import ru from './locales/ru.json';
import fr from './locales/fr.json';
import hr from './locales/hr.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import tr from './locales/tr.json';
import pl from './locales/pl.json';
import de from './locales/de.json';

// Use the English translations as the base for typing
type MessageSchema = typeof en;

const options: I18nOptions = {
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    en,
    uk,
    es,
    ru,
    fr,
    hr,
    it,
    pt,
    tr,
    pl,
    de,
  },
};

const i18n = createI18n<MessageSchema>(options);

export default i18n;

/* 
    Оптимальный порядок перевода (секциями) в чат-гпт
    
    1) menu - contact
    2) aboutPage - contactPage
    3) faqPage - predictionsPage
    4) summaryPage - footerMenu
    5) pageTitle - matchTablePage
    6) premiumPage - onboardingPage
*/
