import React, { useState, useContext } from 'react';
import { useHistory,Link,Route,Switch } from "react-router-dom";
import axios from "axios";
import GoogleLoginBtn from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";



function Login () {
    //declare variable
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();
    //get facebook res
    const responseFacebook = async(response) => {    
        console.log(response.accessToken);
        try{
            const name = response.name;
            const token =response.accessToken;
            const loginUser = {name, token};
            const loginResponse =await axios.post("http://localhost:5000/users/facebooklogin", loginUser);//post to login with facebook
            console.log(loginResponse);
            setUserData({
                token: loginResponse.data.tokenface,
                user: loginResponse.data.displayName
            });
            //set local Storage
            localStorage.setItem("auth-token", loginResponse.data.tokenface);
            localStorage.setItem("name", loginResponse.data.displayName);
            history.push("/");
        } catch(err){
             
        }
      }
      //get res log in with google
     const responseSuccessGoogle= async (response)=>{
        console.log("tokenId",response.tokenId);
        console.log("everything: "+response.profileObj.name);
        //declare variable
        const name = response.profileObj.name;
        const token =response.tokenId;
        const loginUser = {name, token};
        const loginResponse =await axios.post("http://localhost:5000/users/facebooklogin", loginUser);//post req login with google
        console.log(loginResponse);
            setUserData({
                token: loginResponse.data.tokenface,
                user: loginResponse.data.displayName
            });
            //set localStorage
            localStorage.setItem("auth-token", loginResponse.data.tokenface);
            localStorage.setItem("name", loginResponse.data.displayName);
            history.push("/");
     }
     //login with normal account
    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser);//post req login 
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user.displayName
            });
            //set localStorage
            localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("name", loginResponse.data.user.displayName);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
    
    return (
        
        <div className="login">
            <img src="https://d25tv1xepz39hi.cloudfront.net/2017-04-06/files/live-view-shooting_1512-t.jpg" class="rounded float-right" alt="Responsive image"></img>
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
          
                    
                <label>Email: </label>
                <input type="email" id="email" class="form-control" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" class="form-control" onChange={e => setPassword(e.target.value)}/>
                <br></br>
                <input type="submit" value="Login" className="btn btn-primary" size="lg" />
            </form>
            <div className="center">
                <h1>login with Facebook</h1>
            <FacebookLogin
            appId="501735320802150"
            autoLoad={false}
            size="small"
            callback={responseFacebook}
            />
            <h1>login with Google</h1>
            <GoogleLoginBtn
                        clientId="75435593592-ibbekma2opi25sc4bnfnrr276ki2ne01.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        // onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
             </div>
             
            
        </div>
        

       
    );
}
 
export default Login;