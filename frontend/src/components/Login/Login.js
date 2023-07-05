import React,{useState} from 'react';
import './Login.css';
import $ from 'jquery';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login=()=>{
    const history=useNavigate();
    const[data,setData]=useState({
    email:"",
    password:""
    })
    const updateData=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const logIn=(e)=>{
        e.preventDefault();
        
       
        axios.post("http://localhost:5000/login",{
  email:data.email,
  password:data.password
},
{
  headers: {
    'Content-Type':"application/json"
  },
  withCredentials: true // Add this line to include credentials
})
.then((res)=>{
  console.log(res);
  if(res.data.message==="logged in successfully"){
    localStorage.setItem("token", res.data.data);
    history('/');
  }
  else{
    history('/demo');
  }
})
.catch((err)=>{
  console.log(err);
  history('/DemoReg');
});
    }
$(document).ready(function() {
    $("#do_login").click(function() { 
      //  closeLoginInfo();
       $(this).parent().find('span').css("display","none");
       $(this).parent().find('span').removeclassName("i-save");
       $(this).parent().find('span').removeclassName("i-warning");
       $(this).parent().find('span').removeclassName("i-close");
       
        var proceed = true;
        $("#login_form input").each(function(){
            
            if(!$.trim($(this).val())){
                $(this).parent().find('span').addclassName("i-warning");
            	$(this).parent().find('span').css("display","block");  
                proceed = false;
            }
        });
       
        if(proceed) //everything looks good! proceed...
        {
            $(this).parent().find('span').addclassName("i-save");
            $(this).parent().find('span').css("display","block");
        }
    });
    
    //reset previously results and hide all message on .keyup()
    $("#login_form input").keyup(function() { 
        $(this).parent().find('span').css("display","none");
    });
 
  // openLoginInfo();
  // setTimeout(closeLoginInfo, 1000);
});

// function openLoginInfo() {
//     $(document).ready(function(){ 
//     	$('.b-form').css("opacity","0.01");
//       $('.box-form').css("left","-37%");
//       $('.box-info').css("right","-37%");
//     });
// }

// function closeLoginInfo() {
//     $(document).ready(function(){ 
//     	$('.b-form').css("opacity","1");
//     	$('.box-form').css("left","0px");
//       $('.box-info').css("right","-5px"); 
//     });
// }

$(window).on('resize', function(){
      // closeLoginInfo();
});
    return(<>
    <div className='body' style={{ width:"208vh",height:"100vh"}
  }>
  
    <div className='box'>
  <div className='box-form'>
    <div className='box-login-tab'></div> 
    <div className='box-login-title'>
      <div className='i i-login'></div><h2 style={{marginTop:"12px"}}>LOGIN</h2>
    </div>
    <div className='box-login'>
        <form onSubmit={logIn}>
      <div className='fieldset-body' id='login_form'>
        	<p className='field'>
            <label for='user'>E-MAIL</label>
          <input type='text' id='user' title='Username' name="email" value={data.email} onChange={updateData} />   
                <span id='valida' className='i i-warning'></span>
        </p>
      	  <p className='field'>
          <label for='pass'>PASSWORD</label>
          <input id='pass' type="password" name="password" value={data.password} onChange={updateData} placeholder="Password" required />
          <span id='valida' className='i i-close'></span>
        </p>

        <p>Don't have an account ? <a href="/demo">Sign Up</a></p>

        	<input type='submit' id='do_login' value='GET STARTED' title='Get Started' />
      </div>
      </form>
    </div>
  </div>
 
</div>

 </div>
    </>);
}
export default Login;