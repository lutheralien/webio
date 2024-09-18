document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navlist = document.querySelector('.navlist');
    const contactForm = document.getElementById('contact-form');
    const darkModeToggle = document.getElementById('darkModeToggle');

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
            navlist.classList.remove('active');
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

    // Typing effect for the job title
    const jobTitle = document.getElementById('job-title');
    const jobTitles = ['Full Stack Developer', 'JavaScript Expert', 'React Enthusiast', 'Node.js Developer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeTitle() {
        const currentTitle = jobTitles[titleIndex];
        
        if (isDeleting) {
            jobTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            jobTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(typeTitle, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % jobTitles.length;
            typingSpeed = 100;
            setTimeout(typeTitle, 500);
        } else {
            setTimeout(typeTitle, typingSpeed);
        }
    }

    typeTitle();

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealElementsOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealElementsOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealElementsOnScroll.observe(el));

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Save the user's preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

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
            item.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for home section
    const homeSection = document.querySelector('.home');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        homeSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Animate numbers (for example, in the About section)
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Example usage:
    // const yearsOfExperience = document.getElementById('years-of-experience');
    // animateValue(yearsOfExperience, 0, 3, 2000);

    // Add this if you have a years of experience element
    const yearsOfExperience = document.getElementById('years-of-experience');
    if (yearsOfExperience) {
        const experienceObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateValue(yearsOfExperience, 0, 3, 2000);
                experienceObserver.unobserve(yearsOfExperience);
            }
        }, { threshold: 0.5 });
        experienceObserver.observe(yearsOfExperience);
    }
});