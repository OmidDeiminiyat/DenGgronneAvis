import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./ProductSide.module.scss";
import { CategoriesList } from "./Categories/CategoriesList";

export const ProductSide = ({ productSlug: propSlug }) => {
  const { productSlug: urlSlug } = useParams(); // Get productSlug from URL
  const productSlug = propSlug || urlSlug; // Fallback to URL if prop isn't available
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productSlug) return;

    axios.get(`http://localhost:4242/products/${productSlug}`)
      .then(response => setProduct(response.data.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [productSlug]);

  if (!product) return <p>Loading product details...</p>;

  return (
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
    </main>
  );
};

/*
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./ProductSide.module.scss";

export const ProductSide = ({ productSlug }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productSlug) return;

    axios.get(`http://localhost:4242/products/${productSlug}`)
      .then(response => setProduct(response.data.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [productSlug]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <main className={style.ProductSide}>
      <div>
        <section>
          <figure>
            <img src={product.image} alt={product.name} />
            <figcaption>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h5>{product.price}</h5>
            </figcaption>
          </figure>
        </section>
      </div>
    </main>
  );
};

*/