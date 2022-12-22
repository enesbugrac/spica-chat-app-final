import { useEffect } from "react";
import {  Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { ChatRoom } from "./components/ChatRoom";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import AuthService from "./services/Auth.service";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    AuthService.auth().catch(() => navigate("/"));
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/room/:id" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}
export default App;
