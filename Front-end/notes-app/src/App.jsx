// Importing necessary components and libraries for routing
import Home from "./Pages/Home/Home"; // Importing Home component
import Login from "./Pages/Login"; // Importing Login component
import SignUp from "./Pages/SignUp"; // Importing SignUp component
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Importing Router, Routes, and Route components from react-router-dom

// Defining routes for the application
const routes = (
    <Router>
        {/* Wrapping routes in Router component */}
        <Routes>
            {/* Defining individual routes */}
            <Route path="/" exact element={<SignUp />} /> {/* Route for SignUp page */}
            <Route path="/dashboard" exact element={<Home />} /> {/* Route for Home (Dashboard) page */}
            <Route path="/login" exact element={<Login />} /> {/* Route for Login page */}
            <Route path="/signup" exact element={<SignUp />} /> {/* Route for SignUp page */}
        </Routes>
    </Router>
);

// Main App component
const App = () => {
    return (
        <div>
            {routes} {/* Rendering defined routes */}
        </div>
    );
};

export default App;
// Exporting App component as default
