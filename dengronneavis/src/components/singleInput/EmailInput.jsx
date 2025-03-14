import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './EmailInput.module.scss';
import { useState } from "react";



export function BasicTextFields() {
  const [email, setEmail] = useState("");
 

  const handleUpdate = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    const accessToken = localStorage.getItem('access_token');
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("hasNewsletter", "true");
    urlencoded.append("hasNotification", "false");

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:4242/users", requestOptions);
      const result = await response.json();
      console.log(result);
      alert("User preferences updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };



  return (
    <> 
    <div className={style.textfield}>
     <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdate}>Tilmeld</button>
      </div>
    
    </>
  );
}
