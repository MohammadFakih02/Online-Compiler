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
  const location = useLocation();
  const filetoken = localStorage.getItem("FileToken");

  // Sync content state with code from AppContext
  useEffect(() => {
    setContent(code);
  }, [code]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isInvite = queryParams.get("invite") === "true";

    if (isInvite || filetoken) {
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
  }, [filetoken, location.search, setCode]);

  const handleEditorChange = (updatedContent) => {
    setContent(updatedContent);
    setCode(updatedContent);

    if (socket && isSocketConnected) {
      socket.emit("edit", updatedContent);
    }
  };

  const handleDisconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setIsSocketConnected(false);
    }
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
      {isSocketConnected && (
        <button onClick={handleDisconnectSocket}>
          Disconnect WebSocket
        </button>
      )}
    </div>
  );
};

export default CodeEditor;
