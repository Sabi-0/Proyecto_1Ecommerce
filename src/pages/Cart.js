import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "../components/CheckoutModal";
import { FaArrowLeft, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = ({ cartItems = [], setCartItems }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        minHeight: "calc(100vh - 100px)",
      }}
    >
      {/* Encabezado con botón de volver */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          borderBottom: "1px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <h1 style={{ margin: 0 }}>Carrito de Compras</h1>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            ":hover": {
              backgroundColor: "#5a6268",
            },
          }}
        >
          <FaArrowLeft /> Volver
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            Tu carrito está vacío
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Ir a la Tienda
          </button>
        </div>
      ) : (
        <div>
          {/* Lista de productos en el carrito */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                borderBottom: "1px solid #eee",
                gap: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flex: 1,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/80?text=Imagen+no+disponible";
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                    {item.name}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      color: "#28a745",
                      fontWeight: "bold",
                    }}
                  >
                    Q{item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Controles de cantidad y eliminar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "nowrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#f8f9fa",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      padding: "5px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span style={{ minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{
                      padding: "5px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ffc107",
                    color: "#212529",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Resumen y botones de acción */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <span>Subtotal:</span>
              <span>Q{total.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                fontSize: "14px",
                color: "#6c757d",
              }}
            >
              <span>Envío:</span>
              <span>Se calcula al finalizar</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
                fontSize: "20px",
                fontWeight: "bold",
                paddingTop: "15px",
                borderTop: "1px solid #dee2e6",
              }}
            >
              <span>Total:</span>
              <span style={{ color: "#28a745" }}>Q{total.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "12px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  ":hover": {
                    backgroundColor: "#5a6268",
                  },
                }}
              >
                Seguir Comprando
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "12px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  ":hover": {
                    backgroundColor: "#218838",
                  },
                }}
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CheckoutModal
          setIsModalOpen={setIsModalOpen}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}
    </div>
  );
};

export default Cart;
