import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/Auth.service";

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
          AuthService.auth().then(() => navigate("/landing"));
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
    <div className="page">
      <div className="page-header">
        <h2>Login to join a Chat!</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex-row-center gp-1 mt-2">
        <input
          type="text"
          placeholder="Enter Username"
          required
          name="username"
          value={loginInput.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          required
          onChange={handleChange}
          value={loginInput.password}
          name="password"
        />
        <div>
          <button>Login</button>
        </div>
      </form>
      <div className="mt-2 flex-row-center justify-center w-100">
        <Link to="/register">Or Register</Link>
      </div>
    </div>
  );
}

export { Login };
