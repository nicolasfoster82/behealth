document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector('.slides');
    const pageNumbersContainer = document.querySelector('.page-numbers');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');

    let imagesPerPage = 3; 
    let currentPage = 1;
    let images = [];

    fetch('includes/json/photos.json')
        .then(response => response.json())
        .then(data => {
            images = data;
            updateImagesPerPage();
            displayImages();
            setupPagination();
        })
        .catch(error => console.error('Error loading images:', error));

    function updateImagesPerPage() {
        if (window.innerWidth <= 600) {
            imagesPerPage = 1; 
        } else {
            imagesPerPage = 3; 
        }
    }

    function displayImages() {
        const start = (currentPage - 1) * imagesPerPage;
        const end = start + imagesPerPage;
        const imagesToShow = images.slice(start, end);

        slidesContainer.innerHTML = imagesToShow.map(image => `
            <div class="slide">
                <img src="assets/img/carrousel/${image.src}" alt="${image.alt}" class="slide-image">
            </div>
        `).join('');

        const totalPages = Math.ceil(images.length / imagesPerPage);
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        
        document.querySelectorAll('.slide-image').forEach(img => {
            img.addEventListener('click', () => {
                openModal(img.src, img.alt);
            });
        });
    }

    function setupPagination() {
        const totalPages = Math.ceil(images.length / imagesPerPage);
        pageNumbersContainer.innerHTML = Array.from({ length: totalPages }, (_, index) => `
            <button class="page-number" data-page="${index + 1}">${index + 1}</button>
        `).join('');

        document.querySelectorAll('.page-number').forEach(button => {
            button.addEventListener('click', () => {
                currentPage = Number(button.getAttribute('data-page'));
                displayImages();
            });
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayImages();
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(images.length / imagesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayImages();
        }
    });

    function openModal(src, alt) {
        modal.style.display = 'flex';
        modalImage.src = src;
        captionText.textContent = alt;
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        updateImagesPerPage();
        displayImages();
        setupPagination();
    });
});



  
  