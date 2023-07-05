import React, { useEffect ,useState,useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './RentCloths.css'
import tickMark from './success.png';
import logo from '../logo.png'
const RentCloths=()=>{
  const[userId,setUserId]=useState("");
  const[submitted,setSubmitted]=useState(false);
 
  const profileref = useRef();
  const[data,setData]=useState({
    userId:userId,
    gender:"Male",
    category:"Top",
    subCategory:"",
    size:"",
    brand:"",
    price:"",
    address:"",
    phoneNo:"",
    email:"",
    sold:false,
    image:null,
    description:""
  })
    const updateData=(e)=>{
      setData({
        ...data,
        [e.target.name]:e.target.value
      })
    }
    
    const sendData = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("userId", data.userId);
      formData.append("gender", data.gender);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("size", data.size);
      formData.append("brand", data.brand);
      formData.append("price", data.price);
      formData.append("address", data.address);
      formData.append("phoneNo", data.phoneNo);
      formData.append("email", data.email);
      formData.append("sold", data.sold);
      formData.append("image", data.image);
      formData.append("description", data.description);
      axios.post('http://localhost:5000/putOnRent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res);
        if(res.data.message==="putted on rent successfully"){
          setSubmitted(true);
          alert("putted on rent successfully");
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
    
    const history=useNavigate();
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
           setData({
            ...data,
            userId:res.data._id
           })
        }).catch((err)=>{
            console.log(err);
            history('/log-in');
        })
    }
    useEffect(()=>{
         getUserData();
    },[]);
    return(<>

    <div className='signup-container' style={{width:"100%"}}>
  <div className='left-container'>
    <h1>
      <img src={logo} alt="logo" style={{width:"150px",height:"150px"}}/>
    </h1>
    <div className='puppy'>
      <img src='https://today.umd.edu/uploads/hero/MarylandToday06192019_ClothingRentAnimation_1920x1080.gif'/>
    </div>
  </div>
  <div className='right-container'>
    <header>
      <h1>Yay, RentIt ! EarnIt !</h1>
     <form onSubmit={sendData} type="submit">
      <div className='set'>
        <div className='gender'>
          <label for='gender'>Gender</label>
            <select name="gender" value={data.gender} onChange={updateData}>
              <option>Male</option>
              <option>Female</option>
            </select>
        </div>
        <div className='category'>
          <label for='category'>Category</label>
            <select name="category" value={data.category} onChange={updateData}>
             {
              data.gender==="Male"?(<>
              <option>Top</option>
              <option>Bottom</option>
              <option>Suits</option>
              <option>Outerwear</option>
              <option>Activewear</option>
              <option>Sleepwear</option>
              <option>Swimwear</option>
             
              </>):(<>{
                data.gender==="Female"?(<>
                <option>Top</option>
              <option>Bottom</option>
              <option>Dresses</option>
              <option>Outerwear</option>
              <option>Activewear</option>
              <option>Sleepwear</option>
              <option>Swimwear</option>
             
                </>):(<></>)
              }</>)
             }
            </select>
        </div>
      </div>
      <div className='set'>
        <div className='subCategory'>
          <label for='subCategory'>Sub-Category</label>
         <select name="subCategory" value={data.subCategory} onChange={updateData}>
          {
            data.gender==="Male"?(<>
            {
              data.category==="Top"?(<>
                <option>t-shirts</option>
                <option>polo</option>
                <option>shirts</option>
                <option>dress shirts</option>
                <option>hoodies</option>
                <option>sweaters</option>
                <option>sweatshirts</option>
                <option>cardigans</option>
              </>):(<>{
                data.category==="Bottoms"?(<>
                 <option>jeans</option>
                <option>pants</option>
                <option>shorts</option>
                <option>cargo pants</option>
                <option>sweatpants</option>
                </>):(<>{
                  data.category==="Suits"?(<>
                  <option>formal suits</option>
                <option>blazers</option>
                <option>dress pants</option>
                <option>dress shirts</option>
                <option>ties</option>
                  </>):(<>
                  {
                    data.category==="Outerwear"?(<>
                    <option>jackets</option>
                <option>coats</option>
                <option>parkas</option>
                <option>vests</option>
                    </>):(<>
                    {
                      data.category==="Activewear"?(<>
                       <option>workout shirts</option>
                <option>shorts</option>
                <option>sweatpants</option>
                <option>hoodies</option>
                      </>):(<>
                      {
                        data.category==="Sleepwear"?(<>
                        <option>pajamas</option>
                <option>sleep shirts</option>
                <option>lounge pants</option>
                        </>):(<>
                        {
                          data.category==="Swimwear"?(<>
                          <option>swim trunks</option>
                <option>board shorts</option>
                <option>rash guards</option>
                          </>):(<>
                          <option>Other</option>
                          </>)
                        }
                        </>)
                      }
                      </>)
                    }
                    </>)
                  }
                  </>)
                }</>)
                     }</>)
            }
            </>):
            
            (<>
              {
                data.category==="Top"?(<>
                  <option>blouses</option>
                  <option>t-shirts</option>
                  <option>tank tops</option>
                  <option>crop tops</option>
                  <option>tunics</option>
                  <option>sweaters</option>
                  <option>sweatshirts</option>
                  <option>cardigans</option>
                </>):(<>{
                  data.category==="Bottoms"?(<>
                   <option>jeans</option>
                  <option>pants</option>
                  <option>shorts</option>
                  <option>leggings</option>
                  <option>skirts</option>
                  <option>capris</option>
                  <option>culottes</option>

                  </>):(<>{
                    data.category==="Dresses"?(<>
                    <option>casual dresses</option>
                  <option>formal dresses</option>
                  <option>maxi dresses</option>
                  <option>midi dresses</option>
                  <option>party dresses</option>
                    </>):(<>
                    {
                      data.category==="Outerwear"?(<>
                      <option>jackets</option>
                  <option>coats</option>
                  <option>blazers</option>
                  <option>vests</option>
                  <option>ponchos</option>

                      </>):(<>
                      {
                        data.category==="Activewear"?(<>
                         <option>sports bras</option>
                  <option>leggings</option>
                  <option>yoga pants</option>
                  <option>tank tops</option>
                  <option>shorts</option>

                        </>):(<>
                        {
                          data.category==="Sleepwear"?(<>
                          <option>pajamas</option>
                  <option>sleep shirts</option>
                  <option>nightgowns</option>
                          </>):(<>
                          {
                            data.category==="Swimwear"?(<>
                            <option>bikinis</option>
                  <option>one-piece swimsuits</option>
                  <option>tankinis</option>
                  <option>cover-ups</option>

                            </>):(<>
                            <option >Other</option>
                            </>)
                          }
                          </>)
                        }
                        </>)
                      }
                      </>)
                    }
                    </>)
                  }</>)
                       }</>)
              }
              </>)
          }
         </select>
        </div>
        <div className='size'>
          <label for='size'>Size</label>
          <input name="size" value={data.size} onChange={updateData} id='size' placeholder='' type='text' style={{backgroundColor:"white",width:"180px" }}/>
        </div>
      </div>
      <div className='set'>
      <div className='brand'>
          <label for='brand'>Brand</label>
          <input name="brand" value={data.brand} onChange={updateData} id='brand' placeholder='' type='text' style={{backgroundColor:"white", width:"180px"}}/>
        </div>
        <div className='price'>
          <label for='price'>Price/Day</label>
          <input name="price" value={data.price} onChange={updateData} id='price' placeholder='' type='number' style={{backgroundColor:"white",width:"180px"}}/>
        </div>
      </div>
      <div className='set'>
      <div className='phoneNo'>
          <label for='phoneNo'>Phone Number</label>
          <input name="phoneNo" value={data.phoneNo} onChange={updateData} id='phoneNo' placeholder='' type='number' style={{backgroundColor:"white",width:"180px"}}/>
        </div>
        <div className='email'>
          <label for='email'>Email</label>
          <input name="email" value={data.email} onChange={updateData} id='email' placeholder='' type='email' style={{backgroundColor:"white",width:"180px"}}/>
        </div>  
      </div>
      <div className='address'>
      <label for='address'>Address</label>
      <textarea name="address" value={data.address} onChange={updateData} id="address" rows="3" cols="57"/>
      </div>
      <div className='address'>
      <label for='description'>Item Description</label>
      <textarea name="description" value={data.description} onChange={updateData} id="description" rows="3" cols="57"/>
      </div>
      <div className='photo'>
      <label for='photo'>Upload cloth's image</label>
      <input type="file" name="image" accept="image/*" onChange={(e) => setData({...data,
      image:e.target.files[0]
      })}
                    required/>
      </div>

      </form>
    </header>
    <footer>
      <div className='set'>
        <button id='back'><a href="/" style={{textDecoration:"none"}}> Back</a></button>
              
        <button id='next' onClick={sendData}>Next</button>
        
      </div>
    </footer>
  </div>
</div>


    </>);
}
export default RentCloths;