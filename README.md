# 你要去哪裡？

Where are you going 是可以透過網頁的操作改變 iOS 裝置(ex: iPhone, iPad)定位的程式(~~Pokemon Go 作弊工具~~)，發想於 [PokemonMapWalker](https://github.com/wangpy/PokemonMapWalker) 與 [Pokemon-Go-Controller](https://github.com/kahopoon/Pokemon-Go-Controller)。

![Where are you going](https://cloud.githubusercontent.com/assets/10685745/18009982/3748e09c-6be1-11e6-8ff3-c7ff78748195.png)

### 使用說明

1.  準備好 Mac OS，至 Mac App Store 下載安裝 **Xcode**。沒有 Mac OS 可參考 [How to Install Mac OS X El Capitan on VMware on PC](http://techsviewer.com/how-to-install-mac-os-x-el-capitan-on-vmware-on-pc/) 或 [How to Install Mac OS X El Capitan on PC on VirtualBox](http://techsviewer.com/how-to-install-mac-os-x-el-capitan-on-pc-on-virtualbox/) 建立一個 Mac OS VM，更好的選擇是到 [Apple store](http://www.apple.com/tw/mac/) 挑一台自己喜歡的 Mac。:stuck_out_tongue:

2.  下載 [Where are you going](https://github.com/FayeHuang/Where-are-you-going/archive/master.zip)，並解壓縮。

3.  編輯 `myLocation.gpx`，將 `<wpt lat="25.136197272917975" lon="121.50605596254445">` 的 lat 與 lon 改成自己想要在的初始位置(**lat 為緯度**，**lon 為經度**)，例如：北投公園 `<wpt lat="25.136434" lon="121.506242">`。

4.  建立一個 Xcode 新專案：**開啟 Xcode** → **Create a new Xcode project** → **選擇 Single View Applicetion** → 輸入指定欄位 → 選擇放置新專案的資料夾。

5.  將 iOS 裝置(有安裝 Pokemon GO)用 USB 連接至 PC，選擇在自己的 iOS 裝置執行此專案，**Deployment Target** 須選擇與裝置相同的 iOS 版本，如無法執行可按 **Fix Issue** 解決。當 iOS 裝置出現一個**空白畫面**，代表執行成功了！:clap: 
    
    ![step 5](https://cloud.githubusercontent.com/assets/10685745/18009175/bc0b54f8-6bdd-11e6-8c5c-f1dddf266787.png)

6.  將 `myLocation.gpx` 加入到新專案：**Debug** → **Simulate Location** → **Add GPX File to Project** → **選擇步驟 3 的 `myLocation.gpx`** → **Add** → 選用 **Create folder references** 的方式加入自己的專案 → Finish。
    
    ![step 6](https://cloud.githubusercontent.com/assets/10685745/18009271/0a0b16ac-6bde-11e6-9542-d603bfaf9b55.png)
    
    ![step 6](https://cloud.githubusercontent.com/assets/10685745/18009394/9a145fec-6bde-11e6-9ea9-0b6082704a50.png)
    
    ![step 6](https://cloud.githubusercontent.com/assets/10685745/18009449/e50d245c-6bde-11e6-93a6-447f112922a7.png)

7.  啟動 Where are you going

    1.  啟動 Mac OS **Terminal**
    
    2.  安裝 Django 1.9
    
        **`$ sudo easy_install pip`**
    
        **`$ sudo pip install django==1.9`**
    
    3.  移至 Where are you going 資料夾，執行
    
        **`$ python manage.py runserver 0.0.0.0:8080`**

8.  開啟瀏覽器，網址輸入 **`http://127.0.0.1:8080`**，看到 Where are you going 網頁，代表執行成功了！:thumbsup:

9.  回到步驟 4 建立的 Xcode 專案，開啟 Simulate Location 定位：**Debug** → **Simulate Location** → 選擇 **myLocation**。

    ![step 9](https://cloud.githubusercontent.com/assets/10685745/18010075/955245ca-6be1-11e6-920d-ac4970e1a372.png)

10. 最後，開啟 iOS 裝置上的 Pokemon Go，透過操作 Where are you going 網頁，一起探索 Pokemon 的世界吧。:sunglasses:

## 站在巨人們的肩膀

網路上 Pokemon 的公開資源好豐富，讓人可以快速實現想法，感謝巨人們。

*   [PokeRadar](https://www.pokeradar.io/)
*   :octocat: [wangpy/PokemonMapWalker](https://github.com/wangpy/PokemonMapWalker)
*   :octocat: [kahopoon/Pokemon-Go-Controller](https://github.com/kahopoon/Pokemon-Go-Controller)
*   :octocat: [jnovack/pokemon-svg](https://github.com/jnovack/pokemon-svg)

## License

GPL v3
