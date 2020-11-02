# LINE Bot (卒業研究)

### 参考サイト

https://qiita.com/n0bisuke/items/ceaa09ef8898bee8369d

### 立ち上げ方

- サーバを立ち上げる
  `npm start`
- トンネリングサーバーを立ち上げる
  `ngrok http 3000(PORT名)`
- トンネリングサーバーを起動すると表示される"https://"から始まるアドレスを下記サイトの Webhook 設定の"/webhook"の前に貼り付けて更新する
  (※この作業はトンネリングサーバーを立ち上げるたびに毎度行う必要がある)
  https://developers.line.biz/console/channel/1655190346/messaging-api
