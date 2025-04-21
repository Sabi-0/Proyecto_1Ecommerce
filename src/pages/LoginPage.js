import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../firebase/auth/useAuth";
import { FaGoogle, FaSpinner, FaEnvelope, FaUserAlt } from "react-icons/fa";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { loginWithGoogle, loginWithEmail, loginAsGuest } = useAuth();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginAsGuest();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      console.error("Error en login invitado:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      console.error("Error en login con email:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

        {error && <div style={styles.error}>{error}</div>}

        {showEmailForm ? (
          <form onSubmit={handleEmailLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.buttonLoading : styles.emailButton}
            >
              {loading ? (
                <>
                  <FaSpinner style={styles.spinner} />
                  Procesando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              style={styles.secondaryButton}
            >
              Volver
            </button>
          </form>
        ) : (
          <>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              style={loading ? styles.buttonLoading : styles.button}
            >
              {loading ? (
                <>
                  <FaSpinner style={styles.spinner} />
                  Procesando...
                </>
              ) : (
                <>
                  <FaGoogle />
                  Continuar con Google
                </>
              )}
            </button>

            <button
              onClick={() => setShowEmailForm(true)}
              disabled={loading}
              style={styles.emailButton}
            >
              <FaEnvelope />
              Continuar con Email
            </button>

            <button
              onClick={handleGuestLogin}
              disabled={loading}
              style={styles.guestButton}
            >
              <FaUserAlt />
              Continuar como Invitado
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Agrega estos nuevos estilos al objeto styles:
const styles = {
  // ... (mantén los estilos existentes)
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  emailButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#34a853",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "0.5rem",
  },
  guestButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "0.5rem",
  },
  secondaryButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "transparent",
    color: "#555",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "0.5rem",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonLoading: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#757575",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "not-allowed",
  },
  spinner: {
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default LoginPage;
