// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";


const Layout = () => {
    return (
        <div className="wrapper">
            <Navbar />
            {/* <div className="main"> */}
                <div className="main">
                    <div className="Sidebar">
                        <p>sidebar</p>
                    </div>
                    {/* The Outlet will render the content of the current route */}
                    <div className="editorWrapper">
                        <div className="editor">

                            <h1>React Code Editor</h1>
                            <Outlet />

                            <button>Run</button>

                        </div>
                        <div className="output">
                            <h2>Output:</h2>
                            <pre>{/* Output can be displayed here */}</pre>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
};

export default Layout;
