require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const util = require("./utils");

const GUESTBOOK_API_ADDR = "http://localhost:3000"; //process.env.GUESTBOOK_API_ADDR;
const END_URI = `${GUESTBOOK_API_ADDR}/snacks`;
const PORT = process.env.PORT || 3001;

// 환경 변수 체크
if (!GUESTBOOK_API_ADDR) {
  console.error("GUESTBOOK_API_ADDR environment variable is not defined");
  throw new Error("GUESTBOOK_API_ADDR environment variable is not defined");
}
if (!process.env.PORT) {
  console.error("PORT environment variable is not defined");
  throw new Error("PORT environment variable is not defined");
}

// 설정
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 미들웨어 설정
app.use("/js", express.static(path.join(__dirname, "views/js")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 파일 업로드 설정
const upload = multer({ dest: "uploads/" });

// 서버 시작
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
