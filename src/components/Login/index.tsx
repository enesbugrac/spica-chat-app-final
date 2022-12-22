import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/Auth.service";
import "./styles.css";

function Login() {
  const [loginInput, setloginInput] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginInput.password && loginInput.username) {
      AuthService.login(loginInput.username, loginInput.password)
        .then(async (res) => {
          localStorage.setItem("userJWT", res);
          await AuthService.auth();
        })
        .catch((err) => alert(err.message))
        .finally(() => {
          navigate("/");
        });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Login to join a Chat!</h2>
      <form onSubmit={handleSubmit} className="login-input-container">
        <input
          type="text"
          placeholder="Enter Username"
          className="login-input"
          required
          name="username"
          value={loginInput.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
          required
          onChange={handleChange}
          value={loginInput.password}
          name="password"
        />
        <div>
          <button className="login-button">Login</button>
        </div>
      </form>
      <div>
        <Link to="/register" style={{ color: "var(--color-blue)" }}>
          Register
        </Link>
      </div>
    </>
  );
}

export { Login };
