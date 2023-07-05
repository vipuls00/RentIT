import React, { useState } from "react";
import './Navbar.css';
// import $ from 'jquery';
import './nav.js';
import Products from "./Products/Products";
import Carousel from "./Carousel/Carousel";
import image from './image.jpg';
import logo from './logo.png';
import Footer from "./Footer/Footer";
const Navbar=()=>{
    
    const [search,setSearch]=useState("");
    const updateSearch=(e)=>{
      setSearch(e.target.value);
    }
    return(
        <>
     
<div className="wrapper" style={{maxWidth:"220vh"}}>
  
  <div className="top_navbar">
    <div className="hamburger">
       <div className="one"></div>
       <div className="two"></div>
       <div className="three"></div>
    </div>
    <div className="top_menu">
      <div className="logo">
         <img src={logo} alt="logo" style={{width:"150px",height:"150px"}}/>
      </div>
     {/* Search bar */}
     <div class="input-group mb-3">
  <input type="search" class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" value={search} onChange={updateSearch}/>
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
  </div>
</div>
      <ul>
        
        <li><a href="#">
          <i className="fas fa-bell"></i>
          </a></li>
        <li><a href="/log-in">
          <i className="fas fa-user"></i>
          </a></li>
          <li><a href="/cart">
          <i className="fa fa-shopping-cart"></i>
          </a></li>
      </ul>
    </div>
  </div>
  
  <div className="sidebar">
      <ul>
        <li><a href="/">
          <span className="icon"><i className="fas fa-home"></i></span>
          <span className="title active" href="/">Home</span>
          </a></li>
        <li><a href="/rentCloths">  
          <span className="icon"><i className="fas fa-plus"></i></span>
          <span className="title" href='/rentCloths'>Start Renting</span>
          </a></li>
          <li><a href="/myrents">  
          <span className="icon"><i className="fa fa-tshirt"></i></span>
          <span className="title" >My Cloths</span>
          </a></li>
        <li><a href="/">  
          <span className="icon"><i class="fa fa-shop"></i></span>
          <span className="title" >My Orders</span>
          </a></li>
          <li><a href="/">  
          <span className="icon"><i class="fa fa-info"></i></span>
          <span className="title" >About Us</span>
          </a></li>
    </ul>
  </div>
  
  <div className="main_container" style={{overflow:"scroll",maxHeight:"600px"}} >
  
    <Carousel/>
   
    <Products search={search}/>
    <Footer/>
  </div>
</div>
       
        </>
    );
}
export default Navbar;