import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/Auth.service";

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
    <div className="page">
      <div className="page-header">
        <h2>Register to join a Chat!</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex-row-center gp-1 mt-2">
        <input
          type="text"
          placeholder="Enter Username"
          required
          name="username"
          value={registerInput.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          required
          onChange={handleChange}
          value={registerInput.password}
          name="password"
        />
        <div>
          <button>Register</button>
        </div>
      </form>
      <div className="mt-2 flex-row-center justify-center w-100">
        <Link to="/">Or Login</Link>
      </div>
    </div>
  );
}

export { Register };
