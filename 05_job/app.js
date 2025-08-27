const express = require("express");
const xlsx = require("xlsx");
const sql = require("./sql");

require("dotenv").config({
  path: "./.env",
});
const nodemail = require("./nodemail");

const app = express();
app.use(express.urlencoded());

// 라우팅정보
app.get("/", (req, resp) => {
  resp.send("/");
});
app.get("/mail", (req, resp) => {
  resp.send(`<form action="mail" method="post">
      <table>
        <tr>
          <th>보내는이:</th>
          <td><input type="email" name="sender" id="sender" value="oms9623@hanmail.net" /></td>
        </tr>
        <tr>
          <th>받는이:</th>
          <td><input type="email" name="receiver" id="receiver" /></td>
        </tr>
        <tr>
          <th>제목:</th>
          <td><input type="text" name="subject" id="subject" /></td>
        </tr>
        <tr>
          <th>내용:</th>
          <td><textarea name="content" id="content"></textarea></td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <input type="submit" value="전송" />
          </td>
        </tr>
      </table>
    </form>`);
});
app.post("/mail", (req, resp) => {
  console.log(req.body);
  let data = {
    from: req.body.sender,
    to: req.body.receiver,
    subject: req.body.subject,
    text: req.body.content,
  };
  nodemail.mailSend(data);
  resp.send("done");
});

// "/excel_down" => customers 테이블의 데이터를 log/customer2.xlsx 에 저장

app.get("/excel_down", async (req, resp) => {
  try {
    // 워크북을 생성
    const workbook = xlsx.utils.book_new();
    // 모든 조회결과 >> resultSet
    let resultSet = await sql.execute("select * from customers");

    // 결과가 배열인데 워크시트로 변환시켜 주는게 json_to_sheet
    // 시트를 workBook에 첨부를 하고 이 워크북의 정보를 활용해서 엑셀파일 만들거임
    // 이름은 customers.xlsx

    // json 데이터를 시트로 만들어줌, (시트정보, 헤더정보)
    const firstSheet = xlsx.utils.json_to_sheet(resultSet, {
      header: ["id", "name", "email", "phone", "address"],
    });

    xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers"); // 시트 최종생성
    xlsx.writeFile(workbook, "./log/customer2.xlsx"); // 엑셀파일 생성
    resp.send("엑셀 생성 성공");
  } catch (err) {
    console.log(err);
    resp.send("엑셀 생성 실패");
  }
});

// 엑셀을 이메일로 보내는거
app.get("/excel_email", async (req, resp) => {
  try {
    const workbook = xlsx.utils.book_new();
    const customers = await sql.execute("select * from customers");

    const firstSheet = xlsx.utils.json_to_sheet(customers, {
      header: ["id", "name", "email", "phone", "address"],
    });

    firstSheet["!cols"] = [
      { wpx: 50 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 140 },
      { wpx: 200 },
    ];

    xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers");

    const data = {
      from: "oms9623@hanmail.net",
      to: "noz1213@naver.com",
      subject: "제목 테스트 100",
      text: "테스트 내용 100",
      attachments: [
        {
          filename: "Customers.xlsx",
          content: Buffer.from(
            xlsx.write(workbook, { type: "buffer" }),
            "base64"
          ),
        },
      ],
    };

    await nodemail.mailSend(data);

    return resp.send("완료");
  } catch (err) {
    console.log(err);
    return resp.send("실패");
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
