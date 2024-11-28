// Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import { AppContext } from "../context/AppContext";
import React, { useContext } from "react";



const Layout = () => {
    const { code, setCode, output, language, theme, executeCode, logged_in } = useContext(AppContext);
    return (
        <div className="wrapper">
            <Navbar />
            {/* <div className="main"> */}
                <div className="main">
                { logged_in ? (
                        <Sidebar />
                    ):<></>};
                    {/* The Outlet will render the content of the current route */}
                    <div className="editorWrapper">
                        <div className="editor">

                            
                            <Outlet />

                            <button onClick={executeCode}>Run</button>

                        </div>
                        <div className="output">
                            <h2>Output:</h2>
                            <pre>{output}</pre>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
};

export default Layout;


