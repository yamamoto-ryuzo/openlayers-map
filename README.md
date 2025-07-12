# 🌍 Cesium 3D GeoJSON Viewer v1.0

## 🌐 公開URL (GitHub Pages)

**メインアプリケーション**  
[https://yamamoto-ryuzo.github.io/openlayers-map/](https://yamamoto-ryuzo.github.io/openlayers-map/)

**代替版**  
- **2D地図 (OpenLayers)**: [https://yamamoto-ryuzo.github.io/openlayers-map/index2d.html](https://yamamoto-ryuzo.github.io/openlayers-map/index2d.html)

## 📍 サンプルGeoJSON表示

初期表示で以下のGeoJSONファイルが地図上に表示されます：  
[https://yamamoto-ryuzo.github.io/openlayers-map/data/sample.geojson](https://yamamoto-ryuzo.github.io/openlayers-map/data/sample.geojson)

## 📖 概要

CesiumとOpenStreetMapを使った**3D GeoJSONビューワー**です。  
GitHub Pages上で動作し、GeoJSONファイルを美しい3D地図上に表示できます。

## ✨ v1.0の特徴

### 🚀 **高い安定性**
- **段階的読み込み方式**: 確実な背景地図表示
- **自動リトライ機能**: ネットワーク問題時の自動回復
- **詳細なステータス表示**: ユーザーフレンドリーな進捗表示

### 🌍 **3D地図機能**
- **Cesium 1.115**: 最新の3D地図ライブラリ
- **OpenStreetMap**: 無料オープンソース地図データ
- **3D表示**: 立体的なGeoJSONデータ表示

### 📱 **ユーザビリティ**
- **ドラッグ&ドロップ**: 簡単なファイル読み込み
- **レスポンシブ**: モバイル対応
- **直感的操作**: 分かりやすいUI

## 🚀 使い方

### GitHub Pagesで利用（推奨）
1. [メインアプリケーション](https://yamamoto-ryuzo.github.io/openlayers-map/)にアクセス
2. 初期化を待つ（5-10秒）
3. 「ファイル選択」からGeoJSONファイルを選択
4. 3D地図上でデータを確認

### ローカルで利用
1. リポジトリをクローン
2. HTTPサーバーを起動（例：`python -m http.server 8000`）
3. ブラウザで`http://localhost:8000`を開く

## 🛠️ 技術仕様

- **3D地図エンジン**: Cesium 1.115
- **背景地図**: OpenStreetMap
- **データ形式**: GeoJSON
- **ホスティング**: GitHub Pages
- **対応ブラウザ**: Chrome, Firefox, Safari, Edge (WebGL対応)

## ⚠️ 重要な注意事項

- **初回読み込み**: 背景地図の表示に5-30秒かかる場合があります
- **ネットワーク**: 外部タイルサーバーアクセスのため、安定したネットワークが必要
- **WebGL**: 3D表示にはWebGL対応ブラウザが必要
- **リトライ機能**: 30秒経過後、自動的に再試行ボタンが表示されます

## 📊 サンプルデータ

**東京都江東区の公共施設データ**（児童館・保育園）を含んでいます。

## � v1.0の改善点

1. **タイムアウト問題の解決**: 段階的読み込みで確実な表示
2. **ユーザビリティ向上**: 詳細なステータス表示とリトライ機能
3. **GitHub Pages最適化**: 外部タイルサーバーアクセスの安定化
4. **不要ファイルの整理**: クリーンなプロジェクト構成

## 📝 バージョン履歴

- **v1.0** (2025-07-12): 段階的読み込み方式、リトライ機能、プロダクション版完成

## 📄 ライセンス

MIT License
