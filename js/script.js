document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navlist = document.querySelector('.navlist');
    const contactForm = document.getElementById('contact-form');

    // Sticky header
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navlist.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(contactForm);
        console.log('Form submitted with data:', Object.fromEntries(formData));
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });

    // Skill animation
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkills, {
        root: null,
        threshold: 0.1
    });

    skillItems.forEach(item => skillObserver.observe(item));

    // Project hover effect
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Typing effect for the job title
    const jobTitle = document.querySelector('.home-text h3');
    const jobTitles = ['Full Stack Developer', 'JavaScript Expert', 'React Enthusiast', 'Node.js Developer'];
    let titleIndex = 0;
    let charIndex = 0;

    function typeTitle() {
        if (charIndex < jobTitles[titleIndex].length) {
            jobTitle.textContent += jobTitles[titleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeTitle, 100);
        } else {
            setTimeout(eraseTitle, 2000);
        }
    }

    function eraseTitle() {
        if (charIndex > 0) {
            jobTitle.textContent = jobTitles[titleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseTitle, 50);
        } else {
            titleIndex = (titleIndex + 1) % jobTitles.length;
            setTimeout(typeTitle, 500);
        }
    }

    typeTitle();

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealElementsOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealElementsOnScroll, {
        root: null,
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
