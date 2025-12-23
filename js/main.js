document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const orderButton = document.getElementById('order-btn');
    const noResults = document.getElementById('no-results');

    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = `Rp ${total.toLocaleString()}`;
        document.getElementById('cart-badge').textContent = cart.length;
        document.getElementById('cart-badge').style.display = cart.length > 0 ? 'block' : 'none';
    }

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = parseInt(card.querySelector('p').textContent.replace(/\D/g, ''));
            addToCart(name, price);
        });
    });

    cartIcon.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    orderButton.addEventListener('click', () => {
        alert('Pesanan berhasil dikirim!');
        cart = [];
        updateCart();
        cartModal.classList.add('hidden');
    });
    
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const productCards = document.querySelectorAll('.product-card');

    function searchProducts() {
        const keyword = searchInput.value.toLowerCase().trim();
        let found = false;

        productCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();

            if (keyword === "" || name.includes(keyword)) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (keyword !== "" && !found) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }

    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keyup', searchProducts);
});
