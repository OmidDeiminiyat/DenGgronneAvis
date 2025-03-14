import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './RandomCategory.module.scss';
import { useNavigate } from "react-router-dom";

export function RandomCategory({onSelectCategory}) {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();


  // Fetch products from API
  useEffect(() => {
    axios.get("http://localhost:4242/categories")
      .then((response) => {
        const productsData = response.data.data; // Assuming response.data.data contains the products array
        if (Array.isArray(productsData)) {
          setProducts(productsData);
          setRandomProducts(getRandomItems(productsData, 6)); // Get 6 random products
        } else {
          console.error("API response does not contain an array of products", productsData);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Function to get random items from an array
  const getRandomItems = (arr, numberOfItems) => {
    let shuffled = [...arr].sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, numberOfItems); // Get the first 'numberOfItems' items
  };

  console.log(randomProducts);
  const handleCategoryClick = (categorySlug) => {
    if (onSelectCategory) {
      onSelectCategory(categorySlug); // Call the passed function to select category
    }
    navigate(`/pages/newProduct/${categorySlug}`); // Navigate to the NewProduct page with the category
  };

  return (
    <div className={style.random} >
        <hr />
     <h3>Udvalgte Kategorier</h3>
      <div className={style.productsList}>
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <div className={style.fistDiv} key={product.id} onClick={() => handleCategoryClick(product.slug)} >
              <img src={product.category_image} alt={product.name} />
              <span className={style.ProductName} >{product.name}</span>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}
