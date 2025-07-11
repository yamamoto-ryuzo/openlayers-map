// 地図の初期化
const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([139.767, 35.681]), // 東京駅
    zoom: 10
  })
});

document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    try {
      const geojson = JSON.parse(evt.target.result);
      const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojson, {
          featureProjection: map.getView().getProjection()
        })
      });
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });
      map.addLayer(vectorLayer);

      // 表示範囲をフィット
      const extent = vectorSource.getExtent();
      if (!ol.extent.isEmpty(extent)) {
        map.getView().fit(extent, { duration: 1000 });
      }
    } catch (err) {
      alert('ファイルの読み込みに失敗しました: ' + err.message);
    }
  };
  reader.readAsText(file);
});

// 赤い丸のスタイル
const redCircleStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({ color: 'red' }),
    stroke: new ol.style.Stroke({ color: 'white', width: 2 })
  })
});

// /data/sample.geojson を読み込んで表示
function loadGeoJsonFromUrl(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('ファイル取得失敗: ' + response.status + ' ' + response.statusText);
      return response.json();
    })
    .then(geojson => {
      const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojson, {
          featureProjection: map.getView().getProjection()
        })
      });
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function(feature) {
          if (feature.getGeometry().getType() === 'Point') {
            return redCircleStyle;
          }
          return null;
        }
      });
      map.addLayer(vectorLayer);

      const extent = vectorSource.getExtent();
      if (!ol.extent.isEmpty(extent)) {
        map.getView().fit(extent, { duration: 1000 });
      }
    })
    .catch(err => {
      alert('GeoJSONの取得または表示に失敗しました: ' + err.message);
      console.error('GeoJSONロードエラー:', err);
    });
}

// ページロード時に /data/sample.geojson を表示
window.addEventListener('DOMContentLoaded', function() {
  // GitHub Pages用の絶対パスに修正
  loadGeoJsonFromUrl('https://yamamoto-ryuzo.github.io/openlayers-map/data/sample.geojson');
});