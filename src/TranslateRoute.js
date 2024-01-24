import fs from "fs"
import path from "path"
import axios from "axios"

const messagesPath = "/messages"
const isDev = process.env.NODE_ENV === 'development';


export const TranslateRoute = async (req, res) => {
    const { namespace, tKey, message, locales, defaultLocale, gptModel = 'gpt-3.5-turbo', debug = false } = req.body

    if (!isDev) {
        res.status(403).json({ error: "Forbidden" })
        return
    }

    if (!namespace || !tKey || !message || !locales || !defaultLocale) {
        res.status(400).json({ error: "Missing required parameter(s)" })
        return
    }

    try {
        if (req.query.action == "check") {
            const runTranslate = await needsTranslations(namespace, tKey, message, locales, defaultLocale, debug)


            res.json({ run_translate: runTranslate })

            // In background, load /messages folder contents and delete all unused locale json files
            // Asynchronously ->
            // 1. List all files in /messages folder
            // 2. Loop through all files, and check if the locale is in locales
            // 3. If not, delete the file

            const files = fs.readdir(path.join(process.cwd(), messagesPath), (err, files) => {
                if (err) return;

                for (const file of files) {
                    const locale = file.split(".")[0]
                    if (!locales.includes(locale)) {
                        console.log("[TranslateRoute] Deleting unused locale file:", file)
                        fs.unlink(path.join(process.cwd(), messagesPath, file), (err) => { });
                    }
                }
            })

        } else if (req.query.action == "run") {
            await runTranslations(namespace, tKey, message, locales, defaultLocale, gptModel)
            await runAllTranslations(locales, defaultLocale, gptModel)
            res.json({ success: true })
        } else {
            res.status(400).json({ error: "Invalid action" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}


async function needsTranslations(namespace, tKey, message, locales, defaultLocale, debug) {
    const defaultLocaleTranslations = await loadTranslations(defaultLocale);

    if (isDev && debug) {
        console.log("[TranslateRoute] Checking translations for:", namespace, tKey, message, locales, defaultLocale)
    }

    // Check if namespace exists
    if (!defaultLocaleTranslations[namespace]) {
        if (isDev && debug) {
            console.log(`[TranslateRoute] Namespace not found for ${defaultLocale}:`, namespace)
        }

        return true;
    }

    // Check if default message is changed or not found
    const defaultMessage = defaultLocaleTranslations[namespace][tKey];
    if (!defaultMessage || defaultMessage != message) {
        if (isDev && debug) {
            console.log(`[TranslateRoute] Message not found for ${defaultLocale}, Namespace: ${namespace}, Key: ${tKey}`)
        }
        return true;
    }

    // Check if any locale is missing the translation
    for (const locale of locales) {
        if (locale != defaultLocale) {
            const translations = await loadTranslations(locale);
            if (!translations[namespace] || !translations[namespace][tKey]) {
                if (isDev && debug) {
                    console.log(`[TranslateRoute] Translation not found for ${locale}, Namespace: ${namespace}, Key: ${tKey}`)
                }

                return true;
            }
        }
    }

    // Everything is already translated
    return false;
}


async function runAllTranslations(locales, defaultLocale, gptModel) {
    // Loop through all namespaces and tKeys in defaultTranslations, and call runTranslations on it
    const defaultTranslations = await loadTranslations(defaultLocale);

    for (const namespace in defaultTranslations) {
        for (const tKey in defaultTranslations[namespace]) {
            const message = defaultTranslations[namespace][tKey];

            await runTranslations(namespace, tKey, message, locales, defaultLocale, gptModel);
        }
    }
}

async function runTranslations(namespace, tKey, message, locales, defaultLocale, gptModel, debug) {
    const defaultTranslations = await loadTranslations(defaultLocale);

    let messageChanged = false
    if (!defaultTranslations[namespace] || defaultTranslations[namespace][tKey] != message) {
        messageChanged = true
    }

    // Set the default message & delete the message from all other locales
    for (const locale of locales) {
        const translations = await loadTranslations(locale);

        if (!translations[namespace]) {
            if (isDev && debug) {
                console.log(`[TranslateRoute] Creating namespace ${namespace} for ${locale}:`)
            }

            translations[namespace] = {};
        }

        if (locale == defaultLocale) {
            if (isDev && debug) {
                console.log(`[TranslateRoute] Setting default message for ${locale}: ${namespace}.${tKey}:`, message)
            }

            translations[namespace][tKey] = message;
        } else {
            if (isDev && debug) {
                console.log(`[TranslateRoute] Deleting translation for ${locale}: ${namespace}.${tKey}`)
            }

            if (messageChanged) {
                delete translations[namespace][tKey];
            }
        }

        await saveTranslations(locale, translations);
    }

    // Translate the message to all other locales
    for (const locale of locales) {
        if (locale == defaultLocale) {
            continue;
        }

        const translations = await loadTranslations(locale);

        // If this locale already has a translation, skip it
        if (translations[namespace] && translations[namespace][tKey]) continue

        const translation = await translateMessage(message, defaultLocale, locale, gptModel);

        const newTranslations = await loadTranslations(locale);

        if (isDev) {
            console.log(`[TranslateRoute] Setting translation for ${locale}: ${namespace}.${tKey}:`, translation)
        }

        newTranslations[namespace][tKey] = translation;

        await saveTranslations(locale, newTranslations);

    }
}



async function loadTranslations(locale) {
    try {
        const jsonPath = path.join(process.cwd(), messagesPath, `${locale}.json`);

        if (fs.existsSync(jsonPath)) {
            return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        } else {
            if (isDev) {
                console.log("[TranslateRoute] File not found:", jsonPath)
            }
        }

        return {};
    } catch (error) {
        console.error("[TranslateRoute] Error loading translations:", error)
        return {}
    }
}


async function saveTranslations(locale, translations) {
    const jsonPath = path.join(process.cwd(), messagesPath, `${locale}.json`);

    fs.writeFileSync(jsonPath, JSON.stringify(translations, null, 2), 'utf8');
}


async function translateMessage(message, fromLocale, toLocale, model) {
    // Translate via Chat GPT API
    const response = await gptTranslate(message, model, fromLocale, toLocale);

    return response.translation;
}


async function gptTranslate(message, model, fromLocale, toLocale) {
    // System message to instruct the model for translation
    const systemMessage = {
        role: 'system',
        content: `Translate the user's text from ${fromLocale} to ${toLocale}. Only respond with the exact translation of the user's input.`
    };

    // User message with the text to translate
    const userMessage = {
        role: 'user',
        content: message
    };

    // Combining system and user messages
    const messages = [systemMessage, userMessage];

    try {
        // Axios POST request to OpenAI API
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: model,
            messages: messages
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        // Logging for development environment
        if (isDev) {
            console.log("[TranslateRoute] GPT Response with Axios:\n", JSON.stringify(response.data, null, 2));
        }

        // Extracting the translation from the response
        const translatedText = response.data.choices[0].message.content;

        // Returning the translation
        return { "translation": translatedText };
    } catch (error) {
        console.error("Error in Axios request:", error);
        throw error;
    }
}