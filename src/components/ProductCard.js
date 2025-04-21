import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onClick, onAddToCart }) => {
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/250?text=Imagen+no+disponible";
  };

  return (
    <div style={styles.card}>
      <div onClick={onClick} style={styles.clickableArea}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.productImage}
          onError={handleImageError}
        />
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.productPrice}>{product.price}</p>
      </div>

      <button onClick={handleAddToCartClick} style={styles.addToCartButton}>
        <FaShoppingCart /> Añadir al carrito
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    transition: "transform 0.2s",
    position: "relative",
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
  },
  clickableArea: {
    cursor: "pointer",
    marginBottom: "10px",
  },
  productImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  productName: {
    margin: "5px 0",
    fontSize: "1rem",
    fontWeight: "600",
  },
  productPrice: {
    fontWeight: "bold",
    color: "#28a745",
    fontSize: "1.1rem",
    margin: "5px 0",
  },
  addToCartButton: {
    width: "100%",
    padding: "8px",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#218838",
    },
    fontSize: "0.9rem",
  },
};

export default ProductCard;
