import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'http://localhost:8000/api/login', 
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
                const receivedToken = response.data.token;

                localStorage.setItem('jwtToken', receivedToken);

                setToken(receivedToken);
                return { success: true, token: receivedToken };
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
            return { success: false, message: err.message || 'An unexpected error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, token };
};

export default useLogin;