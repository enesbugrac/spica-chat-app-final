import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/Auth.service";
import "./styles.css";

function Register() {
  const [registerInput, setregisterInput] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerInput.password && registerInput.username) {
      AuthService.register(registerInput.username, registerInput.password)
        .then((_) => navigate("/"))
        .catch((error) => alert(error.message));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setregisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Register to join a Chat!</h2>
      <form onSubmit={handleSubmit} className="register-input-container">
        <input
          type="text"
          placeholder="Enter Username"
          className="register-input"
          required
          name="username"
          value={registerInput.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="register-input"
          required
          onChange={handleChange}
          value={registerInput.password}
          name="password"
        />
        <div>
          <button className="register-button">Register</button>
        </div>
      </form>
      <div>
        <Link to="/" style={{ color: "var(--color-blue)" }}>
          Login
        </Link>
      </div>
    </>
  );
}

export { Register };
