/* ============================================================
   PORTFOLIO — DATA ANALYST & SCIENTIST
   script.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Current Year ── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Custom Cursor ── */
  const cursor    = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");

  if (cursor && cursorDot) {
    let mx = -100, my = -100;
    let cx = -100, cy = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.left = mx + "px";
      cursorDot.style.top  = my + "px";
    });

    // Smooth cursor lag
    const animateCursor = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = cx + "px";
      cursor.style.top  = cy + "px";
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hoverable elements trigger cursor grow
    const hoverables = document.querySelectorAll("a, button, input, textarea, .project-card, .stat-card, .skill-category");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
    });
  }

  /* ── Nav Scroll Effect ── */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.getElementById("navToggle");
  const navLinks  = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    // Close on link click
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  /* ── Reveal on Scroll (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Once revealed, stop observing
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── Staggered Reveal for children ── */
  const staggerParents = document.querySelectorAll(
    ".skills-categories, .projects-grid, .about-stats, .contact-links"
  );
  staggerParents.forEach((parent) => {
    const children = parent.querySelectorAll(".reveal, .skill-category, .project-card, .stat-card, .contact-item");
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  /* ── Animated Stat Counters ── */
  const statNums = document.querySelectorAll(".stat-number[data-target]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  /* ── Skill Bar Animation ── */
  const skillBars = document.querySelectorAll(".skill-fill[data-width]");
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + "%";
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillBars.forEach((bar) => {
    bar.style.width = "0%";
    barObserver.observe(bar);
  });

  /* ── Smooth Anchor Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ── Contact Form ── */
  const form     = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      btn.textContent = "Sending…";
      btn.disabled = true;

      // Simulate send — replace with your actual backend / EmailJS / Formspree call
      setTimeout(() => {
        formNote.textContent = "✓ Message sent! I'll get back to you soon.";
        formNote.style.color = "var(--accent)";
        btn.textContent = "Send Message →";
        btn.disabled = false;
        form.reset();
        setTimeout(() => (formNote.textContent = ""), 5000);
      }, 1500);
    });
  }

  /* ── Hero Title — stagger lines on load ── */
  const titleLines = document.querySelectorAll(".hero-title-line");
  titleLines.forEach((line, i) => {
    line.style.opacity    = "0";
    line.style.transform  = "translateY(30px)";
    line.style.transition = `opacity 0.7s ease ${0.3 + i * 0.15}s, transform 0.7s ease ${0.3 + i * 0.15}s`;
    // Trigger after paint
    requestAnimationFrame(() => {
      setTimeout(() => {
        line.style.opacity   = "1";
        line.style.transform = "translateY(0)";
      }, 50);
    });
  });

  /* ── Active Nav Link Highlight on Scroll ── */
  const sections = document.querySelectorAll("section[id]");
  const navLinkEls = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinkEls.forEach((link) => {
            link.style.color = "";
          });
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.style.color = "var(--accent)";
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

});
