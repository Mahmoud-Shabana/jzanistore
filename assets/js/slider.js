/**
 * Modern Slider Component with RTL Support
 * Supports touch gestures, keyboard navigation, and auto-play
 */

class ModernSlider {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        
        if (!this.container) {
            console.error('Slider container not found');
            return;
        }

        // Default options
        this.options = {
            autoPlay: true,
            autoPlayInterval: 5000,
            showDots: true,
            showNav: true,
            loop: true,
            touchEnabled: true,
            keyboardEnabled: true,
            pauseOnHover: true,
            rtl: document.documentElement.dir === 'rtl' || document.body.dir === 'rtl',
            ...options
        };

        this.currentSlide = 0;
        this.slides = [];
        this.isPlaying = this.options.autoPlay;
        this.autoPlayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.createSliderStructure();
        this.setupSlides();
        this.createNavigation();
        this.createDots();
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlider();
    }

    createSliderStructure() {
        const slides = this.container.children;
        this.slides = Array.from(slides);

        // Create wrapper and track
        const wrapper = document.createElement('div');
        wrapper.className = 'slider-wrapper';

        const track = document.createElement('div');
        track.className = 'slider-track';

        // Move slides to track
        this.slides.forEach(slide => {
            slide.className = 'slider-slide';
            track.appendChild(slide);
        });

        wrapper.appendChild(track);
        this.container.innerHTML = '';
        this.container.appendChild(wrapper);
        this.container.className += ' slider-container';

        this.track = track;
        this.wrapper = wrapper;
    }

    setupSlides() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
            
            // Add slide content structure if not exists
            if (!slide.querySelector('.slider-content')) {
                const content = slide.innerHTML;
                slide.innerHTML = `<div class="slider-content">${content}</div>`;
            }
        });
    }

    createNavigation() {
        if (!this.options.showNav) return;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav slider-prev';
        prevBtn.setAttribute('aria-label', 'Previous slide');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav slider-next';
        nextBtn.setAttribute('aria-label', 'Next slide');

        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);

        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
    }

    createDots() {
        if (!this.options.showDots) return;

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.container.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.slider-dot');
    }

    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Touch events
        if (this.options.touchEnabled) {
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        }

        // Keyboard navigation
        if (this.options.keyboardEnabled) {
            this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
            this.container.setAttribute('tabindex', '0');
        }

        // Pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }

        // Window resize
        window.addEventListener('resize', () => this.updateSlider());
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (this.options.rtl) {
                // RTL: swipe left = next, swipe right = prev
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } else {
                // LTR: swipe left = prev, swipe right = next
                if (diff > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.options.rtl ? this.nextSlide() : this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.options.rtl ? this.prevSlide() : this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoPlay();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.slides.length - 1);
                break;
        }
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
        } else if (this.options.loop) {
            this.currentSlide = 0;
        }
        this.updateSlider();
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else if (this.options.loop) {
            this.currentSlide = this.slides.length - 1;
        }
        this.updateSlider();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentSlide = index;
            this.updateSlider();
        }
    }

    updateSlider() {
        // Update slide positions
        this.slides.forEach((slide, index) => {
            const offset = (index - this.currentSlide) * 100;
            const direction = this.options.rtl ? -1 : 1;
            slide.style.transform = `translateX(${offset * direction}%)`;
        });

        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        }

        // Update navigation buttons
        if (this.prevBtn && this.nextBtn && !this.options.loop) {
            this.prevBtn.disabled = this.currentSlide === 0;
            this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;
        }

        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: this.currentSlide, totalSlides: this.slides.length }
        }));
    }

    startAutoPlay() {
        if (!this.options.autoPlay) return;

        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoPlayInterval);

        this.isPlaying = true;
    }

    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        this.isPlaying = false;
    }

    resumeAutoPlay() {
        if (this.options.autoPlay && !this.isPlaying) {
            this.startAutoPlay();
        }
    }

    toggleAutoPlay() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
        } else {
            this.resumeAutoPlay();
        }
    }

    destroy() {
        this.pauseAutoPlay();
        
        // Remove event listeners
        window.removeEventListener('resize', () => this.updateSlider());
        
        // Reset container
        this.container.innerHTML = '';
        this.slides.forEach(slide => {
            this.container.appendChild(slide);
        });
    }

    // Public API methods
    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.slides.length;
    }

    isAutoPlaying() {
        return this.isPlaying;
    }
}

// Auto-initialize sliders with data-slider attribute
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-slider]');
    
    sliders.forEach(slider => {
        const options = {};
        
        // Parse data attributes
        if (slider.dataset.autoplay !== undefined) {
            options.autoPlay = slider.dataset.autoplay !== 'false';
        }
        if (slider.dataset.interval) {
            options.autoPlayInterval = parseInt(slider.dataset.interval);
        }
        if (slider.dataset.loop !== undefined) {
            options.loop = slider.dataset.loop !== 'false';
        }
        if (slider.dataset.dots !== undefined) {
            options.showDots = slider.dataset.dots !== 'false';
        }
        if (slider.dataset.nav !== undefined) {
            options.showNav = slider.dataset.nav !== 'false';
        }
        
        new ModernSlider(slider, options);
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernSlider;
}

// Global assignment for direct script inclusion
if (typeof window !== 'undefined') {
    window.ModernSlider = ModernSlider;
}

