import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';


function Home () {
    
    const history = useHistory();
    useEffect(() => {
        let token = localStorage.getItem("auth-token")
        if(!token)//check token 
            history.push("/login");

    }, []);
    return (
        <div>
            {localStorage.getItem("auth-token") ? (
                <>
                <Link to="/index">see list User</Link>
                
                </>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">click here to login login</Link>
                </>
            )}
        </div>
    );
}
export default Home;