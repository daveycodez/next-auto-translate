import { useTranslations, useLocale } from 'next-intl';
import React, { useContext, useEffect, useState } from 'react';
import { AutoTranslateContext } from './AutoTranslateProvider';

const isDev = process.env.NODE_ENV === 'development';


export const AutoTranslate = ({ tKey, children, namespace }) => {
    const { pathname, defaultLocale, locales, debug } = useContext(AutoTranslateContext);
    const locale = useLocale()
    const [initialized, setInitialized] = useState(false)
    const [loading, setLoading] = useState(false)
    const [translated, setTranslated] = useState(false)

    if (!locales && (debug || isDev)) {
        console.error(`
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

    if (debug) {
        console.log("[AutoTranslate] Default Locale: ", defaultLocale)
        console.log("[AutoTranslate] Current Locale: ", locale)
    }

    let usePathname = pathname
    if (!pathname) {
        usePathname = window.location.pathname
    }

    // Get namespace from pathname, which is the first part of the pathname
    let startPath = usePathname.replace("/" + locale, "").split("/")[1]

    if (startPath.length == 0) {
        startPath = "index"
    }

    if (!namespace) {
        namespace = startPath
    }

    // Determine Key Prefix based on the rest of the pathname
    // const keyPrefix = pathname.split("/").slice(2).join(".")

    if (debug) {
        console.log("[AutoTranslate] Namespace: ", namespace)
    }

    const t = useTranslations(namespace)


    /*
    
    // Only automatically run translations in dev mode
    if (isDev) {
        const checkTranslations = () => {
            fetch(`/api/translate/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    namespace,
                    keyPrefix,
                    tKey,
                    text: children
                })
            }).then(response => response.json()).then(data => {
                if (data.run_translate) {
                    runTranslations();
                } else {
                    // console.log("[AutoTranslate] Translations already exist! 😎")
                    setLoading(false)
                }

                setInitialized(true)
            }).catch(err => {
                console.error(err);
                setLoading(false)
            });
        };


        const runTranslations = async () => {
            console.log("[AutoTranslate] Run translations 🚀")
            setLoading(true)

            fetch(`/api/translate/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    namespace,
                    keyPrefix,
                    tKey,
                    text: children
                })
            }).then(response => response.json()).then(data => {
                console.log("[AutoTranslate] Translations Complete! 😎")

                if (locale != defaultLocale) {
                    // window.location.reload()
                } else {
                    setTranslated(true)
                    setLoading(false)
                }
            }).catch(err => {
                console.error(err);
                setLoading(false)
            });

        }

        useEffect(() => {
            if (initialized) {
                setLoading(true)
                checkTranslations()
            }
        }, [children])

        useEffect(() => {
            if (!initialized) {
                checkTranslations()
            }
        }, [])
    }
    */


    return (
        <>
            {(loading || translated) ? children : t(tKey, children)}
            {loading && loadingElement}
        </>
    )
}

const loadingElement = (
    <>
        <style>
            {`
                @keyframes ellipsis {
                    0% { content: ''; }
                    25% { content: '.'; }
                    50% { content: '..'; }
                    75% { content: '...'; }
                    100% { content: '...'; }
                }

                .ellipsis::after {
                    content: '';
                    animation: ellipsis 2.0s infinite;
                }
            `}
        </style>
        <span style={{
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            background: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '10px',
            padding: '10px 0',
            zIndex: 1000,
            fontSize: '14px',
        }}>
            <span className="ellipsis"><i>Translating</i></span>
        </span>
    </>
);
