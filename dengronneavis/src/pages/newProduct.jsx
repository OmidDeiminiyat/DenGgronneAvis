

import { useState } from "react";
import { CategoriesList } from "../components/Categories/CategoriesList";
import { ProductResult } from "../components/ProductList/ProductResult";
import { ProductSide } from "../components/ProductSide";
import style from "./newproduct.module.scss";
import { Routes, Route, useParams } from "react-router-dom";

export const NewProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProductSlug(null); // Reset product selection when a new category is chosen
  };

  const handleProductSelect = (productSlug) => {
    setSelectedProductSlug(productSlug); // Set the product slug when a product is clicked
  };

  const { productSlug: urlProductSlug } = useParams(); // Get productSlug from URL

  return (
    <main className={style.newProducts}>
      <hr />
      <div className={style.datas}>
        {/* Categories List is always visible */}
        <span className={style.cateStyle}>
          <CategoriesList onSelectCategory={handleCategorySelect} />
        </span>


        {/* Product List (Show when no product is selected) */}
        {!selectedProductSlug && !urlProductSlug && (
          <ProductResult categorySlug={selectedCategory} onSelectProduct={handleProductSelect} />
        )}

        {/* Product Details (Show when a product is selected either by click or URL) */}
        {(selectedProductSlug || urlProductSlug) && (
          <ProductSide productSlug={selectedProductSlug || urlProductSlug} />
        )}
      </div>
    </main>
  );
};
