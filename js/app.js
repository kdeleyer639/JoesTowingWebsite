// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Sticky header
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// Hero fade-in
document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.querySelector(".hero-text");
    if (heroText) {
        heroText.classList.add("fade-in");
    }
});

// Scroll-triggered animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("slide-up");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".animate-on-scroll").forEach(section => {
    observer.observe(section);
});

// Expand image on click
document.querySelectorAll(".gallery-container img").forEach(img => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "image-overlay";
        overlay.innerHTML = `
            <div class="image-popup">
                <img src="${img.src}" alt="Expanded Image" />
                <span class="close-btn">&times;</span>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector(".close-btn").addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) overlay.remove();
        });
    });
});
