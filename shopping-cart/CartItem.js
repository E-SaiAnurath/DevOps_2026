import React from "react";

function CartItem({ quantity, increment, decrement, reset }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        width: "250px",
        margin: "20px auto",
      }}
     
    >
      <h2>Item Details</h2>
      <p>Product: Awesome Item</p>
      <p>Price: $20</p>
      <p>Quantity: {quantity}</p>

      {/* Buttons to update quantity */}
      <button onClick={increment}>+</button>
      <button onClick={decrement} style={{ margin: "0 10px" }}>
        -
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CartItem;