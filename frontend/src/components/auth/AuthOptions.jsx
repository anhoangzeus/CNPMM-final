import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/userContext";

 function AuthOptions () {
     //declare 
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    let token =localStorage.getItem("auth-token");
    //sign up option
    const register = () => history.push("/register");
    //login option
    const login = () => history.push("/login");
    //log out option
    const logout = () => {
        setUserData({//set context null when log out
            token: undefined,
            user: undefined
        })
        //set localStorage null
        localStorage.setItem("auth-token","");
        localStorage.setItem("name","");
        console.log("đã đăng xuất xóa token")
        //move to log in page
        history.push("/login");
    };
    return (
        <nav className="auth-options">
            { localStorage.getItem("auth-token")? (
                <button className="btn btn-primary mr-2" onClick={logout}>Logout</button>
            ) : (
                <>
                <button className="btn btn-primary mr-2" onClick={register}>Sign Up</button>
                <button className="btn btn-primary mr-2" onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;