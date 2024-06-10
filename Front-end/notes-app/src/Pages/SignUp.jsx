import Navbar from "../components/Navbar";
// Importing Navbar component.

import { Link, useNavigate } from "react-router-dom";
// Importing Link and useNavigate hooks from react-router-dom for navigation.

import PasswordInput from "../components/inputfields/PasswordInput";
// Importing PasswordInput component.

import { useState } from "react";
// Importing useState hook from React for managing state.

import { ValidateEmail } from "../utils/validations";
// Importing ValidateEmail function for email validation from utils/validations.

import axiosInstance from "../utils/axiosinstances";
// Importing axiosInstance for making HTTP requests.

const Login = () => {
    // Declaring Login component.

    const [email, setEmail] = useState('');
    // State for storing email value.

    const [password, setPassword] = useState('');
    // State for storing password value.

    const [error, setError] = useState(null);
    // State for storing error messages.

    const navigate = useNavigate();
    // Getting the navigate function for programmatic navigation.

    const handleLogin = async (e) => {
        // Function to handle login submission.
        e.preventDefault(); // Preventing default form submission behavior.

        // Validation checks for email and password.
        if (!ValidateEmail(email)) {
            setError("please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("please enter the password");
            return;
        }

        setError(""); // Clearing any previous errors.

        // Login API call.
        try {
            console.log("logging in with email:", email);
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });
            console.log("Response received:", response);

            // Handling successful login response.
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard"); // Navigating to the dashboard page.
            }
        } catch (error) {
            // Handling login error.
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <Navbar />
            {/* Rendering Navbar component. */}

            <div className=" flex items-center justify-center mt-28 px-4 sm:px-6 lg:px-8 ">
                {/* Container for login form. */}
                <div className="w-full max-w-md border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        {/* Login form */}
                        <h4 className="text-2xl mb-7">Login</h4>
                        {/* Login title */}
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box w-full mb-4 p-3 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* Email input */}
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Password input using PasswordInput component */}
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        {/* Display error message if present */}
                        <button
                            type="submit"
                            className="btn-secondary w-full p-3 bg-primary text-white rounded mt-4"
                        >
                            Login
                        </button>
                        {/* Login button */}
                        <p>Not registered yet?{""}
                            {/* Sign up link */}
                            <Link to="/signup" className="font-medium text-primary underline">Create an Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
