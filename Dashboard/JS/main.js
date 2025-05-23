// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
};

// Project card hover effect with tilt
const applyTiltEffect = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            setTimeout(() => {
                card.style.transition = 'transform 0.3s ease';
            }, 300);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
};

// Form submission animation
const setupFormAnimation = () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Simulate form submission
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Terkirim!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
};

// Typing animation for hero section
const startTypingAnimation = () => {
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.classList.add('cursor');
                cursor.textContent = '|';
                cursor.style.opacity = '1';
                cursor.style.animation = 'blink 1s infinite';
                heroTitle.appendChild(cursor);
                
                // Add CSS for cursor blinking
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                    .cursor {
                        margin-left: 5px;
                        font-weight: 100;
                        color:rgb(235, 61, 90);
                    }
                `;
                document.head.appendChild(style);
            }
        }, 100);
    }
};

// Parallax effect for hero section
const setupParallaxEffect = () => {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
};

// Skill tags animation
const animateSkillTags = () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.opacity = '0';
        tag.style.animation = 'popIn 0.5s forwards';
    });
    
    // Add CSS for pop-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
};

// Skills Tabs Functionality
const initSkillsTabs = () => {
    const tabButtons = document.querySelectorAll('.skill-tab');
    const tabContents = document.querySelectorAll('.skills-content');
    
    if (tabButtons.length && tabContents.length) {
        console.log("Skills tabs initialized with", tabButtons.length, "buttons and", tabContents.length, "content sections");
        
        // Initially hide all content sections except the first one
        tabContents.forEach((content, index) => {
            if (index !== 0) {
                content.classList.remove('active');
            }
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log("Skill tab clicked:", button.getAttribute('data-target'));
                e.preventDefault();
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected tab content
                const targetId = button.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log("Showing skill content:", targetId);
                } else {
                    console.warn("Target content not found:", targetId);
                }
            });
        });
    } else {
        console.warn("Skills tabs or content not found");
    }
};

// Animate skill progress bars
const animateSkillBars = () => {
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const progressBars = document.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    // Get the target width from the inline style
                    const targetWidth = bar.style.width;
                    // Reset width to zero first for animation
                    bar.style.width = '0%';
                    // Trigger animation by setting width after a small delay
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                });
                
                observer.unobserve(skillsSection);
            }
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
};

// Photo Gallery Categories
const initPhotoGallery = () => {
    const categoryButtons = document.querySelectorAll('.photo-category');
    const photoEvents = document.querySelectorAll('.photo-event');
    
    if (categoryButtons.length && photoEvents.length) {
        console.log("Photo gallery initialized with", categoryButtons.length, "buttons and", photoEvents.length, "gallery sections");
        
        // Tampilkan hanya galeri dengan kategori "event" secara default
        photoEvents.forEach(event => {
            const galleryType = event.getAttribute('data-gallery');
            if (galleryType === 'event') {
                event.classList.remove('hidden');
            } else {
                event.classList.add('hidden');
            }
        });

        // Tandai tombol "event" sebagai aktif secara default
        categoryButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            if (category === 'event') {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log("Photo category clicked:", button.getAttribute('data-category'));
                e.preventDefault();
                
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                photoEvents.forEach(event => {
                    const galleryType = event.getAttribute('data-gallery');
                    if (category === 'all' || galleryType === category) {
                        event.classList.remove('hidden');
                    } else {
                        event.classList.add('hidden');
                    }
                });
            });
        });
    } else {
        console.warn("Photo categories or gallery sections not found");
    }
};

// Photo Lightbox
const initPhotoLightbox = () => {
    const photos = document.querySelectorAll('.photo');
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentPhotoIndex = 0;
    let galleryPhotos = [];
    
    if (photos.length && lightbox) {
        console.log("Lightbox initialized with", photos.length, "photos");
        
        // Open lightbox when clicking on a photo or zoom button
        photos.forEach((photo, index) => {
            const zoomButton = photo.querySelector('.photo-zoom');
            if (zoomButton) {
                zoomButton.addEventListener('click', (e) => {
                    console.log("Zoom button clicked");
                    e.stopPropagation();
                    openLightbox(photo, index);
                });
            }
            
            photo.addEventListener('click', () => {
                console.log("Photo clicked");
                openLightbox(photo, index);
            });
        });
        
        // Close lightbox when clicking on the close button
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                console.log("Lightbox closed");
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Also close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                console.log("Clicked outside image, closing lightbox");
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Navigate to previous photo
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log("Previous photo");
                currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
                updateLightboxContent();
            });
        }
        
        // Navigate to next photo
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log("Next photo");
                currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
                updateLightboxContent();
            });
        }
        
        // Also listen for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') {
                    console.log("Escape key pressed, closing lightbox");
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    console.log("Left arrow key pressed");
                    currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
                    updateLightboxContent();
                } else if (e.key === 'ArrowRight') {
                    console.log("Right arrow key pressed");
                    currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
                    updateLightboxContent();
                }
            }
        });
        
        // Function to open lightbox
        function openLightbox(photo, index) {
            const photoEvent = photo.closest('.photo-event');
            if (photoEvent) {
                console.log("Opening lightbox for photo in gallery:", photoEvent.getAttribute('data-gallery'));
                
                // Get all photos in the same gallery
                galleryPhotos = Array.from(photoEvent.querySelectorAll('.photo'));
                currentPhotoIndex = galleryPhotos.indexOf(photo);
                
                updateLightboxContent();
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Function to update lightbox content
        function updateLightboxContent() {
            const currentPhoto = galleryPhotos[currentPhotoIndex];
            const img = currentPhoto.querySelector('img');
            const photoInfo = currentPhoto.querySelector('.photo-info');
            
            console.log("Updating lightbox content with photo index:", currentPhotoIndex);
            
            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                console.log("Set lightbox image src to:", img.src);
            }
            
            if (photoInfo && lightboxCaption) {
                const title = photoInfo.querySelector('h4');
                const description = photoInfo.querySelector('p');
                
                if (title && description) {
                    lightboxCaption.innerHTML = `<h4>${title.textContent}</h4><p>${description.textContent}</p>`;
                    console.log("Set lightbox caption to:", title.textContent);
                }
            }
        }
    } else {
        console.warn("Photos or lightbox element not found");
        if (!photos.length) console.warn("No photos found");
        if (!lightbox) console.warn("Lightbox element not found");
    }
};

// Experience Filter
const initExperienceFilter = () => {
    const filterButtons = document.querySelectorAll('.exp-filter');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (filterButtons.length && timelineItems.length) {
        console.log("Experience filter initialized with", filterButtons.length, "buttons and", timelineItems.length, "timeline items");
        
        // Initially show all timeline items
        timelineItems.forEach(item => {
            item.classList.remove('hidden');
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log("Experience filter clicked:", button.getAttribute('data-filter'));
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                timelineItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    console.log("Checking timeline item:", category, "against filter:", filter);
                    
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                        console.log("Showing all timeline items");
                    } else {
                        if (category === filter) {
                            item.classList.remove('hidden');
                            console.log("Showing timeline item:", category);
                        } else {
                            item.classList.add('hidden');
                            console.log("Hiding timeline item:", category);
                        }
                    }
                });
            });
        });
    } else {
        console.warn("Experience filter buttons or timeline items not found");
        if (!filterButtons.length) console.warn("No filter buttons found");
        if (!timelineItems.length) console.warn("No timeline items found");
    }
};

// Certificate Filter
const initCertificateFilter = () => {
    const filterButtons = document.querySelectorAll('.cert-filter');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    if (filterButtons.length && certificateCards.length) {
        console.log("Certificate filter initialized with", filterButtons.length, "buttons and", certificateCards.length, "certificate cards");
        
        // Initially show all certificate cards
        certificateCards.forEach(card => {
            card.classList.remove('hidden');
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log("Certificate filter clicked:", button.getAttribute('data-filter'));
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                certificateCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    console.log("Checking certificate card:", category, "against filter:", filter);
                    
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        console.log("Showing all certificate cards");
                    } else {
                        if (category === filter) {
                            card.classList.remove('hidden');
                            console.log("Showing certificate card:", category);
                        } else {
                            card.classList.add('hidden');
                            console.log("Hiding certificate card:", category);
                        }
                    }
                });
            });
        });
    } else {
        console.warn("Certificate filter buttons or certificate cards not found");
        if (!filterButtons.length) console.warn("No filter buttons found");
        if (!certificateCards.length) console.warn("No certificate cards found");
    }
};

// Dark Mode Toggle
const initDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check system preference or saved preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                htmlElement.setAttribute('data-theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                htmlElement.removeAttribute('data-theme');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    });
};

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a slight delay to ensure all elements are properly loaded
    setTimeout(() => {
        animateOnScroll();
        applyTiltEffect();
        setupFormAnimation();
        startTypingAnimation();
        setupParallaxEffect();
        initSkillsTabs();
        animateSkillBars();
        initPhotoGallery();
        initPhotoLightbox();
        initExperienceFilter();
        initCertificateFilter();
        initDarkMode();
        
        // Animate skill tags when about section is visible
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateSkillTags();
                    observer.unobserve(aboutSection);
                }
            }, { threshold: 0.5 });
            
            observer.observe(aboutSection);
        }
    }, 500);
});