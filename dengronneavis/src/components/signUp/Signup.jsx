import { useState } from "react";
import style from './SignUp.module.scss';
import { Donations } from "../donation/Donation";

export const SignUp = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    zipcode: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.zipcode) newErrors.zipcode = "Zipcode is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    let urlencoded = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      urlencoded.append(key, formData[key]);
    });

    let requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:4242/users", requestOptions);
      const data = await response.json(); // Assuming server returns JSON
      if (response.ok) {
        setMessage("Signup successful! You can now log in.");
        setFormData({
          email: "",
          password: "",
          firstname: "",
          lastname: "",
          address: "",
          zipcode: "",
          city: "",
        });

      } else {
        setErrors({ api: data.message || "Signup failed" });
      }
    } catch (error) {
      setErrors({ api: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <main className={style.SignUp}>
        <hr />        
        {message && <p className="success">{message}</p>}
        {errors.api && <p className="error">{errors.api}</p>}
        <form onSubmit={handleSubmit}>
            <h3>Opret en konto</h3>
            <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
            <label>First Name:</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
            {errors.firstname && <p className="error">{errors.firstname}</p>}
            </div>
            <div>
            <label>Last Name:</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
            </div>
            <div>
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="error">{errors.address}</p>}
            </div>
            <div>
            <label>Zipcode:</label>
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            </div>
            <div>
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <p>Har du allerede en konto hos os? Klivk <span onClick={toggleForm} > her </span> for at vende tilbage til login</p>
            <span className={style.inputsSpan}>
                <section>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    <label for="vehicle1"> Jeg har læst og forstået de gældende betingelser for oprettelse af kundekonto og brug af denne side </label>
                </section>          
                <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
            </span>
            
        </form>
        <Donations />
    </main>
    
    </>
   
  );
};

