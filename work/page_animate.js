// 文件: page_animate.js

document.addEventListener("DOMContentLoaded", () => {
  setupNavbarObserver();
  setupMapOverlayObserver();
});

function setupNavbarObserver() {
  const nav = document.querySelector(".navbar");
  const cover = document.getElementById("section-cover");

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) nav.classList.remove("visible");
      else nav.classList.add("visible");
    },
    { rootMargin: "-10px 0px 0px 0px", threshold: 0 }
  );

  if (cover) io.observe(cover);
}

function setupMapOverlayObserver() {
  const sectionMap = document.getElementById("section-map");
  const mapOverlay = document.getElementById("mapOverlay");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        mapOverlay.style.display = "block";
        mapOverlay.style.opacity = "1";
        setTimeout(() => {
          mapOverlay.style.opacity = "0";
        }, 50);
        setTimeout(() => {
          mapOverlay.style.display = "none";
        }, 2000);
      } else {
        mapOverlay.style.display = "block";
        mapOverlay.style.opacity = "1";
      }
    },
    { threshold: 0.3 }
  );

  if (sectionMap && mapOverlay) observer.observe(sectionMap);
}
