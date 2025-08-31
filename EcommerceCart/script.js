document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "product 1",
      price: 100,
    },
    {
      id: 2,
      name: "product 2",
      price: 200,
    },
    {
      id: 3,
      name: "product 3",
      price: 300,
    },
  ];

  //Added when button is clicked
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const totalPriceMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutbtn = document.getElementById("checkout-btn");

  //Product added in Site
  products.forEach((product) => {
    const productdiv = document.createElement("div");
    productdiv.classList.add("product");
    productdiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(
      2
    )}</span>
    <button data-id="${product.id}">Add to cart</button>`;

    //Link it to ProductList
    productList.appendChild(productdiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //Trigger only when clicked on button
      const productId = parseInt(e.target.getAttribute("data-id")); //e.target.getAttribute("data-id") string form mai aayi hai jupar id int mai defined hai
      const product = products.find((p) => p.id === productId); //Wo p return kargea jiski id product id ke equal ho

      //Cart mai add kardo iss product ko
      addtoCart(product);
    }
  });

  function addtoCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";

    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      totalPriceMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <span>
        ${item.name} -$${item.price.toFixed(2)}   </span>  
         <button data-index="${index}"> Remove </button>`;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    }

    //
    else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = parseInt(e.target.getAttribute("data-index"));
      if (!isNaN(index)) {
        cart.splice(index, 1); // remove item from cart array//Iss index par jao aur ek element delete kardo
        localStorage.setItem("cart", JSON.stringify(cart)); // update localStorage
        renderCart(); // re-render cart items
      }
    }
  });

  checkOutbtn.addEventListener("click", () => {
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart)); // clear localStorage
    alert("Checkout successfully");
    renderCart();
  });

  renderCart();
});
