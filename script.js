// Luxury Fashion Website JavaScript

// Global variables
let currentSlide = 0;
let slideInterval;

// Product data with 20 items
const PRODUCTS = [
  { id: 'anarkali-kurti', name: 'Anarkali Kurti', price: 10000, img: 'assets/explore-1.jpg', desc: 'Classic black anarkali with golden border' },
  { id: 'jacket-lehenga', name: 'Jacket Lehenga Set', price: 45000, img: 'assets/explore-2.jpg', desc: 'Mirror Jacket Lehenga Set' },
  { id: 'lehenga-choli', name: 'Lehenga Choli', price: 25000, img: 'assets/explore-3.jpg', desc: 'Royal Green lehenga with hand-stitched details' },
  { id: 'bridal-sarees', name: 'Bridal Sarees', price: 18000, img: 'assets/explore-4.jpg', desc: 'Elegant golden saree paired with contrasting red blouse' },
  { id: 'flow-light-blue', name: 'Flow Of Light Blue', price: 12000, img: 'assets/explore-5.jpg', desc: 'Blue Chiffon Cape Floor' },
  { id: 'indo-western-ensemble', name: 'Indo Western Ensemble', price: 9500, img: 'assets/explore-6.jpg', desc: 'Pink Silk Zari Collared Embroidered Coat And Pant' },
  { id: 'anarkali-gown', name: 'Anarkali Gown', price: 11000, img: 'assets/explore-7.jpg', desc: 'Anarkali Gown with embroidery for parties' },
  { id: 'black-printed-anarkali', name: 'Black Printed Anarkali Suit', price: 36000, img: 'assets/explore-8.jpg', desc: 'Organza anarkali, featuring exquisite embroidery' },
  { id: 'golden-tissue-anarkali', name: 'Golden Tissue Anarkali Gown', price: 13000, img: 'assets/explore-9.jpg', desc: 'Hand Embroidered Sequins & Silk Border Detailing' },
  { id: 'sharara-salwar', name: 'Sharara Salwar Suit', price: 7000, img: 'assets/explore-10.jpg', desc: 'Tabby Organza in Light Pink Laced Sharara Kurti Dupatta Set' },
  { id: 'plazzo-suit', name: 'Plazzo Suit Set', price: 8500, img: 'assets/explore-11.jpg', desc: 'Festive Special Chinon Silk Partywear Designer Gown With Palazzo & Dupatta Set' },
  { id: 'floral-lehenga-lavender', name: 'Floral Printed Lehenga Choli', price: 30000, img: 'assets/explore-12.jpg', desc: 'Dark Lavender Organza Floral Printed & Cutdana Embroidered Lehenga Set' },
  { id: 'floral-lehenga-red', name: 'Floral Printed Lehenga Choli', price: 28000, img: 'assets/explore-13.jpg', desc: 'Dark Red Organza Floral Printed & Cutdana Embroidered Lehenga Set' },
  { id: 'plazzo-anarkali', name: 'Plazzo Suit Anarkali Style', price: 40000, img: 'assets/explore-14.jpg', desc: 'Soft coral pishwas with gold florals, embellished sharara, and ornate dupatta' },
  { id: 'arka-cape', name: 'Arka Cape Set', price: 65000, img: 'assets/explore-15.jpg', desc: 'Perfect for festive evenings, parties, and modern celebrations' },
  { id: 'lehenga-suit', name: 'Lehenga Suit', price: 50000, img: 'assets/explore-16.jpg', desc: 'Green tissue sharara with trims border, raw silk kurta and organza dupatta' },
  { id: 'indo-western-lehenga', name: 'Indo Western Lehenga Choli', price: 52000, img: 'assets/explore-17.jpg', desc: 'Mirror Indo Western Lehenga Choli Designer Wedding Party Lengha' },
  { id: 'indo-western-set', name: 'Indo Western Set', price: 9000, img: 'assets/explore-18.jpg', desc: 'Mirror Indo Western Lehenga Choli Pant Designer Wedding Party' },
  { id: 'kurti-sharara', name: 'Kurti and Sharara Set', price: 12000, img: 'assets/explore-19.jpg', desc: 'Maroon V Neck Embroidered Kurti With Embroidered Bustier & Sharara' },
  { id: 'sequin-mini-dress', name: 'Sequin Mini Dress with Sheer Overlay', price: 75000, img: 'assets/explore-20.jpg', desc: 'Chic partywear dress with heavy sequin work' }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeHeader();
  initializeSliders();
  initializeProductInteractions();
  initializeSmoothScroll();
  loadExploreProducts();
});

// Header functionality
function initializeHeader() {
  const header = document.getElementById('siteHeader');
  const shrinkThreshold = 12;

  const onScroll = () => {
    if (window.scrollY > shrinkThreshold) {
      header.classList.add('is-shrunk');
    } else {
      header.classList.remove('is-shrunk');
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Check initial state

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

// Banner slider functionality
function initializeSliders() {
  // Homepage banner slider
  const bannerSlides = document.querySelectorAll('.banner-slide');
  if (bannerSlides.length > 0) {
    startBannerSlider(bannerSlides);
  }

  // Signature designs slider
  const sliderSlides = document.querySelectorAll('.slider-slide');
  if (sliderSlides.length > 0) {
    startSignatureSlider(sliderSlides);
  }
}

function startBannerSlider(slides) {
  if (slides.length <= 1) return;
  
  slideInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

function startSignatureSlider(slides) {
  if (slides.length <= 1) return;
  
  slideInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}

// Load explore products
function loadExploreProducts() {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  PRODUCTS.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
  
  // Update wishlist button states
  updateWishlistButtonStates();
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'luxury-product-card';
  card.setAttribute('data-product-id', product.id);
  
  card.innerHTML = `
    <div class="product-image-container">
      <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.src='assets/placeholder.jpg'">
      <div class="product-actions">
        <button class="action-btn wishlist" data-id="${product.id}" title="Add to wishlist" aria-pressed="false">♡</button>
        <button class="action-btn bag" data-id="${product.id}" title="Add to bag">👜</button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">₹${product.price.toLocaleString()}</p>
      <button class="add-to-bag-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">Add to Bag</button>
    </div>
  `;
  
  // Add click handler for product card (excluding buttons)
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.action-btn') && !e.target.closest('.add-to-bag-btn')) {
      const productUrl = `product.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.img)}&desc=${encodeURIComponent(product.desc)}`;
      window.location.href = productUrl;
    }
  });
  
  return card;
}

// Product interactions (wishlist and bag)
function initializeProductInteractions() {
  // Wishlist functionality
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('wishlist') || e.target.closest('.wishlist')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.classList.contains('wishlist') ? e.target : e.target.closest('.wishlist');
      const productId = button.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        toggleWishlist(product, button);
      }
    }

    // Add to bag functionality
    if (e.target.classList.contains('add-to-bag-btn') || e.target.classList.contains('bag')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.classList.contains('add-to-bag-btn') ? e.target : e.target.closest('.bag');
      const productId = button.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        addToBag(product);
      }
    }
  });
}

// Wishlist functions
function toggleWishlist(product, button) {
  let wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  const existingItem = wishlist.find(item => item.id === product.id);
  
  if (existingItem) {
    wishlist = wishlist.filter(item => item.id !== product.id);
    button.classList.remove('active');
    button.setAttribute('aria-pressed', 'false');
    showNotification('Removed from wishlist', 'info');
  } else {
    wishlist.push({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      img: product.img,
      desc: product.desc
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    showNotification('Added to wishlist', 'success');
  }
  
  localStorage.setItem('hof_wishlist_v1', JSON.stringify(wishlist));
  updateWishlistCount();
}

// Bag functions
function addToBag(product, size = 'M', quantity = 1) {
  let bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const existingItem = bag.find(item => item.id === product.id && item.size === size);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    bag.push({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      img: product.img,
      desc: product.desc,
      size: size,
      quantity: quantity
    });
  }
  
  localStorage.setItem('hof_bag_v1', JSON.stringify(bag));
  showNotification('Added to bag', 'success');
  updateBagCount();
}

// Update wishlist button states
function updateWishlistButtonStates() {
  const wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  document.querySelectorAll('.wishlist').forEach(button => {
    const productId = button.getAttribute('data-id');
    const isInWishlist = wishlist.find(item => item.id === productId);
    
    if (isInWishlist) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    }
  });
}

// Update counts in header
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  const wishlistIcons = document.querySelectorAll('.icon-btn[href="wishlist.html"]');
  wishlistIcons.forEach(icon => {
    const count = wishlist.length;
    if (count > 0) {
      icon.setAttribute('data-count', count);
      icon.style.position = 'relative';
    } else {
      icon.removeAttribute('data-count');
    }
  });
}

function updateBagCount() {
  const bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const bagIcons = document.querySelectorAll('.icon-btn[href="bag.html"]');
  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);
  
  bagIcons.forEach(icon => {
    if (totalItems > 0) {
      icon.setAttribute('data-count', totalItems);
      icon.style.position = 'relative';
    } else {
      icon.removeAttribute('data-count');
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);// Luxury Fashion Website JavaScript

// Global variables
let currentSlide = 0;
let slideInterval;

// Product data with 20 items
const PRODUCTS = [
  { id: 'anarkali-kurti', name: 'Anarkali Kurti', price: 10000, img: 'assets/explore-1.jpg', desc: 'Classic black anarkali with golden border' },
  { id: 'jacket-lehenga', name: 'Jacket Lehenga Set', price: 45000, img: 'assets/explore-2.jpg', desc: 'Mirror Jacket Lehenga Set' },
  { id: 'lehenga-choli', name: 'Lehenga Choli', price: 25000, img: 'assets/explore-3.jpg', desc: 'Royal Green lehenga with hand-stitched details' },
  { id: 'bridal-sarees', name: 'Bridal Sarees', price: 18000, img: 'assets/explore-4.jpg', desc: 'Elegant golden saree paired with contrasting red blouse' },
  { id: 'flow-light-blue', name: 'Flow Of Light Blue', price: 12000, img: 'assets/explore-5.jpg', desc: 'Blue Chiffon Cape Floor' },
  { id: 'indo-western-ensemble', name: 'Indo Western Ensemble', price: 9500, img: 'assets/explore-6.jpg', desc: 'Pink Silk Zari Collared Embroidered Coat And Pant' },
  { id: 'anarkali-gown', name: 'Anarkali Gown', price: 11000, img: 'assets/explore-7.jpg', desc: 'Anarkali Gown with embroidery for parties' },
  { id: 'black-printed-anarkali', name: 'Black Printed Anarkali Suit', price: 36000, img: 'assets/explore-8.jpg', desc: 'Organza anarkali, featuring exquisite embroidery' },
  { id: 'golden-tissue-anarkali', name: 'Golden Tissue Anarkali Gown', price: 13000, img: 'assets/explore-9.jpg', desc: 'Hand Embroidered Sequins & Silk Border Detailing' },
  { id: 'sharara-salwar', name: 'Sharara Salwar Suit', price: 7000, img: 'assets/explore-10.jpg', desc: 'Tabby Organza in Light Pink Laced Sharara Kurti Dupatta Set' },
  { id: 'plazzo-suit', name: 'Plazzo Suit Set', price: 8500, img: 'assets/explore-11.jpg', desc: 'Festive Special Chinon Silk Partywear Designer Gown With Palazzo & Dupatta Set' },
  { id: 'floral-lehenga-lavender', name: 'Floral Printed Lehenga Choli', price: 30000, img: 'assets/explore-12.jpg', desc: 'Dark Lavender Organza Floral Printed & Cutdana Embroidered Lehenga Set' },
  { id: 'floral-lehenga-red', name: 'Floral Printed Lehenga Choli', price: 28000, img: 'assets/explore-13.jpg', desc: 'Dark Red Organza Floral Printed & Cutdana Embroidered Lehenga Set' },
  { id: 'plazzo-anarkali', name: 'Plazzo Suit Anarkali Style', price: 40000, img: 'assets/explore-14.jpg', desc: 'Soft coral pishwas with gold florals, embellished sharara, and ornate dupatta' },
  { id: 'arka-cape', name: 'Arka Cape Set', price: 65000, img: 'assets/explore-15.jpg', desc: 'Perfect for festive evenings, parties, and modern celebrations' },
  { id: 'lehenga-suit', name: 'Lehenga Suit', price: 50000, img: 'assets/explore-16.jpg', desc: 'Green tissue sharara with trims border, raw silk kurta and organza dupatta' },
  { id: 'indo-western-lehenga', name: 'Indo Western Lehenga Choli', price: 52000, img: 'assets/explore-17.jpg', desc: 'Mirror Indo Western Lehenga Choli Designer Wedding Party Lengha' },
  { id: 'indo-western-set', name: 'Indo Western Set', price: 9000, img: 'assets/explore-18.jpg', desc: 'Mirror Indo Western Lehenga Choli Pant Designer Wedding Party' },
  { id: 'kurti-sharara', name: 'Kurti and Sharara Set', price: 12000, img: 'assets/explore-19.jpg', desc: 'Maroon V Neck Embroidered Kurti With Embroidered Bustier & Sharara' },
  { id: 'sequin-mini-dress', name: 'Sequin Mini Dress with Sheer Overlay', price: 75000, img: 'assets/explore-20.jpg', desc: 'Chic partywear dress with heavy sequin work' }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeHeader();
  initializeSliders();
  initializeProductInteractions();
  initializeSmoothScroll();
  loadExploreProducts();
});

// Header functionality
function initializeHeader() {
  const header = document.getElementById('siteHeader');
  const shrinkThreshold = 12;

  const onScroll = () => {
    if (window.scrollY > shrinkThreshold) {
      header.classList.add('is-shrunk');
    } else {
      header.classList.remove('is-shrunk');
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Check initial state

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

// Banner slider functionality
function initializeSliders() {
  // Homepage banner slider
  const bannerSlides = document.querySelectorAll('.banner-slide');
  if (bannerSlides.length > 0) {
    startBannerSlider(bannerSlides);
  }

  // Signature designs slider
  const sliderSlides = document.querySelectorAll('.slider-slide');
  if (sliderSlides.length > 0) {
    startSignatureSlider(sliderSlides);
  }
}

function startBannerSlider(slides) {
  if (slides.length <= 1) return;
  
  slideInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

function startSignatureSlider(slides) {
  if (slides.length <= 1) return;
  
  slideInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}

// Load explore products
function loadExploreProducts() {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  PRODUCTS.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
  
  // Update wishlist button states
  updateWishlistButtonStates();
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'luxury-product-card';
  card.setAttribute('data-product-id', product.id);
  
  card.innerHTML = `
    <div class="product-image-container">
      <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.src='assets/placeholder.jpg'">
      <div class="product-actions">
        <button class="action-btn wishlist" data-id="${product.id}" title="Add to wishlist" aria-pressed="false">♡</button>
        <button class="action-btn bag" data-id="${product.id}" title="Add to bag">👜</button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">₹${product.price.toLocaleString()}</p>
      <button class="add-to-bag-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">Add to Bag</button>
    </div>
  `;
  
  // Add click handler for product card (excluding buttons)
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.action-btn') && !e.target.closest('.add-to-bag-btn')) {
      const productUrl = `product.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.img)}&desc=${encodeURIComponent(product.desc)}`;
      window.location.href = productUrl;
    }
  });
  
  return card;
}

// Product interactions (wishlist and bag)
function initializeProductInteractions() {
  // Wishlist functionality
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('wishlist') || e.target.closest('.wishlist')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.classList.contains('wishlist') ? e.target : e.target.closest('.wishlist');
      const productId = button.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        toggleWishlist(product, button);
      }
    }

    // Add to bag functionality
    if (e.target.classList.contains('add-to-bag-btn') || e.target.classList.contains('bag')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.classList.contains('add-to-bag-btn') ? e.target : e.target.closest('.bag');
      const productId = button.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        addToBag(product);
      }
    }
  });
}

// Wishlist functions
function toggleWishlist(product, button) {
  let wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  const existingItem = wishlist.find(item => item.id === product.id);
  
  if (existingItem) {
    wishlist = wishlist.filter(item => item.id !== product.id);
    button.classList.remove('active');
    button.setAttribute('aria-pressed', 'false');
    showNotification('Removed from wishlist', 'info');
  } else {
    wishlist.push({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      img: product.img,
      desc: product.desc
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    showNotification('Added to wishlist', 'success');
  }
  
  localStorage.setItem('hof_wishlist_v1', JSON.stringify(wishlist));
  updateWishlistCount();
}

// Bag functions
function addToBag(product, size = 'M', quantity = 1) {
  let bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const existingItem = bag.find(item => item.id === product.id && item.size === size);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    bag.push({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      img: product.img,
      desc: product.desc,
      size: size,
      quantity: quantity
    });
  }
  
  localStorage.setItem('hof_bag_v1', JSON.stringify(bag));
  showNotification('Added to bag', 'success');
  updateBagCount();
}

// Update wishlist button states
function updateWishlistButtonStates() {
  const wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  document.querySelectorAll('.wishlist').forEach(button => {
    const productId = button.getAttribute('data-id');
    const isInWishlist = wishlist.find(item => item.id === productId);
    
    if (isInWishlist) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    }
  });
}

// Update counts in header
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  const wishlistIcons = document.querySelectorAll('.icon-btn[href="wishlist.html"]');
  wishlistIcons.forEach(icon => {
    const count = wishlist.length;
    if (count > 0) {
      icon.setAttribute('data-count', count);
      icon.style.position = 'relative';
    } else {
      icon.removeAttribute('data-count');
    }
  });
}

function updateBagCount() {
  const bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const bagIcons = document.querySelectorAll('.icon-btn[href="bag.html"]');
  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);
  
  bagIcons.forEach(icon => {
    if (totalItems > 0) {
      icon.setAttribute('data-count', totalItems);
      icon.style.position = 'relative';
    } else {
      icon.removeAttribute('data-count');
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Legacy functions for measurement form
function changeUnit() {
  const unit = document.getElementById("unit").value;
  document.getElementById("bust").placeholder = `Bust (${unit})`;
  document.getElementById("waist").placeholder = `Waist (${unit})`;
  document.getElementById("hip").placeholder = `Hip (${unit})`;
  document.getElementById("height").placeholder = `Height (${unit})`;
  document.getElementById("length").placeholder = `Length (${unit})`;
  document.getElementById("sleeve").placeholder = `Sleeve Length (${unit})`;
  document.getElementById("shoulder").placeholder = `Shoulder Width (${unit})`;
  document.getElementById("armhole").placeholder = `Armhole (${unit})`;
}

function saveMeasurements() {
  const unit = document.getElementById("unit").value;
  const bust = document.getElementById("bust").value;
  const waist = document.getElementById("waist").value;
  const hip = document.getElementById("hip").value;
  const height = document.getElementById("height").value;
  const length = document.getElementById("length").value;
  const sleeve = document.getElementById("sleeve").value;
  const shoulder = document.getElementById("shoulder").value;
  const armhole = document.getElementById("armhole").value;
  const notes = document.getElementById("notes").value;

  // Basic validation
  if (!bust || !waist || !hip) {
    alert("Please enter Bust, Waist, and Hip measurements.");
    return;
  }

  // Summary alert
  let summary =
    `Measurements (${unit}):\n` +
    `Bust: ${bust}\n` +
    `Waist: ${waist}\n` +
    `Hip: ${hip}\n` +
    `Height: ${height}\n` +
    `Length: ${length}\n` +
    `Sleeve Length: ${sleeve}\n` +
    `Shoulder Width: ${shoulder}\n` +
    `Armhole: ${armhole}\n` +
    `Notes: ${notes}`;

  alert(summary);
}

// Initialize counts on page load
document.addEventListener('DOMContentLoaded', function() {
  updateWishlistCount();
  updateBagCount();
});

// Global functions for other pages
window.HOF = {
  toggleWishlist,
  addToBag,
  updateWishlistButtonStates,
  updateWishlistCount,
  updateBagCount,
  showNotification,
  PRODUCTS
};


  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Legacy functions for measurement form
function changeUnit() {
  const unit = document.getElementById("unit").value;
  document.getElementById("bust").placeholder = `Bust (${unit})`;
  document.getElementById("waist").placeholder = `Waist (${unit})`;
  document.getElementById("hip").placeholder = `Hip (${unit})`;
  document.getElementById("height").placeholder = `Height (${unit})`;
  document.getElementById("length").placeholder = `Length (${unit})`;
  document.getElementById("sleeve").placeholder = `Sleeve Length (${unit})`;
  document.getElementById("shoulder").placeholder = `Shoulder Width (${unit})`;
  document.getElementById("armhole").placeholder = `Armhole (${unit})`;
}

function saveMeasurements() {
  const unit = document.getElementById("unit").value;
  const bust = document.getElementById("bust").value;
  const waist = document.getElementById("waist").value;
  const hip = document.getElementById("hip").value;
  const height = document.getElementById("height").value;
  const length = document.getElementById("length").value;
  const sleeve = document.getElementById("sleeve").value;
  const shoulder = document.getElementById("shoulder").value;
  const armhole = document.getElementById("armhole").value;
  const notes = document.getElementById("notes").value;

  // Basic validation
  if (!bust || !waist || !hip) {
    alert("Please enter Bust, Waist, and Hip measurements.");
    return;
  }

  // Summary alert
  let summary =
    `Measurements (${unit}):\n` +
    `Bust: ${bust}\n` +
    `Waist: ${waist}\n` +
    `Hip: ${hip}\n` +
    `Height: ${height}\n` +
    `Length: ${length}\n` +
    `Sleeve Length: ${sleeve}\n` +
    `Shoulder Width: ${shoulder}\n` +
    `Armhole: ${armhole}\n` +
    `Notes: ${notes}`;

  alert(summary);
}

// Initialize counts on page load
document.addEventListener('DOMContentLoaded', function() {
  updateWishlistCount();
  updateBagCount();
});

// Global functions for other pages
window.HOF = {
  toggleWishlist,
  addToBag,
  updateWishlistButtonStates,
  updateWishlistCount,
  updateBagCount,
  showNotification,
  PRODUCTS
};

