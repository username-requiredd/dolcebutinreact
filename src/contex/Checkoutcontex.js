import { createContext, useState, useContext, useEffect } from "react";

const CheckoutContext = createContext();
export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("checkout"));
    return storedCart || [];
  });
  // Load checkout from local storage when component mounts
  useEffect(() => {
    const storedCheckout = JSON.parse(localStorage.getItem("checkout"));
    if (storedCheckout) {
      setCheckout(storedCheckout);
    }
  }, []);

  // Save checkout to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(checkout));
  }, [checkout]);

  return (
    <CheckoutContext.Provider value={{ checkout, setCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
