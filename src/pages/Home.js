import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const products = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: 138.61,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Laptop Ultradelgada",
    price: 542.0,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Tablet Avanzada",
    price: 165.0,
    image:
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Smart TV 4K",
    price: 9999.99,
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Auriculares Inalámbricos",
    price: 388.12,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Teclado Mecánico",
    price: 138.61,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
];

const Home = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  // Generar rangos de precios de 100 en 100 hasta 10,000
  const generatePriceRanges = () => {
    const ranges = [];
    for (let i = 0; i <= 10000; i += 100) {
      if (i === 0) {
        ranges.push({ label: "Todos los precios", value: "all" });
      } else {
        ranges.push({
          label: `Q${i} - Q${i + 100}`,
          value: `${i}-${i + 100}`,
        });
      }
    }
    return ranges;
  };

  const priceRanges = generatePriceRanges();

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
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

  const filteredProducts = products.filter((product) => {
    // Filtro por búsqueda
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtro por rango de precio
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = product.price >= min && product.price < max;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <div>
      <Header cartItems={cartItems} />

      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          EzPurchase
        </h1>

        {/* Barra de búsqueda */}
        <div
          style={{
            margin: "0 auto 30px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />

          {/* Selector de rango de precios */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de productos */}
        <div style={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  price: `Q${product.price.toFixed(2)}`,
                }}
                onClick={() => navigate(`/product/${product.id}`)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <h3>No se encontraron productos</h3>
              <p>Intenta con otros filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    justifyContent: "center",
    padding: "20px",
