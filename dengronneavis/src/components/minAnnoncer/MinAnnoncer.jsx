import style from './MinAnnoncer.module.scss';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export function AnnonceForm() {
    const accessToken = localStorage.getItem('access_token');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4242/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setUsers(data.data.products)) // Adjust based on API response
            .catch(error => console.log("Error:", error));
    }, []); // Runs once when component mounts

    // Function to delete a product
    const deleteProduct = (productId) => {
        var urlencoded = new URLSearchParams();

        var requestOptions = {
            method: 'DELETE',
            body: urlencoded,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            redirect: 'follow'
        };

        fetch(`http://localhost:4242/products/${productId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete product with ID: ${productId}`);
                }
                return response.text();
            })
            .then(() => {
                // Remove the deleted item from state
                setUsers(users.filter(item => item.id !== productId));
            })
            .catch(error => console.log("Error:", error));
    };

    return (
        <main className={style.minAnnonce}>
            {users.map((item) => (
              <>
                <section key={item.id}>
                    <div>
                        <article>
                            <h4>{item.name}</h4>
                            <h4>Pris: {item.price} kr</h4>
                        </article>
                        <p>{item.description}</p>
                    </div>
                    <figure>
                        <img src={item.image} alt={item.name} />
                    </figure>
                </section>
                <div className={style.annonceLinks}>
                <Link to="/pages/annonce">Gå til annonce</Link>
                <button onClick={() => deleteProduct(item.id)}>Delete item</button>
                </div>
            </>
            ))}
        </main>
    );
}
