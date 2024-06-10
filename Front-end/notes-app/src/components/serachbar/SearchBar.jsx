import { FaMagnifyingGlass } from "react-icons/fa6"; // Import search icon from react-icons library
import { IoMdClose } from "react-icons/io"; // Import close icon from react-icons library

const SearchBar = ({ value, onChange, onClearSearch, handleSearch }) => { // Define a functional component named SearchBar receiving props
    return (
        <div>
            <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md"> {/* Search bar container */}
                <input
                    type="text"
                    placeholder="Search Notes....." // Placeholder text for the search input field
                    value={value} // Set input value
                    onChange={onChange} // Handle input value change
                    className="w-full text-sm bg-transparent py-[11px] outline-none" // Set input styles
                />
                {value && ( // Render close icon if search value exists
                    <IoMdClose
                        className="text-xl text-slate-400 cursor-pointer hover:text-black mr-3" // Set close icon styles
                        onClick={onClearSearch} // Handle click event to clear search
                    />
                )}
                <FaMagnifyingGlass // Search icon
                    className="text-slate-400 cursor-pointer hover:text-black" // Set search icon styles
                    onClick={handleSearch} // Handle click event to initiate search
                />
            </div>
        </div>
    )
}

export default SearchBar; // Export the SearchBar component
