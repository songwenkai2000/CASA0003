mapboxgl.accessToken =
  "pk.eyJ1Ijoic3drMjAwMCIsImEiOiJjbTdraXR4N3owMTZ4MmlzZG03dDIyaGJkIn0.IrX_wW0bMYbw0jOr5nIGGA";
const map_1 = new mapboxgl.Map({
  container: "map_1",
  //style: 'mapbox://styles/mapbox/streets-v11',
  style: "mapbox://styles/mapbox/dark-v11", // 可改为 'satellite-v9' 或其他样式
  center: [40, 40],
  zoom: 1.5,
  maxZoom: 2.15,
});

// 加载国家边界数据
map_1.on("load", () => {
  const features = [];
  // 使用for...in循环
  for (let key in jsonData[0]) {
    let gj = jsonData[0][key];
    let ZbCkData;
    let ZbJkData;
    let ZbZeData;
    if (jsonData[0][key].对中国出口.value.length == 9) {
      ZbCkData = [
        jsonData[0][key].对中国出口.value[0].value,
        jsonData[0][key].对中国出口.value[1].value,
        jsonData[0][key].对中国出口.value[2].value,
        jsonData[0][key].对中国出口.value[3].value,
        jsonData[0][key].对中国出口.value[4].value,
        jsonData[0][key].对中国出口.value[5].value,
        jsonData[0][key].对中国出口.value[6].value,
        jsonData[0][key].对中国出口.value[7].value,
        jsonData[0][key].对中国出口.value[8].value,
      ];
    } else {
      ZbCkData = [
        jsonData[0][key].对中国出口.value[0].value,
        jsonData[0][key].对中国出口.value[1].value,
        jsonData[0][key].对中国出口.value[2].value,
        jsonData[0][key].对中国出口.value[3].value,
        jsonData[0][key].对中国出口.value[4].value,
        jsonData[0][key].对中国出口.value[5].value,
        jsonData[0][key].对中国出口.value[6].value,
        jsonData[0][key].对中国出口.value[7].value,
      ];
    }
    if (jsonData[0][key].从中国进口.value.length == 9) {
      ZbJkData = [
        jsonData[0][key].从中国进口.value[0].value,
        jsonData[0][key].从中国进口.value[1].value,
        jsonData[0][key].从中国进口.value[2].value,
        jsonData[0][key].从中国进口.value[3].value,
        jsonData[0][key].从中国进口.value[4].value,
        jsonData[0][key].从中国进口.value[5].value,
        jsonData[0][key].从中国进口.value[6].value,
        jsonData[0][key].从中国进口.value[7].value,
        jsonData[0][key].从中国进口.value[8].value,
      ];
    } else {
      ZbJkData = [
        jsonData[0][key].从中国进口.value[0].value,
        jsonData[0][key].从中国进口.value[1].value,
        jsonData[0][key].从中国进口.value[2].value,
        jsonData[0][key].从中国进口.value[3].value,
        jsonData[0][key].从中国进口.value[4].value,
        jsonData[0][key].从中国进口.value[5].value,
        jsonData[0][key].从中国进口.value[6].value,
        jsonData[0][key].从中国进口.value[7].value,
      ];
    }
    if (jsonData[0][key].与中国进出口总额.value.length == 9) {
      ZbZeData = [
        jsonData[0][key].与中国进出口总额.value[0].value,
        jsonData[0][key].与中国进出口总额.value[1].value,
        jsonData[0][key].与中国进出口总额.value[2].value,
        jsonData[0][key].与中国进出口总额.value[3].value,
        jsonData[0][key].与中国进出口总额.value[4].value,
        jsonData[0][key].与中国进出口总额.value[5].value,
        jsonData[0][key].与中国进出口总额.value[6].value,
        jsonData[0][key].与中国进出口总额.value[7].value,
        jsonData[0][key].与中国进出口总额.value[8].value,
      ];
    } else {
      ZbZeData = [
        jsonData[0][key].与中国进出口总额.value[0].value,
        jsonData[0][key].与中国进出口总额.value[1].value,
        jsonData[0][key].与中国进出口总额.value[2].value,
        jsonData[0][key].与中国进出口总额.value[3].value,
        jsonData[0][key].与中国进出口总额.value[4].value,
        jsonData[0][key].与中国进出口总额.value[5].value,
        jsonData[0][key].与中国进出口总额.value[6].value,
        jsonData[0][key].与中国进出口总额.value[7].value,
      ];
    }
    let coordinates = [];
    if (jsonZbData[0][key]) {
      coordinates = jsonZbData[0][key];
    }
    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coordinates, //[-74.5, 40]
      },
      properties: {
        title: jsonGjzyData2[0][key],
        description: jsonGjzyData2[0][key],
        ZbCkData: ZbCkData,
        ZbJkData: ZbJkData,
        ZbZeData: ZbZeData,
      },
    });
  }
  /* const features = [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-74.5, 40]
            },
            properties: {
                title: 'New York City',
                description: 'The Big Apple'
            }
        },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [116.4074, 39.9042] // 北京的坐标
                },
                properties: {
                    title: 'China',
                    description: 'The Middle Kingdom'
                }
            }];*/
  map_1.addSource("single-point", {
    type: "geojson",
    //data: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
    data: {
      type: "FeatureCollection",
      features: features,
    },
  });

  // 替换现有的点图层定义
  // 添加发光效果底层（最大的圆）
  map_1.addLayer({
    id: "point-glow-outer",
    type: "circle",
    source: "single-point",
    paint: {
      "circle-radius": 20,
      "circle-color": "rgba(255, 243, 173, 0.15)",
      "circle-blur": 1,
    },
  });

  // 添加发光效果中层
  map_1.addLayer({
    id: "point-glow-middle",
    type: "circle",
    source: "single-point",
    paint: {
      "circle-radius": 12,
      "circle-color": "rgba(255, 243, 173, 0.25)",
      "circle-blur": 0.5,
    },
  });

  // 添加主点图层
  map_1.addLayer({
    id: "point",
    type: "circle",
    source: "single-point",
    paint: {
      "circle-radius": 5,
      "circle-color": "rgba(255, 215, 0, 0.8)",
      "circle-stroke-width": 1.5,
      "circle-stroke-color": "rgba(255, 255, 255, 0.9)",
    },
  });

  // 添加脉动动画效果（使用CSS动画）
  // 在样式表中添加以下类
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
        0% {
            opacity: 0.4;
            transform: scale(0.8);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.2);
        }
        100% {
            opacity: 0.4;
            transform: scale(0.8);
        }
    }
    
    .pulse-circle {
        width: 12px;
        height: 12px;
        background-color: rgba(255, 215, 0, 0.6);
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        animation: pulse 2s infinite ease-in-out;
        pointer-events: none;
    }
`;
  document.head.appendChild(style);

  // 鼠标悬停时的交互效果
  map_1.on("mouseenter", "point", function (e) {
    map_1.getCanvas().style.cursor = "pointer";

    const coordinates = e.features[0].geometry.coordinates.slice();
    const point = map_1.project(coordinates);

    // 增强悬停效果
    map_1.setPaintProperty("point", "circle-radius", 7);
    map_1.setPaintProperty("point", "circle-color", "rgba(255, 215, 0, 0.9)");
    map_1.setPaintProperty("point-glow-middle", "circle-radius", 16);
    map_1.setPaintProperty("point-glow-outer", "circle-radius", 25);
  });

  map_1.on("mouseleave", "point", function () {
    map_1.getCanvas().style.cursor = "";

    // 恢复原始效果
    map_1.setPaintProperty("point", "circle-radius", 5);
    map_1.setPaintProperty("point", "circle-color", "rgba(255, 215, 0, 0.8)");
    map_1.setPaintProperty("point-glow-middle", "circle-radius", 12);
    map_1.setPaintProperty("point-glow-outer", "circle-radius", 20);
  });

  map_1.on("click", "point", function (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;
    const title = properties.title;
    const ZbCkData = properties.ZbCkData.replace("[", "")
      .replace("]", "")
      .split(",");
    const ZbJkData = properties.ZbJkData.replace("[", "")
      .replace("]", "")
      .split(",");
    const ZbZeData = properties.ZbZeData.replace("[", "")
      .replace("]", "")
      .split(",");
    console.log(ZbCkData);
    console.log(ZbJkData);
    console.log(ZbZeData);
    // 创建 Popup 内容
    const popupContent = `<canvas id="popupLineChart" width="450" height="250"></canvas>`;

    // 显示 Popup
    const popup = new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map_1)
      .getElement() // 获取 popup 元素
      .classList.add("transparent-popup"); // 添加透明样式
    // 延迟确保 canvas 已插入 DOM 后绘制图表
    setTimeout(() => {
      const ctx = document.getElementById("popupLineChart").getContext("2d");

      // 如果已存在 chart 实例，先销毁
      if (window.myPopupChart) {
        window.myPopupChart.destroy();
      }
      // 绘制新图表
      window.myPopupChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
          ],
          datasets: [
            {
              label: title + " exports to China",
              data: ZbCkData,
              borderColor: "rgb(11,80,207)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(11,80,207, 1)",
              pointBackgroundColor: "rgba(11,80,207, 1)",
              pointBorderWidth: 0.5,
            },
            {
              label: title + " imports from China",
              data: ZbJkData,
              borderColor: "rgb(228,171,0)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(228,171,0, 1)",
              pointBackgroundColor: "rgba(2228,171,0, 1)",
              pointBorderWidth: 0.5,
            },
            {
              label:
                "The total volume of imports and exports between " +
                title +
                " and China",
              data: ZbZeData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(75, 192, 192, 1)",
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointBorderWidth: 0.5,
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }, 100); // 确保 DOM 更新后再绘制
  });

  /*     map_1.on('click', 'point', function (e) {
            //<h3>${properties.title}</h3><p>${properties.description}</p>
            const coordinates = e.features[0].geometry.coordinates.slice();
            const properties = e.features[0].properties;

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML('')
                .addTo(map_1);
        });*/
  // 鼠标悬停时改变光标样式
  map_1.on("mouseenter", "point", function () {
    map_1.getCanvas().style.cursor = "pointer";
  });

  map_1.on("mouseleave", "point", function () {
    map_1.getCanvas().style.cursor = "";
  });
});

/* ----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("section-globe");
  const map = map_1; // 你创建的第一个地图实例
  const vh = window.innerHeight;

  // 记录：是否已触发过一次动画
  let triggered = false;

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();

    // 当 section 滚动到视口中线上下 100px 范围内时，触发一次
    if (!triggered && rect.top < vh / 2 + 100 && rect.bottom > vh / 2 - 100) {
      triggered = true;

      map.easeTo({
        zoom: 2.2,
        // 这里把中心改成你想要放大的城市，比如北京：
        center: [55, 40],
        // 如果还想再做屏幕偏移，可以加 offset：
        offset: [0, -window.innerHeight * 0],
        duration: 1500,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }
  });
});
