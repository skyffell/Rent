/**
 * Общие скрипты для всех страниц
 * Включает: мобильное меню, модальные окна, базовые функции
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==================== Мобильное меню ====================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.mobile-menu') && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // ==================== Модальные окна ====================
  // Элементы
  const authBtns = document.querySelectorAll('.auth-btn, #mobile-auth-btn');
  const authModal = document.getElementById('auth-modal');
  const registerModal = document.getElementById('register-modal');
  const closeButtons = document.querySelectorAll('.close-modal');
  const toRegister = document.getElementById('to-register');
  const toLogin = document.getElementById('to-login');

  // Открытие модалки входа
  if (authBtns && authModal) {
    authBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(authModal);
      });
    });
  }

  // Переключение между модалками
  if (toRegister && registerModal && authModal) {
    toRegister.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal(authModal);
      openModal(registerModal);
    });
  }

  if (toLogin && registerModal && authModal) {
    toLogin.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal(registerModal);
      openModal(authModal);
    });
  }

  // Закрытие модалок
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      closeAllModals();
    });
  });

  // Закрытие при клике вне модалки
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeAllModals();
    }
  });

  // Закрытие на Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Функции для работы с модальными окнами
  function openModal(modal) {
    if (modal) {
      closeAllModals();
      modal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.classList.remove('no-scroll');
  }

  // ==================== Другие общие функции ====================
  // Здесь могут быть другие общие скрипты для всех страниц
});

// Глобальные вспомогательные функции
function toggleClass(element, className) {
  if (element && className) {
    element.classList.toggle(className);
  }
}
