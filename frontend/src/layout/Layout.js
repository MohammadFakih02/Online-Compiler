// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import { AppContext } from "../context/AppContext";


const Layout = () => {
    const { code, setCode, output, language, theme, executeCode } = useContext(AppContext);
    return (
        <div className="wrapper">
            <Navbar />
            {/* <div className="main"> */}
                <div className="main">
                    <Sidebar />
                    {/* The Outlet will render the content of the current route */}
                    <div className="editorWrapper">
                        <div className="editor">

                            
                            <Outlet />

                            <button>Run</button>

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


