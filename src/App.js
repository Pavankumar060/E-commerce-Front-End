
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import DashBoard from './components/dashboard';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/cart';

const ProtectedRoute =(props) =>{
  const token = localStorage.getItem("E-COMM-token");

if (!!token === false) return <Navigate to= '/login'/>;
return props.component
}

const PublicRoute =(props) =>{
  const token = localStorage.getItem("E-COMM-token");

if (token ) return <Navigate to= '/dashboard'/>;
return props.component
}


function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: < PublicRoute component={< Signup />}/>,
    },
    {
      path: "/login",
      element: < PublicRoute component={< Login />}/>,
    },
    {
      path: "/",
      element:  < PublicRoute component={<Home />}/>,
    },
    {
      path : "/dashboard",
      element : <ProtectedRoute component={ <DashBoard />}/>
    },
    {
      path : "/cart",
      element : <ProtectedRoute component={ <Cart/>}/> 
    }
  ]);
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
