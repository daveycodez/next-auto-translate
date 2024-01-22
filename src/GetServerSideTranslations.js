
/*
export const getServerSideTranslations = async ({ locale }) => {
    if (typeof window === 'undefined') {
        const { serverSideTranslations } = await import("next-i18next/serverSideTranslations");

        if (isDev) {
            const { i18n } = await import("next-i18next");
            await i18n?.reloadResources();
            i18n?.init()
        }

        const translations = await serverSideTranslations(locale)

        return translations
    }
}
*/