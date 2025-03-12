import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CategoriesList } from "./Categories/CategoriesList";
import style from './ProductSide.module.scss';

const ProductSide = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4242/products/${productSlug}`)
      .then(response => setProduct(response.data.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [productSlug]);

  console.log(product);
  
  if (!product) return <p>Loading product details...</p>;

  return (

   
    <main className={style.ProductSide}>
        <hr />
        <div>
            <section>
                <CategoriesList />
            </section>
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

export default ProductSide;
