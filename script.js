// ==================== 
// Loading Screen
// ====================

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const joinButton = document.getElementById('joinButton');

    // Handle JOIN button click
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                mainContent.classList.add('visible');
            }, 800);
        });
    }
});

// ==================== 
// Copy Address Function
// ====================

function copyAddress() {
    const address = document.getElementById('contractAddress').textContent;
    const notification = document.getElementById('copiedNotification');
    const box = document.getElementById('contractBox');
    
    // Create temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = address;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Add copied class to hide text
        if (box) {
            box.classList.add('copied');
        }
        
        // Show notification
        if (notification) {
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                if (box) {
                    box.classList.remove('copied');
                }
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    
    // Clean up
    document.body.removeChild(textarea);
}

// ==================== 
// Smooth Scrolling
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 
// Scroll Animations
// ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all major sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about, .tokenomics, .donations');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Animate donation cards on scroll
    const donationCards = document.querySelectorAll('.donation-card');
    donationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// ==================== 
// Header Scroll Effect
// ====================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== 
// Parallax Effect for Hero Background
// ====================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-bg-overlay');
    
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== 
// Dynamic Counter Animation
// ====================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = '$' + Math.floor(current).toLocaleString();
    }, 16);
}

// Animate total donations when visible
const totalAmount = document.querySelector('.total-amount');
if (totalAmount) {
    const totalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(totalAmount, 1000);
                totalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    totalObserver.observe(totalAmount);
}

// ==================== 
// Floating Animation for Images
// ====================

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Add slight random movement to Muryx images
document.querySelectorAll('.muryx-img').forEach(img => {
    const randomDuration = randomFloat(4, 7);
    const randomDelay = randomFloat(0, 2);
    
    img.style.animationDuration = `${randomDuration}s`;
    img.style.animationDelay = `${randomDelay}s`;
});

// ==================== 
// Particle Effect on Hero (Optional Enhancement)
// ====================

function createParticle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(0, 212, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `particleFloat ${randomFloat(3, 6)}s linear infinite`;
    
    hero.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Add particle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 500);

// ==================== 
// Mobile Menu Toggle (if needed)
// ====================

const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header .container');
    
    if (window.innerWidth <= 768) {
        // Create hamburger button if it doesn't exist
        let hamburger = document.querySelector('.hamburger');
        if (!hamburger) {
            hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                background: transparent;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
            `;
            
            hamburger.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                if (nav.style.display === 'flex') {
                    nav.style.cssText = `
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.95);
                        flex-direction: column;
                        padding: 2rem;
                        gap: 1rem;
                    `;
                }
            });
            
            header.appendChild(hamburger);
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// ==================== 
// Easter Egg: Konami Code
// ====================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// ==================== 
// Console Art
// ====================

console.log(`
%c
███╗   ███╗██╗   ██╗██████╗ ██╗   ██╗██╗  ██╗
████╗ ████║██║   ██║██╔══██╗╚██╗ ██╔╝╚██╗██╔╝
██╔████╔██║██║   ██║██████╔╝ ╚████╔╝  ╚███╔╝ 
██║╚██╔╝██║██║   ██║██╔══██╗  ╚██╔╝   ██╔██╗ 
██║ ╚═╝ ██║╚██████╔╝██║  ██║   ██║   ██╔╝ ██╗
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
                                               
In Memory of Teho 💙
`, 'color: #00d4ff; font-weight: bold;');

console.log('%cContract: 9jFbN6wAAYPBvnfpSrchXLGx94LEb8f8S6ysadpXpump', 'color: #00ff00; font-size: 14px;');
