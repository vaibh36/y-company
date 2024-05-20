// src/MyContext.js
import React, { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create the provider component
export const MyProductProvider = ({ children }) => {
  const [products, setProducts] = useState();
  console.log("products now are:-", products);

  return (
    <MyContext.Provider value={{ products, setProducts }}>
      {children}
    </MyContext.Provider>
  );
};
