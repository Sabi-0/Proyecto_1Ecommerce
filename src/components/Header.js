import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../firebase/auth/useAuth";
import "./Header.css";
import Banner from "./purchaselogo.png";

function Header({ cartItems = [] }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para mostrar el nombre de usuario
  const displayUserName = () => {
    if (!currentUser) return "Invitado";

    // Para usuarios anónimos
    if (currentUser.isAnonymous) return "Invitado";

    // Para usuarios registrados con email
    if (currentUser.email) {
      return currentUser.email.split("@")[0];
    }

    // Para otros proveedores (Google, etc.)
    return currentUser.displayName || "Usuario";
  };

  return (
    <header className="header">
      <div className="banner">
        <img src={Banner} alt="Banner" className="banner-image" />
        <div className="overlay">
          <h1>EzPurchase</h1>
          <p>Shop like a normal person.</p>
        </div>
      </div>
      <nav className="nav">
        {currentUser ? (
          <div className="user-controls">
            <div className="user-info">
              <span className="user-email">
                <FaUser style={{ marginRight: "5px" }} />
                {displayUserName()}
              </span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt /> Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Iniciar Sesión
          </Link>
        )}
        <Link to="/cart" className="cart-button">
          <FaShoppingCart />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
