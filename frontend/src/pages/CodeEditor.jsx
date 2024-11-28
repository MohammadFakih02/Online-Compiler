import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import { Editor } from "@monaco-editor/react";
import io from "socket.io-client";

let socket; // Declare the socket outside to avoid reinitialization

const CodeEditor = () => {
  const { code, setCode, language, theme } = useContext(AppContext);
  const [content, setContent] = useState(code); // Initialize with current code

  const filetoken = localStorage.getItem("FileToken");

  // Initialize socket only once
  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: { token: filetoken },
    });

    // Listen for updates from the server
    socket.on("updateContent", (updatedContent) => {
      setContent(updatedContent);
      setCode(updatedContent); // Sync AppContext code
    });

    // Cleanup on component unmount
    return () => {
      socket.off("updateContent");
      socket.disconnect();
    };
  }, [filetoken, setCode]); // Dependencies to ensure proper reinitialization

  // Handle edits from the editor
  const handleEdit = (updatedContent) => {
    setCode(updatedContent); // Update AppContext state
    setContent(updatedContent); // Update local content
    socket.emit("edit", updatedContent); // Notify server of changes
  };

  return (
    <Editor
      value={content} // Use local state to control the editor
      language={language}
      theme={theme}
      onChange={handleEdit} // Directly handle editor changes
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
      }}
      height="50vh"
    />
  );
};

export default CodeEditor;
