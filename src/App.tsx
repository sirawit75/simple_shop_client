import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

function App() {
  const profile = localStorage.getItem("profile");
  let username: string | null = null;
  if (profile) username = JSON.parse(profile)?.user?.username;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/user/cart"
          element={!username ? <Navigate to="/" /> : <Cart />}
        />
      </Routes>
    </>
  );
}

export default App;
