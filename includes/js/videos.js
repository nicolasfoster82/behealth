document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('videos-content');

    let allVideos = [];
    let visibleCount = 0;

    async function fetchVideos() {
        try {
            const response = await fetch('includes/json/videos.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            allVideos = data;
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }
    }

    function createTitleContainer(item) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';

        titleContainer.innerHTML = `
            <img src="${item.image}" class="video-image" alt="${item.title}">
            <h3 class="title-video">${item.title}</h3>
            <div class="duration-container">
                <span class="duration">${item.duration}</span>
                <span class="toggle">+</span>
            </div>
        `;

        return titleContainer;
    }

    function createIframe(item) {
        const iframeElement = document.createElement('iframe');
        iframeElement.src = item.url;
        iframeElement.className = 'video';
        iframeElement.style.display = 'none'; 
        return iframeElement;
    }

    function handleTitleClick(titleContainer, iframeElement, toggleElement) {
        titleContainer.addEventListener('click', () => {
            const allIframes = document.querySelectorAll('.video');
            const allToggles = document.querySelectorAll('.toggle');

            allIframes.forEach(iframe => {
                if (iframe !== iframeElement) {
                    iframe.style.display = 'none';
                }
            });
            allToggles.forEach(toggle => {
                if (toggle !== toggleElement) {
                    toggle.textContent = '+';
                }
            });

            if (iframeElement.style.display === 'none') {
                iframeElement.style.display = 'block';
                toggleElement.textContent = '-';
            } else {
                iframeElement.style.display = 'none';
                toggleElement.textContent = '+';
            }
        });
    }

    function loadVideos(number) {
        const end = visibleCount + number;
        
        for (let i = visibleCount; i < end && i < allVideos.length; i++) {
            const item = allVideos[i];
            const titleContainer = createTitleContainer(item);
            const iframeElement = createIframe(item);
            const toggleElement = titleContainer.querySelector('.toggle');

            handleTitleClick(titleContainer, iframeElement, toggleElement);

            contentDiv.appendChild(titleContainer);
            contentDiv.appendChild(iframeElement);
        }
        visibleCount += number;

       
        if (visibleCount >= allVideos.length) {
           
        }
    }

   
    fetchVideos().then(() => loadVideos(5));
});


