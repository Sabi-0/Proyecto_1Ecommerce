import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 138.61,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Producto 2",
    price: 542.0,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  { id: 3, name: "Producto 3", price: 165.0 },
  { id: 4, name: "Producto 4", price: 9999.99 },
  { id: 5, name: "Producto 5", price: 388.12 },
  { id: 6, name: "Producto 6", price: 138.61 },
];

const Home = ({ cartItems, setCartItems }) => {
  // Recibe las props
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Convertir precio a número si es string (ej: "Q138.61" -> 138.61)
      const price =
        typeof product.price === "string"
          ? parseFloat(product.price.replace("Q", ""))
          : product.price;

      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          price: price || 0,
        },
      ];
    });
  };

  return (
    <div>
      <Header cartItems={cartItems} />

      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>EzPurchase</h1>
        <div style={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: `Q${product.price.toFixed(2)}`,
              }}
              onClick={() => navigate(`/product/${product.id}`)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
};

export default Home;
