import React, { createContext, useState, useEffect } from 'react';

export const AutoTranslateContext = createContext();

const isDev = process.env.NODE_ENV === 'development';

export const AutoTranslateProvider = ({ children, pathname, defaultLocale = "en", gptModel = 'gpt-3.5-turbo', locales, locale, debug, messages }) => {
    const [translationQueue, setTranslationQueue] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const addToQueue = (translationTask) => {
        // See if this is already in queue
        if (translationQueue.find((t) => t.tKey === translationTask.tKey)) return;

        if (debug && isDev) console.log("[AutoTranslate] Adding to queue:", translationTask.tKey)

        setTranslationQueue((prevQueue) => [...prevQueue, translationTask]);
    };

    const processQueue = async () => {
        if (isProcessing || translationQueue.length === 0) return;

        console.log("[AutoTranslate] Start translation for: ", translationQueue[0].tKey)

        setIsProcessing(true);
        const currentTask = translationQueue[0];

        try {
            await runTranslations(currentTask);
            setTranslationQueue((prevQueue) => prevQueue.slice(1));
        } catch (error) {
            console.error('Translation Error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (debug && isDev) {
            console.log("[AutoTranslate] GPT Model: ", gptModel)
            console.log("[AutoTranslate] Default Locale: ", defaultLocale)
            console.log("[AutoTranslate] Current Locale: ", locale)
        }

        processQueue();
    }, [translationQueue, isProcessing]);

    const runTranslations = async ({ namespace, tKey, message }) => {
        // Perform the translation using the provided namespace, tKey, and message.
        // Fetch the translation from the API and handle the response.
        const response = await fetch(`/api/translate/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                namespace,
                tKey,
                message,
                locales,
                defaultLocale,
                gptModel,
                debug
            })
        });

        const data = await response.json();
        if (data.success) {
            // Handle successful translation here, e.g., trigger a re-render or update the state.
        } else {
            throw new Error(data.error || 'Translation failed');
        }
    };

    return (
        <AutoTranslateContext.Provider value={{ pathname, defaultLocale, debug, locales, addToQueue, debug, messages }}>
            {children}
            {isProcessing && translatingElement}
        </AutoTranslateContext.Provider>
    );
};


const translatingElement = (
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
            background: 'rgba(255, 255, 255, 0.75)',
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
