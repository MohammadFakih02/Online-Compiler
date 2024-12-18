import { useState } from "react";
import axios from 'axios';

const useSignup = () => {
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const signup = async (name, email, password) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/register", // Replace with your PHP endpoint URL
                { name, email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

                const receivedToken = response.data.token;

                // Store the token in localStorage for persistent login
                localStorage.setItem('jwtToken', receivedToken);

                setToken(receivedToken);
                return { success: true, token: receivedToken };
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
            return { success: false, message: err.message || "An unexpected error occurred" };
        } finally {
            setLoading(false);
        }
    };

    return { token, signup, loading, error, success };
};

export default useSignup;