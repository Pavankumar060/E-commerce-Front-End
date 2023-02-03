import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onSignUp } from "../APIcalls";

 
const schema = yup.object({
    userName: yup.string().min(5).max(16).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
    confirm_password:yup.string().min(8).max(16).required(),
  }).required();

const Signup = () =>{

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const onFinalSubmit = async(data) => {
    if(data?.password !== data?.confirm_password){
      toast("Password doesn't match",{
        type: "error",
        theme:"colored"})
        return
      
    }

    try {
      const response = await onSignUp({
        name : data.username,
        email : data.email,
        password : data.password
      });
      
      if (response?.status === 200){
        toast(response?.data || "error",{
          type:"success",
          theme:"colored"
        })
          
      
        setTimeout(()=>{
           window.location.href ="/login"},5000)
       
      }

    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast(message,{
        type: "error",
        theme:"colored"})
    }
    //api call
    
  }
    

    return(

        <div className="border" style={{border:"10px inset #FCC696", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg" width={400} alt="logo"/>

    <form  onSubmit={handleSubmit(onFinalSubmit)}>
        <div style={{border: "5px dotted #4FFCF7"}}>
        <div>
                <h2 style={{color:"#D43DF9"}}>Signup</h2>
        <input type={"text"} {...register("username")} placeholder= "Create a username"/><br/>
        <small style={{color:"red"}}> {errors.username?.message}</small>
        </div>
      
        <div>  
        <input type={"email"} {...register("email")} placeholder ={"E-mail"}/><br/>
        <small style={{color:"red"}}>{errors.email?.message}</small>
        </div>

        <div>     
        <input type={"password"}{...register("password" )} placeholder ={"Password"}/><br/>
        <small style={{color:"red"}}>{errors.password?.message}</small>
        </div>

        <div>   
        <input  type={"password"}{...register("confirm_password" )} placeholder ={"Confirm Password"}/>
        </div>
        
        </div>
  
      <button style={{borderRadius:20}}>Signup</button>
      <h6>Already have an account? <a href="/login">Login</a></h6>
    </form>
    
        

    </div>
    )
}

export default Signup;