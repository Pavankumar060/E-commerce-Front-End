import { useEffect, useState } from "react"
import { forFeed,addProduct, removeProduct } from "../APIcalls"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DashBoard =() =>{
    const [products,setProducts]= useState([]);
    const [loadPage,setLoadPage] = useState(false);
    

const handleOnclick =() =>{
    localStorage.clear()
    window.location.href="/login"
}
const handleOnCart =() =>{
    window.location.href="/cart"
}
const userName = localStorage.getItem("E-COMM-userName")


const loadProducts =async()=>{
    try {
        const response = await forFeed();
        setProducts(response.data);
        setLoadPage(false);
        
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong";
        toast(message,{
          type: "error",
          theme:"colored"}) 
    }
}





    
    useEffect(() =>{
    setLoadPage(true);
    loadProducts();
},[])
    return(
        <>

{
            loadPage ? (<div className="spinner-border text-success" role="status">
  <span className="sr-only"></span>
</div>) :(
    <div>
        <h1 style={{ position:"fixed", top:"0",}}>E-comm App</h1>
        {/* {console.log(userName)} */}
        <h2 style={{color:"#BA07FD"}}><small>Welcome </small> {userName.toUpperCase()}</h2>
        <button style={{color:"red",borderRadius:20 ,position:"fixed", top:0,right:0}} onClick={handleOnclick} >Log-Out</button>
        <button style={{backgroundColor:"#F9FC93",borderRadius:20 ,position:"fixed", top:0,right:100}}onClick={handleOnCart}>CART</button>
        
        
        <div  style={{display: "flex", flexWrap :"wrap",textAlign:"center",justifyContent:"center", padding: 5}}>
        
        {
            products.map((product) =>{

                const itemAdd = async ()=>{
                    try {
                        // console.log(product?._id);
                        const response = await addProduct({
                            "_id" : `${product?._id}`,
                            "title":`${product?.title}`,
                            "price":`${product?.price}`,
                            "userQuantity": 1
                            
                    })
                    const message = response.data?.message
                    toast(message,{
                        type: "success",
                        theme:"colored"})
                      
                  
                    } catch (error) {
                        const message = error?.response?.data?.message || "Something went wrong";
                        toast(message,{
                          type: "error",
                          theme:"colored"})
                        
                    }
                }

                const itemRemove = async ()=>{
                    try {
                        const response = await removeProduct()
                    const message = response.data?.message
                    toast(message,{
                        type: "info",
                        theme:"colored"})
                      
                  
                    } catch (error) {
                        const message = error?.response?.data?.message || "Something went wrong";
                        toast(message,{
                          type: "error",
                          theme:"colored"})
                        
                    }
                }
                
                const handleDelete =() =>{
                    const product_id = product?._id;
                    localStorage.setItem("E-COMM-product_id",product_id);                    
                    itemRemove();
                }

            return(
                <>
                
            
                <div style={{width:1000}} key={product?.id} >
                    
                <table style={{border:"5px inset #FCC696"}} border={1} >
                    <tbody>
                        <tr>
                            
                            <td><img src={product.images?.[0]} width={400} alt="productImage"/></td>
                            <td><div>
                                <h3 style={{color:"#C607F5"}}>{product.title}</h3>
                                <h6>{product.description}</h6>
                                </div></td>
                            <td><h2 style={{color:"#FC48C5"}}><small style={{color:"orange"}}>$</small>{product.price} </h2></td>
                            <td>
                            <button style={{color:"white", backgroundColor:"blue",width: 150, borderRadius:20}} onClick={()=>{itemAdd()}}>Add to Cart</button>   
                            <button style={{color:"white", backgroundColor:"blue",width: 150, borderRadius:20}} onClick={()=>{handleDelete()}}>Delete</button>
                            
                            </td>

                        </tr>
                        </tbody>
                </table>
            </div>    
            
                </>
            )
            })
            
        }
    </div>
    </div>
)
    }
        </>
    )

}
export default DashBoard;