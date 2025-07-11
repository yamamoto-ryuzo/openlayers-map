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

// 地図の初期化
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

// 赤い円スタイル
const redPointStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: 'red' }),
    stroke: new Stroke({ color: 'white', width: 2 })
  })
});

// sample.geojsonを読み込んで表示
fetch('/data/sample.geojson')
  .then(response => response.json())
  .then(geojson => {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojson, {
        featureProjection: map.getView().getProjection()
      })
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: redPointStyle
    });
    map.addLayer(vectorLayer);
    const extent = vectorSource.getExtent();
    map.getView().fit(extent, { duration: 1000 });
  })
  .catch(err => {
    alert('GeoJSONファイルの読み込みに失敗しました: ' + err.message);
  });