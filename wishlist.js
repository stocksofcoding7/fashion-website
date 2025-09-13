// Wishlist Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  loadWishlistItems();
});

function loadWishlistItems() {
  const wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  const wishlistContainer = document.getElementById('wishlist-items');
  const emptyMessage = document.getElementById('empty-wishlist');
  
  if (wishlist.length === 0) {
    wishlistContainer.style.display = 'none';
    emptyMessage.style.display = 'block';
    return;
  }
  
  emptyMessage.style.display = 'none';
  wishlistContainer.style.display = 'grid';
  wishlistContainer.innerHTML = '';
  
  wishlist.forEach(item => {
    const productCard = createWishlistItem(item);
    wishlistContainer.appendChild(productCard);
  });
}

function createWishlistItem(item) {
  const card = document.createElement('div');
  card.className = 'luxury-product-card';
  card.innerHTML = `
    <div class="product-image-container">
      <img src="${item.img}" alt="${item.name}" class="product-image" onerror="this.src='assets/placeholder.jpg'">
      <div class="product-actions">
        <button class="action-btn wishlist active" data-id="${item.id}" title="Remove from wishlist" aria-pressed="true">♡</button>
        <button class="action-btn bag" data-id="${item.id}" title="Add to bag">👜</button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-title">${item.name}</h3>
      <p class="product-price">₹${parseInt(item.price).toLocaleString()}</p>
      <button class="add-to-bag-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">Add to Bag</button>
    </div>
  `;
  
  // Add event listeners
  const wishlistBtn = card.querySelector('.wishlist');
  const bagBtn = card.querySelector('.bag');
  const addToBagBtn = card.querySelector('.add-to-bag-btn');
  
  wishlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(item.id);
    card.remove();
    loadWishlistItems(); // Reload to check if empty
  });
  
  bagBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToBag(item);
  });
  
  addToBagBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToBag(item);
  });
  
  // Product card click
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.action-btn') && !e.target.closest('.add-to-bag-btn')) {
      const productUrl = `product.html?id=${item.id}&name=${encodeURIComponent(item.name)}&price=${item.price}&img=${encodeURIComponent(item.img)}&desc=${encodeURIComponent(item.desc || '')}`;
      window.location.href = productUrl;
    }
  });
  
  return card;
}

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem('hof_wishlist_v1')) || [];
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem('hof_wishlist_v1', JSON.stringify(wishlist));
  showNotification('Removed from wishlist', 'info');
  if (window.HOF) {
    window.HOF.updateWishlistCount();
  }
}

function addToBag(item) {
  let bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const existingItem = bag.find(bagItem => bagItem.id === item.id && bagItem.size === 'M');
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    bag.push({ 
      id: item.id, 
      name: item.name, 
      price: item.price, 
      img: item.img,
      desc: item.desc,
      size: 'M',
      quantity: 1 
    });
  }
  
  localStorage.setItem('hof_bag_v1', JSON.stringify(bag));
  showNotification('Added to bag', 'success');
  if (window.HOF) {
    window.HOF.updateBagCount();
  }
}

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
