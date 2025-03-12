import { LogedIn } from "../components/login/Login";
import { SignUp } from "../components/signUp/Signup";
import { useState } from "react";
export const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // true = show Login, false = show SignUp

    const toggleForm = () => {
      setIsLogin((prev) => !prev); // Toggle between Login and SignUp
    };
  
      

    return(
        <>
        <div>
        {isLogin ? <LogedIn toggleForm={toggleForm} /> : <SignUp toggleForm={toggleForm} />}
        </div>
         
        </>
    )
}