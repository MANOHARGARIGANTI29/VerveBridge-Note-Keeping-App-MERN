import axios from "axios";
// Importing axios library for making HTTP requests.

import { BASE_URL } from "./constants";
// Importing BASE_URL constant from constants file.

// Creating an instance of axios with custom configurations.
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Setting base URL for API requests.
    timeout: 10000, // Setting timeout for requests to 10 seconds.
    headers: {
        "Content-Type": "application/json" // Setting default content type to JSON.
    }
});

// Adding an interceptor to modify outgoing requests before they are sent.
axiosInstance.interceptors.request.use(
    // Function to handle successful request configuration.
    (config) => {
        // Checking if the code is running in a browser environment.
        if (typeof window !== "undefined") {
            // Retrieving access token from local storage.
            const accessToken = localStorage.getItem("token");
            // Adding authorization header if access token is present.
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config; // Returning modified request configuration.
    },
    // Function to handle request configuration errors.
    (error) => {
        return Promise.reject(error); // Rejecting the request with the encountered error.
    }
);

export default axiosInstance;
// Exporting the customized axios instance for use in other parts of the application.
