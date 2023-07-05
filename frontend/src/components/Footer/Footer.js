import React from "react";
import './Footer.css'
import logo from '../logo.png'
const Footer=()=>{
    return(<>
    <footer class="footer-sec">
    <div class="main" style={{display:"flex"}}>
      
      
      <div class="logo row">
        <div class="footer-header">
          <img src={logo} class="manik" alt=""/>
        </div>
        <div class="logo-des">
<p>With this platform, users can easily put their 
  clothes up for rent and decide the price and 
  duration of the rental themselves. Once the
   rental is live, others can easily purchase 
   it and pay through the platform. And for those 
   who put their clothes up for rent, they have the 
   flexibility to cancel the rental if it hasn't been 
    purchased yet.</p>          
          <a href="#" class="btn-know">Know More</a>

        </div>
        
        
      </div>
      
      
      
      <div class="logo row">
        <div class="footer-header">
            <h1 className="text-white">Office</h1>
        </div>
        <div class="office-des">
          <p>48 , Danawat-estate, Gole ka mandir, Ground floar <br/>Gwalior (M.P.) , India</p>
          
         <a href="#" className="text-primary">shivanshnema83@gmail.com</a>
          
          <p class = "num">+91-8827094647</p>
        </div>
        
        
      </div>
      
      
      <div class="newsletter row">
        <div class="footer-header">
          <h3 className="text-white">Newsletter</h3>
        </div>
        <div class="newsletter-des">
          <div class="subcribe"><i class="sub-icon ri-mail-check-fill"></i>
            <input type="mail" placeholder = "Enter Email ID" required/>
            <i class="sub-icon ri-arrow-right-line"></i>
          </div>
          <div class="icons">
            <a href="#"><i class="social-icon ri-facebook-fill"></i></a>
            <a href="#"><i class="social-icon ri-instagram-line"></i></a>
            <a href="#"><i class="social-icon ri-linkedin-fill"></i></a>
            <a href="#"><i class="social-icon ri-github-line"></i></a>
            
          </div>
        </div>
      </div>
      
     
      
      
    </div>
    <div class="copyright">
    <hr/>
    
    <p>© Copyright 2023 Shivansh Nema.</p>
    </div>
  </footer>
    </>);
}
export default Footer;