import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route ,Link } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/userContext';
import Create from './components/pages/create.component';
import Edit from './components/pages/edit.component';
import Index from './components/pages/index.component';
import './App.css';


function App() {
 
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  let token = localStorage.getItem("auth-token");
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 190000);
    

    const checkLoggedIn = async () => {
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const obj = {
        token: token
    };
      const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', obj, {headers: {"x-auth-token": token}});
      console.log("response data: "+tokenResponse.data)
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data.user,
        });
      }
      else{
        localStorage.setItem("auth-token", "");
        localStorage.setItem("name", "");
      }
    }
    checkLoggedIn();
    return () => clearTimeout(timer);
  }, []);

  return (

    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Header/>
        <div className="container">
        {localStorage.getItem("auth-token")?(<nav className="navbar navbar-expand-lg navbar-light bg-light">
       <Link to={'/'} className="navbar-brand">TiAn</Link>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
         {/* <li className="nav-item">
             <Link to={'/'} className="nav-link">Home</Link>
           </li> */}
           <li className="nav-item">
             <Link to={'/create'} className="nav-link">Create</Link>
           </li>
           <li className="nav-item">
             <Link to={'/index'} className="nav-link">List person</Link>
           </li>
         </ul>
       </div>
     </nav>   ):null}
         
          <br/>
          <h2>Welcome {localStorage.getItem("name")}</h2> <br/>
          <Switch>
          <Route exact path="/" component={Home} />
           <Route path="/register" component={Register} />
           <Route path="/login" component={Login} />
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
