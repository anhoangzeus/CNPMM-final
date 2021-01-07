import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register () {
    //declare var
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    //submit form resgister
    const submit = async (e) => {
        e.preventDefault();
        try{
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post("http://localhost:5000/users/register", newUser);//post req resgiter
            const loginResponse = await axios.post("http://localhost:5000/users/login", {//postreq login when resgister okay
                email, password
            });
            //set dâtcontext
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("name", loginResponse.data.user);
            history.push("/");
            console.log("đăng ký thành công và đăng nhập vào với token: "+loginResponse.data.token )
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        } 
    };   
    return ( 
        <div className="register">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <hr/>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <hr/>
                <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
                <hr/>
                <label>Display name </label>
                <input type="text" id="dsplay-name" onChange={e => setDisplayName(e.target.value)}/>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
        );
}
 
export default Register;