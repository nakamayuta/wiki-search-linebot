# LINE Bot (卒業研究)

### 参考サイト

- LINE Bot:
  https://qiita.com/n0bisuke/items/ceaa09ef8898bee8369d
- wikijs:
  https://co.bsnws.net/article/265
- heroku:
  - https://jp.heroku.com/nodejs
  - https://note.com/w0o0ps/n/n2eca493ced5d
  - https://qiita.com/shti_f/items/b4b5d830672d908eff4e

### QR コード

![QRコード](https://qr-official.line.me/sid/L/546sgclk.png)

### 立ち上げ方 開発用

- サーバを立ち上げる
  `npm startmon`
- トンネリングサーバーを立ち上げる
  `ngrok http 3000(PORT名)`
- トンネリングサーバーを起動すると表示される"https://"から始まるアドレスを下記サイトの Webhook 設定の"/webhook"の前に貼り付けて更新する
  (※この作業はトンネリングサーバーを立ち上げるたびに毎度行う必要がある) 開発時はここで生成された URL を使う
  https://developers.line.biz/console/channel/1655190346/messaging-api
