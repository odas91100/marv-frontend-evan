import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import handleChange from "../assets/utils/handleChange";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = ({ setIsConnected }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    try {
      const { data } = await axios.post(`${API_BASE}/api/user/login`, {
        email,
        password,
      });
      Cookie.set("token", data.token);
      setIsConnected(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setErr(error?.response?.data?.message || "Connexion impossible.");
    }
  };

  return (
    <main className="login">
      <div className="container">
        <h1>Se connecter</h1>
        {err && <p className="error">{err}</p>}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(element) => handleChange(element, setEmail)}
            required
          />

          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(element) => handleChange(element, setPassword)}
            required
          />

          <button className="btn btn-login">Se connecter</button>
        </form>
      </div>
    </main>
  );
};
export default Login;
