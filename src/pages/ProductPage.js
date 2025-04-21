import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaGoogle,
  FaPaperPlane,
} from "react-icons/fa";
import { useAuth } from "../firebase/auth/useAuth";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// Simulación de base de datos de productos
const products = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: 138.61,
    description:
      "Último modelo con cámara de 108MP, pantalla AMOLED de 6.7 pulgadas y batería de 5000mAh. Resistente al agua IP68.",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ['6.7" AMOLED', "108MP Triple Cámara", "5000mAh", "IP68"],
  },
  {
    id: 2,
    name: "Laptop Ultradelgada",
    price: 542.0,
    description:
      "Intel Core i7 de 11va generación, 16GB RAM DDR4, SSD NVMe de 512GB, pantalla IPS Full HD de 14 pulgadas.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ["i7-1165G7", "16GB RAM", "512GB SSD", '14" FHD'],
  },
  {
    id: 3,
    name: "Tablet Avanzada",
    price: 165.0,
    description:
      "Tablet de 10.1 pulgadas con resolución 2K, procesador octa-core, 6GB RAM y 128GB almacenamiento expandible.",
    image:
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ['10.1" 2K', "Octa-Core", "6GB RAM", "128GB+SD"],
  },
  {
    id: 4,
    name: 'Smart TV 4K 55"',
    price: 999.99,
    description:
      "Televisor 4K HDR con Android TV integrado, Dolby Vision, Alexa/Google Assistant y sonido Dolby Atmos.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ['55" 4K', "HDR10+", "Android TV", "Dolby Atmos"],
  },
  {
    id: 5,
    name: "Auriculares Inalámbricos",
    price: 388.12,
    description:
      "Auriculares con cancelación de ruido activa, 30h de batería, carga rápida USB-C y calidad de sonido Hi-Res.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ["ANC", "30h batería", "USB-C", "Hi-Res Audio"],
  },
  {
    id: 6,
    name: "Teclado Mecánico Gaming",
    price: 138.61,
    description:
      "Teclado mecánico RGB con switches Red, retroiluminación personalizable y construcción aluminio.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ["Switches Red", "RGB", "Anti-Ghosting", "Aluminio"],
  },
  {
    id: 7,
    name: 'Monitor Curvo 32"',
    price: 420.99,
    description:
      "Monitor gaming curvo 144Hz, QHD, 1ms de respuesta, FreeSync Premium y HDR400.",
    image:
      "https://images.unsplash.com/photo-1546538915-a9e2c8d1a4e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ['32" Curvo', "144Hz", "QHD", "HDR400"],
  },
  {
    id: 8,
    name: "Cámara Mirrorless",
    price: 899.0,
    description:
      "Cámara profesional 24.2MP, grabación 4K, estabilización 5 ejes y kit con lente 18-55mm.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    specs: ["24.2MP", "4K Video", "5-Axis IBIS", "Kit Lens"],
  },
];

const ProductPage = ({ cartItems, setCartItems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loginWithGoogle } = useAuth();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // Buscar el producto por ID
  const product = products.find((p) => p.id === parseInt(id));

  // Cargar comentarios
  React.useEffect(() => {
    if (!product) return;

    const q = query(
      collection(db, "products", product.id.toString(), "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
      setLoadingComments(false);
    });

    return () => unsubscribe();
  }, [product]);

  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Producto no encontrado</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  const handleGoBack = () => {
    const fromCart = location.state?.fromCart;
    const canGoBack = window.history.state?.idx > 0;

    if (fromCart) {
      navigate("/cart");
    } else if (canGoBack) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const addToCart = () => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} se ha añadido al carrito!`);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !currentUser) return;

    try {
      await addDoc(
        collection(db, "products", product.id.toString(), "comments"),
        {
          text: comment,
          user: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
          timestamp: new Date(),
        }
      );
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          borderBottom: "2px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ margin: 0 }}>Detalles del Producto</h2>
        <button
          onClick={handleGoBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            ":hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          <FaArrowLeft /> Volver
        </button>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          gap: "40px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        {/* Sección de imagen */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500?text=Imagen+no+disponible";
            }}
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          />
        </div>

        {/* Sección de información del producto */}
        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: 0, marginBottom: "15px", fontSize: "28px" }}>
            {product.name}
          </h1>

          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                color: "#28a745",
                margin: "0 0 10px 0",
                fontSize: "24px",
              }}
            >
              Q{product.price.toFixed(2)}
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "#555",
                lineHeight: "1.6",
              }}
            >
              {product.description}
            </p>
          </div>

          <button
            onClick={addToCart}
            style={{
              width: "100%",
              padding: "12px 20px",
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
              marginBottom: "20px",
            }}
          >
            <FaShoppingCart style={{ marginRight: "8px" }} /> Añadir al Carrito
          </button>
        </div>
      </div>

      {/* Sección de Comentarios */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>
          Comentarios ({comments.length})
        </h2>

        {currentUser ? (
          <form onSubmit={handleCommentSubmit} style={{ marginBottom: "30px" }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              style={{
                width: "100%",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                minHeight: "100px",
                marginBottom: "15px",
                fontSize: "16px",
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "12px 25px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaPaperPlane /> Publicar Comentario
            </button>
          </form>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <p style={{ marginBottom: "15px" }}>
              Inicia sesión con Google para dejar un comentario
            </p>
            <button
              onClick={loginWithGoogle}
              style={{
                padding: "12px 25px",
                backgroundColor: "#4285F4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: "0 auto",
              }}
            >
              <FaGoogle /> Continuar con Google
            </button>
          </div>
        )}

        {loadingComments ? (
          <p>Cargando comentarios...</p>
        ) : comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={
                      comment.user.avatar || "https://via.placeholder.com/40"
                    }
                    alt={comment.user.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>{comment.user.name}</h4>
                    <small style={{ color: "#666" }}>
                      {new Date(comment.timestamp?.toDate()).toLocaleString()}
                    </small>
                  </div>
                </div>
                <p style={{ margin: 0, paddingLeft: "55px" }}>{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
