import axios from 'axios';

export const onSignUp = async (data)  =>{
    return await axios({

        method:'POST',
        url:"http://localhost:4000/api/v1/users/register",
        data : data ,
        headers : {},
        params: {}  
     })
}


export const onLogIn = async (data) =>{
  return await axios({

    method : 'POST',
    url :"http://localhost:4000/api/v1/users/login",
    data :data,
    headers : {},
    params: {}
  })

}

export const forFeed = async (data) =>{
  const token = localStorage.getItem("E-COMM-token")
  return await axios({
    method:"GET",
    url:"http://localhost:4000/api/v1/products/loadProducts",
    body:"",
    headers :
      {"X-Authorization" : `${token}`
  },
    params:{
      per_page: 25,
      page: 1
    }
  })
}

export const addProduct = async (data) =>{
  const token = localStorage.getItem("E-COMM-token")
  const cart_id = localStorage.getItem("E-COMM-cartID")
  return await axios ({
    method:"POST",
    url:`http://localhost:4000/api/v1/cart/addtoCart/${cart_id}`,
    headers:
    {"X-Authorization" : `${token}`,
  },
    data:data
  })
}

export const removeProduct = async (data) =>{
  const token = localStorage.getItem("E-COMM-token")
  const cart_id = localStorage.getItem("E-COMM-cartID")
  const product_id = localStorage.getItem("E-COMM-product_id")
  return await axios ({
    method:"DELETE",
    url:`http://localhost:4000/api/v1/cart/deletefromCart/${cart_id}/${product_id}`,
    headers:
    {"X-Authorization" : `${token}`,
  }
  })
}

export const loadCart = async(data) =>{
  const token = localStorage.getItem("E-COMM-token")
  const cart_id = localStorage.getItem("E-COMM-cartID")
  return await axios({

    method: "GET",
    url:`http://localhost:4000/api/v1/cart/getProductsfromCart/${cart_id}`,
    headers:
    {"X-Authorization" : `${token}`
    },
    data : data
  })
}
