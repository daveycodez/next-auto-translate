import React, { createContext, useState, useEffect } from 'react';

export const AutoTranslateContext = createContext();

const isDev = process.env.NODE_ENV === 'development';

export const AutoTranslateProvider = ({ children, pathname, defaultLocale = "en", gptModel = 'gpt-3.5-turbo', locales, locale, debug, messages, disabled }) => {
    const [checkQueue, setCheckQueue] = useState([]);
    const [translationQueue, setTranslationQueue] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const addToTranslationQueue = (translationTask) => {
        // Remove existing item with the same tKey from the queue
        if (debug && isDev) console.log("[AutoTranslate] Adding to Translation queue:", translationTask.tKey);

        // Set the new queue with the existing item removed and the new item added
        setTranslationQueue(prevQueue => [...prevQueue.filter((t) => t.tKey !== translationTask.tKey), translationTask]);
    };

    const addToCheckQueue = (checkTask) => {
        // Remove existing item with the same tKey from the queue
        if (debug && isDev) console.log("[AutoTranslate] Adding to Check queue:", checkTask.tKey);

        // Set the new queue with the existing item removed and the new item added
        setCheckQueue(prevQueue => [...prevQueue.filter((t) => t.tKey !== checkTask.tKey), checkTask]);
    };

    const processQueue = async () => {
        if (isProcessing || translationQueue.length === 0) return;

        if (debug && isDev) {
            console.log("[AutoTranslate] GPT Model: ", gptModel)
            console.log("[AutoTranslate] Default Locale: ", defaultLocale)
            console.log("[AutoTranslate] Current Locale: ", locale)
        }

        console.log("[AutoTranslate] Start translation for: ", translationQueue[0].tKey)

        setIsProcessing(true);
        const currentTask = translationQueue[0];

        try {
            await runTranslations(currentTask);
            const filteredQueue = translationQueue.filter((t) => t.tKey !== currentTask.tKey && t.message !== currentTask.message);

            setTranslationQueue(filteredQueue);
        } catch (error) {
            console.error('Translation Error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const processCheckQueue = async () => {
        if (isChecking || checkQueue.length === 0) return;

        setIsChecking(true);
        const currentTask = checkQueue[0];

        try {
            await checkTranslations(currentTask);
            const filteredQueue = checkQueue.filter((t) => t.tKey !== currentTask.tKey && t.message !== currentTask.message);

            setCheckQueue(filteredQueue);
        } catch (error) {
            console.error('Checking Error:', error);
        } finally {
            setIsChecking(false);
        }
    };


    useEffect(() => {
        processQueue();
    }, [translationQueue, isProcessing]);

    useEffect(() => {
        processCheckQueue();
    }, [checkQueue, isChecking]);

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


    const checkTranslations = async ({ tKey, message, namespace }) => {
        if (isDev && debug) {
            console.log("[AutoTranslate] Namespace: ", namespace);
        }

        try {
            const response = await fetch(`/api/translate/checkTranslation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    namespace,
                    tKey,
                    message,
                    locales,
                    defaultLocale, debug
                })
            });
            const data = await response.json();
            if (data.run_translate) {
                addToTranslationQueue({ namespace, tKey, message });
            } else {
                if (isDev && debug) {
                    console.log(`[AutoTranslate] ${namespace}.${tKey} Translations already exist! 😎`);
                }
            }
        } catch (err) {
            console.log("[AutoTranslate] Error checking translations: ", err);
            console.error(err);
        }
    };

    return (
        <AutoTranslateContext.Provider value={{ pathname, defaultLocale, debug, locales, addToTranslationQueue, addToCheckQueue, debug, messages, disabled }}>
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
