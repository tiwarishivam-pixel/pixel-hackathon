// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const pricingToggle = document.getElementById('pricing-toggle');
const contactForm = document.getElementById('contact-form');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('login-password');
const loginOptions = document.getElementById('login-options');
const emailLoginForm = document.getElementById('email-login-form');
const googleLoginOption = document.getElementById('google-login-option');
const emailLoginOption = document.getElementById('email-login-option');
const backToOptions = document.getElementById('back-to-options');
const particleToggle = document.getElementById('particle-toggle');
const particleCanvas = document.getElementById('particle-bg');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Sticky Navigation
function handleScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Pricing toggle functionality
function initPricingToggle() {
    const amountElements = document.querySelectorAll('.amount');
    const periodElements = document.querySelectorAll('.period');
    
    pricingToggle.addEventListener('change', () => {
        const isYearly = pricingToggle.checked;
        
        amountElements.forEach(element => {
            const monthlyPrice = element.getAttribute('data-monthly');
            const yearlyPrice = element.getAttribute('data-yearly');
            
            if (isYearly) {
                element.textContent = yearlyPrice;
                element.parentElement.querySelector('.period').textContent = '/month';
            } else {
                element.textContent = monthlyPrice;
                element.parentElement.querySelector('.period').textContent = '/month';
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Login Modal functionality
function initLoginModal() {
    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        showLoginOptions(); // Reset to options view
    });
    
    // Close modal
    closeLogin.addEventListener('click', closeLoginModal);
    
    // Close modal when clicking backdrop
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            closeLoginModal();
        }
    });
    
    // Google login option
    googleLoginOption.addEventListener('click', () => {
        showNotification('Redirecting to Google login...', 'info');
        // Simulate Google OAuth redirect
        setTimeout(() => {
            showNotification('Google login successful!', 'success');
            closeLoginModal();
        }, 2000);
    });
    
    // Email login option
    emailLoginOption.addEventListener('click', () => {
        showEmailLoginForm();
    });
    
    // Back to options
    backToOptions.addEventListener('click', () => {
        showLoginOptions();
    });
    
    // Password toggle
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = passwordToggle.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Simple validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate login
        showNotification('Login successful! Welcome back.', 'success');
        closeLoginModal();
        loginForm.reset();
        showLoginOptions(); // Reset to options view
    });
}

function showLoginOptions() {
    loginOptions.style.display = 'flex';
    emailLoginForm.style.display = 'none';
}

function showEmailLoginForm() {
    loginOptions.style.display = 'none';
    emailLoginForm.style.display = 'block';
}

function closeLoginModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    showLoginOptions(); // Reset to options view
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .recommendation-card, .team-member, .value-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .testimonial-card,
        .recommendation-card,
        .pricing-card,
        .team-member,
        .value-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in,
        .testimonial-card.animate-in,
        .recommendation-card.animate-in,
        .pricing-card.animate-in,
        .team-member.animate-in,
        .value-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        .testimonial-card:nth-child(4) { transition-delay: 0.4s; }
        
        .recommendation-card:nth-child(1) { transition-delay: 0.1s; }
        .recommendation-card:nth-child(2) { transition-delay: 0.2s; }
        .recommendation-card:nth-child(3) { transition-delay: 0.3s; }
        .recommendation-card:nth-child(4) { transition-delay: 0.4s; }
        
        .pricing-card:nth-child(1) { transition-delay: 0.1s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Slideshow functionality for recommendations
function initSlideshow() {
    const marqueeTrack = document.getElementById('marquee-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('slideshow-indicators');
    
    if (!marqueeTrack) return;
    
    const cards = marqueeTrack.querySelectorAll('.recommendation-card');
    const totalCards = cards.length;
    const cardsPerView = 4;
    let currentIndex = 0;
    
    // Create indicators
    const totalSlides = Math.ceil(totalCards / cardsPerView);
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        const offset = index * cardsPerView * (300 + 32); // card width + gap
        marqueeTrack.style.transform = `translateX(-${offset}px)`;
        updateIndicators();
        updateButtons();
    }
    
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play slideshow
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    marqueeTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    marqueeTrack.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Initialize
    updateButtons();
}

// Enhanced team member animations
function initTeamAnimations() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        // Add staggered animation on scroll
        member.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effects
        const imageContainer = member.querySelector('.member-image-container');
        const overlay = member.querySelector('.member-overlay');
        
        if (imageContainer && overlay) {
            member.addEventListener('mouseenter', () => {
                imageContainer.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
            });
            
            member.addEventListener('mouseleave', () => {
                imageContainer.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            });
        }
    });
}

// Enhanced marquee animation
function initMarqueeAnimation() {
    const marqueeTrack = document.getElementById('marquee-track');
    if (!marqueeTrack) return;
    
    // Clone cards for infinite effect
    const cards = marqueeTrack.querySelectorAll('.recommendation-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        marqueeTrack.appendChild(clone);
    });
    
    // Add scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Comprehensive scroll animations for features section
function initFeatureAnimations() {
    const featureTitle = document.querySelector('.features .section-title');
    const gridItems = document.querySelectorAll('.grid-item');
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Animate the title first
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 200);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    if (featureTitle) {
        titleObserver.observe(featureTitle);
    }
    
    // Animate image grid items
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150); // Staggered animation for grid
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    gridItems.forEach(item => {
        gridObserver.observe(item);
    });
    
    // Animate feature cards with staggered effect
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200); // Staggered animation
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    featureCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Enhanced team member hover effects with more dramatic effects (no scroll animations)
function initEnhancedTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        const imageContainer = member.querySelector('.member-image-container');
        const overlay = member.querySelector('.member-overlay');
        const memberInfo = member.querySelector('.member-info');
        
        if (imageContainer && overlay) {
            member.addEventListener('mouseenter', () => {
                // More dramatic 3D transform for pop-up effect
                imageContainer.style.transform = 'translateZ(180px) scale(1.5) rotateY(8deg)';
                imageContainer.style.boxShadow = '0 50px 100px rgba(99, 102, 241, 0.8)';
                imageContainer.style.zIndex = '20';
                imageContainer.style.filter = 'brightness(1.2) contrast(1.2)';
                imageContainer.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                
                // Enhanced overlay animation
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1.15)';
                overlay.style.filter = 'brightness(1.3)';
                
                // Add glow effect to the entire card
                member.style.boxShadow = '0 40px 80px rgba(99, 102, 241, 0.4)';
                member.style.transform = 'translateY(-30px) scale(1.05) rotateY(5deg)';
                member.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                
                // Animate member info with more dramatic effect
                if (memberInfo) {
                    memberInfo.style.transform = 'translateY(-15px)';
                    memberInfo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }
                
                // Enhanced social icons animation
                const socialLinks = overlay.querySelectorAll('.social-links a');
                socialLinks.forEach((link, linkIndex) => {
                    setTimeout(() => {
                        link.style.animation = 'socialPulseEnhanced 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        link.style.transform = 'scale(1.2)';
                    }, linkIndex * 200);
                });
                
                // Add floating effect to the entire member card
                member.style.animation = 'memberFloat 2s ease-in-out infinite';
            });
            
            member.addEventListener('mouseleave', () => {
                // Reset all transforms with smooth transition
                imageContainer.style.transform = 'translateZ(0) scale(1) rotateY(0deg)';
                imageContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                imageContainer.style.zIndex = '1';
                imageContainer.style.filter = 'brightness(1) contrast(1)';
                imageContainer.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.8)';
                overlay.style.filter = 'brightness(1)';
                
                member.style.boxShadow = 'none';
                member.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                member.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                member.style.animation = 'none';
                
                if (memberInfo) {
                    memberInfo.style.transform = 'translateY(0)';
                }
                
                // Reset social icons animation
                const socialLinks = overlay.querySelectorAll('.social-links a');
                socialLinks.forEach(link => {
                    link.style.animation = 'none';
                    link.style.transform = 'scale(1)';
                });
            });
        }
    });
}

// Add floating particles to hero section
function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS for new animations
function addEnhancedAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes socialPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        
        @keyframes socialPulseEnhanced {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(1.2); opacity: 1; }
        }
        
        @keyframes memberFloat {
            0%, 100% { transform: translateY(-30px) scale(1.05) rotateY(5deg); }
            50% { transform: translateY(-35px) scale(1.06) rotateY(3deg); }
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes shimmer {
            0% { transform: rotate(45deg) translateX(-100%); }
            100% { transform: rotate(45deg) translateX(100%); }
        }
        
        .hero-particle {
            pointer-events: none;
        }
        
        .hero-title, .hero-subtitle, .hero-buttons {
            transition: all 0.3s ease;
        }
        
        .hero-title:hover {
            transform: scale(1.02);
        }
        
        .hero-buttons .btn {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hero-buttons .btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }
        
        /* Enhanced cube animations */
        .cube-face {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .cube:hover .cube-face {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Feature card entrance animations */
        .feature-card {
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .feature-card.animate-in {
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Image grid animations */
        .grid-item {
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .grid-item.animate-in {
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Team member enhanced animations */
        .team-member {
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .member-image-container {
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .member-overlay {
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .member-overlay .social-links a {
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Section title animations */
        .features .section-title {
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .team-description {
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    `;
    document.head.appendChild(style);
}

// Enhanced hero animations for startup theme
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const startupAnimation = document.querySelector('.startup-animation');
    
    // Add entrance animations with more dramatic effects
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px) scale(0.9)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(40px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            heroSubtitle.style.opacity = '0.9';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 800);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px) scale(0.95)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0) scale(1)';
        }, 1100);
    }
    
    if (startupAnimation) {
        startupAnimation.style.opacity = '0';
        startupAnimation.style.transform = 'translateY(-50%) scale(0.7) translateX(50px)';
        setTimeout(() => {
            startupAnimation.style.transition = 'all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            startupAnimation.style.opacity = '1';
            startupAnimation.style.transform = 'translateY(-50%) scale(1) translateX(0)';
        }, 300);
    }
    
    // Add floating animation to hero elements
    setInterval(() => {
        if (heroTitle) {
            heroTitle.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                heroTitle.style.transform = 'translateY(0)';
            }, 1000);
        }
    }, 3000);
}

// Enhanced team member hover effects with more dramatic effects
function initEnhancedTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        const imageContainer = member.querySelector('.member-image-container');
        const overlay = member.querySelector('.member-overlay');
        const memberInfo = member.querySelector('.member-info');
        
        // Add entrance animation delay
        member.style.animationDelay = `${index * 0.4}s`;
        
        if (imageContainer && overlay) {
            member.addEventListener('mouseenter', () => {
                // More dramatic 3D transform for pop-up effect
                imageContainer.style.transform = 'translateZ(180px) scale(1.5) rotateY(8deg)';
                imageContainer.style.boxShadow = '0 50px 100px rgba(99, 102, 241, 0.8)';
                imageContainer.style.zIndex = '20';
                imageContainer.style.filter = 'brightness(1.2) contrast(1.2)';
                imageContainer.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                
                // Enhanced overlay animation
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1.15)';
                overlay.style.filter = 'brightness(1.3)';
                
                // Add glow effect to the entire card
                member.style.boxShadow = '0 40px 80px rgba(99, 102, 241, 0.4)';
                member.style.transform = 'translateY(-30px) scale(1.05) rotateY(5deg)';
                member.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                
                // Animate member info with more dramatic effect
                if (memberInfo) {
                    memberInfo.style.transform = 'translateY(-15px)';
                    memberInfo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }
                
                // Enhanced social icons animation
                const socialLinks = overlay.querySelectorAll('.social-links a');
                socialLinks.forEach((link, linkIndex) => {
                    setTimeout(() => {
                        link.style.animation = 'socialPulseEnhanced 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        link.style.transform = 'scale(1.2)';
                    }, linkIndex * 200);
                });
                
                // Add floating effect to the entire member card
                member.style.animation = 'memberFloat 2s ease-in-out infinite';
            });
            
            member.addEventListener('mouseleave', () => {
                // Reset all transforms with smooth transition
                imageContainer.style.transform = 'translateZ(0) scale(1) rotateY(0deg)';
                imageContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                imageContainer.style.zIndex = '1';
                imageContainer.style.filter = 'brightness(1) contrast(1)';
                imageContainer.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.8)';
                overlay.style.filter = 'brightness(1)';
                
                member.style.boxShadow = 'none';
                member.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                member.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                member.style.animation = 'none';
                
                if (memberInfo) {
                    memberInfo.style.transform = 'translateY(0)';
                }
                
                // Reset social icons animation
                const socialLinks = overlay.querySelectorAll('.social-links a');
                socialLinks.forEach(link => {
                    link.style.animation = 'none';
                    link.style.transform = 'scale(1)';
                });
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Add animation styles
    addAnimationStyles();
    addEnhancedAnimationStyles();
    
    // Initialize all functionality
    initSmoothScrolling();
    initPricingToggle();
    initContactForm();
    initLoginModal();
    initParticleSystem();
    initAnimations();
    initParallax();
    initSlideshow();
    initTeamAnimations();
    initMarqueeAnimation();
    initStatsCounter();
    initHeroAnimations();
    initAboutAnimations();
    initEnhancedTeamHover();
    initHeroParticles();
    initFeatureAnimations();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Initialize scroll position for active nav link
    handleScroll();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.mouseVelocity = { x: 0, y: 0 };
        
        this.colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
            '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
            '#ff6348', '#2ed573', '#1e90ff', '#ff4757', '#3742fa'
        ];
        
        this.resizeCanvas();
        this.bindEvents();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Mouse events
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.mouseVelocity.x = this.mouseX - this.lastMouseX;
            this.mouseVelocity.y = this.mouseY - this.lastMouseY;
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
            
            if (this.isActive) {
                this.createParticles();
            }
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            
            if (this.isActive) {
                this.createParticles();
            }
        });
    }
    
    createParticles() {
        const speed = Math.sqrt(this.mouseVelocity.x ** 2 + this.mouseVelocity.y ** 2);
        const particleCount = Math.min(Math.floor(speed / 2), 8);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: this.mouseX + (Math.random() - 0.5) * 20,
                y: this.mouseY + (Math.random() - 0.5) * 20,
                vx: this.mouseVelocity.x * 0.1 + (Math.random() - 0.5) * 2,
                vy: this.mouseVelocity.y * 0.1 + (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                opacity: Math.random() * 0.8 + 0.2,
                life: 1,
                decay: Math.random() * 0.02 + 0.01
            };
            
            this.particles.push(particle);
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Add some gravity and air resistance
            particle.vy += 0.05;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Update life
            particle.life -= particle.decay;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set blend mode for glow effect
        this.ctx.globalCompositeOperation = 'screen';
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * particle.life;
            
            // Create gradient for glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
        
        // Reset blend mode
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    animate() {
        if (this.isActive) {
            this.updateParticles();
            this.drawParticles();
        }
        requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.isActive = true;
        this.animate();
    }
    
    stop() {
        this.isActive = false;
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize particle system
let particleSystem;

function initParticleSystem() {
    particleSystem = new ParticleSystem(particleCanvas);
    
    // Toggle particle effect
    particleToggle.addEventListener('click', () => {
        if (particleSystem.isActive) {
            particleSystem.stop();
            particleToggle.classList.remove('active');
            showNotification('Particle effect disabled', 'info');
        } else {
            particleSystem.start();
            particleToggle.classList.add('active');
            showNotification('Particle effect enabled', 'success');
        }
    });
    
    // Start with particles enabled by default
    particleSystem.start();
    particleToggle.classList.add('active');
}

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .loading.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle); 

// Loader
// Enhanced loader with better timing and animations
window.addEventListener("load", () => {
    // Simulate loading progress
    const progressFill = document.querySelector('.progress-fill');
    const loader = document.getElementById("loader-wrapper");
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        progressFill.style.width = progress + '%';
    }, 200);
    
    // Fade out loader after progress completes
    setTimeout(() => {
        loader.style.opacity = "0";
        document.body.classList.add("loaded");
        setTimeout(() => {
            loader.style.display = "none";
            // Trigger entrance animations
            const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .recommendation-card, .team-member, .value-item');
            animateElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 100);
            });
        }, 800);
    }, 3000);
});

// Enhanced ripple background effect
const ripple = document.querySelector('.ripple-background');
if (ripple) {
    document.addEventListener('mousemove', e => {
        const x = `${e.clientX}px`;
        const y = `${e.clientY}px`;
        ripple.style.setProperty('--x', x);
        ripple.style.setProperty('--y', y);
    });
    
    // Add touch support for mobile
    document.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        const x = `${touch.clientX}px`;
        const y = `${touch.clientY}px`;
        ripple.style.setProperty('--x', x);
        ripple.style.setProperty('--y', y);
    });
} 
