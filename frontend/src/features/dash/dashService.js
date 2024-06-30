// features/auth/authService.js
import { API_BASE_URL } from '../../utils/api';


// fetch assurance data from the backend 
const getPolicies = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/insurances/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
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

    return data;
};


const dashService = { getPolicies };
export default dashService;