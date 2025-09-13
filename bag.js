// Shopping Bag Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  loadBagItems();
});

function loadBagItems() {
  const bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const bagContainer = document.getElementById('bag-items');
  const bagContent = document.getElementById('bag-content');
  const emptyMessage = document.getElementById('empty-bag');
  
  if (bag.length === 0) {
    bagContent.style.display = 'none';
    emptyMessage.style.display = 'block';
    return;
  }
  
  emptyMessage.style.display = 'none';
  bagContent.style.display = 'block';
  bagContainer.innerHTML = '';
  
  let subtotal = 0;
  
  bag.forEach(item => {
    const productCard = createBagItem(item);
    bagContainer.appendChild(productCard);
    subtotal += parseInt(item.price) * item.quantity;
  });
  
  updateOrderSummary(subtotal);
}

function createBagItem(item) {
  const card = document.createElement('div');
  card.className = 'bag-item';
  card.style.cssText = `
    display: flex;
    gap: 20px;
    background: var(--pure-white);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px var(--shadow);
    align-items: center;
  `;
  
  card.innerHTML = `
    <div style="flex-shrink: 0;">
      <img src="${item.img}" alt="${item.name}" style="width: 120px; height: 150px; object-fit: cover; border-radius: 8px;" onerror="this.src='assets/placeholder.jpg'">
    </div>
    <div style="flex: 1;">
      <h3 style="font-size: 1.3rem; margin-bottom: 8px; color: var(--primary-black);">${item.name}</h3>
      <p style="font-size: 1.2rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 5px;">₹${parseInt(item.price).toLocaleString()}</p>
      <p style="font-size: 0.9rem; color: var(--text-gray); margin-bottom: 15px;">Size: ${item.size || 'M'}</p>
      <div style="display: flex; align-items: center; gap: 15px;">
        <div style="display: flex; align-items: center; gap: 10px; background: var(--light-gray); border-radius: 8px; padding: 8px 12px;">
          <button class="quantity-btn" data-id="${item.id}" data-size="${item.size || 'M'}" data-action="decrease" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--primary-black);">-</button>
          <span class="quantity" style="font-weight: 600; min-width: 30px; text-align: center;">${item.quantity}</span>
          <button class="quantity-btn" data-id="${item.id}" data-size="${item.size || 'M'}" data-action="increase" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--primary-black);">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}" data-size="${item.size || 'M'}" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 500;">Remove</button>
      </div>
    </div>
    <div style="text-align: right; flex-shrink: 0;">
      <p style="font-size: 1.3rem; font-weight: 700; color: var(--primary-black);">₹${(parseInt(item.price) * item.quantity).toLocaleString()}</p>
    </div>
  `;
  
  // Add event listeners
  const decreaseBtn = card.querySelector('[data-action="decrease"]');
  const increaseBtn = card.querySelector('[data-action="increase"]');
  const removeBtn = card.querySelector('.remove-btn');
  
  decreaseBtn.addEventListener('click', () => {
    updateQuantity(item.id, item.size || 'M', -1);
  });
  
  increaseBtn.addEventListener('click', () => {
    updateQuantity(item.id, item.size || 'M', 1);
  });
  
  removeBtn.addEventListener('click', () => {
    removeFromBag(item.id, item.size || 'M');
  });
  
  return card;
}

function updateQuantity(id, size, change) {
  let bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  const item = bag.find(item => item.id === id && item.size === size);
  
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      bag = bag.filter(item => !(item.id === id && item.size === size));
    }
    localStorage.setItem('hof_bag_v1', JSON.stringify(bag));
    loadBagItems(); // Reload the entire bag
    if (window.HOF) {
      window.HOF.updateBagCount();
    }
  }
}

function removeFromBag(id, size) {
  let bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
  bag = bag.filter(item => !(item.id === id && item.size === size));
  localStorage.setItem('hof_bag_v1', JSON.stringify(bag));
  loadBagItems(); // Reload the entire bag
  showNotification('Item removed from bag', 'info');
  if (window.HOF) {
    window.HOF.updateBagCount();
  }
}

function updateOrderSummary(subtotal) {
  const shipping = 500;
  const total = subtotal + shipping;
  
  document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('shipping').textContent = `₹${shipping.toLocaleString()}`;
  document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
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

// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const bag = JSON.parse(localStorage.getItem('hof_bag_v1')) || [];
      if (bag.length === 0) {
        showNotification('Your bag is empty', 'error');
        return;
      }
      
      // Simulate checkout process
      showNotification('Redirecting to checkout...', 'success');
      setTimeout(() => {
        alert('Checkout functionality would be implemented here with payment gateway integration.');
      }, 1000);
    });
  }
});
