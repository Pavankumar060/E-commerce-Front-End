import { useEffect, useState } from "react";
import { loadCart,removeProduct } from "../APIcalls";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

    const [cartItems,setCartItems] = useState([]);
    const [loadPage,setLoadPage] =useState(false);

    const handleOnclick =() =>{
        localStorage.clear()
        window.location.href="/login"
    }
    const handleOnHome = () =>{
        window.location.href="/dashboard"
    }

const feedCart =async() =>{
    try {
        const response = await loadCart();
        // console.log(response.data[0].products);
        setCartItems(response.data[0].products);
        setLoadPage(false);
        
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong";
        toast(message,{
          type: "error",
          theme:"colored"}) 
        
    }
    
}

useEffect(()=>{
    feedCart()
},[])

return(
    <>
   
    <div>
    <h1 style={{ position:"fixed", top:"0",}}>CART</h1>
        <button style={{color:"red",borderRadius:20 ,position:"fixed", top:0,right:0}} onClick={handleOnclick} >Log-Out</button>
        <button style={{backgroundColor:"#F9FC93",borderRadius:20 ,position:"fixed", top:0,right:100}} onClick={handleOnHome} >HOME</button>
        
        <div style={{border:"5px outset #FCC696",display:"flex", alignContent:"center"}}>
        <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg" alt="img" width={750}/>

        {
            loadPage ? (<div class="spinner-border text-success" role="status">
  <span class="sr-only"></span>
</div>) :(

        <div  style={{display: "flex", flexWrap :"wrap",textAlign:"center",justifyContent:"center", padding: 5}}>

            {
                cartItems.map((item) =>{
                    const itemRemove = async ()=>{
                        try {
                            // console.log(item);
                            setLoadPage(true);
                            const response = await removeProduct()
                        const message = response.data?.message
                        toast(message,{
                            type: "success",
                            theme:"colored"});
                            feedCart();
                          
                      
                        } catch (error) {
                            const message = error?.response?.data?.message || "Something went wrong";
                            toast(message,{
                              type: "error",
                              theme:"colored"})
                            
                        }
                    }
                    const handleDelete =() =>{
                        
                        const product_id = item?._id;
                        localStorage.setItem("E-COMM-product_id",product_id);
                        itemRemove();
                        feedCart();
                        
                    
                    }
                    return(
                        <>
                        <div style={{width:600}} key={item?.id + 2000} >
                        <table border={1}>
                            <tbody>
                                <tr>
                                    
                           <td><h2 style={{color:"#C607F5"}}>{item?.title}</h2></td> 
                            <td><h1 style={{color:"#FC48C5"}}><small style={{color:"orange"}}>$</small>{item?.price}</h1> </td>
                            <td><h1 style={{color:"red"}}>x{item?.userQuantity}</h1></td>
                            <td><button style={{borderRadius:20 , backgroundColor:"red", color:"white"}} onClick={()=>{handleDelete()}}>delete</button></td>
                            

                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </>
                    )
                })
            }
    
            
            </div>
            )
        }
        
            </div>
            <br/>
        <button style={{backgroundColor:"#F71620", color:"white", borderRadius:20}}>Check-Out</button>
        </div>
    </>
)
}

export default Cart;