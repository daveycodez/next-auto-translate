export const getTranslationProps = async ({ locale, locales, defaultLocale }) => {
    return {
        locales, defaultLocale,
        messages: (await import(`messages/${locale}.json`)).default
    };
}