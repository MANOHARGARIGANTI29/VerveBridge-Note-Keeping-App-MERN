import { useEffect } from "react"; // Importing the useEffect hook from React
import { LuCheck } from "react-icons/lu"; // Importing the LuCheck icon from react-icons
import { MdDeleteOutline } from "react-icons/md"; // Importing the MdDeleteOutline icon from react-icons

// Define a functional component called Toast
const Toast = ({ isShown, message, type, onClose }) => {
    // Using the useEffect hook to execute code after rendering
    useEffect(() => {
        // Setting a timeout to automatically close the toast after 3000 milliseconds (3 seconds)
        const timeoutId = setTimeout(() => {
            onClose();
        }, 3000);
        // Cleanup function to clear the timeout when the component unmounts or the dependencies change
        return () => {
            clearTimeout(timeoutId);
        };
    }, [onClose]); // Dependency array to ensure the effect runs only when onClose changes

    // Return JSX for rendering the toast component
    return (
        <div className={`absolute top-20 right-6 transition-all duration-400 ${isShown ? "opacity-100" : "opacity-0"}`}>
            <div className={`min-w-52 bg-white border shadow-md after:w-[5px] after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
                <div className="flex items-center gap-3 py-2 px-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        type === "delete" ? "bg-red-50" : "bg-green-50"
                    }`}>
                        {/* Rendering different icons based on the 'type' prop */}
                        {type === "delete" ? (
                            <MdDeleteOutline className="text-xl text-red-500" />
                        ) : (
                            <LuCheck className="text-xl text-green-500" />
                        )}
                    </div>
                    <p className="text-sm text-slate-800">{message}</p> {/* Displaying the 'message' prop */}
                </div>
            </div>
        </div>
    );
};

export default Toast; // Exporting the Toast component as the default export
