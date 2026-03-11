
// ===== TYPING ANIMATION FOR HERO (only for subtitle) =====
const typedTextSpan = document.getElementById('typed-text');
if (typedTextSpan) {
    const phrases = ['Back-End Developer', 'Laravel Specialist', 'API Designer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    setTimeout(typeEffect, 500);
}

// ===== ALL EXISTING SCRIPTS (exactly as before) =====

// Scroll reveal
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
fadeElements.forEach(el => observer.observe(el));

// Progress bars
function initSkillBars() {
    const progressFills = document.querySelectorAll('.progress-fill-skill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width') || '80';
                fill.style.width = width + '%';
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    progressFills.forEach(fill => progressObserver.observe(fill));
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => { e.preventDefault(); alert('✨ Message sent (demo)'); contactForm.reset(); });
}

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navIcons = document.querySelectorAll('.nav-icon');
window.addEventListener('scroll', () => {
    let current = ''; const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) current = section.getAttribute('id');
    });
    navIcons.forEach(icon => {
        icon.classList.remove('active');
        const href = icon.getAttribute('href')?.substring(1);
        if (href === current) icon.classList.add('active');
    });
});

// Smooth scroll
document.querySelectorAll('.nav-icon, .btn[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1'; backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0'; backToTop.style.pointerEvents = 'none';
    }
});

// ===== COURSE MODAL (EXACTLY AS REQUESTED - DO NOT MODIFY) =====
const modal = document.getElementById('courseModal');
const modalTitle = document.getElementById('modal-course-title');
const modalImages = document.getElementById('modal-images');
const closeModal = document.querySelector('.close-modal');

const courseData = {
    course1: {
        title: 'Back-End Development – Instant',
        images: [
            'assets/instant1.png',
            'assets/instant2.png'
        ]
    },
    course2: {
        title: 'Full Stack Web Development – NTI',
        images: [
            'https://placehold.co/600x400/1e3a8a/4FC3F7?text=Certificate+Full+Stack',
            'https://placehold.co/600x400/1e3a8a/4FC3F7?text=Frontend+Project',
            'https://placehold.co/600x400/1e3a8a/4FC3F7?text=Backend+Integration'
        ]
    }
};

document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', () => {
        const courseId = card.getAttribute('data-course');
        const data = courseData[courseId];
        if (data) {
            modalTitle.textContent = data.title;
            let imagesHtml = '';
            data.images.forEach(imgSrc => {
                imagesHtml += `<img src="${imgSrc}" alt="Course image">`;
            });
            modalImages.innerHTML = imagesHtml;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize
window.addEventListener('load', () => {
    initSkillBars();
    backToTop.style.opacity = '0'; backToTop.style.pointerEvents = 'none';
    backToTop.style.transition = 'opacity 0.3s';
});