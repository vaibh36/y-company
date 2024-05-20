// src/MyContext.js
import React, { createContext, useState } from "react";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

// Create the context
export const MyContext = createContext();

// Create the provider component
export const MyProductProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [searchedProducts, setSearchProducts] = React.useState([]);
  const db = getFirestore();

  React.useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "clothes"));
      const temporaryArr = [];
      querySnapshot.forEach((doc) => {
        temporaryArr.push(doc.data());
      });
      setProducts(temporaryArr);
    };

    fetchDataFromFirestore();
  }, []);

  return (
    <MyContext.Provider
      value={{ products, setProducts, searchedProducts, setSearchProducts }}
    >
      {children}
    </MyContext.Provider>
  );
};
