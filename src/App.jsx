import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookie from "js-cookie";
import { useState } from "react";

import "./App.css";
import Header from "./components/Header";

import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";

function App() {
  const [isConnected, setIsConnected] = useState(Cookie.get("token") || false);

  return (
    <Router>
      <Header isConnected={isConnected} setIsConnected={setIsConnected} />
      <Routes>
        <Route path="/" element={<Navigate to="/characters" replace />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route
          path="/signup"
          element={<SignUp setIsConnected={setIsConnected} />}
        />
        <Route
          path="/login"
          element={<LogIn setIsConnected={setIsConnected} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
