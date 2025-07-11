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