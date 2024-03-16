import "./App.css";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./screens/Feed";
import { useState } from "react";
import UserProfile from "./screens/UserProfile";
import FriendsPage from "./screens/FriendsPage";
import UserEditPage from "./screens/UserEditPage";


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
          <Route path="/UserProfile" element={<UserProfile user={user} />} />
          <Route path="/FriendsPage" element={<FriendsPage user={user} />} />
          <Route path="/UserEditPage" element={<UserEditPage user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 