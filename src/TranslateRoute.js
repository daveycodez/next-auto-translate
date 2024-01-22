import fs from "fs"
import path from "path"

// OpenAI API
import { Configuration, OpenAIApi } from 'openai-edge'

const openaiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(openaiConfig)

const basePath = "/public/locales/"
const defaultLocale = "en"
import config from 'next.config'
const locales = config.i18n.locales;


export const TranslateRoute = async (req, res) => {
    const { namespace, keyPrefix, tKey, text } = req.body

    try {
        if (req.query.action == "check") {
            const runTranslate = await needsTranslations(namespace, keyPrefix, tKey, text)

            res.json({ run_translate: runTranslate })
        } else if (req.query.action == "run") {
            await runTranslations(namespace, keyPrefix, tKey, text)
            res.json({ success: true })
        } else {
            res.status(400).json({ error: "Invalid action" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((current, key) => {
        return current ? current[key] : undefined;
    }, obj);
}

async function needsTranslations(namespace, keyPrefix, tKey, text) {
    // Load the default locale JSON file for the namespace
    const defaultLocaleTranslations = await loadJSONFile(namespace);

    // Check if the JSON file for the namespace exists
    if (!defaultLocaleTranslations) {
        console.log('Translations JSON not found:', namespace)
        return true; // Needs translations because namespace file doesn't exist
    }

    // Construct the full translation key
    const fullKey = keyPrefix ? `${keyPrefix}.${tKey}` : tKey;

    // Check if the key exists in the default locale
    const defaultValue = getNestedValue(defaultLocaleTranslations, fullKey);
    if (defaultValue === undefined) {
        console.log('Translations key not found:', fullKey)
        return true; // Needs translations because key is missing in default locale
    }

    if (defaultValue != text) {
        console.log('Translations key has different value:', fullKey)
        return true; // Needs translations because key has different value in default locale
    }

    // Check other locales
    for (const locale of locales) {
        if (locale !== defaultLocale) {
            const translations = await loadJSONFile(namespace, locale);

            if (!translations) {
                console.log('Translations JSON not found:', namespace, locale)
                return true; // Needs translations because namespace file doesn't exist in other locales
            }

            // Check if the key exists and has content in each locale
            const value = getNestedValue(translations, fullKey);
            if (value === undefined || value === '') {
                console.log('Translations key not found or empty:', fullKey, locale)
                return true; // Needs translations because key is missing or empty in other locales
            }
        }
    }

    // If all checks pass, no translations are needed
    return false;
}

// Mock translation function (replace this with your actual translation service)
async function translateText(text, fromLocale, toLocale) {
    // Here, you would call an external translation service API
    // This is just a mock response to demonstrate the structure
    const response = await chatGptTranslate(text, fromLocale, toLocale);

    return response.translation;
}

async function runTranslations(namespace, keyPrefix, tKey, text) {
    // Load the default locale JSON file for the namespace
    const defaultLocaleTranslations = await loadJSONFile(namespace, defaultLocale, true);

    // Construct the full translation key
    const fullKey = keyPrefix ? `${keyPrefix}.${tKey}` : tKey;

    // Set the key to the provided text in the default locale
    setNestedValue(defaultLocaleTranslations, fullKey, text);

    // Save the updated default locale translations back to the JSON file
    await saveJSONFile(namespace, defaultLocale, defaultLocaleTranslations);

    // Iterate over all locales and translate the text
    for (const locale of locales) {
        if (locale !== defaultLocale) {
            // Translate text from defaultLocale to the current locale
            const translatedText = await translateText(text, defaultLocale, locale);

            // Get the locale-specific translations JSON
            const localeTranslations = await loadJSONFile(namespace, locale, true);

            // Set the translated text in the JSON object
            setNestedValue(localeTranslations, fullKey, translatedText);

            // Save the updated translations back to the JSON file
            await saveJSONFile(namespace, locale, localeTranslations);
        }
    }
}

// Helper function to set a nested value in an object based on a key path
function setNestedValue(obj, keyPath, value) {
    const keys = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
            current[key] = {};
        }
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
}

// Helper function to save a JSON object to a file
async function saveJSONFile(namespace, locale, data) {
    const jsonPath = path.join(process.cwd(), basePath, locale, `${namespace}.json`);
    try {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving translations JSON:', jsonPath, error);
        throw error;
    }
}


function loadJSONFile(namespace, locale = defaultLocale, create = false) {
    const jsonPath = path.join(process.cwd(), basePath, locale, `${namespace}.json`);

    try {
        console.debug('Load Translations JSON:', jsonPath);

        // Check if the file exists. If it does, parse and return its content.
        if (fs.existsSync(jsonPath)) {
            return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        } else if (create) {
            // If the file does not exist and create is true, create an empty JSON file.
            const dirPath = path.dirname(jsonPath);

            console.debug("Check if dirPath exists", dirPath)

            if (!fs.existsSync(dirPath)) {
                console.debug('Translations directory not found:', dirPath)
                // Create the directory path if it doesn't exist.
                fs.mkdirSync(dirPath, { recursive: true });
            }
            fs.writeFileSync(jsonPath, '{}', 'utf8');
            return {};
        }

        console.debug('Translations JSON not found:', jsonPath);
        return null;
    } catch (error) {
        console.error('Error loading translations JSON:', jsonPath, error);
        return null;
    }
}


async function chatGptTranslate(text, fromLocale, toLocale) {
    // System message to instruct the model for translation
    const systemMessage = {
        role: 'system',
        content: `
        Translate the user's text from ${fromLocale} to ${toLocale}.
        Only respond with the exact translation of the user's input.
        `
    };

    // User message with the text to be translated
    const userMessage = {
        role: 'user',
        content: text
    };

    // Messages array combining the system and user messages
    const messages = [systemMessage, userMessage];

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages
    });

    const data = (await response.json())

    console.log(JSON.stringify(data))

    // Extracting the translation from the response
    const translatedText = data.choices[0].message.content;

    console.log("Translated text:", translatedText)

    // Returning the translation in the desired JSON format
    return { "translation": translatedText };
}

