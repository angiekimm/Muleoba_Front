import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import axios from 'axios';
import "./css/Main.css";
import Main from "./Pages/Main";
import Welcome from "./Pages/Welcome";

export default function App() {
  
  return (
    
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    
  );
}