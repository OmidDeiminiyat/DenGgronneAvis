import { useState } from "react";
import { CategoriesList } from "../components/Categories/CategoriesList";
import { ProductResult } from "../components/ProductList/ProductResult";
import style from './newproduct.module.scss';
import { Routes, Route } from "react-router-dom";
import ProductSide from "../components/ProductSide";

export const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <main className={style.newProducts} >
        <hr />
        <div className={style.datas}>
            <CategoriesList onSelectCategory={setSelectedCategory} />
            <ProductResult categorySlug={selectedCategory} />
            <Routes>
                <Route path="/pages/newProduct/:productSlug" element={<ProductSide />} />
            </Routes>
        </div>
    </main>
  );
};

