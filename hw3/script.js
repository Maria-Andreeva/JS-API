const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('like-button');
const likeCountElement = document.getElementById('like-count');
const historyContainer = document.getElementById('history');

const today = new Date().toISOString().split('T')[0];
const savedPhoto = localStorage.getItem('photoOfTheDay');
const savedDate = localStorage.getItem('photoDate');

let likeCount = 0;

async function fetchPhoto() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}`);
        const photo = await response.json();
        const photoData = {
            url: photo.urls.regular,
            photographer: photo.user.name,
            profile: photo.user.links.html,
            id: photo.id
        };
        
        localStorage.setItem('photoOfTheDay', JSON.stringify(photoData));
        localStorage.setItem('photoDate', today);
        localStorage.setItem(`likes-${photoData.id}`, '0');
        
        displayPhoto(photoData);
        updateHistory(photoData);
    } catch (error) {
        console.error('Ошибка загрузки фото:', error);
    }
}

function displayPhoto(photoData) {
    photoElement.src = photoData.url;
    photographerElement.innerHTML = `Фото от <a href="${photoData.profile}" target="_blank">${photoData.photographer}</a>`;
    likeCount = parseInt(localStorage.getItem(`likes-${photoData.id}`)) || 0;
    likeCountElement.textContent = likeCount;
    likeButton.onclick = () => {
        likeCount++;
        localStorage.setItem(`likes-${photoData.id}`, likeCount);
        likeCountElement.textContent = likeCount;
    };
}

function updateHistory(photoData) {
    let history = JSON.parse(localStorage.getItem('photoHistory')) || [];
    history.unshift(photoData);
    if (history.length > 5) history.pop();
    localStorage.setItem('photoHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyContainer.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('photoHistory')) || [];
    history.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = 'История фото';
        img.style.width = '100px';
        img.style.margin = '5px';
        historyContainer.appendChild(img);
    });
}

if (savedPhoto && savedDate === today) {
    displayPhoto(JSON.parse(savedPhoto));
} else {
    fetchPhoto();
}

renderHistory();
