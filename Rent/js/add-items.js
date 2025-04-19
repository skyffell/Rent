document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (из common.js)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Image upload
    const imageUpload = document.getElementById('imageUpload');
    const productImage = document.getElementById('productImage');
    const imagePreview = document.getElementById('image-preview');
    
    imageUpload.addEventListener('click', function() {
        productImage.click();
    });
    
    productImage.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
                imageUpload.querySelector('i').style.display = 'none';
                imageUpload.querySelector('p').textContent = file.name;
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Tags system
    const productTags = document.getElementById('productTags');
    const tagsContainer = document.getElementById('tagsContainer');
    const tags = [];
    
    productTags.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            e.preventDefault();
            const tag = this.value.trim();
            
            if (!tags.includes(tag)) {
                tags.push(tag);
                renderTags();
            }
            
            this.value = '';
        }
    });
    
    function renderTags() {
        tagsContainer.innerHTML = '';
        tags.forEach((tag, index) => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag-item';
            tagElement.innerHTML = `
                ${tag}
                <span class="remove-tag" data-index="${index}">&times;</span>
            `;
            tagsContainer.appendChild(tagElement);
        });
        
        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                tags.splice(index, 1);
                renderTags();
            });
        });
    }

    // Form submission
    const productForm = document.getElementById('productForm');
    
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            image: productImage.files[0],
            name: document.getElementById('productName').value,
            tags: tags,
            shortDescription: document.getElementById('shortDescription').value,
            price: document.getElementById('productPrice').value,
            fullDescription: document.getElementById('fullDescription').value
        };
        
        console.log('Данные для отправки:', formData);
        alert('Товар успешно добавлен! Данные в консоли');
        
        // Reset form
        productForm.reset();
        imagePreview.style.display = 'none';
        imageUpload.querySelector('i').style.display = 'block';
        imageUpload.querySelector('p').textContent = 'Перетащите сюда изображение или нажмите';
        tags.length = 0;
        renderTags();
    });
});