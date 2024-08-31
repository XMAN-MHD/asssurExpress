// features/auth/authService.js
import { API_BASE_URL } from '../../utils/api';

// Save assurance data to the database 
const createPolicy = async (policyData) => {
    const response = await fetch(`${API_BASE_URL}/insurances/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials (cookies, etc.)
        body: JSON.stringify(policyData)
    });

    // Check if response is OK
    if (!response.ok) {
        const errors = await response.json()
        throw new Error(errors.message || 'Server returned an error');
    }

    const data = await response.json(); 
    return data;
};


// fetch assurance data from the backend 
const getPolicies = async () => {
    const response = await fetch(`${API_BASE_URL}/insurances/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Include credentials (cookies, etc.)
    });

    // Check if response is OK
    if (!response.ok) {
        const errors = await response.json()
        throw new Error(errors.message || 'Server returned an error');
    }

    const data = await response.json(); 
    return data;
};

// Update user profile
const updateProfile = async (userData) => {
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

const dashService = { getPolicies, updateProfile, createPolicy };
export default dashService;
