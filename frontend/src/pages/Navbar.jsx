import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import { Link } from "react-router-dom";
import { logOut } from "../router/Logout.js";
import shareIcon from '../images/share.png';


function Navbar() {
    const { language, theme, handleLanguageChange, handleThemeChange, logged_in } = useContext(AppContext);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Name: ${name}, Email: ${email}`);
        closePopup(); 
    };

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
                    <>
                        <div className="logout-container">
                            <img
                                src={shareIcon}
                                alt="Share Icon"
                                className="share-icon"
                                onClick={showPopup} // Show popup when the share icon is clicked
                            />
                            <button className="logout-button" onClick={logOut}>Logout</button>
                        </div>
                    </>
                )
            }

            {/* Popup for name and email */}
            {isPopupVisible && (
                <div className="popup-background">
                    <div className="popup-content">
                        <h3>Enter your details</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit">Send</button>
                                <button type="button" onClick={closePopup}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Inline styling for Popup */}
            <style jsx>{`
                .popup-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .popup-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    width: 300px;
                    text-align: center;
                    color:black;
                }

                .popup-content form div {
                    margin-bottom: 15px;
                }

                .popup-content button {
                    padding: 8px 15px;
                    cursor: pointer;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
}

export default Navbar;