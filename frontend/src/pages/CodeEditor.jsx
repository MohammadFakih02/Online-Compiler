import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import { Editor } from "@monaco-editor/react";


const CodeEditor = () => {
    const { code, setCode, language, theme } = useContext(AppContext);

    const handleEditorChange = (newCode) => {
        setCode(newCode);
    };

    return (
        <Editor
            defaultCode={code}
            language={language}
            theme={theme}
            value={code}
            onChange={handleEditorChange}
            options={{
                selectOnLineNumbers: true,
                automaticLayout: true,
            }}
            height={"50vh"}
        />
    );
};

export default CodeEditor;
