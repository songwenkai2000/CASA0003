// ================================
// Initialize Mapbox Map
// ================================
mapboxgl.accessToken =
  "pk.eyJ1IjoieWc4MDY4IiwiYSI6ImNtNjd4dWpteTA0NDkyanM4Y2czZjVybGMifQ.OMwjTRog4M7HBlXYqe7f6w";

var map_2 = new mapboxgl.Map({
  container: "map_2",
  style: "mapbox://styles/yg8068/cmah9cbh600xt01sl6rup38yb",
  center: [40, 20],
  zoom: 1.5,
  pitch: 0, // 倾斜角度（0 - 85，建议 45~60）
  maxPitch: 60,
  bearing: 0, // 顺/逆时针旋转角度（正值为顺时针）
  renderWorldCopies: false, // 👈 禁止地图左右重复平铺
});

/* map_2.easeTo({
  center: [65, 50], // 你原本希望作为地图视觉中心的点
  zoom: 2.6, // 保持原 zoom
  offset: [-135, -100], // 水平偏移 +200px，垂直偏移 +100px（向左上偏）
}); */

map_2.on("load", function () {
  addDataSources();
  addLayers();
  drawChannelChart();
  setupLineButtons();
  updateLineDisplay();
});

/* ----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("section-map");
  const map = map_2; // 你创建的第一个地图实例
  const vh = window.innerHeight;

  // 记录：是否已触发过一次动画
  let triggered = false;

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();

    // 当 section 滚动到视口中线上下 100px 范围内时，触发一次
    if (!triggered && rect.top < vh / 2 + 100 && rect.bottom > vh / 2 - 100) {
      triggered = true;

      map.easeTo({
        zoom: 2.6,
        center: [65, 40],
        duration: 1500,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }
  });
});
