document.addEventListener('DOMContentLoaded', function() {
    // Обновление счетчика корзины
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = totalItems;
        });
    }
    
    updateCartCount();

    // Добавление товара в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.closest('.product-card')?.querySelector('h3')?.textContent || 'Товар';
            const productPrice = this.closest('.product-card')?.querySelector('.price')?.textContent || '0';
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            alert(`${productName} добавлен в корзину!`);
        });
    });

    // Управление количеством товара
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            } else if (this.classList.contains('plus')) {
                input.value = value + 1;
            }
        });
    });

    // Фильтрация товаров
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter && priceFilter) {
        function filterProducts() {
            const category = categoryFilter.value;
            const price = priceFilter.value;
            
            document.querySelectorAll('.product-card').forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardPrice = card.getAttribute('data-price');
                
                const categoryMatch = category === 'all' || cardCategory === category;
                const priceMatch = price === 'all' || cardPrice === price;
                
                if (categoryMatch && priceMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }

    // Удаление товара из корзины
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.remove();
            // Здесь должна быть логика обновления localStorage
            updateCartCount();
        });
    });

    // Переключение изображений товара
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const mainImage = document.querySelector('.main-image');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                mainImage.src = this.src;
            });
        });
    }
});