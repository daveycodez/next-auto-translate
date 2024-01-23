import React, { createContext } from 'react';

export const AutoTranslateContext = createContext();

export const AutoTranslateProvider = ({ children, pathname, defaultLocale = "en", locales, debug }) => {
    return (
        <AutoTranslateContext.Provider value={{ pathname, defaultLocale, debug, locales }}>
            {children}
        </AutoTranslateContext.Provider>
    );
};