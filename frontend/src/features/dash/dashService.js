// features/auth/authService.js
import { API_BASE_URL } from '../../utils/api';

// Save assurance data to the database 
const createPolicy = async (policyData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/insurances/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(policyData)
    });

    // Check if response is OK
    if (!response.ok) {
        const errors = await response.json()
        throw new Error(errors.message || "Une erreur est survenue lors de la sauvegarde des données.");
    }

    const data = await response.json(); 
    return data;
};


// fetch assurance data from the backend 
const getPolicies = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/insurances/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send the token
        },
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
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users/update/${userData.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // send the token
        },
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

// Upload files (vehicle registration card) to the server
const uploadFiles = async ({insuranceID, files}) => {
    const token = localStorage.getItem('token');
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append the insurance ID to the FormData object
    formData.append('insuranceID', insuranceID);

    // Append each file to the FormData object
    formData.append('rectoPhoto', files[0]); // Adjust field names if needed
    formData.append('versoPhoto', files[1]); // Adjust field names if needed

    const response = await fetch(`${API_BASE_URL}/cloudinary/uploadImage`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // send the token
        },
        body: formData,
    });

    // Check if response is OK
    if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors.message || "Une erreur est survenue lors du téléchargement des fichiers.");
    }

    const data = await response.json();
    return data;
};

// delete a policy
const deletePolicy = async (ID) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/insurances/${ID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`, // send the token
        },
    });

    // Check if response is OK
    if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors.message || 'Server returned an error');
    }

    const data = await response.json();
    return data;
};

// export the services
const dashService = { getPolicies, updateProfile, createPolicy, uploadFiles, deletePolicy };
export default dashService;
