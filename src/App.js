import "./App.css";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./screens/Feed";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    name: "",
    image: null,
  });
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/register"
            element={<Registration setUser={setUser} />}
          />
          <Route path="/signIn" element={<Feed user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;