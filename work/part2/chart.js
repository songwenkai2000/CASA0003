// 获取 canvas 元素
const chartContainer = document.getElementById("chart-container");
const briChartElement = document.getElementById("briChart");
let chartInitialized = false; // 标记图表是否已初始化

// Intersection Observer 监听器
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !chartInitialized) {
        // 当元素进入视口时初始化图表
        initializeChart();
        chartInitialized = true; // 防止重复初始化
      }
    });
  },
  {
    threshold: 0.5, // 当50%元素进入视口时触发
  }
);

// 启动观察
observer.observe(chartContainer);

// 初始化图表的函数
function initializeChart() {
  const years = [
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    2023, 2024,
  ];
  const cargoVolumes = [
    1404, 3674, 6960, 26070, 68902, 145794, 317930, 541000, 725000, 1135000,
    1464150, 1614108.25, 1901949, 2077216,
  ];
  const numTrains = [
    17, 42, 80, 308, 815, 1702, 3673, 6363, 8225, 12406, 15183, 16562, 17523,
    19392,
  ];

  const ctx = briChartElement.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: years,
      datasets: [
        {
          type: "bar",
          label: "Cargo Volume (TEU)",
          data: cargoVolumes,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          yAxisID: "y-left",
        },
        {
          type: "line",
          label: "Number of Trains",
          data: numTrains,
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          yAxisID: "y-right",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        "y-left": {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Cargo Volume (TEU)",
            color: "white",
          },
          ticks: {
            color: "white",
          },
        },
        "y-right": {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Number of Trains",
            color: "white",
          },
          ticks: {
            color: "white",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Annual changes in the number of TEUs and trains",
          color: "white",
          font: {
            family: "'Georgia', serif",
            size: 20,
            weight: "bold",
            style: "normal",
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          titleColor: "white",
          bodyColor: "white",
          footerColor: "white",
        },
      },
      elements: {
        line: {
          borderColor: "white",
        },
        bar: {
          borderColor: "white",
        },
      },
      layout: {
        padding: 10,
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  });
}
