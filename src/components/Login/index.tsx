import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { auth, login } from "../../services/Auth.service";

function Login() {
  const [loginInput, setloginInput] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    auth().then((res) => navigate("/landing"));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginInput.password && loginInput.username) {
      login(loginInput.username, loginInput.password)
        .then((res) => {
          localStorage.setItem("userJWT", res);
          navigate("/landing");
        })
        .catch(console.error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Login to join a Chat!</h2>
      <form onSubmit={handleSubmit} className={styles["login-input-container"]}>
        <input
          type="text"
          placeholder="Enter Username"
          className={styles["login-input"]}
          required
          name="username"
          value={loginInput.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className={styles["login-input"]}
          required
          onChange={handleChange}
          value={loginInput.password}
          name="password"
        />
        <div>
          <button className={styles["login-button"]}>Login</button>
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
