import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./ProductSide.module.scss";
import { CategoriesList } from "./Categories/CategoriesList";
import { Comments } from "./comments/Comments";

export const ProductSide = ({ productSlug: propSlug }) => {
  const { productSlug: urlSlug } = useParams(); // Get productSlug from URL
  const productSlug = propSlug || urlSlug; // Fallback to URL if prop isn't available
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!productSlug) return;

    axios.get(`http://localhost:4242/products/${productSlug}`)
      .then(response => setProduct(response.data.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [productSlug]);

  if (!product) return <p>Loading product details...</p>;



  
  // insert new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    var urlencoded = new URLSearchParams();
    urlencoded.append("comment", comment);
    const accessToken = localStorage.getItem('access_token');
    var requestOptions = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,  // Replace with your actual token
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded,
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:4242/comment/${product.id}`, requestOptions);
      const result = await response.text();
      console.log(result);
      alert("Comment submitted successfully!");
      setComment(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit comment.");
    }
  };

  

  return (
    <>
    <main className={style.ProductSide}>
     
    <div>
      <figure>
        <img src={product.image} alt={product.name} />
        <figcaption>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h5>{product.price}</h5>
        </figcaption>
      </figure>
    </div>
  
    <section className={style.comment}>
      <hr />
      <h3>Kontakt sælger</h3>
      <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Skriv en besked til sælger........"
        rows="4"
        style={{ padding: "10px", fontSize: "16px", width: "100%" }}
      />
      <button type="submit" style={{ padding: "10px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
        Send
      </button>
    </form>
    </section>
     
      {product && <Comments product={product.id} />}
      </main>
    </>
  );
};
