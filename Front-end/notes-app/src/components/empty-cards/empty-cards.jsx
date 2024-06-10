const EmptyCard = ({ imageSrc, message }) => { // Define a functional component named EmptyCard receiving props
    return (
        <div className="flex flex-col items-center justify-center mt-20"> {/* Empty card container */}
            <img src={imageSrc} alt="No Notes" className="w-60 sm:w-80 md:w-96"/> {/* Display image */}
            <p className="w-11/12 sm:w-9/12 md:w-8/12 text-sm sm:text-base font-medium text-slate-700 text-center leading-7 mt-5">{message}</p> {/* Display message */}
        </div>
    );
}

export default EmptyCard; // Export the EmptyCard component
