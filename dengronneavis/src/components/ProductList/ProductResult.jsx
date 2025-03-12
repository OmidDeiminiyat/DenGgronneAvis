import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from './ProductList.module.scss';

export const ProductResult = ({ categorySlug }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categorySlug) return;
    
    axios.get(`http://localhost:4242/products/category/${categorySlug}`)
     .then(response => {
        setProducts(response.data.data);
        setTotalPages(response.totalPages);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, [categorySlug]);


  console.log(products);

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
              
                    <figure key={product.id} onClick={() => navigate(`/pages/NewProduct/${product.slug}`)}>
                            <img src={product.image} alt="" />
                            <span className={style.ProductName} >{product.price}</span>                        
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