document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.content h3')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)),
                quantity: 1,
            };

            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
            if (existingItemIndex !== -1) {
                if (cartItems[existingItemIndex].quantity < 10) {
                    cartItems[existingItemIndex].quantity++;
                } else {
                    alert("Quantity cannot be more than 10.");
                }
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemsCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <button class="minus-btn" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="add-btn" data-index="${index}">+</button>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}"><i class="fas fa-times"></i></button>
                `;

            cartItemsList.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });
        });

        const minusButtons = document.querySelectorAll('.minus-btn');
        minusButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                decrementItemQuantity(index);
            });
        });

        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                incrementItemQuantity(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    }

    function incrementItemQuantity(index) {
        if (cartItems[index].quantity < 10) {
            cartItems[index].quantity++;
            totalAmount += cartItems[index].price;
            updateCartUI();
        } else {
            alert("Quantity cannot be more than 10.");
        }
    }

    function decrementItemQuantity(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            totalAmount -= cartItems[index].price;
            updateCartUI();
        } else {
            alert("Quantity cannot be below 1.");
        }
    }

    function updateCartTotal() {
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});