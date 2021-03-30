import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false);

  const login = useSelector((s) => s.login);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9999/usuario/login", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
        method: "POST",
      });
      const data = await res.json();
      dispatch({ type: "login", data });
      console.log(data);
    } catch (e) {
      console.warn(e);
      setError(true);
    }
  };
  if (login) return <Redirect to="/" />;

  return (
    <div className="loginpage">
      <h2 className="logintitle">Iniciar sesión</h2>
      <form className="loginform" onSubmit={handleSubmit}>
        <label>
          email:
          <input
            className="icorreo"
            value={email}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Contraseña:
          <input
            className="ipassword"
            value={contrasena}
            required
            type="password"
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <br></br>
        <button className="loginbutton">Entrar</button>

        {error && <div>Usuario o contraseña incorrecto</div>}
        <div>
          <Link className="forgotpass" to="/usuario/recover-contrasena">
            <p className="forgottext">¿Has olvidado la contraseña?</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
