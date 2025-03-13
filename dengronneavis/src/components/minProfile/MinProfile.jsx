
  import { useState } from "react";
  import style from './MinProfile.module.scss';

  export function ProfileForm() {
    const [formData, setFormData] = useState({
      email: "",
      firstname: "",
      lastname: "",
      address: "",
      zipcode: "",
      city: "",
      hasNewsletter: false,
      hasNotification: false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlencoded = new URLSearchParams();
        Object.keys(formData).forEach((key) => {
          urlencoded.append(key, formData[key]);
        });
        
        const accessToken = localStorage.getItem('access_token');
        
        const requestOptions = {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${accessToken}`, 
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: urlencoded,
          redirect: "follow",
        };
      
        fetch("http://localhost:4242/users", requestOptions)
          .then((response) => response.json())  // Convert response to JSON
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      };
      
  
    return (
      <form className={style.minProfile} onSubmit={handleSubmit}>
        <section className={style.firstSec} >
            <div>
                <label>Fornavn:</label>
                <input type="text" name="firstname" placeholder="Dit navn" className="border p-2 w-full mb-2" onChange={handleChange} />
            </div>

            <div>
                <label>Efternavn</label>
                <input type="text" name="lastname" placeholder="Dit efternavn" className="border p-2 w-full mb-2" onChange={handleChange} />
            </div>

            <div>
                <label>Adresse</label>
                <input type="text" name="address" placeholder="Din Adresse" className="border p-2 w-full mb-2" onChange={handleChange} />
            </div>

            <div>
                <label>Postnummer</label>
                <input type="text" name="zipcode" placeholder="Dit postnummer" className="border p-2 w-full mb-2" onChange={handleChange} />
            </div>

            <div>
                <label>telefon</label>
                <input type="text" name="city" placeholder="City" className="border p-2 w-full mb-2" onChange={handleChange} />
            </div>

            <div>
                <label>Email:</label>
                <input type="email" name="email" placeholder="Din email addresse" className="border p-2 w-full mb-2" onChange={handleChange} />
            </div>
        </section>
        <section className={style.secondSec} >
            <div className={style.checkBox}>
                <label>Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud, ekslusive deals og lignende promoverings-mails fra den grønne avis og samarbejds-parnere?</label>
                <input type="checkbox" name="hasNewsletter" onChange={handleChange} /> 
                
            </div>
            <div className={style.checkBox}>
                <label>Jeg ønsker at modtage notifikationer i form af emails når der sker en opdatering på en af mine annoncer eller jeg modtager en ny henvendelse?</label>
                <input type="checkbox" name="hasNotification" onChange={handleChange} /> 
                
            </div>
            <div className={style.profBut} >
                <button type="">Slet profile</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Gem ændringer</button>
            </div>
            
        </section>
        
      </form>
    );
  }