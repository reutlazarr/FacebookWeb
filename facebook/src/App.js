//import logo from './logo.svg';
import './App.css';
import Login from './screen/Login';
import Registration from './screen/Registration';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;