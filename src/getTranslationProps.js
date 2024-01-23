
export const getTranslationProps = async ({ locale, locales, defaultLocale }) => {
    var messages = [];

    try {
        messages = (await import(`messages/${locale}.json`)).default
    } catch (error) {
        console.error(error)
    }

    return {
        locales, defaultLocale, messages
    };
}