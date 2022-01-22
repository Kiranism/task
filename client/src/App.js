import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import EditUser from "./components/EditUser";

import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default App;
