import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export function CategorySelect() {
  const [categories, setCategories] = useState([]); // Initial state is an empty array
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate(); // Create a navigate function

  // Fetch categories from API
  useEffect(() => {
    axios.get("http://localhost:4242/categories")
      .then((response) => {
        const categoriesData = response.data.data; // Access data from 'data' field
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData); // Set the categories array
        } else {
          console.error("API response does not contain an array in the 'data' field", categoriesData);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    navigate(`/pages/Category/${categoryId}`); // Navigate to the category page
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small" style={{margin: '0px', padding: '0'}}>
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
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No categories available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
