/* ==========================================================================
   HORIZONTAL-DECK.JS - Horizontal Page Changing Deck Controller
   Manages 3D sliding animations, swipe gestures, keyboard arrow transitions,
   and page indicator pills in a warm rose environment.
   ========================================================================== */

class HorizontalDeckController {
  constructor() {
    this.container = null;
    this.stage = null;
    this.dotsContainer = null;
    this.counterEl = null;
    this.titleEl = null;
    this.currentIndex = 0;
    this.slides = [];
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isTransitioning = false;
  }

  init() {
    this.container = document.getElementById("horizontal-deck-view");
    this.stage = document.getElementById("deck-stage");
    this.dotsContainer = document.getElementById("deck-dots-container");
    this.counterEl = document.getElementById("deck-slide-counter");
    this.prevBtn = document.getElementById("deck-prev-btn");
    this.nextBtn = document.getElementById("deck-next-btn");

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Keyboard Arrow Key Navigation
    window.addEventListener("keydown", (e) => {
      if (!document.body.classList.contains("horizontal-mode-active")) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prevSlide();
      }
    });

    // Touch Swipe Gesture Support
    if (this.stage) {
      this.stage.addEventListener("touchstart", (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.stage.addEventListener("touchend", (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });
    }
  }

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  loadSlides(slideItems) {
    this.slides = slideItems;
    this.currentIndex = 0;
    this.renderStage();
    this.updatePagination();
  }

  renderStage() {
    if (!this.stage) return;
    this.stage.innerHTML = "";

    this.slides.forEach((slideData, idx) => {
      const slideEl = document.createElement("div");
      slideEl.className = "deck-slide";
      if (idx === 0) slideEl.classList.add("active");
      slideEl.dataset.index = idx;

      slideEl.innerHTML = `
        <div class="deck-card">
          <div class="deck-card-header">
            <div>
              <span class="deck-slide-subject-tag">${slideData.badge || "Core Concept"}</span>
              <h2 class="deck-slide-title">${slideData.title}</h2>
            </div>
            <div class="deck-counter">${idx + 1} / ${this.slides.length}</div>
          </div>
          <div class="deck-card-body">
            ${slideData.contentHtml}
          </div>
        </div>
      `;

      this.stage.appendChild(slideEl);
    });

    this.renderDots();
    this.updateCounter();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = "";

    this.slides.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = "deck-dot";
      if (idx === this.currentIndex) dot.classList.add("active");
      dot.title = `Go to slide ${idx + 1}`;
      dot.addEventListener("click", () => this.goToSlide(idx));
      this.dotsContainer.appendChild(dot);
    });
  }

  goToSlide(newIndex) {
    if (newIndex < 0 || newIndex >= this.slides.length || newIndex === this.currentIndex) return;
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    window.soundApp.playChime("click");

    const slideElements = this.stage.querySelectorAll(".deck-slide");
    const currentSlide = slideElements[this.currentIndex];
    const targetSlide = slideElements[newIndex];

    const isNext = newIndex > this.currentIndex;

    if (currentSlide) {
      currentSlide.classList.remove("active");
      currentSlide.classList.add(isNext ? "prev-slide" : "next-slide");
    }

    if (targetSlide) {
      targetSlide.classList.remove("prev-slide", "next-slide");
      targetSlide.classList.add("active");
    }

    this.currentIndex = newIndex;
    this.updatePagination();
    this.updateCounter();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    } else {
      // Gentle bounce / cycle
      this.goToSlide(0);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  updatePagination() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll(".deck-dot");
    dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.classList.add("active");
        dot.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } else {
        dot.classList.remove("active");
      }
    });
  }

  updateCounter() {
    if (this.counterEl) {
      this.counterEl.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }
  }
}

window.deckController = new HorizontalDeckController();
