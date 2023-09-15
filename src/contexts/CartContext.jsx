import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [carritoStorage, setCarritoStorage] = useState([]);

  const totalPrice = () => {
    let costeDeEnvio = 15;

    let total = carritoStorage.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);
    console.log(total);
    return total;
  };

  const increaseQuantity = (product) => {
    const productIndex = carritoStorage.findIndex(
      (prod) => prod.id == product.id
    );

    let refCarritoStorage = [...carritoStorage];
    if (refCarritoStorage[productIndex].quantity < product.stock) {
      refCarritoStorage[productIndex].quantity += 1;
    }
    setCarritoStorage(refCarritoStorage);
  };

  const decreaseQuantity = (product) => {
    const productIndex = carritoStorage.findIndex(
      (prod) => prod.id == product.id
    );
    let refCarritoStorage = [...carritoStorage];
    if (refCarritoStorage[productIndex].quantity > 1) {
      refCarritoStorage[productIndex].quantity -= 1;
      setCarritoStorage(refCarritoStorage);
    }
  };

  const removeFromCart = (product) => {
    const productIndex = carritoStorage.findIndex(
      (prod) => prod.id == product.id
    );

    let refCarritoStorage = [...carritoStorage];
    refCarritoStorage.splice(productIndex, 1);
    setCarritoStorage(refCarritoStorage);
  };

  const addToCart = (product) => {
    const productIndex = carritoStorage.findIndex(
      (prod) => prod.id == product.id
    );

    if (productIndex !== -1) {
      let refCarritoStorage = [...carritoStorage];
      const inCartProductQuantity = refCarritoStorage[productIndex].quantity;

      if (inCartProductQuantity + product.quantity > product.stock) {
        console.log("No hay suficiente stock");
      } else if (refCarritoStorage[productIndex].quantity < product.stock) {
        refCarritoStorage[productIndex].quantity += product.quantity;

        setCarritoStorage(refCarritoStorage);
      }
    } else {
      setCarritoStorage([...carritoStorage, product]);
    }
  };

  let data = {
    carritoStorage,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
