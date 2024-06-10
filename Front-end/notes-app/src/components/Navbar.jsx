import ProfileInfo from "./cards/Profileinfo"; // Importing the ProfileInfo component
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook from react-router-dom
import SearchBar from "./serachbar/SearchBar"; // Importing the SearchBar component
import { useState } from "react"; // Importing the useState hook from React

// Define a functional component called Navbar
const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    // State variables
    const [searchQuery, setSearchQuery] = useState(''); // State variable for managing the search query

    // Hooks
    const navigate = useNavigate(); // The useNavigate hook to navigate between routes

    // Function to handle logout
    const onLogout = () => {
        localStorage.clear(); // Clearing local storage
        navigate("/login"); // Redirecting to the login page
    };

    // Function to handle search
    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery); // Calling the onSearchNote function with the search query
        }
    };

    // Function to handle clearing search
    const onClearSearch = () => {
        setSearchQuery(''); // Resetting the search query
        handleClearSearch(); // Calling the handleClearSearch function
    };

    // JSX for rendering the Navbar component
    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 sm:py-4 drop-shadow">
            <h2 className="text-xl sm:text-2xl font-medium text-black py-2">Note-Keeping-App</h2>
            {/* Rendering the SearchBar component */}
            <SearchBar
                value={searchQuery} // Passing the search query as a prop
                onChange={({ target }) => { setSearchQuery(target.value) }} // Handling input change
                handleSearch={handleSearch} // Passing the handleSearch function as a prop
                onClearSearch={onClearSearch} // Passing the onClearSearch function as a prop
            />
            {/* Rendering the ProfileInfo component */}
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} /> {/* Passing userInfo and onLogout as props */}
        </div>
    );
};

export default Navbar; // Exporting the Navbar component as the default export
