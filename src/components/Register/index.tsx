import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { auth, register } from "../../services/Auth.service";
function Register() {
  const [registerInput, setregisterInput] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  useEffect(() => {
    auth().then((res) => navigate("/landing"));
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerInput.password && registerInput.username) {
      register(registerInput.username, registerInput.password)
        .then((res) => navigate("/"))
        .catch(console.error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setregisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Register to join a Chat!</h2>
      <form
        onSubmit={handleSubmit}
        className={styles["register-input-container"]}
      >
        <input
          type="text"
          placeholder="Enter Username"
          className={styles["register-input"]}
          required
          name="username"
          value={registerInput.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className={styles["register-input"]}
          required
          onChange={handleChange}
          value={registerInput.password}
          name="password"
        />
        <div>
          <button className={styles["register-button"]}>Register</button>
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
