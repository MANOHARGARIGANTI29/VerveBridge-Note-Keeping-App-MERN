import React, { useState } from "react"; // Import React and useState hook
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Import eye icons from react-icons library

const PasswordInput = ({ value, onChange, placeholder }) => { // Define a functional component named PasswordInput receiving props
    const [isShowPassword, setIsShowPassword] = useState(false); // Initialize state to track whether password is shown or hidden

    const toggleShowPassword = () => { // Function to toggle password visibility
        setIsShowPassword(!isShowPassword); // Update state to toggle password visibility
    }

    return (
        <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3"> {/* Password input container */}
            <input
                value={value} // Set the input value
                onChange={onChange} // Handle input value change
                type={isShowPassword ? "text" : "password"} // Toggle input type between text and password
                placeholder={placeholder || "password"} // Set placeholder text for the input
                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none" // Set input styles
            />
            {isShowPassword ? // Conditionally render eye icon based on password visibility state
                <FaRegEye // Eye icon to show password
                    size={22}
                    className="text-secondary cursor-pointer"
                    onClick={() => toggleShowPassword()} // Handle click event to toggle password visibility
                />
                :
                <FaRegEyeSlash // Eye slash icon to hide password
                    size={22}
                    className="text-secondary cursor-pointer"
                    onClick={() => toggleShowPassword()} // Handle click event to toggle password visibility
                />
            }
        </div>
    );
}

export default PasswordInput; // Export the PasswordInput component
