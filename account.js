// Account Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initializeAccountPage();
});

function initializeAccountPage() {
  // Check if user is already logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    showUserDashboard(currentUser);
    return;
  }
  
  // Show login form by default
  showLoginForm();
  
  // Add event listeners
  document.getElementById('show-signup').addEventListener('click', function(e) {
    e.preventDefault();
    showSignupForm();
  });
  
  document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
  });
  
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
  
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

function showLoginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('user-dashboard').style.display = 'none';
}

function showSignupForm() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
  document.getElementById('user-dashboard').style.display = 'none';
}

function showUserDashboard(user) {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('user-dashboard').style.display = 'block';
  document.getElementById('userName').textContent = user.name;
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    showUserDashboard(user);
    showNotification('Welcome back!', 'success');
  } else {
    showNotification('Invalid email or password', 'error');
  }
}

function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;
  const password = document.getElementById('signupPassword').value;
  
  // Get existing users
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    showNotification('User with this email already exists', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  
  showUserDashboard(newUser);
  showNotification('Account created successfully!', 'success');
  
  // Clear form
  document.getElementById('signupForm').reset();
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  showLoginForm();
  showNotification('Logged out successfully', 'info');
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

