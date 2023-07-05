import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Products.css';
import Footer from "../Footer/Footer";
import $ from 'jquery';
import {useNavigate} from "react-router-dom";
const Products=(props)=>{
  const history=useNavigate();
    const[products,setProducts]=useState([]);
    const[detail,setDetail]=useState({});
    const[successMsg,setSuccessMsg]=useState(false);
    const [detailAc,setDetailAc]=useState(false);
    const getProducts=()=>{
        axios.get('http://localhost:5000/getAllProducts').then((res)=>{
            setProducts(res.data.data);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const setDetailedData=(id)=>{
        products.map((data)=>{
          if(data._id===id){
            setDetail(data);
          }
        })
        setDetailAc(true);
        console.log(detail)
    }

    const addToCart=(id)=>{
      axios.get('http://localhost:5000/rentCloths',{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        withCredentials: true
}).then((res)=>{
    console.log(res);
    if(res.data.error==="jwt must be provided"){
        history('/log-in');
    }
     else{
       callAddApi(id,res.data._id);
     }
   console.log(res.data._id);
}).catch((err)=>{
    console.log(err);
    history('/log-in');
})
    }

    const callAddApi=(itemId,userId)=>{
      
          axios.post('http://localhost:5000/addToCart',{
            userId:userId,
            itemId:itemId,
            quantity:1
          }).then((res)=>{
            console.log("added to cart successfully");
            setSuccessMsg(true);
          }).catch((err)=>{
            console.log(err);
            setSuccessMsg(false);
          })
    }
    const check=(data)=>{
      if(data.category===props.search || data.subCategory===props.search || data.brand===props.search || data.size===props.search || 
        data.price===props.search
        ){
          return true;
        }
        else{
          return false;
        }
    }
    function BinaryToBase64(binaryData) {
      const bytes = new Uint8Array(binaryData);
      let base64String = "";
      bytes.forEach((byte) => (base64String += String.fromCharCode(byte)));
      // console.log(base64String);
      return btoa(base64String);
    }
    useEffect(()=>{
      getProducts();
    },[])
    return(<>
    <div className="text-center p-3" style={{backgroundColor:"#b73b4f"}} id="products">
      <h2 className="text-center text-white">-------------------------Newly Added-----------------------------</h2>
    </div>
    <section style={{backgroundColor:"#eee"}}>
  <div className="container py-5 m-0" style={{width:"100%" , backgroundColor:"#b73b4f"}}>
    {
  
      props.search.length===0?(<>
       <div className="row">

{
   products.map((data)=>{
       return(<>
       
          {/* card */}
<div className="col-md-12 col-lg-4 mb-4 mb-lg-5">
   <div className="card">
     <div className="d-flex justify-content-between p-3">
       <p className="lead mb-0">{data.category}</p>
      
     </div>
     <div style={{display:"flex", justifyContent:"center"}}>
     <img src={`data:image/jpeg;base64,${BinaryToBase64(data.image.data)}`}
       className="card-img-top img-fluid" alt="Dress" style={{height:"200px", width:"200px"}}/>
        </div>
     <div className="card-body">
       <div className="d-flex justify-content-between">
         <p className="small" style={{fontWeight:"bold"}}>Size:{data.size}</p>
         
       </div>

       <div className="d-flex justify-content-between mb-3">
         <h6 className="mb-0">{(data.subCategory).toUpperCase()}</h6>
         <h6 className="text-dark mb-0">&#8377; {data.price}/Day</h6>
       </div>

       <div className="d-flex justify-content-between mb-2">
         <p className="text-muted mb-0">Brand: <span className="fw-bold">{(data.brand).toUpperCase()}</span></p>
        
         <div class="" onClick={()=>setDetailedData(data._id)}>
       <a class="text-primary" href="#popup1">View More {">"}</a>
         </div>
         
       </div>

       <div className="d-flex justify-content-between mb-2">
          <a href="#popup2"> <button type="" className="btn btn-warning " onClick={()=>addToCart(data._id)}>Add To Cart</button></a>
           <button type="" className="btn btn-primary" style={{backgroundColor: "#df405a",border: "1px #df405a solid"}}>Buy Now</button>
       </div>
     </div>
   </div>
 </div>
{/* card */}
       </>)
   })
}
{/* Model */}
{
detail?(<>
<div id="popup1" className="overlay">
<div className="popup">
<h2>Here i am</h2>
<a class="close" href="#">&times;</a>
<div className="container">
<div className="col-lg-12 border p-3 main-section bg-white">
   <div className="row hedding m-0 pl-3 pt-0 pb-3">
      Product Details
   </div>
   <div className="row m-0">
       <div className="col-lg-4 left-side-product-box pb-3">
       
     <div style={{display:"flex", justifyContent:"center"}}>
      {
        detailAc?(<>
         <img src={`data:image/jpeg;base64,${BinaryToBase64(detail.image.data)}`}
       className="card-img-top img-fluid" alt="Dress" style={{height:"200px", width:"300px"}}/> 
        </>):(<></>)
      }
     {/* <img src={`data:image/jpeg;base64,${BinaryToBase64(detail.image.data)}`}
       className="card-img-top img-fluid" alt="Dress" style={{height:"200px", width:"300px"}}/> */}
        </div>

       </div>
       <div className="col-lg-8">
           <div className="right-side-pro-detail border p-3 m-0">
               <div className="row">
                   <div className="col-lg-12">
                       <span>{detail.category}</span>
                       <p className="m-0 p-0">{detail.subCategory}</p>
                   </div>
                   <div className="col-lg-12">
                       <p className="m-0 p-0 price-pro">&#8377; {detail.price}/Day</p>
                       <hr className="p-0 m-0"/>
                   </div>
                   <div className="col-lg-12 pt-2">
                       <h5>Product Detail</h5>
                       <span>{detail.description}</span>
                       <hr className="m-0 pt-2 mt-2"/>
                   </div>
                  <div className=" d-flex justify-content-between">
                  <p className="tag-section"><strong>Size : </strong>{detail.size}</p>
                  <p className="tag-section"><strong>Owner's Email : </strong>{detail.email}</p>
                  </div>
                      
                  <div className=" d-flex justify-content-between">
                  <p className="tag-section"><strong>Brand : </strong>{detail.brand}</p>
                  <p className="tag-section"><strong>Owner's Phone no.: </strong>{detail.phoneNo}</p>
                  </div>
                   <div className="col-lg-12 mt-3">
                       <div className="row">
                           <div className="col-lg-6 pb-2" onClick={()=>addToCart(detail._id)}>
                               <a href="#popup2" className="btn btn-danger w-100">Add To Cart</a>
                           </div>
                           <div className="col-lg-6">
                               <a href="#" className="btn btn-success w-100">Shop Now</a>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
  
   
</div>
</div>
</div>
</div>

</>):(<></>)
}

{/* successfully added to cart */}
<div id="popup2" className="overlay">
<div className="popup2">

<a class="close" href="#">&times;</a>
<div className="">
{
 successMsg?(<>
 <div class="wrapperAlert">

<div class="contentAlert">

<div class="topHalf">

<p><svg viewBox="0 0 512 512" width="100" title="check-circle">
 <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
 </svg></p>
<h5>One Item Added Successfully !</h5>

<button type="" className=""><a href="#" className="text-white">Done</a></button>
</div>


</div>        

</div>
 </>):(<>
   <div class="wrapperAlert">

<div class="contentAlert">

<div class="topHalf">
<div className="" style={{width:"100px",height:"100px"}}>
<img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" alt=""/>
</div>
<h5 className="text-danger">Something Went wrong !</h5>

<button type="" className="btn btn-danger"><a href="#" className="text-white">Done</a></button>
</div>


</div>        

</div>
 </>)
}
</div>
</div>
</div>
       </div>
       </>):(<>
       <div className="row">

        {
           products.map((data)=>{
            if(check(data)){
              return(<>
               
                {/* card */}
      <div className="col-md-12 col-lg-4 mb-4 mb-lg-5">
         <div className="card">
           <div className="d-flex justify-content-between p-3">
             <p className="lead mb-0">{data.category}</p>
            
           </div>
           <div style={{display:"flex", justifyContent:"center"}}>
     <img src={`data:image/jpeg;base64,${BinaryToBase64(data.image.data)}`}
       className="card-img-top img-fluid" alt="Dress" style={{height:"200px", width:"200px"}}/>
        </div>
           <div className="card-body">
             <div className="d-flex justify-content-between">
               <p className="small" style={{fontWeight:"bold"}}>Size:{data.size}</p>
               
             </div>
      
             <div className="d-flex justify-content-between mb-3">
               <h6 className="mb-0">{(data.subCategory).toUpperCase()}</h6>
               <h6 className="text-dark mb-0">&#8377; {data.price}/Day</h6>
             </div>
      
             <div className="d-flex justify-content-between mb-2">
               <p className="text-muted mb-0">Brand: <span className="fw-bold">{(data.brand).toUpperCase()}</span></p>
              
               <div class="" onClick={()=>setDetailedData(data._id)}>
             <a class="text-primary" href="#popup1">View More {">"}</a>
               </div>
               
             </div>
      
             <div className="d-flex justify-content-between mb-2">
                <a href="#popup2"> <button type="" className="btn btn-warning " onClick={()=>addToCart(data._id)}>Add To Cart</button></a>
                 <button type="" className="btn btn-primary" style={{backgroundColor: "#df405a",border: "1px #df405a solid"}}>Buy Now</button>
             </div>
           </div>
         </div>
       </div>
      {/* card */}
             </>)
            }
            
           })
        }
        {/* Model */}
        {
        detail?(<>
        <div id="popup1" className="overlay">
        <div className="popup">
        <h2>Here i am</h2>
        <a class="close" href="#">&times;</a>
        <div className="container">
        <div className="col-lg-12 border p-3 main-section bg-white">
           <div className="row hedding m-0 pl-3 pt-0 pb-3">
              Product Details
           </div>
           <div className="row m-0">
               <div className="col-lg-4 left-side-product-box pb-3">
               <div style={{display:"flex", justifyContent:"center"}}>
                {
                  detailAc?(<>
                   <img src={`data:image/jpeg;base64,${BinaryToBase64(detail.image.data)}`}
       className="card-img-top img-fluid" alt="Dress" style={{height:"200px", width:"300px"}}/>
                  </>):(<></>)
                }
        </div>                   
               </div>
               <div className="col-lg-8">
                   <div className="right-side-pro-detail border p-3 m-0">
                       <div className="row">
                           <div className="col-lg-12">
                               <span>{detail.category}</span>
                               <p className="m-0 p-0">{detail.subCategory}</p>
                           </div>
                           <div className="col-lg-12">
                               <p className="m-0 p-0 price-pro">&#8377; {detail.price}/Day</p>
                               <hr className="p-0 m-0"/>
                           </div>
                           <div className="col-lg-12 pt-2">
                               <h5>Product Detail</h5>
                               <span>{detail.description}</span>
                               <hr className="m-0 pt-2 mt-2"/>
                           </div>
                          <div className=" d-flex justify-content-between">
                          <p className="tag-section"><strong>Size : </strong>{detail.size}</p>
                          <p className="tag-section"><strong>Owner's Email : </strong>{detail.email}</p>
                          </div>
                              
                          <div className=" d-flex justify-content-between">
                          <p className="tag-section"><strong>Brand : </strong>{detail.brand}</p>
                          <p className="tag-section"><strong>Owner's Phone no.: </strong>{detail.phoneNo}</p>
                          </div>
                           <div className="col-lg-12 mt-3">
                               <div className="row">
                                   <div className="col-lg-6 pb-2" onClick={()=>addToCart(detail._id)}>
                                       <a href="#popup2" className="btn btn-danger w-100">Add To Cart</a>
                                   </div>
                                   <div className="col-lg-6">
                                       <a href="#" className="btn btn-success w-100">Shop Now</a>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
          
           
        </div>
        </div>
        </div>
        </div>
        
        </>):(<></>)
        }
        
        {/* successfully added to cart */}
        <div id="popup2" className="overlay">
        <div className="popup2">
        
        <a class="close" href="#">&times;</a>
        <div className="">
        {
         successMsg?(<>
         <div class="wrapperAlert">
        
        <div class="contentAlert">
        
        <div class="topHalf">
        
        <p><svg viewBox="0 0 512 512" width="100" title="check-circle">
         <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
         </svg></p>
        <h5>One Item Added Successfully !</h5>
        
        <button type="" className=""><a href="#" className="text-white">Done</a></button>
        </div>
        
        
        </div>        
        
        </div>
         </>):(<>
           <div class="wrapperAlert">
        
        <div class="contentAlert">
        
        <div class="topHalf">
        <div className="" style={{width:"100px",height:"100px"}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" alt=""/>
        </div>
        <h5 className="text-danger">Something Went wrong !</h5>
        
        <button type="" className="btn btn-danger"><a href="#" className="text-white">Done</a></button>
        </div>
        
        
        </div>        
        
        </div>
         </>)
        }
        </div>
        </div>
        </div>
       </div>
      </>)
      
    }
   
  </div>
</section>

        
    </>);
}
export default Products;