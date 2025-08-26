const express = require("express");

const app = express(); // express 인스턴스

const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
app.use(bodyParser.urlencoded()); // id=01 & pw=1111 <- 키, 벨류
app.use(bodyParser.json()); // JSON 파서

// multer 셋업
// 이미지, 일반파일 구분해서 업로드 하려고함
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cd >> 콜백
    cb(null, "uploads/file/"); // 일반파일
  },
  filename: (req, file, cb) => {
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); //한글처리
    cb(null, new Date().valueOf() + originalname);
  },
});
const uploads = multer({
  storage: storage,
});

// 이미지파일
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cd >> 콜백
    cb(null, "uploads/image/"); // 이미지파일
  },
  filename: (req, file, cb) => {
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); //한글처리
    cb(null, new Date().valueOf() + originalname);
  },
});
const imgUpload = multer({
  storage: imgStorage,
  // 이미지 아닌 일반파일 필터링
  fileFilter: (req, file, cb) => {
    // 파일타입이 jpg 등은 image/jpg 등등으로 넘어옴
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드 할 수 있습니다"), false);
    }
  },
});

app.get("/", (req, resp) => {
  resp.send("/ 요청");
});

//요청방식 >> post
app.post("/login", (req, resp) => {
  resp.send("요청ID: " + req.body.id + " 요청PW:" + req.body.pw);
});

// multi-part 요청>> post, 파일 업로드용
app.post("/fileupload", uploads.single("filename"), (req, resp) => {
  resp.send("파일 업로드 성공");
});
app.post("/imgupload", imgUpload.single("image"), (req, resp) => {
  resp.send("이미지 업로드 성공");
});
// 에러처리
app.use((err, req, resp) => {
  if (err instanceof multer.MulterError) {
    resp.status(400).send("Multer 에러" + err);
  } else if (err) {
    resp.status(400).send(err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 으로 서버 실행");
});
