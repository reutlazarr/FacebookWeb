import "./App.css";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./screens/Feed";
import { useState } from "react";
import Profile from "./screens/Profile";

function App() {
  // const [token, setToken] = useState(null);
  const [user, setUser] = useState({ email: "", token: null });
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route
            path="/register"
            element={<Registration />}
          />
          <Route path="/signIn" element={<Feed user={user} />} />
          <Route path="/Profile" element={<Profile user={user} />} />
          <Route path="/test" element={<div><h1>test</h1></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 