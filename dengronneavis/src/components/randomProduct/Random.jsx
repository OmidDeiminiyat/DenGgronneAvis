import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './Random.module.scss';
import { useNavigate } from "react-router-dom"; 

export function RandomProducts() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get("http://localhost:4242/products")
      .then((response) => {
        const productsData = response.data.data;
        if (Array.isArray(productsData)) {
          setProducts(productsData);
          setRandomProducts(getRandomItems(productsData, 6)); 
        } else {
          console.error("API response does not contain an array of products", productsData);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const getRandomItems = (arr, numberOfItems) => {
    let shuffled = [...arr].sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, numberOfItems);
  };

  return (
    <div className={style.random}>
      <hr />
      <h3>Udvalgte Produkter</h3>
      <div className={style.productsList}>
        
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <div
              className={style.fistDiv}
              key={product.id}
              onClick={() => navigate(`/pages/newProduct/${product.slug}`)} 
            >
              <img src={product.image} alt="" />
              <span className={style.ProductName}>{product.name}</span>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

