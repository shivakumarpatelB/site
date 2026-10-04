const logoName = document.getElementById("logo-name");
const body = document.querySelector("body");
const navbar = document.querySelector("nav");

const setupInteractiveUI = () => {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu-links a");
  const revealItems = document.querySelectorAll(
    ".timeline-item, .project-row, .education-card, .card, .skills .skills-icons li"
  );

  const setNavState = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };

  if (navLinks.length) {
    const activateLink = () => {
      const sections = [...document.querySelectorAll("section[id]")];
      const scrollPosition = window.scrollY + 140;

      let currentId = "#experience";
      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentId = `#${section.id}`;
        }
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const isActive = href === currentId;
        link.classList.toggle("active", isActive);
      });
    };

    activateLink();
    window.addEventListener("scroll", activateLink, { passive: true });
  }

  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
};

window.addEventListener("DOMContentLoaded", function () {
  setupInteractiveUI();

  const portfolioImages = document.querySelectorAll(".showcase-slide img, .project-row .project-left img");
  const portfolioModal = document.getElementById("portfolio-modal");
  const portfolioModalImage = document.querySelector(".portfolio-modal-image");
  const portfolioModalClose = document.querySelector(".portfolio-modal-close");
  const portfolioModalPrev = document.querySelector(".portfolio-modal-prev");
  const portfolioModalNext = document.querySelector(".portfolio-modal-next");
  const modalImages = [...portfolioImages].filter(
    (image, index, images) => images.findIndex((candidate) => candidate.src === image.src) === index
  );

  if (portfolioImages.length && portfolioModal && portfolioModalImage) {
    let activeImageIndex = 0;

    const showPortfolioImage = (index) => {
      activeImageIndex = (index + modalImages.length) % modalImages.length;
      const image = modalImages[activeImageIndex];
      portfolioModalImage.src = image.src;
      portfolioModalImage.alt = image.alt || "Project preview";
    };

    portfolioImages.forEach((image) => {
      image.addEventListener("click", () => {
        const imageIndex = modalImages.findIndex((modalImage) => modalImage.src === image.src);
        showPortfolioImage(imageIndex);
        portfolioModal.classList.add("is-open");
        portfolioModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    const closePortfolioModal = () => {
      portfolioModal.classList.remove("is-open");
      portfolioModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    portfolioModalPrev?.addEventListener("click", () => showPortfolioImage(activeImageIndex - 1));
    portfolioModalNext?.addEventListener("click", () => showPortfolioImage(activeImageIndex + 1));
    portfolioModalClose?.addEventListener("click", closePortfolioModal);
    portfolioModal.addEventListener("click", (event) => {
      if (event.target.dataset.close === "true" || event.target === portfolioModal) {
        closePortfolioModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!portfolioModal.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closePortfolioModal();
      } else if (event.key === "ArrowLeft") {
        showPortfolioImage(activeImageIndex - 1);
      } else if (event.key === "ArrowRight") {
        showPortfolioImage(activeImageIndex + 1);
      }
    });
  }

  var form = document.getElementById("contact-form");

  if (!form) return;

  function triggerSendAnimation() {
    const buttons = document.querySelectorAll(".btn-email");
    buttons.forEach((button) => {
      let getVar = (variable) => getComputedStyle(button).getPropertyValue(variable);

      if (!button.classList.contains("active")) {
        button.classList.add("active");

        gsap.to(button, {
          keyframes: [
            {
              "--left-wing-first-x": 50,
              "--left-wing-first-y": 100,
              "--right-wing-second-x": 50,
              "--right-wing-second-y": 100,
              duration: 0.2,
              onComplete() {
                gsap.set(button, {
                  "--left-wing-first-y": 0,
                  "--left-wing-second-x": 40,
                  "--left-wing-second-y": 100,
                  "--left-wing-third-x": 0,
                  "--left-wing-third-y": 100,
                  "--left-body-third-x": 40,
                  "--right-wing-first-x": 50,
                  "--right-wing-first-y": 0,
                  "--right-wing-second-x": 60,
                  "--right-wing-second-y": 100,
                  "--right-wing-third-x": 100,
                  "--right-wing-third-y": 100,
                  "--right-body-third-x": 60,
                });
              },
            },
            {
              "--left-wing-third-x": 20,
              "--left-wing-third-y": 90,
              "--left-wing-second-y": 90,
              "--left-body-third-y": 90,
              "--right-wing-third-x": 80,
              "--right-wing-third-y": 90,
              "--right-body-third-y": 90,
              "--right-wing-second-y": 90,
              duration: 0.2,
            },
            {
              "--rotate": 50,
              "--left-wing-third-y": 95,
              "--left-wing-third-x": 27,
              "--right-body-third-x": 45,
              "--right-wing-second-x": 45,
              "--right-wing-third-x": 60,
              "--right-wing-third-y": 83,
              duration: 0.25,
            },
            {
              "--rotate": 60,
              "--plane-x": -8,
              "--plane-y": 40,
              duration: 0.2,
            },
            {
              "--rotate": 40,
              "--plane-x": 45,
              "--plane-y": -300,
              "--plane-opacity": 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  button.removeAttribute("style");
                  gsap.fromTo(
                    button,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        button.classList.remove("active");
                      },
                    }
                  );
                }, 1800);
              },
            },
          ],
        });

        gsap.to(button, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": 0,
              "--left-wing-background": getVar("--primary-dark"),
              "--right-wing-background": getVar("--primary-dark"),
              duration: 0.11,
            },
            {
              "--left-wing-background": getVar("--primary"),
              "--right-wing-background": getVar("--primary"),
              duration: 0.14,
            },
            {
              "--left-body-background": getVar("--primary-dark"),
              "--right-body-background": getVar("--primary-darkest"),
              duration: 0.25,
              delay: 0.1,
            },
            {
              "--trails-stroke": 171,
              duration: 0.22,
              delay: 0.22,
            },
            {
              "--success-opacity": 1,
              "--success-x": 0,
              duration: 0.2,
              delay: 0.15,
            },
            {
              "--success-stroke": 0,
              duration: 0.15,
            },
          ],
        });
      }
    });
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    triggerSendAnimation();

    const status = document.getElementById("status");
    if (status) {
      status.classList.remove("error");
      status.textContent = "Thanks! Your message has been sent.";
    }

    form.reset();
  });
});

// Helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);

      // Paper plane animation
      // Credit: https://codepen.io/aaroniker/pen/BajabVN
      document.querySelectorAll(".btn-email").forEach((button) => {
        let getVar = (variable) =>
          getComputedStyle(button).getPropertyValue(variable);

        if (!button.classList.contains("active")) {
          button.classList.add("active");

          gsap.to(button, {
            keyframes: [
              {
                "--left-wing-first-x": 50,
                "--left-wing-first-y": 100,
                "--right-wing-second-x": 50,
                "--right-wing-second-y": 100,
                duration: 0.2,
                onComplete() {
                  gsap.set(button, {
                    "--left-wing-first-y": 0,
                    "--left-wing-second-x": 40,
                    "--left-wing-second-y": 100,
                    "--left-wing-third-x": 0,
                    "--left-wing-third-y": 100,
                    "--left-body-third-x": 40,
                    "--right-wing-first-x": 50,
                    "--right-wing-first-y": 0,
                    "--right-wing-second-x": 60,
                    "--right-wing-second-y": 100,
                    "--right-wing-third-x": 100,
                    "--right-wing-third-y": 100,
                    "--right-body-third-x": 60,
                  });
                },
              },
              {
                "--left-wing-third-x": 20,
                "--left-wing-third-y": 90,
                "--left-wing-second-y": 90,
                "--left-body-third-y": 90,
                "--right-wing-third-x": 80,
                "--right-wing-third-y": 90,
                "--right-body-third-y": 90,
                "--right-wing-second-y": 90,
                duration: 0.2,
              },
              {
                "--rotate": 50,
                "--left-wing-third-y": 95,
                "--left-wing-third-x": 27,
                "--right-body-third-x": 45,
                "--right-wing-second-x": 45,
                "--right-wing-third-x": 60,
                "--right-wing-third-y": 83,
                duration: 0.25,
              },
              {
                "--rotate": 60,
                "--plane-x": -8,
                "--plane-y": 40,
                duration: 0.2,
              },
              {
                "--rotate": 40,
                "--plane-x": 45,
                "--plane-y": -300,
                "--plane-opacity": 0,
                duration: 0.375,
                onComplete() {
                  setTimeout(() => {
                    button.removeAttribute("style");
                    gsap.fromTo(
                      button,
                      {
                        opacity: 0,
                        y: -8,
                      },
                      {
                        opacity: 1,
                        y: 0,
                        clearProps: true,
                        duration: 0.3,
                        onComplete() {
                          button.classList.remove("active");
                        },
                      }
                    );
                  }, 1800);
                },
              },
            ],
          });

          gsap.to(button, {
            keyframes: [
              {
                "--text-opacity": 0,
                "--border-radius": 0,
                "--left-wing-background": getVar("--primary-dark"),
                "--right-wing-background": getVar("--primary-dark"),
                duration: 0.11,
              },
              {
                "--left-wing-background": getVar("--primary"),
                "--right-wing-background": getVar("--primary"),
                duration: 0.14,
              },
              {
                "--left-body-background": getVar("--primary-dark"),
                "--right-body-background": getVar("--primary-darkest"),
                duration: 0.25,
                delay: 0.1,
              },
              {
                "--trails-stroke": 171,
                duration: 0.22,
                delay: 0.22,
              },
              {
                "--success-opacity": 1,
                "--success-x": 0,
                duration: 0.2,
                delay: 0.15,
              },
              {
                "--success-stroke": 0,
                duration: 0.15,
              },
            ],
          });
        }
      });
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

// Back to top arrow button

const backToTopBtn = $("#backToTopBtn");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    backToTopBtn.addClass("show");
  } else {
    backToTopBtn.removeClass("show");
  }
});

backToTopBtn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
