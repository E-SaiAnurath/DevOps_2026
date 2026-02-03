
import React, { useState } from "react";
import CartItem from "./CartItem";  // Import CartItem

function Cart() {
  // State to manage item quantity
  const [quantity, setQuantity] = useState(1);

  // Functions to modify quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const resetQuantity = () => {
    setQuantity(1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Shopping Cart</h1>

      {/* Pass state and functions as props */}
      <CartItem
        quantity={quantity}
        increment={incrementQuantity}
        decrement={decrementQuantity}
        reset={resetQuantity}
      />
    </div>
  );
}

export default Cart;