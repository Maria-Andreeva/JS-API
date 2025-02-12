/* Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.
    1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
        a. Контейнер для отображения текущего изображения.
        b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
        c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.
    2. Используйте HTML для создания элементов интерфейса.
    3. Используйте JavaScript для обработки событий:
        a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
        b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
        c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.
    4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.
    5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида..*/

    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
        
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active-indicator'));
            
        slides[index].classList.add('active');
        indicators[index].classList.add('active-indicator');
    }
        
    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    });
        
    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    });
        
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'));
            showSlide(currentIndex);
        });
    });