"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const axios = require("axios");
const wiki = require("wikijs").default({
  apiUrl: "http://ja.wikipedia.org/w/api.php",
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: "03d7e1dca5956b74ff7d15a103603514",
  channelAccessToken:
    "KxK2+e3JfYJw/9fqfjKj0hkciKIOcEWnnqT1YqlXzsDo8xCseIOUZTCzUz9lg3e0csLLcMXjAyKHLGzQHDui2q4tfdyBqwNwPvNsiX8x2DmbSSSj3iLKKkC7v4ZXPqyEq4Duv1bfLKJjIV6XS0NvpAdB04t89/1O/w1cDnyilFU=",
};

const app = express();

app.get("/", (req, res) => res.send("Hello LINE BOT!(GET)")); //ブラウザ確認用(無くても問題ない)
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  // 辞書
  isArticle(event.source.userId, event.message.text, event.replyToken);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `${event.message.text}を検索中...`, //実際に返信の言葉を入れる箇所
  });
}

const isArticle = (userId, word, token, option = "") => {
  wiki
    .page(word)
    .then(() => {
      option
        ? getDescriptionV2(userId, word, option)
        : getDescriptionV2(userId, word);
    })
    .catch((err) => {
      console.log("err---" + err);
      notArticle(userId, word, token);
    });
};

const notArticle = (userId, word, token) => {
  // new line.Client(config).replyMessage(token, {
  //   type: "text",
  //   text: `err 記事が見つかりませんでした。\nhttps://ja.wikipedia.org/wiki/${word}`, //実際に返信の言葉を入れる箇所
  // });

  client.pushMessage(userId, {
    type: "text",
    text: `err 記事が見つかりませんでした。\nhttps://ja.wikipedia.org/wiki/${word}`,
  });
};

const getDescriptionV2 = async (userId, word, option = "") => {
  // 変数宣言 -----
  const page = await wiki.page(word);
  const summary = await page.summary(); // 概要
  let content = await page.content();
  let titleList = [];
  let responseText = "";
  // 整形
  const removeContent = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].title == "外部リンク" ||
        arr[i].title == "脚注" ||
        arr[i].title == "関連項目"
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  // -----

  // 処理 -----
  content = removeContent(content);
  if (content.length) {
    titleList = content.map((el) => el.title);
    content.forEach((el, i) => {
      if (!el.content && !el.items) {
        titleList.splice(i, 1);
      }
    });
  }

  if (!option) {
    if (summary) {
      responseText = summary.trim();
      console.log(responseText);
      console.log(content[0].title);
      console.log(content[0].content);
    }
  } else {
    const searchOption = (option) => {
      const i = titleList.indexOf(option);
      i !== -1 ? console.log(content[i]) : console.log(`${option} not found`);
    };

    content.length ? searchOption(option) : console.log("not content");
  }

  console.log(`https://ja.wikipedia.org/wiki/${word}`);
  if (titleList.length) console.log(titleList);

  // 返信処理
  await client.pushMessage(userId, {
    type: "text",
    text: responseText,
  });
};

process.env.NOW_REGION ? (module.exports = app) : app.listen(PORT);
console.log(`Server running at ${PORT}`);
