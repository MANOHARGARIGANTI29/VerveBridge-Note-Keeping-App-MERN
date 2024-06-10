import { GetInitials } from "../../utils/validations"; // Import GetInitials function from validations utility

const ProfileInfo = ({ userInfo, onLogout }) => { // Define a functional component named ProfileInfo receiving props
    if (!userInfo) { // Check if userInfo is not provided
        return null; // Return null if userInfo is not provided
    }
    return (
        <div className="flex items-center gap-3"> {/* Profile info container */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-medium bg-secondary"> {/* Profile image placeholder */}
                {GetInitials(userInfo.fullName)} {/* Display user initials */}
            </div>
            <div className="flex flex-col"> {/* User information section */}
                <p className="text-sm font-medium">{userInfo.fullName}</p> {/* User full name */}
                <button className="text-xm sm:text-sm text-slate-700 underline" onClick={onLogout}>Logout</button> {/* Logout button */}
            </div>
        </div>
    );
};

export default ProfileInfo; // Export the ProfileInfo component
