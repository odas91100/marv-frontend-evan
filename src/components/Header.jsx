import { Link, NavLink } from "react-router-dom";
import Cookie from "js-cookie";
import logo from "../assets/images/logo.png";

const Header = ({ isConnected, setIsConnected }) => {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand">
          <img src={logo} alt="Marvel Logo" className="brand-logo" />
        </Link>

        <nav className="main-nav">
          <NavLink to="/characters" className="navlink">
            Personnages
          </NavLink>
          <NavLink to="/comics" className="navlink">
            Comics
          </NavLink>
        </nav>

        <div className="auth">
          {isConnected ? (
            <button
              className="btn"
              onClick={() => {
                setIsConnected(false);
                Cookie.remove("token");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-signupp">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-login">Se connecter</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
