import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from './AppRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </CartProvider> 
    </>
  )
}

export default App
