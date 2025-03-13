import { useState } from "react";
import style from './Annonce.module.scss';
import { BasicModal } from './../components/basicModal/BasicModal'; // modal component

export function Annonce() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category_id: "",
  });

  const [modalOpen, setModalOpen] = useState(false); // for modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var urlencoded = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      urlencoded.append(key, formData[key]);
    });
    const accessToken = localStorage.getItem('access_token');
    var requestOptions = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`, 
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:4242/products", requestOptions);
      const result = await response.json();
      console.log(result);
      setModalOpen(true);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
        <main className={style.mainAnnonce}>
           <hr />
    
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl mb-4">Opret ny annonce</h3>
      <p> Her kan du oprette en ny annonce. <br />
        Du har mulighed for at slette dine annoncer igen under “min konto” siden
      </p>
      <div>
        <label>Title</label>
        <input type="text" name="name" placeholder="Title på diditn produkt" onChange={handleChange} required  />
      </div>
      <div>
        <label>Kategori</label>
        <input type="number" name="category_id" placeholder="Hvilken kategory tilhøre dit produkt" onChange={handleChange} required />
      </div> 
      <div>
        <label>Annonce text</label>
        <textarea name="description"  rows='6' placeholder="Skriv en annonce tekst her der beskriver produkt" onChange={handleChange} required />
      </div>
        <div>
            <label>URL til billede</label>
            <input type="text" name="image" placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."  onChange={handleChange} required />
        </div>

        <div>
            <label> Pris </label>
            <input type="number" name="price" placeholder="Pris" onChange={handleChange} required  />
        </div>
      
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Create Product
        </button>
    </form>
    <BasicModal open={modalOpen} handleClose={() => setModalOpen(false)} />
   
    </main>
  );
}
