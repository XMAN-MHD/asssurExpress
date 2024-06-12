// features/auth/authService.js
import { API_BASE_URL } from '../../utils/api';

const register = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Include credentials (cookies, etc.)
    });

    // Check if response is OK
    if (!response.ok) {
        // Log response status and text
        console.error(`Server returned error: ${response.status} - ${response.statusText}`);
        const errors = await response.json()
        throw new Error(errors.message || 'Server returned an error');
    }

    
   
   // get the response json data and parse it 
    const data = await response.json();

    // Store user data in localStorage
    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }   

    return data;
};


const login = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Include credentials (cookies, etc.)
    });

    // Check if response is OK
    if (!response.ok) {
        // Log response status and text
        console.error(`Server returned error: ${response.status} - ${response.statusText}`);
        const errors = await response.json()
        throw new Error(errors.message || 'Server returned an error');
    }

    
   
   // get the response json data and parse it 
    const data = await response.json();

    // Store user data in localStorage
    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }   

    return data;
};


const logout = () => localStorage.removeItem('user');

const authService = { register, logout, login };

export default authService;
