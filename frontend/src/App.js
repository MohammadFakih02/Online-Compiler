import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppProvider from "../src/context/AppContext";
import CodeEditor from "../src/pages/CodeEditor.jsx";
import Layout from "./layout/Layout.js";
import useAuth from "./hooks/useAuth.js";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import './index.css';


function App() {
  const { logged_in } = useAuth(); // Get logged-in status from the useAuth hook

  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Main Layout route */}
          <Route path="/" element={<Layout />}>
            {/* Default route inside Layout */}
            <Route path="/" element={<CodeEditor />} />
          </Route>

          {/* Redirect logged-in users away from login and signup pages */}
          <Route
            path="/login"
            element={logged_in ? <Navigate to="/pages" /> : <Login />}
          />

          <Route
            path="/signup"
            element={logged_in ? <Navigate to="/pages" /> : <Signup />}
          />

          {logged_in && (
                    <Route path="/" element={<Layout />}>
                    {/* Default route inside Layout */}
                    <Route path="/" element={<CodeEditor />} />
                  </Route>
                )}

{/* 

          <Route
            path="/signup"
            element={logged_in ? <Navigate to="/" /> : <p>Signup</p>}
          /> */}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={logged_in ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
