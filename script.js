let products = [];
let cart = [];
let orderHistory = [];

// Sample data for testing
const sampleProducts = [
  
        {
          id: 1,
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          price: 109.95,
          description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          rating: { rate: 3.9, count: 120 }
        },
        {
          id: 2,
          title: "Mens Casual Premium Slim Fit T-Shirts",
          price: 22.3,
          description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket...",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          rating: { rate: 4.1, count: 259 }
        },
        // Add more products from your dataset
      ];
function initializeSampleData() {
    sampleProducts.forEach((prod, index) => {
        products.push({ id: index + 1, ...prod, image: '' }); // Add an empty image for now
    });
    displayProducts();
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').files[0];

    const product = {
        id: products.length + 1,
        title,
        description,
        price,
        category,
        image: URL.createObjectURL(image)
    };

    products.push(product);
    displayProducts();
    this.reset();
});

function displayProducts(filter = '') {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    const filteredProducts = products.filter(p => 
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.toLowerCase())
    );

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    document.getElementById('cartCount').innerText = cart.length;
    alert(`${product.title} has been added to the cart.`);
}

document.getElementById('viewVendor').addEventListener('click', function() {
    document.getElementById('vendorPanel').classList.toggle('hidden');
});

document.getElementById('viewOrders').addEventListener('click', function() {
    const orderList = orderHistory.map(order => `<p>${order.title} - $${order.price.toFixed(2)}</p>`).join('');
    alert(`Order History:\n${orderList}`);
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', function() {
    const searchValue = this.value;
    displayProducts(searchValue);
});
function viewCart() {
    const cartPanel = document.getElementById('cartPanel');
    const cartList = document.getElementById('cartList');

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            cartList.innerHTML += `
                <p>
                    <img src="${item.image}" width="50">
                    ${item.title} - $${item.price.toFixed(2)} (x${item.quantity}) 
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </p>
            `;
        });
    }

    cartPanel.classList.remove('hidden');
}

// Close the cart panel
function closeCart() {
    document.getElementById('cartPanel').classList.add('hidden');
}
document.getElementById('viewCart').addEventListener('click', viewCart);
function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    alert(`${product.title} has been added to the cart.`);
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    viewCart(); // Refresh cart display
    document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const billDetails = document.getElementById('billDetails');
    const totalAmount = document.getElementById('totalAmount');

    billDetails.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        billDetails.innerHTML += `
            <p>${item.title} (x${item.quantity}) - $${itemTotal.toFixed(2)}</p>
        `;
    });

    totalAmount.innerText = total.toFixed(2);
    document.getElementById('checkoutPanel').classList.remove('hidden');
}
function confirmOrder() {
    orderHistory.push(...cart); // Save cart to order history
    cart = []; // Clear cart

    document.getElementById('cartCount').innerText = "0"; // Update UI
    document.getElementById('checkoutPanel').classList.add('hidden');
    alert("Order placed successfully!");

    // Optionally, show order history after confirmation
    viewOrders();
}
function closeCheckout() {
    document.getElementById('checkoutPanel').classList.add('hidden');
}
function viewOrders() {
    if (orderHistory.length === 0) {
        alert("No past orders.");
        return;
    }

    const orderList = orderHistory.map(order => 
        `<p>${order.title} (x${order.quantity}) - $${(order.price * order.quantity).toFixed(2)}</p>`
    ).join('');

    alert(`Order History:\n${orderList}`);
}


// Initialize with sample data
initializeSampleData();
