# LINE Bot (卒業研究)

### 参考サイト

- LINE Bot:
  https://qiita.com/n0bisuke/items/ceaa09ef8898bee8369d
- Vercel:
  https://qiita.com/n0bisuke/items/a5f49193fa68f28a7f25
  https://qiita.com/n0bisuke/items/901154531ea14f978bd4

### 立ち上げ方 (開発用)

- サーバを立ち上げる
  `npm start`
- トンネリングサーバーを立ち上げる
  `ngrok http 3000(PORT名)`
- トンネリングサーバーを起動すると表示される"https://"から始まるアドレスを下記サイトの Webhook 設定の"/webhook"の前に貼り付けて更新する
  (※この作業はトンネリングサーバーを立ち上げるたびに毎度行う必要がある) 開発時はここで生成された URL を使う
  https://developers.line.biz/console/channel/1655190346/messaging-api

### Vercel

- デプロイする際は下記サイトの webhook URL をデプロイ用の URL に変更する
  LINE Developers Message API 設定:
  https://developers.line.biz/console/channel/1655190346/messaging-api

  デプロイ用 URL: https://linebot-dun.vercel.app

- プログラムを更新したら下記のコマンドでデプロイする
- vercel deploy command
  `vercel --prod`
