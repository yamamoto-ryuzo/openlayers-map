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

// 一般的な青色ポイントスタイル
const pointStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({ color: 'blue' }),
    stroke: new ol.style.Stroke({ color: 'white', width: 2 })
  })
});

// GeoJSON表示
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
            return pointStyle;
          }
          // ライン・ポリゴンはデフォルト
          return null;
        }
      });
      map.addLayer(vectorLayer);

      // 属性表示イベント（クリックしたフィーチャの属性を表示）
      map.on('singleclick', function(evt) {
        map.forEachFeatureAtPixel(evt.pixel, function(feature) {
          const props = feature.getProperties();
          const attr = Object.assign({}, props);
          delete attr.geometry;
          alert('属性:\n' + JSON.stringify(attr, null, 2));
        });
      });

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

// GitHub Pages対応: 正しいパスを自動生成
function getGeoJsonUrl() {
  // GitHub Pages用の絶対パスを返す
  return 'https://yamamoto-ryuzo.github.io/openlayers-map/data/sample.geojson';
}

window.addEventListener('DOMContentLoaded', function() {
  loadGeoJsonFromUrl(getGeoJsonUrl());
});