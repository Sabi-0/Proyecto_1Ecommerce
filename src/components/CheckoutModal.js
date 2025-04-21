import React, { useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../firebase/auth/useAuth";

const CheckoutModal = ({ setIsModalOpen, cartItems, setCartItems }) => {
  const { currentUser, loginWithGoogle, loginWithEmail } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(
    currentUser ? "payment" : "auth"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      setCheckoutStep("payment");
      setError("");
    } catch (err) {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setCheckoutStep("auth");
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setCartItems([]);
        setIsModalOpen(false);
      }, 2000);
    }, 1500);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={{ margin: 0 }}>
            {checkoutStep === "auth"
              ? "Autenticación Requerida"
              : "Finalizar Compra"}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            style={styles.closeButton}
          >
            <FaTimes />
          </button>
        </div>

        {isSuccess ? (
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>
              <FaCheck />
            </div>
            <h3>¡Compra realizada con éxito!</h3>
            <p>Gracias por tu compra.</p>
          </div>
        ) : checkoutStep === "auth" ? (
          <div>
            <p style={styles.authMessage}>
              Para continuar con tu compra, inicia sesión o regístrate
            </p>

            {error && <p style={styles.errorMessage}>{error}</p>}

            {!showEmailForm ? (
              <>
                <button
                  onClick={() => {
                    loginWithGoogle()
                      .then(() => setCheckoutStep("payment"))
                      .catch((err) => setError(err.message));
                  }}
                  style={styles.googleButton}
                >
                  <FaGoogle /> Continuar con Google
                </button>

                <button
                  onClick={() => setShowEmailForm(true)}
                  style={styles.emailButton}
                >
                  <FaEnvelope /> Continuar con Email
                </button>

                <p style={styles.guestWarning}>
                  Los usuarios invitados no pueden realizar compras. Por favor
                  inicia sesión.
                </p>
              </>
            ) : (
              <form onSubmit={handleEmailLogin} style={styles.loginForm}>
                <div style={styles.formGroup}>
                  <FaEnvelope style={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.inputField}
                  />
                </div>

                <div style={styles.formGroup}>
                  <FaLock style={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.inputField}
                  />
                </div>

                <button type="submit" style={styles.submitButton}>
                  Iniciar Sesión
                </button>

                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  style={styles.backButton}
                >
                  <FaArrowLeft /> Volver a opciones
                </button>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={styles.orderSummary}>
              <h3>Resumen de Compra</h3>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.orderItem}>
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>Q{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div style={styles.orderTotal}>
                <span>Total:</span>
                <span>Q{total.toFixed(2)}</span>
              </div>
            </div>

            <div style={styles.formSection}>
              <label style={styles.label}>Método de Pago:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.selectInput}
              >
                <option value="credit">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>

            <div style={styles.formSection}>
              <label style={styles.label}>Dirección de Envío:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa tu dirección completa"
                required
                style={styles.textInput}
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              style={{
                ...styles.confirmButton,
                backgroundColor: isProcessing ? "#6c757d" : "#28a745",
              }}
            >
              {isProcessing ? "Procesando..." : "Confirmar Compra"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  successContainer: {
    textAlign: "center",
    padding: "20px",
  },
  successIcon: {
    fontSize: "4rem",
    color: "#28a745",
    marginBottom: "20px",
  },
  orderSummary: {
    margin: "1.5rem 0",
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
    padding: "1rem 0",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  orderTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #eee",
  },
  formSection: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
  },
  selectInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  textInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  confirmButton: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  authMessage: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#555",
  },
  errorMessage: {
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    marginBottom: "1rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "all 0.3s",
    backgroundColor: "#4285F4",
    color: "white",
  },
  emailButton: {
    width: "100%",
    padding: "12px",
    marginBottom: "1rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "all 0.3s",
    backgroundColor: "#f1f1f1",
    color: "#333",
  },
  guestWarning: {
    textAlign: "center",
    color: "#d32f2f",
    fontSize: "0.9rem",
    marginTop: "1.5rem",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "15px",
    color: "#666",
  },
  inputField: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#666",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    gap: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default CheckoutModal;
