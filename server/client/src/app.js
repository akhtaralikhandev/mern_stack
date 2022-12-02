import React from "react";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
