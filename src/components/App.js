import '../App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Admin from './Admin';
import User from './User';

function App() {
  return (
    <Router>
      <nav>
        {/* Add your navigation links here */}
        {/* <Link to="/signin">Sign In</Link> */}
        {/* <Link to="/signup">Sign Up</Link> */}
        <Link to="/admin">Admin</Link>
        {/* <Link to="/user">User</Link> */}
      </nav>
      <Routes>
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/user" element={<User />} /> */}
      </Routes>
    </Router>
  );
}

export default App;


