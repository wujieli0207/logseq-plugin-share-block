import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from './en/translation.json'
import translationZhCN from './zh-CN/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  'zh-CN': {
    translation: translationZhCN,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // 默认语言
  fallbackLng: 'en', // 如果找不到语言，使用默认语言
  interpolation: {
    escapeValue: false, // 不转义HTML
  },
})

export default i18n
