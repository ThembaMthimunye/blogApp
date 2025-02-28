import { React, useState } from "react";
import { login } from "../api";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  async function submitHandle(e) {
    e.preventDefault();
     let response=await login(user);
    if(response){
        sessionStorage.setItem('user',response)
         axios.defaults.headers.common['authorization']=`Bearer ${response}`
        navigate('/Home')
        console.log(response)
    }else{
        alert('login failed')
    } 
  }
  return (
    <div >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form action="" onSubmit={submitHandle} className="">
       
        <div div className='flex flex-col space-y-4 '>
        <label htmlFor="">email</label>
        <Input
          type="text"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          maxLenght={15}
          className=""
        />

        <label htmlFor="">password</label>
        <Input
         
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          required
          maxLenght={15}
          type='password'
        />

        <Button onClick={navigate} type='submit'>Login</Button>
        </div>
       
      </form>
    </div>
  );
};

export default Login;
