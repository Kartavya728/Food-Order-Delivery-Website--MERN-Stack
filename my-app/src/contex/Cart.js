import React, { createContext, useContext, useReducer } from 'react'

const CartContext=createContext();
const DispatchConstex=createContext();

const reducer = (state, action) => {
  if (action.type === "ADD") {
    return [
      ...state,
      {
        id: action.id,
        name: action.name,
        img: action.img,
        size: action.size,
        qty: action.qty,
        price: action.price,
      },
    ];
  } else if (action.type === "REMOVE_ITEM") {
    return state.filter((item, index) => index !== action.payload);
  }
  else if (action.type === "checkout") {
    return [];
  }
  return state; // Default return if no action matches
};

export const CartProvider = ({children})=>{
  const[state,dispatch]=useReducer(reducer,[])
  return(
    <DispatchConstex.Provider value={dispatch}>
      <CartContext.Provider value={state}>
        {children}
      </CartContext.Provider>
    </DispatchConstex.Provider>
  )
};

export const UseDispatch =()=> useContext(DispatchConstex)

export const UseCart = () => useContext(CartContext) ;



