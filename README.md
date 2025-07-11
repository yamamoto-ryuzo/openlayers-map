# OpenLayers GeoJSON Viewer

## 公開URL

[https://yamamoto-ryuzo.github.io/openlayers-map/](https://yamamoto-ryuzo.github.io/openlayers-map/)

## 概要
OpenLayersを使って、GeoJSONファイルを地図上に表示するWebアプリです。  
ローカルファイル選択でGeoJSONを読み込み、地図上に描画します。

## 使い方

1. 必要なファイル（`index.html`, `main.js`など）を同じディレクトリに配置してください。
2. ブラウザで`index.html`を開きます。
3. 「ファイル選択」ボタンからGeoJSONファイルを選択すると、地図上に表示されます。

## 注意事項

- GeoJSONの座標系はWGS84（EPSG:4326）を推奨します。
- OpenLayersのCDNがインターネット接続を必要とします。
- サーバー上のGeoJSONを表示したい場合は、`main.js`のfetch処理を利用してください（CORS設定が必要です）。

## ライセンス
MIT
