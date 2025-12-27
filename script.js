document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle navigation menu
    toggleBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = toggleBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = toggleBtn.contains(event.target) || 
                                    navLinks.contains(event.target);
        
        if (!isClickInsideNavbar && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Video background handling
    const video = document.getElementById('background-video');
    
    // Ensure video plays properly
    if (video) {
        // If video fails to load or play, use a fallback image
        video.addEventListener('error', function() {
            const videoContainer = document.querySelector('.video-container');
            videoContainer.style.backgroundImage = "url('/api/placeholder/1200/800')";
            videoContainer.style.backgroundSize = "cover";
            videoContainer.style.backgroundPosition = "center";
            video.style.display = "none";
        });
        
        // Try to play the video as soon as possible
        video.play().catch(function(error) {
            console.log("Auto-play was prevented:", error);
            
            // Add a play button for manual play if needed
            const playButton = document.createElement('button');
            playButton.innerHTML = '<i class="fas fa-play"></i> Play Video';
            playButton.className = 'video-play-btn';
            document.querySelector('.video-container').appendChild(playButton);
            
            playButton.addEventListener('click', function() {
                video.play();
                playButton.style.display = 'none';
            });
        });
    }
    
    // "Watch Our Story" button functionality
    const watchStoryBtn = document.querySelector('.secondary-button');
    if (watchStoryBtn) {
        watchStoryBtn.addEventListener('click', function() {
            alert('Our story video would play here in a modal window.');
            
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".category-tab");
    const menuItems = document.querySelectorAll(".menu-item");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            const category = this.getAttribute("data-category");

            menuItems.forEach(item => {
                if (category === "all" || item.getAttribute("data-category") === category) {
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    const cartNotification = document.getElementById("cartNotification");

    if (!cartNotification) {
        console.error("Cart notification element not found.");
        return;
    }

    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            cartNotification.classList.add("show");

            setTimeout(() => {
                cartNotification.classList.remove("show");
            }, 2000);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const contactButtons = document.querySelectorAll(".contact-button");
    const contactNotification = document.getElementById("contactNotification");

    if (!contactNotification) {
        console.error("contact notification element not found.");
        return;
    }

    contactButtons.forEach(button => {
        button.addEventListener("click", function () {
            contactNotification.classList.add("show");

            setTimeout(() => {
                contactNotification.classList.remove("show");
            }, 2000);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cart = [];

    // Function to update cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price;
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    // Add to Cart Function
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));

            cart.push({ name, price });
            updateCart();
        });
    });

    // Remove from Cart Function
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Checkout Button Click
    document.getElementById("checkout").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Order placed successfully!");
            cart = [];
            updateCart();
        }
    });
});
