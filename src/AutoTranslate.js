import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AutoTranslateContext } from './AutoTranslateProvider';

const isDev = process.env.NODE_ENV === 'development';

export const useAutoTranslate = ({ tKey, children, namespace } = null) => {
    const { pathname, defaultLocale, locales, debug, addToCheckQueue, messages, locale } = useContext(AutoTranslateContext);

    // If no locales provided, throw getTranslationProps error
    if (!locales && (debug && isDev) && typeof window !== 'undefined') {
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
    if (!globalThis.cache) {
        globalThis.cache = new Set();
    }

    const autoTranslate = (tKey, message, namespace = '') => {
        // Computation or derivation of namespace if not directly provided
        let effectiveNamespace = namespace;
        if (!effectiveNamespace) {
            let usePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
            let startPath = usePathname.replace("/" + locale, "").split("/")[1];
            effectiveNamespace = startPath.length === 0 ? "index" : startPath;
        }

        // Construct a unique cache key
        const cacheKey = `${effectiveNamespace}:${tKey}`;

        // Check whether the translation has been queued before
        if (!globalThis.cache.has(cacheKey)) {
            if (process.env.NODE_ENV === 'development') {
                setTimeout(() => {
                    addToCheckQueue({ tKey, message, namespace: effectiveNamespace });
                })

                globalThis.cache.add(cacheKey);
            }
        }

        // Return the appropriate translation if available
        return messages[effectiveNamespace]?.[tKey] || message;
    }

    return { autoTranslate }
}


export const AutoTranslate = ({ tKey, children, namespace }) => {
    const { pathname, messages, locale, locales, debug, disabled, addToCheckQueue } = useContext(AutoTranslateContext);
    const [initialized, setInitialized] = useState(false)
    const message = children

    if (!namespace) {
        let usePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
        let startPath = usePathname.replace("/" + locale, "").split("/")[1];
        namespace = startPath.length === 0 ? "index" : startPath;
    }

    // Only automatically run translations in dev mode
    useEffect(() => {
        if (isDev && !disabled && initialized) {
            addToCheckQueue({ tKey, message, namespace })
        }
    }, [children, locales])

    useEffect(() => {
        if (isDev && !disabled && !initialized) {
            addToCheckQueue({ tKey, message, namespace })
            setInitialized(true)
        }
    }, [])


    if (!messages[namespace]) {
        return children
    }

    return (
        <>
            {messages[namespace][tKey] || children}
        </>
    )
}