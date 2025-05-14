// wordcloud.js
let pulseToggle = false;
let pulseInterval;

(function () {
  function initWordList() {
    if (!window.wordMapping) {
      return setTimeout(initWordList, 200);
    }

    console.log("🔑 wordMapping keys:", Object.keys(window.wordMapping));

    const container = document.getElementById("wordcloud");
    container.innerHTML = ""; // 清空旧内容
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "flex-start";
    container.style.padding = "10px";
    container.style.gap = "8px"; // 单词之间的间距

    const words = Object.entries(window.wordMapping).map(([text, cfg]) => ({
      text,
      cfg,
    }));

    words.forEach((word) => {
      const el = document.createElement("div");
      el.className = "wordcloud-word";
      el.textContent = word.text;
      el.style.fontSize = `${word.size}px`;
      el.style.cursor = "pointer";

      el.addEventListener("click", () => {
        highlightCityPoints(word.cfg.cities);
        showInfoPanel(word.cfg);
        flyToCities(word.cfg.cities);
      });

      container.appendChild(el);
    });
  }

  initWordList();

  // 高亮城市点
  function highlightCityPoints(cityIds) {
    if (!window.map_2) return;
    map_2.setFilter("highlight_cities", [
      "in",
      ["get", "id"],
      ["literal", cityIds],
    ]);
    // 启动脉冲动画
    if (pulseInterval) clearInterval(pulseInterval);
    pulseInterval = setInterval(() => {
      pulseToggle = !pulseToggle;
      const radius = pulseToggle ? 8 : 14;
      map_2.setPaintProperty("highlight_cities", "circle-radius", radius);
    }, 600);
  }

  // 聚焦城市
  function flyToCities(cityIds) {
    const features = (window.cityIndex?.features || []).filter((f) =>
      cityIds.includes(f.properties.id)
    );
    if (!features.length) return;
    const cityCollection = turf.featureCollection(features);
    const bbox = turf.bbox(cityCollection);
    const currentPitch = map_2.getPitch();
    const currentBearing = map_2.getBearing();

    map_2.fitBounds(bbox, {
      padding: 50,
      duration: 1000,
      maxZoom: 5,
      pitch: currentPitch,
      bearing: currentBearing,
    });
  }

  // 显示信息面板
  function showInfoPanel({ title, description }) {
    const panel = document.getElementById("infoPanel");
    document.getElementById("infoTitle").textContent = title;
    document.getElementById("infoText").textContent = description;
    panel.style.display = "block";
    panel.classList.add("show");
  }

  // 全局点击，点击空白处关闭面板
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("wordcloud-word")) {
      const panel = document.getElementById("infoPanel");
      panel.classList.remove("show");
      panel.classList.add("hide");
      // 动画结束后彻底隐藏
      setTimeout(() => {
        panel.style.display = "none";
        panel.classList.remove("hide");
      }, 400);

      // 清除高亮和动画
      if (window.map_2) {
        map_2.setFilter("highlight_cities", [
          "in",
          ["get", "id"],
          ["literal", []],
        ]);
      }
      if (pulseInterval) {
        clearInterval(pulseInterval);
        pulseInterval = null;
      }
    }
  });
})();
