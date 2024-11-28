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
    const { token, logged_in, user_id, name } = useAuth();

    // Handle Language Change and Default Code
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

    // Handle Theme Change
    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    // Execute the code by making an API call to execute it on the server
    const executeCode = async () => {
        console.log("Executing code:", code);  // Log the code to check the value
        try {
            const response = await fetch("http://127.0.0.1:8000/api/execute-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ language, code }),
            });
    
            const data = await response.json();
            console.log(data); // Log the response to see what the backend returns
            if (data.success) {
                setOutput(data.output);  // Display the result of code execution
            } else {
                setOutput(`Error: ${data.error}`);  // Handle error case
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
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
                executeCode,
                token,
                logged_in,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
