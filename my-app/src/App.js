import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./screens/Home";
import Orders from "./screens/Orders";
import Footer from "./components/Footer";
import SignUp from "./screens/SingUp";
import Login from "./screens/Login";
import { CartProvider } from "./contex/Cart";


function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [User,setUser]=useState("GoFood")
  const [orders,Setorders]=useState([])

  return (
    <CartProvider>
    <BrowserRouter>
      <NavBar authToken={authToken} setAuthToken={setAuthToken} user={User} setOrder={Setorders} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} setUser={setUser} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;

