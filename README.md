# LINE Bot (卒業研究)

### 参考サイト

- LINE Bot:
  https://qiita.com/n0bisuke/items/ceaa09ef8898bee8369d
- Vercel:
  https://qiita.com/n0bisuke/items/a5f49193fa68f28a7f25
  https://qiita.com/n0bisuke/items/901154531ea14f978bd4

### 立ち上げ方

※Vercel でサーバにデプロイをした場合はこの作業は行う必要がない

- サーバを立ち上げる
  `npm start`
- トンネリングサーバーを立ち上げる
  `ngrok http 3000(PORT名)`
- トンネリングサーバーを起動すると表示される"https://"から始まるアドレスを下記サイトの Webhook 設定の"/webhook"の前に貼り付けて更新する
  (※この作業はトンネリングサーバーを立ち上げるたびに毎度行う必要がある)
  https://developers.line.biz/console/channel/1655190346/messaging-api

### Vercel

- プログラムを更新したら下記のコマンドでデプロイする
- vercel deploy command
  `vercel --prod`
