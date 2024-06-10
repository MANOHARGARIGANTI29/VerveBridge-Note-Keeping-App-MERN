import { MdAdd } from "react-icons/md"; // Icon for adding new note
import Navbar from "../../components/Navbar"; // Navbar component for navigation
import NoteCard from "../../components/cards/NoteCard"; // NoteCard component for displaying individual notes
import AddEditNotes from "../Home/AddEditNotes"; // Component for adding/editing notes
import Modal from "react-modal"; // Modal component for displaying Add/Edit Note form
import { useEffect, useState } from "react"; // React hooks for managing component state and side effects
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import axiosInstance from "../../utils/axiosinstances"; // Axios instance for making HTTP requests
import Toast from "../../components/TostMessage/Toast"; // Toast component for displaying messages
import EmptyCard from "../../components/empty-cards/empty-cards"; // Component for displaying empty card message
import AddnotesImg from "../../assets/images/Untitled design.png"; // Image for adding notes
import Nonote from "../../assets/images/empty-notes-isolated-vector-17057936.jpg"; // Image for empty notes

const Home = () => {
    // State variables
    const [openAddEditModel, setOpenAddEditModel] = useState({ // State for controlling the Add/Edit Note modal
        isShown: false, // Boolean indicating whether the modal is open or closed
        type: "add", // Type of operation (add or edit)
        data: null, // Data of the note being edited (null for new note)
    });
    const [showToastMesg, setShowToastMesg] = useState({ // State for controlling the toast message
        isShown: false, // Boolean indicating whether the toast message is visible
        type: "add", // Type of message (add, update, delete, etc.)
        message: "", // Content of the message
    });
    const [allNotes, setAllNotes] = useState([]); // State for storing all notes
    const [userInfo, setUserInfo] = useState(null); // State for storing user information
    const [isSearch, setIsSearch] = useState(false); // State for indicating if search is active
    const navigate = useNavigate(); // Function for programmatic navigation

    const handleEdit = (noteDetails) => {
        setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" }); // Open the Add/Edit Note modal with edit mode
    };

    // Function to display toast message
    const showToastMessage = (message, type) => {
        setShowToastMesg({ isShown: true, message, type }); // Show the toast message with specified content and type
    };

    // Function to close the toast message
    const handleCloseToast = () => {
        setShowToastMesg({ isShown: false, message: "" }); // Hide the toast message
    };

    // Function to fetch user information
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user"); // Send GET request to retrieve user information
            if (response.data && response.data.user) {
                setUserInfo(response.data.user); // Set user information in state
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear(); // Clear local storage
                navigate("/login"); // Redirect to login page if unauthorized
            }
        }
    };

    // Function to fetch all notes
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes"); // Send GET request to retrieve all notes
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes); // Set all notes in state
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again."); // Log error if request fails
        }
    };

    // Function to delete a note
    const deleteNote = async (data) => {
        const noteId = data._id; // Extract note ID
        try {
            const response = await axiosInstance.delete("/delete-notes/" + noteId); // Send DELETE request to delete the note
            if (response.data && !response.data.error) {
                showToastMessage("Note Deleted successfully", "delete"); // Show success message if note is deleted
                getAllNotes(); // Refresh notes after deletion
            }
        } catch (error) {
            console.log("An Unexpected error is occurred. Please try again."); // Log error if request fails
        }
    };

    // Function to search for notes
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get('/search-notes', { params: { query } }); // Send GET request to search for notes
            if (response.data && response.data.notes) {
                setIsSearch(true); // Set search state to true
                setAllNotes(response.data.notes); // Set search results in state
            }
        } catch (error) {
            console.log(error); // Log error if request fails
        }
    };

    // Function to clear search results
    const handleClearSearch = () => {
        setIsSearch(false); // Set search state to false
        getAllNotes(); // Fetch all notes to reset the list
    };

    // Function to update the pinned status of a note
    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id; // Extract note ID
        try {
            const response = await axiosInstance.put('/Update-note-pinned/' + noteId, { isPinned: !noteData.isPinned }); // Send PUT request to update pinned status
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully", "update"); // Show success message if note is updated
                // Update the local state to reflect the pinned status change
                setAllNotes((prevNotes) => {
                    const updatedNotes = prevNotes.map((note) =>
                        note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
                    );
                    // Sort the notes so that pinned notes come first
                    updatedNotes.sort((a, b) => b.isPinned - a.isPinned);
                    return updatedNotes;
                });
            }
        } catch (error) {
            console.log(error); // Log error if request fails
        }
    };

    // useEffect hook to fetch user info and all notes on component mount
    useEffect(() => {
        getUserInfo(); // Fetch user information
        getAllNotes(); // Fetch all notes
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            <div className="container mx-auto px-4">
            {allNotes.length > 0 ?(
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}  
                            onPinNote={() => updateIsPinned(item)} 
                        />
                    ))}
                </div>
                ):(
                    <EmptyCard imageSrc={isSearch?Nonote:AddnotesImg} message={isSearch?`Oops! No notes found matching your search`:`Start creating your first Note! Click the 'Add' button to join thought,ideas,and reminders.Let's get started!`}/>
                )
            }
            </div>
            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-900 fixed right-10 bottom-10 sm:right-6 sm:bottom-6"
                onClick={() => {
                    setOpenAddEditModel({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>
            <Modal
                isOpen={openAddEditModel.isShown}
                onRequestClose={() => setOpenAddEditModel({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="w-full max-w-3xl mx-auto mt-14 p-5 bg-white rounded-md overflow-auto"
            >
                <AddEditNotes
                    type={openAddEditModel.type}
                    noteData={openAddEditModel.data}
                    onClose={() => setOpenAddEditModel({ isShown: false, type: "add", data: null })}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>
            <Toast
                isShown={showToastMesg.isShown}
                message={showToastMesg.message}
                type={showToastMesg.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
