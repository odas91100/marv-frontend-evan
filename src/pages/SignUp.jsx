import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handleChange from "../assets/utils/handleChange";

const API_BASE = import.meta.env.VITE_API_BASE;

const SignUp = ({ setIsConnected }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`${API_BASE}/api/user/signup`, {
        username,
        email,
        password,
        newsletter,
      });
      Cookie.set("token", data.token);
      setIsConnected(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setErr(error?.response?.data?.message || "Inscription impossible.");
    }
  };

  return (
    <main className="signup">
      <div className="container">
        <h1>S'inscrire</h1>
        {err && <p className="error">{err}</p>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(element) => handleChange(element, setUsername)}
            required
          />
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
          <label className="checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(element) => setNewsletter(element.target.checked)}
            />
            Newsletter
          </label>
          <button className="btn btn-signup">S'inscrire</button>
        </form>
      </div>
    </main>
  );
};
export default SignUp;
