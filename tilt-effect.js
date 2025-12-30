
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.course-card, .feature-card, .hero-image img');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Add necessary CSS for 3D effect
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.1s ease';
    });

    function handleMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();

        // Calculate mouse position within the card
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;

        // Calculate rotation based on center
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    function handleMouseLeave(e) {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        this.style.transition = 'transform 0.5s ease';
    }
});
