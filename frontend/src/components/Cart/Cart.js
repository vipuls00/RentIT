import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Cart.css';
import {useNavigate} from "react-router-dom";

const Cart=()=>{
    const history=useNavigate();
    const [data,setData]=useState([]);
    const [userId,setUserId]=useState("");
    const [successMsg,setSuccessMsg]=useState(false);
    const [totalAmount,setTotalAmount]=useState(Number(0));
    const getCartItem=()=>{
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
          setUserId(res.data._id);
           callMyCart(res.data._id);
         }
       console.log(res.data._id);
    }).catch((err)=>{ 
        console.log(err);
        history('/log-in');
    })
    }
    
    const callMyCart=(id)=>{
        axios.post('http://localhost:5000/getMyCartItems',{
            userId:id
        }).then((res)=>{
            console.log(res);
            const tempData=[];
            for (const item of res.data.data) {
              tempData.push({itemId:item._id,days:1,details:item,totalPrice:Number(item.price)});
            }
            setData(tempData);
            // for(const item of data){
            //   setTotalAmount(totalAmount+item.details.price);
            // }
            console.log(tempData);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const plusDays=(itemId)=>{
      //Setting days
      setData(
        data.map((item) => {
          if (item.itemId === itemId) {
            // create a new object with the same properties as the old object,
            // but with an updated quantity
            return {
              ...item,
              days: item.days + 1,  
              totalPrice:Number(item.totalPrice)+Number(item.details.price)
            };
          } else {
            // if it's not the item we're looking for, return the original object
            return item;
          }
        })
      );
     
    
    }
    const minusDays=(itemId,sign)=>{
      setData(
        data.map((item) => {
          if (item.itemId === itemId) {
            // create a new object with the same properties as the old object,
            // but with an updated quantity
            return {
              ...item,
              days: item.days -  1,  
              totalPrice:Number(item.totalPrice)-Number(item.details.price) 
            };
          } else {
            // if it's not the item we're looking for, return the original object
            return item;
          }
        })
      );
    }
    const deleteItem=(itemId)=>{
       axios.post('http://localhost:5000/deleteCartItem',{
        itemId:itemId,
        userId:userId
       }).then((res)=>{
        console.log(res);
        console.log("item Deleted")
        setSuccessMsg(true);
        const timeout = setTimeout(() => {
          window.location.reload()
        }, 2000);
        
       }).catch((err)=>{
        console.log(err);
       })
    }
    function BinaryToBase64(binaryData) {
      const bytes = new Uint8Array(binaryData);
      let base64String = "";
      bytes.forEach((byte) => (base64String += String.fromCharCode(byte)));
      // console.log(base64String);
      return btoa(base64String);
    }
useEffect(()=>{
getCartItem();
},[])

useEffect(()=>{
  let total=0;
for(let item of data){
  total+=item.totalPrice
}
console.log(total);
setTotalAmount(total);
},[data])
    return(<>
   <div class="h-100 gradient-custom mt-5">
    
  <div style={{overflow:"hidden",position:"relative"}}> 
  <div class="py-5" style={{marginTop:"10%"}} id="main">

    <div class="row d-flex justify-content-center my-4">
      <div class="col-md-8" >
        <div class="card mb-4 text-center" style={{width:"80%",margin:"auto"}}>
          <div class="card-header py-3 bg-danger" >
            <h5 class="mb-0 text-white">Cart - {data.length} items</h5>
          </div>
          <div class="card-body" style={{overflowY:"scroll",maxHeight:"500px"}}>
             {
              data.map((data)=>{
                return(<>
                <div class="row">
              <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={`data:image/jpeg;base64,${BinaryToBase64(data.details.image.data)}`}
                    class="w-100" alt="Dress" />
                  <a href="#!">
                    <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                  </a>
                </div>
              </div>

              <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                <p><strong>{data.details.category}</strong></p>
                <p>Brand: {data.details.brand}</p>
                <p>Size: {data.details.size}</p>
                
                <a href="#popup2"><button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                  title="Remove item" onClick={()=>deleteItem(data.itemId)}>
                  <i class="fas fa-trash"></i>
                </button></a>
               
               
              </div>

              <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div class="d-flex mb-0-u" style={{maxWidth: "300px"}}>
                  <button class="btn btn-danger px-3 me-2" style={{ width: "30px",
            height: "30px",
            padding: "6px 0px",
            borderRadius:"15px",
            fontSize: "8px",
            textAlign: "center"}}
            onClick={()=>minusDays(data.itemId)}>
                    <i class="fas fa-minus"></i>
                  </button>

                  <div class="form-outline">
                  <label class="form-label" for="form1">Days</label>
                    <input id="form1" min="0" name="quantity" value={data.days} type="text" class="form-control" />
                    {/* <label class="form-label" for="form1">Days</label> */}
                  </div>

                  <button class="btn btn-danger px-3 ms-2" style={{ width: "30px",
            height: "30px",
            padding: "6px 0px",
            borderRadius:"15px",
            fontSize: "8px",
            textAlign: "center"}}
            onClick={()=>plusDays(data.itemId)}>
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                  <p>{data.details.subCategory}</p>
                <p class="text-start text-md-center">
                  <strong>&#8377; {data.details.price} / Day  </strong>
                </p>
                <p class="text-start text-md-center">
                  <strong>Total Price &#8377; {data.totalPrice}  </strong>
                </p>
              </div>
            </div>
            <hr/>
                </>)
              })
             }

            <hr class="my-4" />

          </div>
        </div>
        <div class="card mb-4" style={{width:"80%",margin:"auto"}}>
          <div class="card-body">
            <p><strong>Expected shipping delivery</strong></p>
            <p class="mb-0">NULL</p>
          </div>
        </div>
        <div class="card mb-4 mb-lg-0" style={{width:"80%",margin:"auto"}}>
          <div class="card-body" >
            <p><strong>We accept</strong></p>
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
              alt="PayPal acceptance mark" />
          </div>
        </div>
      </div>
      <div class="col-md-4" >
        <div class="card mb-4 text-center"style={{marginRight:"7%"}}>
          <div class="card-header py-3 bg-danger">
            <h5 class="mb-0 text-white">Summary</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Total Products
                <span>{data.length}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                 Amount
                <span>&#8377; {
                 totalAmount
                  }</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p class="mb-0">(including all taxes)</p>
                  </strong>
                </div>
                <span>&#8377; {
                 totalAmount
                  }</span>
              </li>
            </ul>

            <button type="button" class="btn btn-danger btn-lg btn-block">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>  
  {/* Model */}
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
    <h5>One Item Deleted Successfully !</h5>

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
    </>);
}
export default Cart;