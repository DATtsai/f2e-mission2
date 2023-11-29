# F2E-MISSION2

## 作品說明
5th the F2E challenge 總統即時開票全台地圖 之 決戰2020總統大選
透過2020選舉資料，來探索不同行政區階層的投票紀錄與投票結果，利用d3js完成地圖、圖表開發。

## 系統說明
專案下載後，另外至gh-pages分支下載檔案( https://github.com/DATtsai/f2e-mission2/tree/gh-pages )，並將此命名為dist置於f2e-mission2資料夾之下<br>
執行環境 node v18(lts/hydrogen)以上<br>
使用 `npm run preview` 完成本地端對伺服器開設(運作dist的程式碼)<br>
<hr>
本機端開發環境，使用 `npm install` 完成套件安裝，本機端開發環境伺服器開社 `npm run dev`<br>
由於自製圖表部份有另外封裝成私有套件發佈(bpnpm)，本機端開發需取得私有npm授權路徑，目前不對外提供<br>

如執行專案有異常或詢問授權相關問題，請洽開發者 dat1293@gmail.com<br>
## 資料夾說明
- public
- src
    - assets 包含地圖topojson、選舉數據json file、css全域設定等
    - components 圖表元件、地圖元件
    - router 路由
    - views 主要頁面元件
    - App.vue layout主版
    - main.js 進入點
    - mockAPI 靜態頁中模擬API取得之函數
- utilis 內含處理原始數據csv，轉成json file，以及在node環境中可執行的mockAPI
- index.html 頁面進入點

## 使用技術
vue3 前端框架
d3.js 圖表、地圖之開發

## 第三方服務
element-plus UI componennt

## 開發人員
Eleanore UI設計、切版處理、圖表開發<br>
DAT 地圖開發、圖表開發、mockAPI設計<br>
Laura 圖表開發、切版處理、頁面互動邏輯處理<br>
