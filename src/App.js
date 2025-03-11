import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Body from "./homepage/body";
import Login from "./loginpage/login";
import Signup from "./signuppage/signup";
import About from "./aboutpage/about";
import Contact from "./contactpage/contact";

import './App.css';
import SimplePage from "./servicepage/services";
import DataSharing from "./servicepage/dara-sharing.js";

function App() {
  return (
    <Router>
      <div className="body">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<SimplePage />} />
          <Route path="/data-sharing" element={<DataSharing/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
