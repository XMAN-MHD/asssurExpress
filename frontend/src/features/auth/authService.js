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
        localStorage.setItem('token', response.token)
    }   

    return data;
};

// Update user profile
const updateUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/update/${userData.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials (cookies, etc.)
        body: JSON.stringify(userData)
    });

    // Check if response is OK
    if (!response.ok) {
        const errors = await response.json()
        throw new Error(errors.message || 'Server returned an error');
    }

    const data = await response.json();
    return data;
};

// Request to reset password
const sendPasswordResetEmail = async (email) => {
    const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors.message || 'Server returned an error');
    }

    return response.json();
};

// Reset password
const resetPassword = async (token, passwordData) => {
    const response = await fetch(`${API_BASE_URL}/users/reset-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
    });

    if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors.message || 'Server returned an error');
    }

    return response.json();
};

const logout = () => localStorage.removeItem('user');

const authService = { register, logout, login, updateUser, sendPasswordResetEmail, resetPassword };

export default authService;
