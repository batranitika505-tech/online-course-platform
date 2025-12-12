document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // FAQs Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Filter and Sorting Logic for Courses Page
    const coursesGrid = document.querySelector('.all-courses-grid');
    if (coursesGrid) {
        const courseCards = Array.from(coursesGrid.querySelectorAll('.course-card'));
        const sortSelect = document.querySelector('.sort-select');
        const clearBtn = document.querySelector('.clear-filters');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const rangeSlider = document.querySelector('.slider');
        const resultsCountStr = document.querySelector('.results-count strong');

        // Initial State
        let currentFilters = {
            category: [],
            price: [],
            rating: []
        };

        // Event Listeners
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                updateFilters();
                filterCourses();
            });
        });

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                sortCourses();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                checkboxes.forEach(cb => cb.checked = false);
                currentFilters = { category: [], price: [], rating: [] };
                filterCourses();
            });
        }

        function updateFilters() {
            currentFilters.category = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
            currentFilters.price = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
            currentFilters.rating = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => cb.value);
        }

        function filterCourses() {
            let visibleCount = 0;

            courseCards.forEach(card => {
                const category = card.querySelector('.category').textContent.toLowerCase().replace(' ', '-');
                // Mock price check (parsing text is brittle, usually done via data attributes)
                const priceText = card.querySelector('.price').textContent;
                const isFree = priceText.toLowerCase().includes('free');
                const priceType = isFree ? 'free' : 'paid';

                // Mock rating check
                const ratingText = card.querySelector('.course-meta span').textContent;
                const rating = parseFloat(ratingText);

                const matchesCategory = currentFilters.category.length === 0 || currentFilters.category.some(c => category.includes(c));
                const matchesPrice = currentFilters.price.length === 0 || currentFilters.price.includes(priceType);
                const matchesRating = currentFilters.rating.length === 0 || currentFilters.rating.some(r => rating >= parseFloat(r));

                if (matchesCategory && matchesPrice && matchesRating) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (resultsCountStr) resultsCountStr.textContent = visibleCount;
        }

        function sortCourses() {
            const sortValue = sortSelect.value;
            const currentCards = Array.from(coursesGrid.querySelectorAll('.course-card'));

            currentCards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', '')) || 0;
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', '')) || 0;

                // Extract rating (very brittle without data attributes, assuming format "Icons 4.9")
                const textA = a.querySelector('.course-meta').textContent;
                const ratingA = parseFloat(textA.match(/(\d\.\d)/) ? textA.match(/(\d\.\d)/)[0] : 0);
                const textB = b.querySelector('.course-meta').textContent;
                const ratingB = parseFloat(textB.match(/(\d\.\d)/) ? textB.match(/(\d\.\d)/)[0] : 0);

                if (sortValue === 'price-low') return priceA - priceB;
                if (sortValue === 'price-high') return priceB - priceA;
                if (sortValue === 'rating') return ratingB - ratingA;
                return 0; // Default
            });

            currentCards.forEach(card => coursesGrid.appendChild(card));
        }
    }

    // Auth Forms Submission
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('This is a demo. Authentication functionality would be implemented on the backend.');
        });
    });
});
