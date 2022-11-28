import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import { ChatRoom } from "./components/ChatRoom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles["container"]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/room/:id" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
