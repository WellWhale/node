// express 임포트(Node.js에서 웹서버를 쉽게 만들 수 있게 해주는 도구)
const express = require("express");
// 읽기힘든 파라미터를 보기쉽게 번역해주는 번역기 정도..(서버가 바로 쓸 수 있게)
const parser = require("body-parser");
// sql폴더 안에있는 파일을 임포트(파일 안에 있는 exports 사용 가능)
const sql = require("./sql");
// sql폴더 안에있는 sql.js를 임포트
const prodSql = require("./sql/sql");

// sql.js에 productList 쿼리문을 콘솔출력
// console.log(prodSql["productList"].query);

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

// sql.js를 이용한 상품쿼리
app.post("/api/:alias", async (req, resp) => {
  let search = prodSql[req.params.alias].query;
  let param = req.body.param;
  try {
    let result = await sql.execute(search, param);
    resp.json(result);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 고객에 목록 API
app.get("/customers", async (req, resp) => {
  try {
    let customerList = await sql.execute("select * from customers");
    console.log(customerList);
    resp.json(customerList);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 목록에 새로운 정보를 등록, post 방식은 postman 사용 권장
app.post("/customer", async (req, resp) => {
  console.log(req.body);
  try {
    let result = await sql.execute(
      "insert into customers set ?", //
      [req.body.param]
      // param: name, email, phone 넣어놨음
    );
    console.log(result);
    resp.json(result);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

app.delete("/customer/:id", async (req, resp) => {
  try {
    let del = await sql.execute(
      "delete from customers where id = ?", //
      [req.params.id]
    );
    console.log(del);
    resp.json(del);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// app.put("/customer/:id", async (req, resp) => {
//   try {
//     let upd = await sql.execute(
//       "update customers set ? where id = ?", //
//       [req.body.param, req.params.id]
//     );
//     console.log(upd);
//     resp.json(upd);
//   } catch (err) {
//     console.log(err);
//     resp.json({ retCode: "Error" });
//   }
// });
app.put("/customer/:id", async (req, resp) => {
  try {
    let upd = await sql.execute(
      "update customers set name=?, email=?, phone=? where id = ?", //
      [req.body.name, req.body.email, req.body.phone, req.params.id]
    );
    console.log(upd);
    resp.json(upd);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 서버 켜기(이 서버를 3000번 대문에서 열어라)
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
