import { useState } from "react"; // Import useState hook from React
import { MdAdd, MdClose } from "react-icons/md"; // Import add and close icons from react-icons library

const TagsInput = ({ tags, setTags }) => { // Define a functional component named TagsInput receiving props
    const [inputValue, setInputValue] = useState(""); // Initialize state to store input value

    // Function to handle input value change
    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update input value state
    };

    // Function to add new tag
    const addNewTag = () => {
        if (inputValue.trim() !== "") { // Check if input value is not empty
            setTags([...tags, inputValue.trim()]); // Add new tag to the tags state array
            setInputValue(""); // Clear input value
        }
    };

    // Function to handle key down event
    const handleKeyDown = (e) => {
        if (e.key === "Enter") { // Check if Enter key is pressed
            addNewTag(); // Call addNewTag function
        }
    };

    // Function to handle tag removal
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove)); // Remove tag from tags state array
    };

    return (
        <div>
            {tags?.length > 0 && ( // Render tags if there are any
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => ( // Map through tags array and render each tag
                        <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
                            #{tag} {/* Render tag */}
                            <button onClick={() => { handleRemoveTag(tag) }}><MdClose className="text-black hover:text-red-700" /></button> {/* Button to remove tag */}
                        </span>
                    ))}
                </div>
            )}

            {/* Input field to add new tags */}
            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Tags...."
                    onChange={handleInputChange} // Handle input value change
                    onKeyDown={handleKeyDown} // Handle key down event
                    value={inputValue} // Set input value
                />
                <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700">
                    <MdAdd className="txet-2xl text-blue-700 hover:text-white" onClick={() => { addNewTag() }} /> {/* Button to add new tag */}
                </button>
            </div>
        </div>
    );
}

export default TagsInput; // Export the TagsInput component
