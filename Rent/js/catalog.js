/**
 * Уникальные скрипты для страницы каталога
 * Включает: фильтры, сортировку, пагинацию
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==================== Фильтры для мобильных ====================
  const filterToggle = document.querySelector('.filter-toggle');
  const filtersSidebar = document.querySelector('.filters-sidebar');
  
  if (filterToggle && filtersSidebar) {
    filterToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      filtersSidebar.classList.toggle('active');
    });
    
    // Закрытие при клике вне фильтров
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.filters-sidebar') && 
          !e.target.closest('.filter-toggle') &&
          filtersSidebar.classList.contains('active')) {
        filtersSidebar.classList.remove('active');
      }
    });
  }

  // ==================== Фильтрация товаров ====================
  const applyFiltersBtn = document.querySelector('.apply-filters');
  
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function() {
      applyFilters();
      if (window.innerWidth <= 992) {
        filtersSidebar.classList.remove('active');
      }
    });
  }

  function applyFilters() {
    // Здесь будет логика фильтрации товаров
    console.log('Фильтры применены');
    // В реальном проекте здесь будет:
    // 1. Сбор параметров фильтрации
    // 2. Отправка запроса или фильтрация существующих товаров
    // 3. Обновление отображения товаров
  }

  // ==================== Сортировка ====================
  const sortSelect = document.getElementById('sort-by');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      applySorting(this.value);
    });
  }

  function applySorting(sortValue) {
    console.log('Сортировка по:', sortValue);
    // Реальная логика сортировки:
    // 1. Определение параметров сортировки
    // 2. Сортировка товаров
    // 3. Перерисовка списка товаров
  }

  // ==================== Поиск ====================
  const searchInput = document.getElementById('catalog-search');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value);
      }
    });
  }

  function performSearch(query) {
    console.log('Поиск:', query);
    // Реальная логика поиска:
    // 1. Отправка запроса или фильтрация
    // 2. Обновление списка товаров
  }

  // ==================== Пагинация ====================
  const prevPageBtn = document.querySelector('.page-prev');
  const nextPageBtn = document.querySelector('.page-next');
  const pageNumbers = document.querySelector('.page-numbers');
  
  if (prevPageBtn && nextPageBtn && pageNumbers) {
    // Инициализация пагинации
    initPagination();
    
    prevPageBtn.addEventListener('click', function() {
      if (!this.disabled) {
        goToPage(currentPage - 1);
      }
    });
    
    nextPageBtn.addEventListener('click', function() {
      if (!this.disabled) {
        goToPage(currentPage + 1);
      }
    });
  }

  let currentPage = 1;
  const totalPages = 5; // В реальном проекте получаем с сервера

  function initPagination() {
    // Очищаем кнопки страниц
    pageNumbers.innerHTML = '';
    
    // Создаем кнопки для каждой страницы
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.addEventListener('click', function() {
        goToPage(i);
      });
      if (i === currentPage) {
        pageBtn.classList.add('active');
      }
      pageNumbers.appendChild(pageBtn);
    }
    
    updatePaginationButtons();
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    console.log('Переход на страницу:', page);
    // В реальном проекте: загрузка данных для страницы
    
    // Обновляем UI
    document.querySelectorAll('.page-numbers button').forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.textContent) === page) {
        btn.classList.add('active');
      }
    });
    
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  // ==================== Загрузка товаров ====================
  // В реальном проекте здесь будет загрузка с сервера
  function loadProducts() {
    // Пример данных (в реальном проекте - AJAX-запрос)
    const mockProducts = [
      {
        id: 1,
        name: "Дрель мощная",
        price: 15,
        city: "Минск",
        rating: 4.2,
        image: "../images/drill.jpg"
      },
      {
        id: 2,
        name: "Горный велосипед",
        price: 25,
        city: "Минск",
        rating: 4.5,
        image: "../images/bike.jpg"
      }
    ];
    
    renderProducts(mockProducts);
  }

  function renderProducts(products) {
    const itemsGrid = document.getElementById('catalog-items');
    if (!itemsGrid) return;
    
    itemsGrid.innerHTML = '';
    
    products.forEach(product => {
      itemsGrid.appendChild(createProductCard(product));
    });
  }

  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-img" style="background-image: url('${product.image}')"></div>
      <div class="item-info">
        <h3>${product.name}</h3>
        <div class="item-meta">
          <span class="item-price">${product.price} руб/день</span>
          <span class="item-rating">${product.rating} ★</span>
        </div>
        <p class="item-location">
          <i class="fas fa-map-marker-alt"></i> ${product.city}
        </p>
        <button class="rent-btn">Арендовать</button>
      </div>
    `;
    
    // Добавляем обработчик аренды
    const rentBtn = card.querySelector('.rent-btn');
    rentBtn.addEventListener('click', function() {
      rentProduct(product.id);
    });
    
    return card;
  }

  function rentProduct(productId) {
    console.log('Аренда товара ID:', productId);
    // В реальном проекте: открытие модалки аренды/добавление в корзину
  }

  // Инициализация загрузки товаров
  loadProducts();
});