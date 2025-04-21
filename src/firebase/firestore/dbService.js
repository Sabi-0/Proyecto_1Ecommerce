import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const commentService = {
  // Añadir nuevo comentario
  async addComment(productId, commentData) {
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        productId,
        ...commentData,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding comment: ", error);
      throw error;
    }
  },

  // Obtener comentarios por producto
  async getCommentsByProduct(productId) {
    try {
      const q = query(
        collection(db, "comments"),
        where("productId", "==", productId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting comments: ", error);
      throw error;
    }
  },
};
