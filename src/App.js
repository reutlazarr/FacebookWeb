import React, { useState } from "react";
import "./App.css";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./screens/Feed";

function App() {
  const [user, setUser] = useState(null); // Initialize user state to null

  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/signIn" element={<Feed user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
