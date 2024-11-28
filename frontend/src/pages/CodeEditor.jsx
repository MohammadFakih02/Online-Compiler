import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import { Editor } from "@monaco-editor/react";
import io from "socket.io-client";
import { useLocation } from 'react-router-dom'; // Use react-router-dom to handle URL queries

let socket; // Declare the socket outside to avoid reinitialization

const CodeEditor = () => {
  const { code, setCode, output, language, theme, executeCode } = useContext(AppContext);
  const [content, setContent] = useState(code); // Initialize with current code
  const [isLoading, setIsLoading] = useState(false); // Loading state for API
  const [isSocketConnected, setIsSocketConnected] = useState(false); // Track socket connection status
  const [isInvitedUser, setIsInvitedUser] = useState(false); // Track if the user is invited

  const location = useLocation(); // Access the current URL
  const filetoken = localStorage.getItem("FileToken");

  useEffect(() => {
    // Check if the user joined via invite link (i.e., the URL contains ?invite=true)
    const queryParams = new URLSearchParams(location.search);
    const inviteParam = queryParams.get('invite');

    if (inviteParam === 'true') {
      setIsInvitedUser(true);
      socket = io("http://localhost:5000", {
        auth: { token: filetoken },
        query: { invite: 'true' }, // Send invite query to the server
      });

      // Listen for updates from the server
      socket.on("updateContent", (updatedContent) => {
        setContent(updatedContent);
        setCode(updatedContent); // Sync AppContext code
      });

      setIsSocketConnected(true);
    } else {
      setIsInvitedUser(false);
      setIsSocketConnected(false);
    }

    // Cleanup on component unmount or when invite link status changes
    return () => {
      if (socket) {
        socket.off("updateContent");
        socket.disconnect();
        setIsSocketConnected(false);
      }
    };
  }, [filetoken, location.search, setCode]);

  // Function to handle API call
  const handleAnalyzeCode = () => {
    setIsLoading(true); // Set loading state
    fetch("http://127.0.0.1:8000/api/submit-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code_line: content }), // Send the current code
    })
      .then((response) => response.json())
      .then((data) => {
        const feedback = data.feedback || "No feedback available.";

        // Add feedback as a comment in the editor
        const feedbackComment = language === "javascript" || language === "typescript"
          ? `// ${feedback}`
          : language === "python"
          ? `# ${feedback}`
          : `/* ${feedback} */`;

        // Append the feedback comment to the code
        const updatedContent = `${content}\n\n${feedbackComment}`;
        setContent(updatedContent); // Update local state
        setCode(updatedContent); // Sync AppContext code
      })
      .catch((error) => {
        console.error("Error:", error);

        // Optionally handle errors by showing them as comments
        const errorComment = language === "javascript" || language === "typescript"
          ? "// An error occurred while analyzing the code."
          : language === "python"
          ? "# An error occurred while analyzing the code."
          : "/* An error occurred while analyzing the code. */";

        const updatedContent = `${content}\n\n${errorComment}`;
        setContent(updatedContent); // Update local state
        setCode(updatedContent); // Sync AppContext code
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  // Function to disconnect the socket manually
  const handleDisconnectSocket = () => {
    if (socket) {
      socket.disconnect(); // Manually disconnect WebSocket
      setIsSocketConnected(false);
    }
  };

  return (
    <div>
      <Editor
        value={content} // Use local state to control the editor
        language={language}
        theme={theme}
        onChange={(updatedContent) => { setContent(updatedContent) }} // Directly handle editor changes
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
        height="50vh"
      />

      {/* Button to trigger OpenAI API */}
      <button onClick={handleAnalyzeCode} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze Code"}
      </button>

      {/* Show disconnect button if WebSocket is enabled */}
      {isSocketConnected && isInvitedUser && (
        <button onClick={handleDisconnectSocket}>
          Disconnect WebSocket
        </button>
      )}
    </div>
  );
};

export default CodeEditor;
