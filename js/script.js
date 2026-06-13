document.addEventListener("DOMContentLoaded", function () {
  initBackgroundCanvas();
  initImageStackCycle();
});

function initBackgroundCanvas() {
  const canvas = document.getElementById("background-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(51, 51, 51, ${particle.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  createParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

function initImageStackCycle() {
  const stacks = document.querySelectorAll(".image-stack");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  stacks.forEach((stack) => {
    const images = Array.from(stack.querySelectorAll("img"));
    if (images.length === 0) return;

    let activeIndex = images.findIndex((image) => image.classList.contains("is-active"));
    if (activeIndex === -1) activeIndex = 0;

    updateImageStack(images, activeIndex);

    if (images.length < 2 || reduceMotion) return;

    const cycleDelay = Number(stack.dataset.cycleDelay) || 3500;

    setInterval(() => {
      activeIndex = (activeIndex + 1) % images.length;
      updateImageStack(images, activeIndex);
    }, cycleDelay);
  });
}

function updateImageStack(images, activeIndex) {
  const nextIndex = (activeIndex + 1) % images.length;

  images.forEach((image, index) => {
    image.classList.remove("is-active", "is-next", "is-queued");

    if (index === activeIndex) {
      image.classList.add("is-active");
    } else if (images.length > 1 && index === nextIndex) {
      image.classList.add("is-next");
    } else {
      image.classList.add("is-queued");
    }
  });
}