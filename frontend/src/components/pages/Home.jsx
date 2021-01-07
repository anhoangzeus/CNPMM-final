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
                 <div>
                 <div className="container content">
                 <img src="https://d25tv1xepz39hi.cloudfront.net/2017-04-06/files/live-view-shooting_1512-t.jpg" class="rounded float-right" alt="Responsive image"></img>
                     <div className="row">
                         <div className="col-sm-3 talk">
                             <h1>Quản lý</h1>
                             <h1>nhân viên</h1>
                             <br />
                             <h6 className="bold-four">
                                
                         </h6>
                             <br />
                             <h6><a className="btn btn-dark start start-two" href="http://localhost:3000/create">Get Started</a></h6>
                         </div>
                         <div className="col-sm-9 showcase-img">
                             {/* <div className="circle"></div> */}
                         </div>
                     </div>
                 </div>
     
                 <section class="features-icons bg-light text-center det-ails">
                     <div class="container">
                         <div class="row">
                             <div class="col-lg-4">
                                 <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                     <div class="features-icons-icon d-flex  icon-bra-ails">
                                         <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                     </div>
                                     
                                 </div>
                             </div>
                             <div class="col-lg-4">
                                 <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                     <div class="features-icons-icon d-flex  icon-bra-ails">
                                         <i class="icon-layers m-auto text-primary icon-ails"></i>
                                     </div>
                                     
                                 </div>
                             </div>
                             <div class="col-lg-4">
                                 <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                     <div class="features-icons-icon d-flex  icon-bra-ails">
                                         <i class="icon-check m-auto text-primary icon-ails"></i>
                                     </div>
                                     
                                 </div>
                             </div>
                         </div>
                     </div>
                 </section>
                 <footer class="page-footer font-small blue footer">

            <div class="footer-copyright text-center py-3">Made by
        <a href="https://github.com/anhoangzeus" target="_blank" rel="noopener noreferrer" className="author"> An</a>
            </div>

        </footer>
             </div>
             
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