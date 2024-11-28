import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function useAuth() {
    const [token, setToken] = useState(null);
    const [user_id, setUserId] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        setToken(storedToken);

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);

                setUserId(decoded?.data?.id || null);
                setName(decoded?.data?.name || null);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return { token, logged_in: token ? true : false, user_id, name};
};

export default useAuth;