import Image from 'next/image'
// import img from "../src/app/honeycomb.avif"
import Link from 'next/link';

import React,{useState} from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import "../src/app/globals.css"
import axios from "axios";
const login = () =>{
  const router = useRouter();
    const [password,setpassword]=useState("");
    const [username,setusername]=useState("");
    const [num,setnum]=useState(0);
    const [form,setform]=useState({Password:"",user:""});
    const updateform=(password,username)=>{
    
        setform({Password:password,user:username});
       
        
    
      }
      const myform = (form) => {
        
        const sendData = async () => {
           
          
            console.log(form);
            const response = await axios.post('http://localhost:5000/mylogin', form);
            console.log(response.data);
            if(response.status==203){
                alert("invalid user");
            }
            else if (response.status==204){
                alert("invalid password");
            }
            else if (response.status===200){
              // window.open("./Welcome","_self")
              await router.push('/Welcome');
                alert("Welcome to IIT INDORE");
            }
          
        };
    sendData();}
      const submitting=(eve)=>{
        eve.preventDefault();
        updateform(password,username);
        
        if(num!=1){
           
            alert("submit again to verify you are not a robot");
            setnum(num+1);
        }
        else{
            
            setnum(0);
            
        myform(form);}
        
      }
      
    
  return (

    <div className='flex flex-row w-screen bg-[url("/honeycomb.avif")] bg-center bg-cover h-screen items-right' >
       
      <div className='ml-auto h-screen w-[50%] max-w-[500px] bg-black opacity-[60%]  flex flex-col justify-center  space-y-2 '>
        <div className='text-white text-5xl font-extrabold italic mb-2 justify-self-end mx-auto flex'>HostX</div>
        <div className='flex flex-row space-x-12 px-12 justify-center'>
          <div className='rounded-2xl bg-black  border-slate-300 hover:border-yellow-300 hover:text-yellow-600  border-[1px] text-2xl p-2 text-white'><Link href="/login">Log In</Link></div>
          <div className='rounded-2xl bg-black  border-slate-500 hover:border-yellow-300 hover:text-yellow-600  border-[1px] text-2xl p-2 text-white'><Link href="/signup">Sign Up</Link></div>
        </div>
        <form className='flex flex-col space-y-12' action="getid" method="POST" onSubmit={submitting} >
            
            <input onChange={(e) => {setusername(e.target.value) ;}} placeholder="Username" className="placeholder-black px-2 mt-4 max-w-full mx-8 h-12 border-solid border-black border-[1px] rounded-md " type="text" id="username" name="username" required></input>
            
            <input onChange={(e) => {setpassword(e.target.value) ;}} placeholder="Password"  className="placeholder-black px-2  mt-4 max-w-full mx-8 h-12 border-solid border-black border-[1px] rounded-md" type="password" id="password" name="password" required></input>
            
            
            <button className="bg-yellow-400 max-w-full mx-8 h-12 rounded-full text-white text-2xl hover:border-2 hover:border-white" type="submit">LogIn</button>
            
        </form>
        <p className='mx-auto text-white'>Don't have an account <a className="text-blue-700" href="./signup">Sign Up</a>.</p>
        </div>
    </div>
    
    
    
  )
}

export default login;
