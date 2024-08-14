document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const loadMoreButton = document.getElementById('load-more');

    let allCards = [];
    let visibleCount = 0;

   
    async function fetchCards() {
        const response = await fetch('includes/json/articles.json');
        const data = await response.json();
        allCards = data;
    }

    function createCard(cardData) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a class="card-link" href="${cardData.link}" target="_blank">
            <img src="assets/img/articles/${cardData.image}" alt="${cardData.title}">
            <div class="card-content">
            <h3>${cardData.title}</h3>
            <p><i class='bx bx-time'></i>${cardData.date}</p>
            </div>
            </a>
        `;
        return card;
    }

    function loadCards(number) {
        const end = visibleCount + number;
        for (let i = visibleCount; i < end && i < allCards.length; i++) {
            const card = createCard(allCards[i]);
            cardContainer.appendChild(card);
        }
        visibleCount += number;
        
        
        if (visibleCount >= allCards.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    loadMoreButton.addEventListener('click', () => {
        loadCards(3);
    });

    fetchCards().then(() => loadCards(3));
});
