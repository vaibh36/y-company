import React, { useContext, useReducer, useMemo } from "react";
import useLocalStorageReducer from "../hooks/use-local-storage-reducer";
import { Map } from "immutable";

// Reducers
const initialCartValues = {
  cartDetails: {},
  cartCount: 0,
  totalPrice: 0,
};

const addItem = (state = {}, product = null) => {
  let entry = state?.cartDetails?.[product?.id];

  return {
    ...state,
    cartDetails: {
      ...state.cartDetails,
      [product?.id]: {
        quantity: (entry?.quantity || 0) + 1,
        image: product?.image,
        description: product?.description,
        price: product?.price,
        id: product?.id,
        stripeId: product?.stripeId,
      },
    },
    cartCount: state.cartCount + 1,
  };
};

const removeItem = (state = {}, product = null) => {
  const identifier = product?.id;
  let entry = state?.cartDetails?.[identifier];
  const immutableCartDetails = Map(state?.cartDetails);

  if (entry?.quantity === 1) {
    const newMap = immutableCartDetails?.delete(identifier?.toString());

    return {
      ...state,
      cartDetails: newMap?.toJS(),
      cartCount: state?.cartCount - 1,
    };
  }
  if (entry?.quantity !== 1) {
    const newMap = immutableCartDetails?.update(
      identifier?.toString(),
      (item) => {
        const newItem = Map(item).set("quantity", item?.quantity - 1);
        return newItem;
      }
    );

    return {
      ...state,
      cartDetails: newMap?.toJS(),
      cartCount: state?.cartCount - 1,
    };
  }
};

const clearCart = () => {
  return initialCartValues;
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return addItem(state, action.product);
    case "REMOVE_ITEM":
      return removeItem(state, action.product, action.quantity);
    case "CLEAR_CART":
      return clearCart();
    default:
      return state;
  }
};

// Context + Provider
const CartContext = React.createContext();

export const CartProvider = ({ currency = "USD", children = null }) => {
  const [cart, dispatch] = useLocalStorageReducer(
    "cart",
    cartReducer,
    initialCartValues
  );

  const contextValue = useMemo(
    () => [
      {
        ...cart,
        currency,
      },
      dispatch,
    ],
    [cart, currency]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Hook
export const useShoppingCart = () => {
  const [cart, dispatch] = useContext(CartContext);

  const addItem = (product) => dispatch({ type: "ADD_ITEM", product });

  const removeItem = (product, quantity = 1) =>
    dispatch({ type: "REMOVE_ITEM", product, quantity });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const shoppingCart = {
    ...cart,
    addItem,
    removeItem,
    clearCart,
  };

  return shoppingCart;
};
