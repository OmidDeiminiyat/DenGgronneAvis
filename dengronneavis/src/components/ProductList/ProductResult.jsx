import { useState, useEffect } from "react";
import axios from "axios";
import style from "./ProductList.module.scss";

export const ProductResult = ({ categorySlug, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    if (!categorySlug) return;

    axios.get(`http://localhost:4242/products/category/${categorySlug}`)
      .then(response => setProducts(response.data.data))
      .catch(error => console.error("Error fetching products:", error));
  }, [categorySlug]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className={style.productSection}>
      {categorySlug ? (
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <figure key={product.id} onClick={() => onSelectProduct(product.slug)}>
                <img src={product.image} alt={product.name} />
                <figcaption>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </figcaption>
              </figure>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      ) : (
        <p>Select a category to see products</p>
      )}
      <div className={style.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Forrige side
        </button>
        <span> Side {currentPage} of {totalPages} </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Næste side
        </button>
      </div>
    </section>
  );
};
