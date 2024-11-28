import React, { useState } from "react";
import uploadIcon from '../images/upload.png';
import downloadIcon from '../images/download.png';


const Sidebar = () => {
    const [isWorkspaceOpen, setWorkspaceOpen] = useState(true);
    const [isSharedOpen, setSharedOpen] = useState(false);

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
                                style={{ width: '15px', height: '15px', marginLeft: '10px', cursor: 'pointer' }}
                            />
                            <img
                                src={downloadIcon}
                                alt="Download Icon"
                                style={{ width: '20px', height: '19px', marginLeft: '10px', cursor: 'pointer' }}
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