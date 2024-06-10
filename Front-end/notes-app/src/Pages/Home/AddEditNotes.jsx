import { useState } from "react";
// Importing the useState hook from React for managing component state.

import TagsInput from "../../components/inputfields/tagsInput"
// Importing the TagsInput component from a specified path.

import { MdClose } from "react-icons/md";
// Importing the MdClose icon component from the react-icons library.

import axiosInstance from "../../utils/axiosinstances";
// Importing axiosInstance for making HTTP requests.

const AddEditNotes = ({onClose ,type,getAllNotes,noteData,showToastMessage})=>{
// Declaring a functional component named AddEditNotes, receiving props as arguments.

    const [title,setTitle] = useState(noteData?.title ||"");
    // Declaring state variable 'title' and function to update it using the useState hook. Initializing it with noteData.title or an empty string.

    const [content,setContent] = useState(noteData?.content ||"");
    // Declaring state variable 'content' and function to update it using the useState hook. Initializing it with noteData.content or an empty string.

    const [tags,setTags] = useState(noteData?.tags || []);
    // Declaring state variable 'tags' and function to update it using the useState hook. Initializing it with noteData.tags or an empty array.

    const [error,setError]=useState(false);
    // Declaring state variable 'error' and function to update it using the useState hook. Initializing it with false.

    const addNewNote = async ()=>{
    // Declaring an asynchronous function 'addNewNote' for adding a new note.

        try{
        // Beginning of try block for error handling.

            const response = await axiosInstance.post("/add-note",{
            // Sending a POST request to add a new note using axiosInstance.

                title,
                // Passing the 'title' state variable.

                content,
                // Passing the 'content' state variable.

                tags,
                // Passing the 'tags' state variable.

                isPinned:false,
                // Adding isPinned as false by default.
            });

            if(response.data && response.data.note){
            // Checking if the response contains data and note.

                showToastMessage("Note Added Successfully");
                // Displaying a success message using the showToastMessage function.

                getAllNotes();
                // Refreshing all notes after adding a new one.

                onClose();
                // Closing the modal or dialog.
            }
        }catch(error){
        // Catching any errors that occur during the POST request.

            if(error.response && error.response.data && error.response.data.message){
            // Checking if there is an error response with a message.

                setError(error.response.data.message)
                // Setting the error state with the error message from the response.
            }
        }
    }

    const editNote = async()=>{
    // Declaring an asynchronous function 'editNote' for editing an existing note.

        const noteId = noteData._id
        // Extracting the ID of the note to be edited.

        try{
        // Beginning of try block for error handling.

            const response = await axiosInstance.put("/edit-note/"+ noteId,{
            // Sending a PUT request to edit the note with the specified ID using axiosInstance.

                title,
                // Passing the 'title' state variable.

                content,
                // Passing the 'content' state variable.

                tags,
                // Passing the 'tags' state variable.
            });

            if(response.data && response.data.note){
            // Checking if the response contains data and note.

                showToastMessage("Note Updated successfully")
                // Displaying a success message using the showToastMessage function.

                getAllNotes();
                // Refreshing all notes after editing one.

                onClose();
                // Closing the modal or dialog.
            }
        }catch(error){
        // Catching any errors that occur during the PUT request.

            if(error.response && error.response.data && error.response.data.message){
            // Checking if there is an error response with a message.

                setError(error.response.data.message)
                // Setting the error state with the error message from the response.
            }
        }
    }

    const handleAddNote = ()=>{
    // Declaring a function 'handleAddNote' to handle adding or editing a note.

       if(!title){
       // Checking if the title is empty.

        setError("please enter the title");
        // Setting an error message if the title is empty.

        return;
        // Exiting the function early.
       }

       if(!content){
       // Checking if the content is empty.

        setError("please enter the content");
        // Setting an error message if the content is empty.

        return;
        // Exiting the function early.
       }

       setError("");
       // Clearing any existing error messages.

       if(type === "edit"){
       // Checking if the type is 'edit'.

        editNote()
        // Calling the editNote function to edit the note.
       }else{
       // If the type is not 'edit'.

        addNewNote()
        // Calling the addNewNote function to add a new note.
       }
    }

    return(
        <div className="relative p-4 sm:p-6 lg:p-8">
            <button className="w-8 h-8 rounded-md flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 " onClick={onClose}>
                <MdClose className="text-xl text-slate-400"/>
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label text-lg sm:text-xl">TITLE</label>
                <input className="text-lg sm:text-xl lg:text-2xl text-slate-950 outline-none bg-slate-100 p-2 rounded" type="text" placeholder="enter title...
                "
                value={title}
                onChange={({target})=>setTitle(target.value)}/>   
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label text-lg sm:text-xl">CONTENT</label>
                <textarea
                type="text"
                placeholder="enter the content..."
                className="text-sm sm:text-base lg:text-lg text-slate-950 p-2 rounded outline-none bg-slate-100"
                rows={10}
                value={content}
                onChange={({target})=>setContent(target.value)}
                />   
            </div>
            <div className="flex flex-col gap-2 mt-4">
            <label className="input-label text-lg sm:text-xl">TAGS</label>
            <TagsInput tags={tags} setTags={setTags}/>
            </div>
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            <button className="btn-secondary font-medium mt-3 p-3 w-full sm:w-auto" onClick={handleAddNote}>{type === 'edit'? 'UPADTE' : "ADD"}</button>
        </div>
    )
}
export default AddEditNotes;