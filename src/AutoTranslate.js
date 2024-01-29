import { useContext, useEffect } from 'react';
import { AutoTranslateContext } from './AutoTranslateProvider';

const isDev = process.env.NODE_ENV === 'development';

export const useAutoTranslate = (namespace) => {
    const { pathname, defaultLocale, locales, addToCheckQueue, messages, locale, disabled } = useContext(AutoTranslateContext);

    // If no locales provided, throw getTranslationProps error
    if ((!locales || !defaultLocale) && isDev && typeof window !== 'undefined') {
        console.error(`[AutoTranslate]
Missing required props in AutoTranslateProvider: locales & defaultLocale
        
-- You must export 'getTranslationProps' to use AutoTranslate on this Page --

Example:

import { getTranslationProps } from 'next-auto-translate/server'

export async function getStaticProps(context) {
    return {
        props: {
            ...await getTranslationProps(context)
        }
    };
}
`)
    }

    // Utilizing a closure to hold our cache
    if (isDev && !disabled) {
        if (!globalThis.cache) {
            globalThis.cache = {}
        }
    }

    /**
     * Automatically translate a given key
     * @param {string} tKey - The translation key
     * @param {string} message - The message to translate
     * @param {string?} tNamespace - The namespace to use for translation
     */
    const autoTranslate = (tKey, message, tNamespace) => {
        // Computation or derivation of namespace if not directly provided
        let effectiveNamespace = tNamespace || namespace;
        if (!effectiveNamespace) {
            let usePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
            let startPath = usePathname.replace("/" + locale, "").split("/")[1];
            effectiveNamespace = startPath.length === 0 ? "index" : startPath;
        }

        if (isDev && !disabled) {
            // Construct a unique cache key
            const cacheKey = `${effectiveNamespace}:${tKey}`;

            if (globalThis.cache[cacheKey] != message) {
                setTimeout(() => {
                    addToCheckQueue({ tKey, message, namespace: effectiveNamespace });
                })

                globalThis.cache[cacheKey] = message
            }
        }

        // Return the appropriate translation if available
        return messages[effectiveNamespace]?.[tKey] || message;
    }

    return { autoTranslate }
}


export const AutoTranslate = ({ tKey, children, namespace }) => {
    const { pathname, messages, locale, locales, disabled, addToCheckQueue } = useContext(AutoTranslateContext);
    const message = children

    if (!namespace) {
        let usePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
        let startPath = usePathname.replace("/" + locale, "").split("/")[1];
        namespace = startPath.length === 0 ? "index" : startPath;
    }

    // Utilizing a closure to hold our cache
    if (isDev && !disabled) {
        if (!globalThis.cache) {
            globalThis.cache = {};
        }
    }

    // Only automatically run translations in dev mode
    useEffect(() => {
        if (isDev && !disabled) {
            const cacheKey = `${namespace}:${tKey}`;

            if (globalThis.cache[cacheKey] != message) {
                addToCheckQueue({ tKey, message, namespace })
                globalThis.cache[cacheKey] = message
            }
        }
    }, [children, messages, locales])


    return messages[namespace]?.[tKey] || children
}