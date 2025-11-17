let currentSlide = 0;
        let slides = document.querySelectorAll('.slide');
        let sliderContainer = document.getElementById('sliderContainer');
        let navDots = document.querySelectorAll('.nav-dot');
        let slideCount = slides.length;

        function moveSlide(index) {
            if (index >= 0 && index < slideCount) {
                currentSlide = index;
                updateSlider();
            }
        }

        function openPlaylist(url) {
            window.open(url, '_blank');
        }

        function updateSlider() {
            const translateValue = -currentSlide * (100 / slideCount) + '%';
            sliderContainer.style.transform = `translateX(${translateValue})`;
            navDots.forEach(dot => dot.classList.remove('active'));
            if (currentSlide < navDots.length) {
                navDots[currentSlide].classList.add('active');
            }
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);

        updateSlider();