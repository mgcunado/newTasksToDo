import { Controller, Get, Param } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly i18n: I18nService) {}

  @Get(':lang')
  getTranslations(@Param('lang') lang: string) {
    const translations = this.i18n.getTranslations()

    return {
      status: 'success',
      translations: translations[lang],
    }
  }
}

// to translate a specific word
// @Get(':lang/:wordtotranslate')
// getTranslations(@Param('lang') lang: string, @Param('wordtotranslate') wordtotranslate: string) {
// const translations = this.i18n.translate( wordtotranslate, { lang })
// return translations
// }
