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
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const filetoken = localStorage.getItem("FileToken");

  useEffect(() => {
    setContent(code);
  }, [code]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isInvite = queryParams.get("invite") === "true";

    if (isWebSocketEnabled && (isInvite || filetoken)) {
      if (!socket || !socket.connected) {
        socket = io("http://localhost:5000", {
          auth: { token: filetoken },
        });

        socket.on("updateContent", (updatedContent) => {
          setContent(updatedContent);
          setCode(updatedContent);
        });

        setIsSocketConnected(true);
      }
    } else {
      if (socket) {
        socket.disconnect();
        socket = null;
        setIsSocketConnected(false);
      }
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
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
    if (isWebSocketEnabled && socket) {
      socket.disconnect();
      socket = null;
      setIsSocketConnected(false);
    }
    setWebSocketEnabled(!isWebSocketEnabled);
  };

  const handleAnalyzeCode = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/api/submit-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code_line: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        const feedback = data.feedback || "No feedback available.";

        const feedbackComment =
          language === "javascript" || language === "typescript"
            ? `// ${feedback}`
            : language === "python"
            ? `# ${feedback}`
            : `/* ${feedback} */`;

        const updatedContent = `${content}\n\n${feedbackComment}`;
        setContent(updatedContent);
        setCode(updatedContent);
      })
      .catch((error) => {
        console.error("Error:", error);

        const errorComment =
          language === "javascript" || language === "typescript"
            ? "// An error occurred while analyzing the code."
            : language === "python"
            ? "# An error occurred while analyzing the code."
            : "/* An error occurred while analyzing the code. */";

        const updatedContent = `${content}\n\n${errorComment}`;
        setContent(updatedContent);
        setCode(updatedContent);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <button onClick={handleAnalyzeCode} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze Code"}
      </button>
    </div>
  );
};

export default CodeEditor;
