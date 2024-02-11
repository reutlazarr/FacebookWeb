// App.js
import React, { useState } from "react";
import "./App.css";
import Feed from "./Feed";
import Menu from "./Menu";
import posts from "./db.json";
import TopBar from "./TopBar";

function App() {
  const [user, setUser] = useState(null);
  const [postsList, setPostsList] = useState(posts);

  const handleLogin = () => {
    const loggedInUser = {
      username: "Reut Lazar",
      name: "Reut Lazar",
      email: "user@example.com",
      profilePicture: "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTcwNzU1NzMxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    };
    setUser(loggedInUser);
  };

  return (
    <div className="App">
      <TopBar user={user} onLogin={handleLogin} />
      <div className="Main">
        <Menu />
        <Feed user={user} posts={postsList} setPosts={setPostsList} />
      </div>
    </div>
  );
}

export default App;
