import Image from 'next/image'
// import img from "../src/app/honeycomb.avif"
import Link from 'next/link';
import React,{useState} from 'react';
import 'tailwindcss/tailwind.css';
import "../src/app/globals.css"
import axios from "axios";
const signup = () =>{
  const [password,setpassword]=useState("")
  const [repassword,setrepassword]=useState("")
  const [username,setusername]=useState("");
  const [phonenumber,setphonenumber]=useState("");
  const [num,setnum]=useState(0);
  const [form,setform]=useState({Password:"",user:"",phone:""});
  const updateform=(password,username,phonenumber)=>{
    
    setform({Password:password,user:username,phone:phonenumber});
   
    

  }
  const myform = (form) => {
   
    const sendData = async () => {
       
      
        const response = await axios.post('http://localhost:5000/myform', form);
  
        // Handle the response here
        console.log(response.data);
        if(response.status==202){
            alert("user already exist")
        }
        else if(response.status==201){
          alert("succesfully registered")
      }
      
    };
sendData();}
  const submitting=(eve)=>{
    eve.preventDefault();
    updateform(password,username,phonenumber);
    if(validateForm()==false){
      
      return false;
    }
    if(num!=1){
        
        alert("submit again to verify you are not a robot");
        setnum(num+1);
    }
    else{
        
        setnum(0);
        
    myform(form);}
    
  }
  const validateForm=()=>{
    
    if(password!=repassword){
      alert("Please enter the same password as above")
      return false ;
    }
    else{
      return true;
    }

    }
  return (
    <div className='flex flex-row w-screen bg-[url("/honeycomb.avif")] bg-center bg-cover h-screen items-right' >
       
      <div className='ml-auto h-screen w-[50%] max-w-[500px] bg-black opacity-[60%]  flex flex-col justify-center  space-y-2 '>
        <div className='text-white text-5xl font-extrabold italic mb-2 justify-self-end mx-auto flex'>HostX</div>
        <div className='flex flex-row space-x-12 px-12 justify-center'>
          <div className='rounded-2xl bg-black  border-slate-300 hover:border-yellow-300 hover:text-yellow-600  border-[1px] text-2xl p-2 text-white'><Link href="/login">Log In</Link></div>
          <div className='rounded-2xl bg-black  border-slate-500 hover:border-yellow-300 hover:text-yellow-600  border-[1px] text-2xl p-2 text-white'><Link href="/signup">Sign Up</Link></div>
        </div>
        <form className='flex flex-col space-y-12'  onSubmit={submitting} >
            
            <input  onChange={(e) => {setusername(e.target.value) ;}} placeholder="Username" className="placeholder-black px-2 mt-4 max-w-full mx-8 h-12 border-solid border-black border-[1px] rounded-md " type="text" name="username" required></input>
            
            <input onChange={(e) => setphonenumber(e.target.value)} placeholder="Phone no."  className=" placeholder-black px-2  mt-4 max-w-full mx-8 h-12 border-solid border-black border-[1px] rounded-md" type="phonenumber" name="phonenumber" required></input>
            <input onChange={(e) => setpassword(e.target.value)} placeholder="Password"  className="placeholder-black px-2  mt-4 max-w-full mx-8 h-12 border-solid border-black border-[1px] rounded-md" type="password"  name="password" required></input>
            
            <input onChange={(e) => setrepassword(e.target.value)} placeholder="ReEnterPassword" className='placeholder-black px-2  mt-4 max-w-full mx-8 h-12 border-solid border-black border-[1px] rounded-md' type="password"  name="repassword" required></input>
            
            <button className="bg-yellow-400 max-w-full mx-8 h-12 rounded-full text-white text-2xl hover:border-2 hover:border-white" type="submit">SignUp</button>
            
        </form>
        <p className='mx-auto text-white'>already have an account <a className="text-blue-700" href="./login">Log In</a>.</p>
        </div>
    </div>
    
    
    
  );
}

export default signup;
