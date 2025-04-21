import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/auth/useAuth";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaPaperPlane, FaGoogle } from "react-icons/fa";
import "./CommentSection.css";

const CommentSection = ({ productId }) => {
  const { currentUser, loginWithGoogle } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "products", productId, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addDoc(collection(db, "products", productId, "comments"), {
        text: comment,
        user: {
          id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
        timestamp: new Date(),
      });
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comentarios ({comments.length})</h3>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            required
          />
          <button type="submit" disabled={!comment.trim()}>
            <FaPaperPlane /> Enviar
          </button>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Inicia sesión con Google para comentar</p>
          <button onClick={loginWithGoogle} className="google-login-btn">
            <FaGoogle /> Continuar con Google
          </button>
        </div>
      )}

      {loading ? (
        <p>Cargando comentarios...</p>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <img
                  src={comment.user.avatar || "https://via.placeholder.com/40"}
                  alt={comment.user.name}
                  className="user-avatar"
                />
                <div>
                  <h4>{comment.user.name}</h4>
                  <small>
                    {new Date(comment.timestamp?.toDate()).toLocaleString()}
                  </small>
                </div>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
