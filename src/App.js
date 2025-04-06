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
import FileAccess from "./servicepage/fileaccess.js";
import Airestore from "./servicepage/aifilerestore.js";
import Cloudstore from "./servicepage/cloudstorage.js";
import Endtoend from "./servicepage/end-to-endencryption.js";
import AutoSyncFiles from "./servicepage/autofilesyncing.js";
import Test from "./servicepage/folderuploadtest.js";

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
          <Route path="/file-access" element={<FileAccess/>}/>
          <Route path="/ai-file-restoring" element={<Airestore/>}/>
          <Route path="/secure-cloud-storage" element={<Cloudstore/>}/>
          <Route path="/end-to-end-encryption" element={<Endtoend/>}/>
          <Route path="/auto-file-syncing" element={<AutoSyncFiles/>}/>
          <Route path="/test" element={<Test/>}/>





        </Routes>
      </div>
    </Router>
  );
}

export default App;
