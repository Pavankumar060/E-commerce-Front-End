
const Home =()=>{
    return(
        <div style={{display:"flex" ,flexDirection:"column"}}>
           
        <div >
        <a style={{border:"5px solid aqua",color:"black" , backgroundColor:"aqua",borderRadius:20}} href="/signup">Signup</a>
        <a style={{border:"5px solid aqua",color:"black" , backgroundColor:"aqua",borderRadius:20}}href="/login">login</a>
        </div>
        <div >
                <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg" width={800} />
            </div>
        </div>
    )
}
export default Home;