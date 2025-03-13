import { useState, useEffect } from "react";
import axios from "axios";
import style from './CategoriesList.module.scss';

export const CategoriesList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4242/categories")
      .then(response => setCategories(response.data.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  
  return (
    <section className={style.categorySection}>
    <h3>Alle kategorier</h3>
    <ul>
      {categories.map((category) => (
        <li key={category.slug}>
          <button onClick={() => onSelectCategory(category.slug)}>
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  </section>


   
  );
};

