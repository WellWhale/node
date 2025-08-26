// express 임포트(Node.js에서 웹서버를 쉽게 만들 수 있게 해주는 도구)
const express = require("express");
// mysql2 임포트(Node.js에서 MySQL 데이터베이스와 연결할 수 있게 해주는 도구)
const mysql = require("mysql2");
// 읽기힘든 파라미터를 보기쉽게 번역해주는 번역기 정도..(서버가 바로 쓸 수 있게)
const parser = require("body-parser");

// connect pool 생성(데이터베이스 연결준비, 연결선 미리 묶음)
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});

// 위에서 임포트 한 express를 사용하겠다
const app = express();
// 우리서버는 이 번역기를 계속 쓰겠다.. 정도..
app.use(parser.urlencoded());
// json문자열을 json객체로 만들어주겠다
app.use(parser.json());

// 홈페이지 첫 화면(서버 살아있는지 확인용)
app.get("/", (req, resp) => {
  resp.send("/ 실행");
});

// 고객에 목록 API
app.get("/customers", (req, resp) => {
  pool.getConnection((err, connection) => {
    // pool. << 연결선 하나 따오겠다, 연결선 고장이면 err
    if (err) {
      console.log(err);
      return;
    }
    // 아래에 insert나 delete 넣어도 될듯
    connection.query("select * from customers", (err, results) => {
      // 여기까지 왔으면 연결선으로 sql과 연결성공
      // sql >> customers라는 테이블에 있는 데이터 꺼내와라
      if (err) {
        console.log(err);
        resp.send("쿼리 실행 중 에러");
        return;
      }
      console.log(results);
      // resp.send("실행완료");
      resp.json(results);
      // 위처럼 작성하면 json문자열로 볼 수 있다
      connection.release();
      // release << 썻던 연결선 반납
    });
  });
});

// 목록에 새로운 정보를 등록, post 방식은 postman 사용 권장
app.post("/customer", (req, resp) => {
  console.log(req.body);
  pool.getConnection((err, connection) => {
    // pool. << 연결선 하나 따오겠다, 연결선 고장이면 err
    if (err) {
      console.log(err);
      return;
    }
    // 아래에 insert나 delete 넣어도 될듯
    connection.query(
      // "insert into customers (name, email, phone) values(?,?,?)",
      "insert into customers set ?",
      [req.body.param], // param 안에 name, email, phone을 담아놨음
      (err, results) => {
        // 여기까지 왔으면 연결선으로 sql과 연결성공
        // sql >> insert 실행해라
        if (err) {
          console.log(err);
          resp.send("쿼리 실행 중 에러");
          return;
        }
        console.log(results);
        // resp.send("실행완료");
        resp.json(results);
        // 위처럼 작성하면 json문자열로 볼 수 있다
        connection.release();
        // release << 썻던 연결선 반납
      }
    );
  });
});

// http://localhost:8080/boardList.do?page=3
// http://localhost:3000/customer/:id
app.delete("/customer/:id", (req, resp) => {
  console.log(req.params);
  pool.getConnection((err, connection) => {
    // pool. << 연결선 하나 따오겠다, 연결선 고장이면 err
    if (err) {
      console.log(err);
      return;
    }
    connection.query(
      "delete from customers where id=?",
      [req.params.id],
      (err, results) => {
        // 여기까지 왔으면 연결선으로 sql과 연결성공
        // sql >> delete 실행해라
        if (err) {
          console.log(err);
          resp.send("쿼리 실행 중 에러");
          return;
        }
        console.log(results);
        // resp.send("실행완료");
        resp.json(results);
        // 위처럼 작성하면 json문자열로 볼 수 있다
        connection.release();
        // release << 썻던 연결선 반납
      }
    );
  });
});

// 서버 켜기(이 서버를 3000번 대문에서 열어라)
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
