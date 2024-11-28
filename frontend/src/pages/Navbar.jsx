import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import { Link } from "react-router-dom";
import { logOut } from "../router/Logout.js";


function Navbar() {
    const { language, theme, handleLanguageChange, handleThemeChange, logged_in } = useContext(AppContext);

    return (
        <div className="navbar">
            <div className="title">Code Compiler</div>
            <div className="dropdowns">
                <label>
                    Language:
                    <select value={language} onChange={handleLanguageChange}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="csharp">C#</option>
                    </select>
                </label>
                <label style={{ marginLeft: "10px" }}>
                    Theme:
                    <select value={theme} onChange={handleThemeChange}>
                        <option value="vs-dark">Dark</option>
                        <option value="vs-light">Light</option>
                        <option value="hc-black">High Contrast</option>
                    </select>
                </label>
            </div>
            {
                !logged_in ? (
                    <div className="buttons">
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    </div>
                ) : (
                    <button className="logout-button" onClick={logOut}> Logout</button>
                )
            }
        </div>
    );
}

export default Navbar;
