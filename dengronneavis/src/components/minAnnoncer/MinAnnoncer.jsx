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
            .then(data => setUsers(data.data.products))
            .catch(error => console.log("Error:", error));
        }, []); // Runs once when component mounts
        


    return (
      
        <main className={style.minAnnonce}>
            {users.map((items) => (
                <>
                <section>
                    <div>
                        <article>
                            <h4>{items.name}</h4>
                            <h4> Pris: {items.price} kr</h4>
                        </article>
                        <p>{items.description}</p>
                    </div>
                    <figure>
                        <img src={items.image} alt={items.name} />
                    </figure>
                </section>
                <div>
                    <Link to="/pages/annonce">Gå til annonce</Link>
                    <button> Delete item </button>
                </div>
                
               </>
            ))}
            
        </main>
    );
  }
  