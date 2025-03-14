import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function CategorySelect() {
  const [categories, setCategories] = useState([]); // Store categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Store selected category slug
  const [products, setProducts] = useState([]); // Store fetched products
  const navigate = useNavigate(); // Navigation function

  // Fetch categories from API
  useEffect(() => {
    axios.get("http://localhost:4242/categories")
      .then((response) => {
        const categoriesData = response.data.data; 
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData); // Set the categories list
        } else {
          console.error("API response does not contain an array in 'data'", categoriesData);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products by category slug
  const fetchProductsByCategory = async (categorySlug) => {
    try {
      const response = await fetch(`http://localhost:4242/products/category/${categorySlug}`, {
        method: "GET",
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products || []); // Set the products list
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle category selection
  const handleChange = (event) => {
    const categorySlug = event.target.value; // Get category slug
    setSelectedCategory(categorySlug);
    fetchProductsByCategory(categorySlug); // Fetch products for selected category
    navigate(`/pages/newProduct`); // Navigate to the new product page
  };

  return (
    <div>
      {/* Category Selection */}
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small" style={{ margin: '0px', padding: '0' }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.length > 0 ? (
            categories.map((category) => (
              <MenuItem key={category.id} value={category.slug}> {/* Use slug instead of ID */}
                {category.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No categories available</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Display Products */}
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong> - {product.price} kr
              </li>
            ))}
          </ul>
        ) : selectedCategory ? (
          <p>No products found for this category.</p>
        ) : null}
      </div>
    </div>
  );
}
