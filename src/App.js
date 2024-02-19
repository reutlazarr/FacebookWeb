import './App.css';
import Login from './screens/Login';
import Registration from './screens/Registration';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./screens/Feed";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/signIn' element={Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
