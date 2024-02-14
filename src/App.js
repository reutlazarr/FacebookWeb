// App.js
import React, { useState } from "react";
import "./App.css";
import Feed from "./screens/Feed";

function App() {
  return (
    <div className="App">
      <div className="Main">
        <Feed user={user} />
      </div>
    </div>
  );
}

export default App;
