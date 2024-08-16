document.addEventListener("DOMContentLoaded", () => {
    // Counter functionality
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // The lower the slower

    const countUp = (target, max) => {
        const increment = max / speed;
        let currentCount = 0;

        const updateCount = () => {
            currentCount += increment;
            if (currentCount < max) {
                target.textContent = Math.floor(currentCount);
                requestAnimationFrame(updateCount);
            } else {
                target.textContent = max + '+';
            }
        };

        requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const max = parseInt(counter.getAttribute('data-count'));
                countUp(counter, max);
                observer.unobserve(counter); // Stop observing once counted up
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the counter is visible

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Reviews functionality
    const reviews = [
        
        {
            name: 'Ravindran Nair',
            image: 'https://i.ibb.co/YbfJPXs/Ring-Exchange-Wording-29-Romantic-Examples-To-Steal.jpg',
            text: 'Thank you Prasad for making my daughter’s wedding such a wonderful experience. Everything was planned so well that I didn’t have to worry about a thing. It felt like attending another family’s wedding with zero tension. Your hard work and attention to detail made the day truly special. Big thanks to the entire team, and all the best for your future endeavors..'
        },
        {
            name: 'Rahul Ravi',
            image: 'https://i.ibb.co/YbfJPXs/Ring-Exchange-Wording-29-Romantic-Examples-To-Steal.jpg',
            text: 'Thank you, Krishnaprasad Chettan and the Maledath Events team, for making our wedding so special. The beautiful decorations and the Kerala Sadhya food were fantastic and really made the day memorable. We appreciate all your hard work. .'
        },
        
        {
            name: 'Parvathy',
            image: 'https://i.ibb.co/YbfJPXs/Ring-Exchange-Wording-29-Romantic-Examples-To-Steal.jpg',
            text: 'Thank You for making our wedding truly unforgettable. From the exquisite decor to the delicious food, every detail was perfect. We now feel you as part of our family. Thank you for everything!'
        },
       
        {
            name: 'gayathri',
            image: 'https://i.ibb.co/YbfJPXs/Ring-Exchange-Wording-29-Romantic-Examples-To-Steal.jpg',
            text: 'Your presence felt like having my ideal father by my side during the wedding, with such dedicated and meticulous coordination. The pre-planning and attention to detail you provided were exceptional, making the wedding truly wonderful. Thank you so much for making my day so special. We definitely recommend you for your outstanding work.'
        }
    ];

    let currentReview = 0;

    document.querySelector('.left-arrow').addEventListener('click', () => {
        currentReview = (currentReview === 0) ? reviews.length - 1 : currentReview - 1;
        updateReview();
    });

    document.querySelector('.right-arrow').addEventListener('click', () => {
        currentReview = (currentReview === reviews.length - 1) ? 0 : currentReview + 1;
        updateReview();
    });

    function updateReview() {
        const review = reviews[currentReview];
        document.querySelector('.review img').src = review.image;
        document.querySelector('.review h3').textContent = review.name;
        document.querySelector('.review p').textContent = review.text;
    }

    // Initial review setup
    updateReview();

    // Carousel functionality
    const carousel = document.querySelector(".carousel");
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const itemWidth = items[0].clientWidth;
    let currentIndex = 1;
    let isTransitioning = false;

    // Set initial position to the first cloned item
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
});
