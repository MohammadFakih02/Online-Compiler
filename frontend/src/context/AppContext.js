import React, { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";

// Create Context
export const AppContext = createContext();

// Provide Context to the entire app
export default function AppProvider({ children }) {
    const [code, setCode] = useState("// Write your code here...");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const { token, logged_in, user_id, name } = useAuth()

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);

        // Set default starting code for different languages
        switch (newLanguage) {
            case 'javascript':
                setCode("console.log('Hello, JavaScript!');");
                break;
            case 'python':
                setCode("print('Hello, Python!')");
                break;
            case 'csharp':
                setCode("Console.WriteLine(\"Hello, C#!\");");
                break;
            default:
                setCode("// Write your code here...");
        }
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <AppContext.Provider
            value={{
                code,
                setCode,
                output,
                setOutput,
                language,
                theme,
                handleLanguageChange,
                handleThemeChange,
                token,
                logged_in
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
