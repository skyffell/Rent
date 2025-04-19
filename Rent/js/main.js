// ===== GLOBAL VARIABLES =====
let map;
let markers = [];
let currentUser = null;
let currentModal = null;

// ===== MAP INITIALIZATION =====
function initMap() {
    // Initialize map centered on Belarus
    map = L.map('map').setView([53.709807, 27.953389], 7);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add sample markers
    addSampleMarkers();
}

function addSampleMarkers() {
    const locations = [
        {
            coords: [53.902284, 27.561831],
            title: "Велосипед в Минске",
            description: "Горный велосипед, 20 руб/день",
            type: "bicycle"
        },
        {
            coords: [53.908056, 27.554167],
            title: "Дрель в Минске",
            description: "Мощная дрель, 15 руб/день",
            type: "tool"
        },
        {
            coords: [52.085483, 23.654236],
            title: "Палатка в Бресте",
            description: "4-местная палатка, 25 руб/день",
            type: "camping"
        }
    ];

    locations.forEach(location => {
        const marker = L.marker(location.coords)
            .addTo(map)
            .bindPopup(`
                <h3>${location.title}</h3>
                <p>${location.description}</p>
                <button class="rent-btn" data-id="${location.type}">Арендовать</button>
            `);
        
        markers.push(marker);
    });
}
// ===== ITEMS DATA =====
const itemsData = [
  {
    id: 1,
    title: "Горный велосипед",
    price: "25 руб/день",
    location: "Минск, ул. Ленина 15",
    image: "https://via.placeholder.com/300x200?text=Велосипед",
    category: "Транспорт",
    coords: [53.902284, 27.561831]
  },
  {
    id: 2,
    title: "Дрель мощная",
    price: "15 руб/день",
    location: "Минск, пр. Независимости 45",
    image: "https://via.placeholder.com/300x200?text=Дрель",
    category: "Инструменты",
    coords: [53.908056, 27.554167]
  },
  {
    id: 3,
    title: "Фотоаппарат Canon",
    price: "30 руб/день",
    location: "Гродно, ул. Советская 20",
    image: "https://via.placeholder.com/300x200?text=Фотоаппарат",
    category: "Техника",
    coords: [53.6778, 23.8295]
  },
  {
    id: 4,
    title: "Палатка 4-местная",
    price: "20 руб/день",
    location: "Брест, ул. Гоголя 5",
    image: "https://via.placeholder.com/300x200?text=Палатка",
    category: "Туризм",
    coords: [52.0976, 23.7341]
  }
];

// ===== RENDER ITEMS =====
function renderItems() {
  const itemsContainer = document.getElementById('items-container');
  if (!itemsContainer) return;

  itemsContainer.innerHTML = '';

  itemsData.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item-card';
    itemElement.innerHTML = `
      <div class="item-img" style="background-image: url('${item.image}')"></div>
      <div class="item-info">
        <h3>${item.title}</h3>
        <p class="item-price">${item.price}</p>
        <p class="item-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
        <button class="rent-btn" data-id="${item.id}">Арендовать</button>
      </div>
    `;
    itemsContainer.appendChild(itemElement);
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setupModals();
  setupMobileMenu();
  setupSearch();
  setupRentButtons();
  renderItems(); // Добавлен вызов функции рендеринга товаров
  
  // Остальной код инициализации...
});
// ===== MODAL FUNCTIONS =====
function setupModals() {
    const authBtn = document.getElementById('auth-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Open login modal from header button
    authBtn.addEventListener('click', () => {
        closeCurrentModal();
        openModal(loginModal);
    });
    
    // Open login modal from mobile button
    mobileLoginBtn.addEventListener('click', () => {
        closeCurrentModal();
        openModal(loginModal);
        closeMobileMenu();
    });
    
    // Switch to register modal
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeCurrentModal();
        openModal(registerModal);
    });
    
    // Switch to login modal
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeCurrentModal();
        openModal(loginModal);
    });
    
    // Close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeCurrentModal);
    });
    
    // Close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCurrentModal();
            }
        });
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCurrentModal();
        }
    });
    
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (email && password) {
            loginUser(email);
            closeCurrentModal();
        }
    });
    
    // Register form submission
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        if (name && email && password) {
            registerUser(name, email);
            closeCurrentModal();
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentModal = modal;
}

function closeCurrentModal() {
    if (currentModal) {
        currentModal.classList.remove('active');
        currentModal = null;
    }
    document.body.style.overflow = '';
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    menu.classList.remove('active');
    menuBtn.classList.remove('active');
}

// ===== USER AUTH FUNCTIONS =====
function loginUser(email) {
    currentUser = { email };
    updateAuthState();
    alert(`Добро пожаловать, ${email}!`);
}

function registerUser(name, email) {
    currentUser = { name, email };
    updateAuthState();
    alert(`Регистрация успешна, ${name}!`);
}

function logoutUser() {
    currentUser = null;
    updateAuthState();
}

function updateAuthState() {
    const authBtn = document.getElementById('auth-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    
    if (currentUser) {
        authBtn.innerHTML = `<i class="fas fa-user"></i> Выйти (${currentUser.name || currentUser.email})`;
        authBtn.style.backgroundColor = '#e74c3c';
        mobileLoginBtn.innerHTML = `<i class="fas fa-user"></i> Выйти`;
    } else {
        authBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
        authBtn.style.backgroundColor = '';
        mobileLoginBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
    }
}

// ===== SEARCH FUNCTIONALITY =====
function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', performSearch);
    
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
}

function performSearch() {
    const itemInput = document.querySelector('.search-box input:first-of-type');
    const locationInput = document.querySelector('.search-box input:last-of-type');
    
    const itemQuery = itemInput.value.trim().toLowerCase();
    const locationQuery = locationInput.value.trim().toLowerCase();
    
    // In a real app, this would filter markers and items
    alert(`Поиск: "${itemQuery}" в "${locationQuery}"`);
}

// ===== RENT BUTTONS =====
function setupRentButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('rent-btn')) {
            if (!currentUser) {
                openModal(document.getElementById('login-modal'));
                alert('Для аренды необходимо войти в систему');
            } else {
                alert(`Вы арендовали товар (ID: ${e.target.dataset.id})`);
            }
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupModals();
    setupMobileMenu();
    setupSearch();
    setupRentButtons();
    
    // Handle map resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            if (map) {
                map.invalidateSize();
            }
        }, 100);
    });
});