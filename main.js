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
  console.log('GeoJSON取得URL:', url);
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
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({ color: 'red' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 2 })
              })
            });
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

// GitHub Pages対応: 正しいパスを自動生成
function getGeoJsonUrl() {
  // GitHub Pagesの場合
  if (location.hostname.endsWith('github.io')) {
    const repoPath = location.pathname.split('/').slice(0, 3).join('/');
    return location.origin + repoPath + '/data/sample.geojson';
  }
  // ローカルの場合
  return '/data/sample.geojson';
}

window.addEventListener('DOMContentLoaded', function() {
  loadGeoJsonFromUrl(getGeoJsonUrl());
});