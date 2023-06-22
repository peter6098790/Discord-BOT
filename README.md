# Discord-BOT
## 環境設置
1.安裝 node js v18.16.0  
2.安裝所需套件  
> npm install

## 注意事項
1.請在資料夾中新增一個.env檔，內容格式可以參考.env-example，另外由於.env中記錄著敏感資料，請記得將其加入.gitignore，並確保不會外流。假如意外暴露，請第一時間更新您的discord機器人token。 
2. 開發新指令後都需先執行一次 register-commands.js 註冊機器人指令，才能使指令生效
> node register-commands.js

## 目前功能
1. 機器人關鍵字回話，回話內容可於 index.js 中第83~125行負責文字訊息事件監聽的部分自行添加  
![image](https://github.com/peter6098790/Discord-BOT/assets/45934743/8f06ab49-7d65-4922-a192-fbe09ad3bb60)  

``` =javascript
// 程式碼區塊
bot.on("messageCreate", async message => {
    if(message.content.includes("希望偵測的關鍵字")) message.channel.send("希望機器人回復的內容");
}
```
2. 成員加入/離開伺服器以及頻道創立/刪除時的系統公告，需要在index.js第51行以及第58、63、70、75行分別指定機器人回話的頻道id和名稱

3. 語音積分系統，使用者通過加入語音頻道獲得在線積分，並且能夠通過指令顯示使用者目前積分。積分採用定時給予的方式，頻率可以通過調整 index.js 第146行 setInterval()中的數字改變，其單位為毫秒(ex: 數字填6000代表每6秒給予一次積分)

## 指令列表
/help 列出目前機器人所有的指令 
/profile 顯示使用者個人資料和積分

## Todo List
- 改用資料庫儲存積分資料
- 修復由於 discord.js 版本升級失效的指令
- 串接魔獸世界api提供查詢時光徽章價格的功能 
