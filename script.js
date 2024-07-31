document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("login-modal");
    const btn = document.getElementById("sign-in-btn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

/*```````````````````````move slider``````````````````````````````` */

let currentSlide = 0;

function moveSlide(n) {
  const productGrid = document.querySelector('.js-product-grid');
  const products = document.querySelectorAll('.product');
  const totalProducts = products.length;
  const productsPerView = 5;
  const maxSlide = totalProducts - productsPerView;

  currentSlide += n;

  // Boundaries for slides
  if (currentSlide > maxSlide) currentSlide = maxSlide;
  if (currentSlide < 0) currentSlide = 0;

  const slideWidth = products[0].offsetWidth;
  const newTransformValue = -slideWidth * currentSlide;

  productGrid.style.transform = `translateX(${newTransformValue}px)`;
}
/*````````````````````````increase add to cart````````````````````````````````````````````` */
document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;

    document.querySelector('.product-grid').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productElement = event.target.closest('.product');
            const quantityInput = productElement.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value, 10);

            cartCount += quantity;
            document.getElementById('cart-quantity').textContent = cartCount;
        }
    });
});

/*``````````````````````````````cart item`````````````````````````````````````*/
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelector('.product-grid').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-product-id');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = productElement.querySelector('.price').textContent;
            const quantityInput = productElement.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value, 10);
            const productImage = productElement.querySelector('.image img').src;
            const productRating = productElement.querySelector('.rating').textContent;
            const productDescription = productElement.querySelector('p').textContent;

            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ 
                    id: productId, 
                    name: productName, 
                    price: productPrice, 
                    quantity: quantity, 
                    image: productImage,
                    rating: productRating,
                    description: productDescription
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    });


    document.querySelector('.product-grid').addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity')) {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-product-id');
            const quantity = parseInt(event.target.value, 10);
            const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('$', ''));

            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity = quantity;
                const totalCost = cartItem.quantity * productPrice;
                productElement.querySelector('.total-cost').textContent = `$${totalCost.toFixed(2)}`;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    });

    function updateCartCount() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-quantity').textContent = totalQuantity;
    }

    updateCartCount();
});

/*``````````````````````````````wishlist`````````````````````````````````````*/
document.addEventListener('DOMContentLoaded', () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    document.querySelector('.product-grid').addEventListener('click', (event) => {
        if (event.target.textContent === 'Wishlist') {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-product-id');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('$', ''));
            const productImage = productElement.querySelector('.image img').src;

            const existingProduct = wishlist.find(item => item.id === productId);

            if (!existingProduct) {
                wishlist.push({ 
                    id: productId, 
                    name: productName, 
                    price: productPrice, 
                    image: productImage 
                });

                localStorage.setItem('wishlist', JSON.stringify(wishlist));
            }
        }
    });
});