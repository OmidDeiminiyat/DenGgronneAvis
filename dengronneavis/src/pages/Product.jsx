import React, { useEffect, useState } from 'react';
import style from './Product.module.scss';
import { Link } from 'react-router-dom';


export const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch categories
  useEffect(() => {
    fetch('http://localhost:4242/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Fetch products when category is selected
  useEffect(() => {
    if (selectedCategory) {
        fetch(`http://localhost:4242/products/category/${selectedCategory}?page=${currentPage}`)
          .then((response) => response.json())
          .then((data) => {
            setProducts(data.data); // Assuming response has an 'items' array for products
            setTotalPages(data.totalPages); // Assuming response includes total pages
          })
          .catch((error) => console.error('Error fetching products:', error));
      }
    }, [selectedCategory, currentPage]);

  console.log(products);

    // Handle page change
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
    <main className={style.productMain}>
        <hr />

      <div style={{ display: 'flex' }}>
        {/* Category List */}
        <section className={style.categorySection}>
          <h3>Alle kategorier</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.slug}>
                <button onClick={() => setSelectedCategory(category.slug)}>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
        {/* Product List */}
        <section className={style.productSection}>
          
          {selectedCategory && (
            <div>
              {products.length > 0 ? (
                products.map((product) => (
                    <Link to={`/pages/Product/${product.slug}`}>
                    <figure key={product.id}>
                            <img src={product.image} alt="" />
                            <span className={style.ProductName} >{product.price}</span>                        
                        <figcaption>
                        <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </figcaption>
                        
                    </figure>
                    </Link>
                ))
              ) : (
                <p>No products found for this category.</p>
              )}


              
            </div>
            
          )}
          {/* Pagination Controls */}
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

      </div>

    </main>
  );
};
