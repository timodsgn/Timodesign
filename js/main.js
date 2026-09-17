document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    function closeMobileMenu() {
        if (!menuButton || !mobileMenu) return;

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("active");

            menuButton.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("no-scroll", isOpen);
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    const services = document.querySelectorAll(".service");

    services.forEach(service => {
        const button = service.querySelector(".service-header");

        if (!button) return;

        button.addEventListener("click", () => {
            const wasOpen = service.classList.contains("open");

            services.forEach(item => {
                item.classList.remove("open");

                const itemButton = item.querySelector(".service-header");

                if (itemButton) {
                    itemButton.setAttribute("aria-expanded", "false");
                }
            });

            if (!wasOpen) {
                service.classList.add("open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    const moreButton = document.getElementById("moreProjectsButton");
    const moreProjects = document.getElementById("moreProjects");

    if (moreButton && moreProjects) {
        moreButton.addEventListener("click", () => {
            const isOpen = moreProjects.classList.toggle("is-open");

            moreButton.classList.toggle("open", isOpen);
            moreButton.setAttribute("aria-expanded", String(isOpen));

            const text = moreButton.querySelector("span");

            if (text) {
                text.textContent = isOpen
                    ? "Скрий проектите"
                    : "Още проекти";
            }

            if (isOpen) {
                moreProjects.querySelectorAll(".reveal").forEach(element => {
                    element.classList.add("visible");
                });
            }
        });
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxClose = document.getElementById("lightboxClose");
    const projectButtons = document.querySelectorAll(".project-image");

    let previousFocus = null;

    function openLightbox(image, title, button) {
        if (!lightbox || !lightboxImage) return;

        previousFocus = button;

        lightboxImage.src = image;
        lightboxImage.alt = title;

        if (lightboxTitle) {
            lightboxTitle.textContent = title;
        }

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");

        if (lightboxClose) {
            lightboxClose.focus();
        }
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");

        if (lightboxImage) {
            lightboxImage.removeAttribute("src");
        }

        if (previousFocus) {
            previousFocus.focus();
            previousFocus = null;
        }
    }

    projectButtons.forEach(button => {
        button.addEventListener("click", () => {
            const image = button.dataset.image;
            const title = button.dataset.title || "Project";

            if (!image) return;

            openLightbox(image, title, button);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
            closeMobileMenu();
        }
    });
});