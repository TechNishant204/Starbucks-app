import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import ListItem from "./components/ListItems/ListItem";
import CartModal from "./components/Modal/CartModal";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartTotal = useMemo(() => calculateCartQuantity(cart), [cart]);
  const toggleModal = useCallback(() => toggle(), []);

  useEffect(() => {
    fetch("http://localhost:5175/products.json")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result && result.products) {
          setProducts(result.products);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //Calculating the total cart amount
  function calculateCartQuantity(items = []) {
    let totalCartPrice = 0;
    items.forEach((item) => {
      totalCartPrice += item.price * item.quantity;
    });
    return totalCartPrice;
  }

  function handleAddToCart(e, data = {}) {
    e.stopPropagation();
    if (data) {
      setCart((prev) => [...prev, { ...data, quantity: 1 }]);
    }
  }

  function isAddedToCart(cartSource = [], item = {}) {
    return cartSource.some((cartItem) => cartItem.id === item.id);
  }

  function toggle() {
    setCartOpen((prev) => !prev);
  }

  function handleCartQuantity(e, type = "", id = 0) {
    e.stopPropagation();

    const cartCopy = [...cart]; //take a copy of whole cart
    const matchingItem = cartCopy.find((item) => item.id === id); // find the matching element

    if (!matchingItem) {
      alert("Product Not Found");
      return;
    }

    //incrementing and decrementing the cart quantity
    if (type === "dec" && matchingItem["quantity"] > 1) {
      matchingItem["quantity"] -= 1;
    } else if (type === "inc") {
      matchingItem["quantity"] += 1;
    }

    setCart(cartCopy);
  }

  return (
    <>
      <Header length={cart.length} cartToggle={toggleModal} />
      <div className="px-2">
        <div className="mb-4 mx-auto"></div>
        {/* <h1 className="mb-3 text-center">WELCOME TO STARBUCKS</h1> */}
        <img
          src="https://readme-typing-svg.demolab.com?font=Poppins&weight=500&size=38&pause=1000&color=000000&center=true&vCenter=true&width=536&lines=WELCOME+TO+STARBUCKS"
          alt="Typing SVG"
          width="100%"
        />
        <div className="mt-3">
          {products.map((p, index) => (
            <ListItem
              key={`${p.name}-${index}`}
              data={p}
              addToCart={handleAddToCart}
              disabled={isAddedToCart(cart, p)}
            />
          ))}
        </div>
        <CartModal
          isOpen={cartOpen}
          toggle={toggle}
          items={cart}
          quantityChange={handleCartQuantity}
          totalCartPrice={cartTotal}
        />
      </div>
    </>
  );
}

export default App;
