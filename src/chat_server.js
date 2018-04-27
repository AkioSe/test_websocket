
/**
 * @fileOverview Websocketを使ったチャットサーバー
 */

// 1.モジュールの読み込み
const fs = require("fs");
const http = require("http");
const socket_io = require("socket.io");

// html 読み込み
const html_data = fs.readFileSync("./index.html", "utf-8");

// http Server 作成
let server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html_data);
});

// 8080番ポートで待ち受け
server.listen(8080);

// 同じ所で websocket 待ち受け
let io = socket_io.listen(server);

// ソケットが接続してきたときのイベント

io.sockets.on("connection", function (socket) {
    console.log("connected");

    // チャット受信e
    socket.on("chat_message", function (data) {
        // メッセージを全員に送信
        console.log("chat_message" + data);
        io.sockets.emit("chat_message", data);
    });

    // 切断。組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
    socket.on("disconnect", function () {
        console.log("disconnected");
    });
});
