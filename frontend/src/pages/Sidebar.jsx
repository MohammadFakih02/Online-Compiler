import React, { useContext, useState } from "react";
import uploadIcon from "../images/upload.png";
import downloadIcon from "../images/download.png";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const [isWorkspaceOpen, setWorkspaceOpen] = useState(true);
  const [isSharedOpen, setSharedOpen] = useState(false);
  const { code,setCode } = useContext(AppContext);

  const uploadFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: code }),
      });
      const data = await response.json();
      alert(data.message || "File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };
  const downloadFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/download", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("File content:", data.content);
        setCode(data.content);
      } else {
        alert(data.message || "Failed to fetch file.");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="Sidebar" style={styles.sidebar}>
      <div>
        <div
          style={styles.sectionHeader}
          onClick={() => setWorkspaceOpen(!isWorkspaceOpen)}
        >
          <span>{isWorkspaceOpen ? "▼" : "▶"}</span> My Workspace
        </div>
        {isWorkspaceOpen && (
          <ul style={styles.fileList}>
            <li style={styles.fileItem}>
              File 1
              <img
                src={uploadIcon}
                alt="Upload Icon"
                style={{
                  width: "15px",
                  height: "15px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={() => uploadFile("Sample content for upload")}
              />
              <img
                src={downloadIcon}
                alt="Download Icon"
                style={{
                  width: "20px",
                  height: "19px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={downloadFile}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
  },
  sectionHeader: {
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
  },
  fileList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  fileItem: {
    padding: "5px 0",
    paddingLeft: "15px",
  },
};

export default Sidebar;
