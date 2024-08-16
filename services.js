document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        let currentIndex = 0;
        const images = slider.querySelectorAll('img');
        const totalImages = images.length;
        const imagesPerView = 2;

        function showNextImage() {
            currentIndex = (currentIndex + imagesPerView) % totalImages;
            updateSlider();
        }

        function updateSlider() {
            const translateX = -(currentIndex * 50);
            slider.style.transform = `translateX(${translateX}%)`;
        }

        // Automatic sliding
        setInterval(showNextImage, 5000);

        // Touch events for mobile sliding
        let startX;
        let isDragging = false;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentIndex = (currentIndex + imagesPerView) % totalImages;
                } else {
                    currentIndex = (currentIndex - imagesPerView + totalImages) % totalImages;
                }
                updateSlider();
                isDragging = false;
            }
        });

        slider.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
});
carousel.style.transform = `translateX(-${itemWidth}px)`;

function updateCarouselPosition(speed = 1000) {
    carousel.style.transition = `transform ${speed}ms ease-in-out`;
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    highlightActiveItem();
}

function highlightActiveItem() {
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

function goToNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarouselPosition();
    if (currentIndex === totalItems - 1) {
        setTimeout(() => {
            carousel.style.transition = "none";
            currentIndex = 1;
            carousel.style.transform = `translateX(-${itemWidth}px)`;
            setTimeout(() => isTransitioning = false, 50); // Quick transition back to first item
        }, 500); // Short delay for smooth looping
    } else {
        setTimeout(() => isTransitioning = false, 1000);
    }
}

function goToPreviousSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarouselPosition();
    if (currentIndex === 0) {
        setTimeout(() => {
            carousel.style.transition = "none";
            currentIndex = totalItems - 2;
            carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            setTimeout(() => isTransitioning = false, 50); // Quick transition back to last item
        }, 1000);
    } else {
        setTimeout(() => isTransitioning = false, 1000);
    }
}

document.querySelector(".right-button").addEventListener("click", goToNextSlide);
document.querySelector(".left-button").addEventListener("click", goToPreviousSlide);

// Automatic scrolling
setInterval(goToNextSlide, 3000); // Adjust the interval time as desired

// Initial highlight for the active item
highlightActiveItem();