import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './MyRents';
const MyRents=()=>{
    
    const[userId,setUserId]=useState("");
    const [data,setData]=useState([]);
    const [successMsg,setSuccessMsg]=useState(false);
    const history=useNavigate();
    const[base64String,setBase64String]=useState("");
    const getUserData=()=>{
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
           setUserId(res.data._id);
           console.log(res.data._id);
        }).catch((err)=>{
            console.log(err);
            history('/log-in');
        })
    }
    const getMyRented=()=>{
        axios.post('http://localhost:5000/getMyRents',{
            userId:userId
        },
        
        ).then((res)=>{
            console.log(res);
            setData(res.data.data);
        }).catch((err)=>{
            console.log("Errorrrrrr");
            console.log(err);
        })
    }
   const deleteProduct=(id)=>{
    console.log(id);
    axios.post('http://localhost:5000/deleteItem',{
      itemId:id
    }).then((res)=>{
      console.log(res);
      setSuccessMsg(true);
      setTimeout(()=>{
         window.location.reload();
      },2000)
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
         getUserData();
    },[]);
    useEffect(()=>{
        getMyRented();
   },[userId]);



    return(<>
   <section className="h-100 gradient-custom" style={{width:"220vh",height:"200vh"}}>
  <div className="container py-5 h-200 " style={{width:"100%",marginTop:"0%"}}>
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-10 col-xl-10">
        <div className="card" style={{borderRadius: "10px",maxHeight:"600px", overflowY:"scroll"}} >
          <div className="card-header px-4 py-5 bg-danger">
            <h5 className="text-white mb-0">Thanks for putting on rent!</h5>
          </div>
          <div className="card-body p-4">
            {
              data.map((data)=>{
               
                const reader = new FileReader();
                const blob = new Blob([data.image.data], { type: 'image/' });
                reader.readAsDataURL(blob);
  reader.onloadend = () => {
    setBase64String(reader.result);
  };
                return(<>
                 <div className="card shadow-0 border mb-4" >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                   
                   
                    <img src={`data:image/jpeg;base64,${BinaryToBase64(data.image.data)}`} className="img-fluid" alt="Phone"/>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0" style={{fontWeight:"bold"}}>{data.category}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small" style={{fontWeight:"bold"}}>{data.subCategory}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small" style={{fontWeight:"bold"}}>Brand:{data.brand}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small" style={{fontWeight:"bold"}}>Size: {data.size}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small"style={{fontWeight:"bold"}}>&#8377; {data.price}</p>
                  </div>
                </div>
                <hr className="mb-4" style={{backgroundColor: "#e0e0e0", opacity: "1"}}/>
                <div className="" style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
                  <div className="col-md-2">
                    <p className="text-muted mb-0 small">Status: {data.sold==="true"?(<><p className='text-success' style={{fontWeight:"bold"}}>Sold</p></>):(<><p className='text-danger'style={{fontWeight:"bold"}}>Not Sold</p></>)}</p>
                  </div>
                  <div className='align-item-right'>
                   {
                    data.sold==="false"?(<>
                    <div>
                      <a href="#popup2">
                    <button type="" className='btn btn-danger' onClick={()=>deleteProduct(data._id)}>Cancel</button>
                    </a>
                    </div>
                    </>):(<></>)
                   }
                  </div>
                </div>
              </div>
            </div>
                </>)
              })
            }

          </div>
        </div>
      </div>
    </div>
  </div>
  {/* modal */}
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
</section>
    </>);
}
export default MyRents;