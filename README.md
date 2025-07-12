# OpenLayers & Cesium Map Viewer

## 🌐 公開URL (GitHub Pages)

### メインページ
[https://yamamoto-ryuzo.github.io/openlayers-map/index-main.html](https://yamamoto-ryuzo.github.io/openlayers-map/index-main.html)

### 地図ビューワー
- **2D地図 (OpenLayers)**: [https://yamamoto-ryuzo.github.io/openlayers-map/index2d.html](https://yamamoto-ryuzo.github.io/openlayers-map/index2d.html)
- **3D地図 (Cesium)**: [https://yamamoto-ryuzo.github.io/openlayers-map/index.html](https://yamamoto-ryuzo.github.io/openlayers-map/index.html)
- **シンプル3D (テスト版)**: [https://yamamoto-ryuzo.github.io/openlayers-map/index-simple.html](https://yamamoto-ryuzo.github.io/openlayers-map/index-simple.html)

## 📍 サンプルGeoJSON表示

初期表示で以下のGeoJSONファイルが地図上に表示されます：  
[https://yamamoto-ryuzo.github.io/openlayers-map/data/sample.geojson](https://yamamoto-ryuzo.github.io/openlayers-map/data/sample.geojson)

## 📖 概要
OpenLayersとCesiumを使って、GeoJSONファイルを地図上に表示するWebアプリです。  
ローカルファイル選択でGeoJSONを読み込み、地図上に描画します。

## 🚀 使い方

### GitHub Pagesで利用
1. 上記の公開URLにアクセス
2. 用途に応じて2Dまたは3D地図を選択
3. 「ファイル選択」ボタンからGeoJSONファイルを選択すると、地図上に表示されます

### ローカルで利用
1. 必要なファイル（`index.html`, `main.js`など）を同じディレクトリに配置
2. HTTPサーバーを起動（例：`python -m http.server 8000`）
3. ブラウザで`http://localhost:8000`を開く

## 🛠️ 技術仕様

- **2D地図**: OpenLayers 7.4.0 + OpenStreetMap
- **3D地図**: Cesium 1.115 + OpenStreetMap
- **データ形式**: GeoJSON
- **サンプルデータ**: 東京都江東区の児童館・保育園位置情報

## 🌟 特徴

- ✅ GitHub Pages対応
- ✅ レスポンシブデザイン  
- ✅ ファイルドラッグ&ドロップ対応
- ✅ 2D/3D表示切り替え
- ✅ エラーハンドリング
- ✅ HTTPS対応

## 注意事項

- GeoJSONの座標系はWGS84（EPSG:4326）を推奨します。
- OpenLayersのCDNがインターネット接続を必要とします。
- サーバー上のGeoJSONを表示したい場合は、`main.js`のfetch処理を利用してください（CORS設定が必要です）。

## ライセンス
MIT
