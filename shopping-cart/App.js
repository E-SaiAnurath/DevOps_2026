import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 120,
    desc: "Crisp and juicy Kashmiri apples.",
    image: "img1.png",
  },
  {
    id: 2,
    name: "Organic Milk",
    price: 60,
    desc: "Pure and fresh organic cow milk.",
    image: "milk.png",
  },
  {
    id: 3,
    name: "Brown Bread",
    price: 40,
    desc: "Soft and healthy whole wheat bread.",
    image: "bread.png",
  },
  {
    id: 4,
    name: "Basmati Rice",
    price: 160,
    desc: "Long-grain premium quality rice.",
    image: "rice.png",
  }
];

function App() {
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (item) => {
    const exist = cart.find((p) => p.id === item.id);

    if (exist) {
      setCart(
        cart.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // Increment Quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // Decrement Quantity
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container">
      <h1 className="title">🛒 Anurath Grocery Store</h1>

      <div className="products">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <h4>₹{item.price}</h4>

            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cartBox">
        <h2>🧺 Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cartItem" key={item.id}>
              <p>{item.name}</p>

              <div className="qtyButtons">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <p>₹{item.price * item.qty}</p>
            </div>
          ))
        )}

        <h3>Total: ₹{totalPrice}</h3>
      </div>
    </div>
  );
}

export default App;
