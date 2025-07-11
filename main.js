import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

let currentVectorLayer = null;

const redPointStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: 'red' }),
    stroke: new Stroke({ color: 'white', width: 2 })
  })
});

function addVectorLayer(vectorSource, style) {
  if (currentVectorLayer) {
    map.removeLayer(currentVectorLayer);
  }
  currentVectorLayer = new VectorLayer({
    source: vectorSource,
    style: style
  });
  map.addLayer(currentVectorLayer);
  const extent = vectorSource.getExtent();
  map.getView().fit(extent, { duration: 1000 });
}

// デバッグ: GeoJSONファイルの読み込み状況をコンソールに表示
function loadGeoJSONFromUrl(url) {
  fetch(url)
    .then(response => {
      console.log('GeoJSON fetch response:', response);
      if (!response.ok) throw new Error('ファイルが見つかりません');
      return response.json();
    })
    .then(geojson => {
      console.log('GeoJSON内容:', geojson);
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: map.getView().getProjection()
        })
      });
      addVectorLayer(vectorSource, redPointStyle);
    })
    .catch(err => {
      alert('GeoJSONファイルの読み込みに失敗しました: ' + err.message);
      console.error(err);
    });
}

// ファイル選択でGeoJSON表示
document.getElementById('gisFileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.name.toLowerCase().endsWith('.gpkg')) {
    alert('GeoPackage（.gpkg）ファイルは直接表示できません。GeoJSONなどに変換してください。');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const geojson = JSON.parse(e.target.result);
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: map.getView().getProjection()
        })
      });
      addVectorLayer(vectorSource, redPointStyle);
    } catch (err) {
      alert('ファイルの読み込みに失敗しました。GeoJSON形式のファイルを選択してください。');
    }
  };
  reader.readAsText(file);
});

// 初期表示でsample.geojsonをズームして表示
loadGeoJSONFromUrl('/data/sample.geojson');