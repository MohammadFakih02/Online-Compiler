import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import { Editor } from "@monaco-editor/react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

let socket;

const CodeEditor = () => {
  const { code, setCode, language, theme } = useContext(AppContext);
  const [content, setContent] = useState(code);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isWebSocketEnabled, setWebSocketEnabled] = useState(false);
  const location = useLocation();
  const filetoken = localStorage.getItem("FileToken");

  // Sync content state with code from AppContext
  useEffect(() => {
    setContent(code);
  }, [code]);

  // Handle WebSocket initialization and cleanup
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isInvite = queryParams.get("invite") === "true";

    if (isWebSocketEnabled && (isInvite || filetoken)) {
      socket = io("http://localhost:5000", {
        auth: { token: filetoken },
      });

      socket.on("updateContent", (updatedContent) => {
        setContent(updatedContent);
        setCode(updatedContent);
      });

      setIsSocketConnected(true);
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setIsSocketConnected(false);
      }
    };
  }, [filetoken, location.search, isWebSocketEnabled, setCode]);

  const handleEditorChange = (updatedContent) => {
    setContent(updatedContent);
    setCode(updatedContent);

    if (socket && isSocketConnected) {
      socket.emit("edit", updatedContent);
    }
  };

  const toggleWebSocket = () => {
    if (isWebSocketEnabled) {
      if (socket) {
        socket.disconnect();
        setIsSocketConnected(false);
      }
    }
    setWebSocketEnabled(!isWebSocketEnabled);
  };

  return (
    <div>
      <Editor
        value={content}
        language={language}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
        height="50vh"
      />
      <button onClick={toggleWebSocket}>
        {isWebSocketEnabled ? "Disable Sync" : "Enable Sync"}
      </button>
    </div>
  );
};

export default CodeEditor;
