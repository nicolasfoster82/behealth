fetch('includes/json/questions.json')
    .then(response => response.json())
    .then(data => {
        const contentDiv = document.getElementById('faqs-content');

        data.forEach(item => {
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('faq-item');

            
            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            titleElement.classList.add('title');
            
           
            const symbolSpan = document.createElement('span');
            symbolSpan.textContent = ' +'; 
            symbolSpan.classList.add('symbol');
            titleElement.appendChild(symbolSpan);
            
            
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.description;
            descriptionElement.classList.add('description');
            descriptionElement.style.display = 'none'; 
            
            
            titleElement.addEventListener('click', () => {
                const isVisible = descriptionElement.style.display === 'block';

                
                document.querySelectorAll('.description').forEach(desc => desc.style.display = 'none');
                document.querySelectorAll('.symbol').forEach(sym => sym.textContent = ' +'); 
                
                
                if (!isVisible) {
                    descriptionElement.style.display = 'block';
                    symbolSpan.textContent = ' -'; 
                } else {
                    descriptionElement.style.display = 'none';
                    symbolSpan.textContent = ' +'; 
                }
            });
            
           
            containerDiv.appendChild(titleElement);
            containerDiv.appendChild(descriptionElement);
            
            
            contentDiv.appendChild(containerDiv);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));


