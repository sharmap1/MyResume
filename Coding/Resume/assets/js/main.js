document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader-overlay");
  const pBar = document.getElementById("p-bar");

  // --- 1. NAVIGATION LOGIC ---
  function navigate(toId) {
    if (!loader || !pBar) return;

    loader.style.display = "flex";
    let w = 0;
    const interval = setInterval(() => {
      w += 25;
      pBar.style.width = w + "%";
      if (w >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.display = "none";
          pBar.style.width = "0%";

          document.querySelectorAll(".page").forEach((p) => {
            p.classList.remove("enter");
            p.style.display = "none";
          });

          const target = document.getElementById(toId);
          if (target) {
            target.style.display = "flex";
            setTimeout(() => target.classList.add("enter"), 50);
          }
        }, 300);
      }
    }, 60);
  }

  // Bind Buttons Safely
  const setupBtn = (id, targetId) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => navigate(targetId));
  };

  setupBtn("toSkills", "skills-page");
  setupBtn("toExp", "exp-page");
  setupBtn("backToHome", "landing-page");
  setupBtn("backToSkills", "skills-page");

  // --- 2. SMOKE BACKGROUND LOGIC ---
  const canvas = document.createElement("canvas");
  canvas.id = "smoke-bg";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";

  let particles = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.size = Math.random() * 40 + 20;
      this.speedY = Math.random() * 0.8 + 0.2;
      this.opacity = Math.random() * 0.5;
    }
    update() {
      this.y -= this.speedY;
      if (this.opacity > 0) this.opacity -= 0.002;
    }
    draw() {
      ctx.fillStyle = `rgba(150, 150, 150, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (particles.length < 60) particles.push(new Particle());
    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.opacity <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
  }
  animate();
});
