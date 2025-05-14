mapboxgl.accessToken =
  "pk.eyJ1Ijoic3drMjAwMCIsImEiOiJjbTdraXR4N3owMTZ4MmlzZG03dDIyaGJkIn0.IrX_wW0bMYbw0jOr5nIGGA";
const map_3 = new mapboxgl.Map({
  container: "map_3",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [60, 20],
  zoom: 2.2,
  pitch: 0,
  bearing: 0,
});

let currentYear = "2023";
let popup;
let playInterval = null;

function flyTo(center) {
  map_3.flyTo({ center, zoom: 3, speed: 0.6 });
}

map_3.on("load", () => {
  // Load styled routes
  map_3.addSource("routes", {
    type: "geojson",
    data: "https://songwenkai2000.github.io/CASA0003/output_30_ports_styled.geojson",
  });
  map_3.addLayer({
    id: "route-lines",
    type: "line",
    source: "routes",
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": ["get", "line_color"],
      "line-width": ["get", "line_width"],
      "line-opacity": 0.85,
    },
  });

  map_3.addSource("ports", {
    type: "geojson",
    data: "https://songwenkai2000.github.io/CASA0003/ports_cleaned.geojson",
  });

  map_3.addLayer({
    id: "ports",
    type: "circle",
    source: "ports",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "TEU_" + currentYear],
        1000000,
        4,
        5000000,
        8,
        20000000,
        16,
      ],
      "circle-color": "#FFA726",
      "circle-opacity": 0.8,
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
    },
  });

  map_3.on("mouseenter", "ports", (e) => {
    map_3.getCanvas().style.cursor = "pointer";
    const props = e.features[0].properties;
    const coords = e.features[0].geometry.coordinates;
    const html = `<div id="echart" style="width: 100%; height: 200px;"></div>`;

    if (popup) popup.remove();
    popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false })
      .setLngLat(coords)
      .setHTML(html)
      .addTo(map_3);
    setTimeout(() => drawChart(props), 100);
  });

  map_3.on("mouseleave", "ports", () => {
    map_3.getCanvas().style.cursor = "";
    if (popup) popup.remove();
  });

  document.getElementById("yearSlider").addEventListener("input", (e) => {
    currentYear = e.target.value;
    document.getElementById("yearValue").innerText = currentYear;
    map_3.setPaintProperty("ports", "circle-radius", [
      "interpolate",
      ["linear"],
      ["get", "TEU_" + currentYear],
      1000000,
      4,
      5000000,
      8,
      20000000,
      16,
    ]);
  });

  document.getElementById("playButton").addEventListener("click", () => {
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
      document.getElementById("playButton").innerText = "▶️";
    } else {
      playInterval = setInterval(() => {
        let year = parseInt(currentYear);
        year = year < 2023 ? year + 1 : 2013;
        document.getElementById("yearSlider").value = year;
        document.getElementById("yearSlider").dispatchEvent(new Event("input"));
      }, 1500);
      document.getElementById("playButton").innerText = "⏸️";
    }
  });

  // ArcLayer 动画路径 (通过 deck.gl + MapboxOverlay 添加)
  fetch("https://songwenkai2000.github.io/CASA0003/output_30_ports.geojson")
    .then((res) => res.json())
    .then((data) => {
      const arcs = data.features.map((f, i) => ({
        sourcePosition: f.geometry.coordinates[0],
        targetPosition: f.geometry.coordinates[1],
        width: 2 + (i % 3),
        color: [255 - ((i * 5) % 255), 140 + ((i * 2) % 115), 255],
      }));

      const arcLayer = new deck.ArcLayer({
        id: "arc-layer",
        data: arcs,
        getSourcePosition: (d) => d.sourcePosition,
        getTargetPosition: (d) => d.targetPosition,
        getWidth: (d) => d.width,
        getSourceColor: (d) => d.color,
        getTargetColor: (d) => [255, 255, 255],
        greatCircle: true,
        pickable: false,
      });

      const overlay = new deck.MapboxOverlay({ layers: [arcLayer] });
      map_3.addControl(overlay);
    });
});

function drawChart(props) {
  const chart = echarts.init(document.getElementById("echart"));
  const years = Array.from({ length: 11 }, (_, i) => 2013 + i);
  const teu = years.map((y) => parseInt(props["TEU_" + y] || 0));
  const gdp = years.map((y) => parseFloat(props["GDP_GDP_" + y] || 0));
  chart.setOption({
    grid: { left: 80, right: 50, top: 50, bottom: 50 },
    title: {
      text: props["Port_Name_"],
      left: "center",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "axis" },
    legend: { data: ["TEU", "GDP"], bottom: 0 },
    xAxis: { type: "category", data: years },

    yAxis: [
      { type: "value", name: "TEU" },
      {
        type: "value",
        name: "GDP (Billion $)",
        position: "right",
        axisLine: { lineStyle: { color: "#4CAF50" } },
      },
    ],

    series: [
      { name: "TEU", type: "bar", data: teu, itemStyle: { color: "#4F81BD" } },
      {
        name: "GDP",
        type: "line",
        data: gdp,
        yAxisIndex: 1,
        lineStyle: { color: "#4CAF50" },
      },
    ],
  });
}
