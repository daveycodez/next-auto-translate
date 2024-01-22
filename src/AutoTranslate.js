import { useTranslations, useLocale } from 'next-intl';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const isDev = process.env.NODE_ENV === 'development';

const defaultLocale = "en"

export const AutoTranslate = ({ tKey, children }) => {
    const router = useRouter()

    const [initialized, setInitialized] = useState(false)
    const [loading, setLoading] = useState(false)
    const [translated, setTranslated] = useState(false)

    // Get User's locale
    const locale = useLocale()

    console.log("[AutoTranslate] Current Locale: ", locale)

    const t = useTranslations('Index');

    console.log(t('title'))


    return null

    // Get namespace from pathname, which is the first part of the pathname
    let namespace = router.pathname.split("/")[1]

    if (namespace.length == 0) {
        namespace = "index"
    }

    // Determine Key Prefix based on the rest of the pathname
    const keyPrefix = router.pathname.split("/").slice(2).join(".")

    console.log("[AutoTranslate] Namespace: ", namespace)

    // const { t } = useTranslation(namespace)

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
                    // router.reload()
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

    return (
        <>
            {(loading || translated) ? children : t(keyPrefix + tKey, children)}
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
