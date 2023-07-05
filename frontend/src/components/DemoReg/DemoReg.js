import React,{useState} from 'react';
import $ from 'jquery';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './DemoReg.css';
const Login=()=>{
    const[registered,setRegistered]=useState(false);

  const history=useNavigate();
    const [data,setData]=useState({
        email:"",
        password:"",
        firstName:"",
        lastName:"",
        gender:"",
        country:"",
    });
    const updateData=(e)=>{
      setData({
        ...data,
        [e.target.name]:e.target.value
      })
    }
    const registerUser=(e)=>{
      e.preventDefault();
      // console.log(data);
      axios.post("http://localhost:5000/register",{
        email:data.email,
        password:data.password,
        firstName:data.firstName,
        lastName:data.lastName,
        gender:data.gender,
        country:data.country
      }).then((res)=>{
        console.log(res);
        if(res.data==="success"){
          setRegistered(true);
          history('/log-in');
        }
        else{
          alert("User already exist with this email id");
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
$(document).ready(function() {
    $("#do_login").click(function() { 
    //    closeLoginInfo();
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
 
//   openLoginInfo();
//   setTimeout(closeLoginInfo, 1000);
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
    //   closeLoginInfo();
});
    return(<>
    <div className='body' style={{ width:"208vh",height:"100vh",backgroundImage:"linear-gradient(to left,#833140,#171417"}
  }>
  
    <div className='box'>
  <div className='box-form'>
    <div className='box-login-tab'></div> 
    <div className='box-login-title'>
      <div className='i i-login'></div><h2 style={{marginTop:"12px"}}>SIGN UP</h2>
    </div>
    <div className='box-login'>
        <form>
      <div className='fieldset-body' id='login_form'>
        {/* <button onClick={openLoginInfo} className='b b-form i i-more' title='Mais Informações'></button> */}
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
         
        <p className='field'>
            <label for='user'>FIRST NAME</label>
          <input type='text' id='user' title='firstname' name="firstName" value={data.firstName} onChange={updateData} />   
                <span id='valida' className='i i-warning'></span>
        </p>
         
        <p className='field'>
            <label for='user'>LAST NAME</label>
          <input type='text' id='user' title='lastname' name="lastName" value={data.lastName} onChange={updateData} />   
                <span id='valida' className='i i-warning'></span>
        </p>

        <p className='field'>
            <label for='country'>COUNTRY</label>
          <input type='text' id='country' title='country' name="country" value={data.country} onChange={updateData} />   
                <span id='valida' className='i i-warning'></span>
        </p>
        <p>Already have an account ? <a href="/log-in">Sign in</a></p>
       
        	<input type='submit'  value='GET STARTED' title='Get Started' onClick={registerUser}/>
      </div>
      
      </form>
    </div>
  </div>
  {/* <div className='box-info'>
					    <p><button onClick={closeLoginInfo} className='b b-info i i-left' title='Back to Sign In'></button><h3>Need Help?</h3>
    </p>
					    <div className='line-wh'></div>
    					<button onclick="" className='b-support' title='Forgot Password?'> Forgot Password?</button>
    <button onclick="" className='b-support' title='Contact Support'> Contact Support</button>
    					<div className='line-wh'></div>
    <button onclick="" className='b-cta' title='Sign in now!' href='/log-in'>SIGN IN</button>
  				</div> */}
</div>


 <div className='icon-credits'>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a>, <a href="http://www.flaticon.com/authors/budi-tanrim" title="Budi Tanrim">Budi Tanrim</a> & <a href="http://www.flaticon.com/authors/nice-and-serious" title="Nice and Serious">Nice and Serious</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
 </div>
    </>);
}
export default Login;