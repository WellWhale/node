// express는 node_express 안에 있어야 함
// GET: 서버에서 데이터를 읽어오기(조회) 위한 메서드
// POST: 서버에 데이터를 보내 리소스를 생성/처리하는 메서드
// res.send(body)는 “응답 바디를 보내고 요청을 끝내는” Express의 만능 응답 메서드 / 자료형에 따라 알아서 처리

// express 서버 실행(3000 port) --- live 서버 (5500 port)

const express = require("express");

const app = express(); // express 인스턴스 생성 / app은 웹 서버 객체

// url - 실행함수 => 라우팅
app.get("/", (req, resp) => {
  resp.send("/ 경로 호출됨");
});

app.get("/start", (req, resp) => {
  resp.send("/start 경로 호출됨");
});

// json 함수
app.get("/json", (req, resp) => {
  resp.json({ id: "user01", pw: "1111" });
});

app.post("/main", (req, resp) => {
  resp.send("/main 경로를 post요청방식으로 호출함");
});

// 서버 스타트
// listen(포트번호, 콜백 함수)
app.listen(3000, () => {
  console.log("http://localhost:3000 서버실행");
});
