import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the category ID

export function Category() {
  const { categoryId } = useParams(); // Get category ID from the URL params
  const [category, setCategory] = useState(null);

  // Fetch category details based on the ID
  useEffect(() => {
    // Replace this with your actual API endpoint to fetch category details
    fetch(`http://localhost:4242/categories/${categoryId}`)
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching category:", error));
  }, [categoryId]);

  return (
    <div>
      {category ? (
        <div>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
