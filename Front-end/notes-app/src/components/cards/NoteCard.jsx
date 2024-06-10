import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"; // Importing icons from react-icons library
import moment from "moment"; // Importing moment library for date formatting

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => { // Define a functional component named NoteCard receiving props
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out flex flex-col"> {/* Note card container */}
            <div className="flex items-center justify-between mb-2"> {/* Header section */}
                <div className="flex-1">
                    <h6 className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">{title}</h6> {/* Note title */}
                    <span className="text-xs text-slate-500 block">{moment(date).format('Do MMM YYYY')}</span> {/* Date of creation */}
                </div>
                <MdOutlinePushPin // Pin icon to toggle note pinning
                    className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} // Set pin icon color based on pin status
                    onClick={onPinNote} // onClick event handler to pin/unpin the note
                />
            </div>
            <p className="text-sm text-slate-800 mb-2">{content?.slice(0, 60)}</p> {/* Note content */}
            <div className="flex items-center justify-between mt-auto"> {/* Footer section */}
                <div className="text-xs text-slate-500 flex-1"> {/* Tag section */}
                    {tags.map((item, index) => ( // Map through tags and display them
                        <span key={index} className="mr-1">#{item} </span> // Tag item
                    ))}
                </div>
                <div className="flex items-center gap-2"> {/* Action buttons section */}
                    <MdCreate // Edit icon
                        className="icon-btn hover:text-green-600" // Add hover effect
                        onClick={onEdit} // onClick event handler for editing the note
                    />
                    <MdDelete // Delete icon
                        className="icon-btn hover:text-red-600" // Add hover effect
                        onClick={onDelete} // onClick event handler for deleting the note
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard; // Export the NoteCard component
