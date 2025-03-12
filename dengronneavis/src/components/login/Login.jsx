import { useState } from "react";
import style from './Login.module.scss';
import { Donations } from "../donation/Donation";

export const LogedIn = ({ toggleForm }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) {
      newErrors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
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
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", formData.username);
    urlencoded.append("password", formData.password);

    let requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:4242/login", requestOptions);
      const data = await response.json(); 
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        window.location.href = './Profile'
      } else {
        setErrors({ api: data.message || "Login failed" });
      }
    } catch (error) {
      setErrors({ api: "Server error. Please try again." });
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <>

    <main className={style.Login}>
        <hr />
        <section className={style.loginSection}>
                <h3>Velkommen tilbage</h3>
            {errors.api && <p className="error">{errors.api}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <p>Har du ikke allered en konto? klick <span onClick={toggleForm}> her </span> for at gå til sign up </p>
                <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </section>
      
        <section>
            <Donations />    
        </section>
    </main>
    
    </>

    
  );
};

