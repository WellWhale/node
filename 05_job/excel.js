const xlsx = require("xlsx");
// sql폴더 안에있는거 임포트
const sql = require("./sql");

// db 조회 후 엑셀파일로 만드는거
async function db_to_excel() {
  // 워크북을 생성
  const workbook = xlsx.utils.book_new();
  // 모든 조회결과 >> resultSet
  let resultSet = await sql.execute("select * from customers");
  console.log(resultSet);

  // 결과가 배열인데 워크시트로 변환시켜 주는게 json_to_sheet
  // 시트를 workBook에 첨부를 하고 이 워크북의 정보를 활용해서 엑셀파일 만들거임
  // 이름은 customers.xlsx

  // json 데이터를 시트로 만들어줌, (시트정보, 헤더정보)
  const firstSheet = xlsx.utils.json_to_sheet(resultSet, {
    header: ["id", "name", "email", "phone", "address"],
  });

  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers"); // 시트 최종생성
  xlsx.writeFile(workbook, "./log/customers.xlsx"); // 엑셀파일 생성
}
db_to_excel();

function excel_to_db() {
  // 파일을 읽어온다, 소괄호 경로에서
  const workbook = xlsx.readFile("./log/write2.xlsx");
  // 확인용, 시트이름을 확인
  console.log(workbook.SheetNames[0]);

  // 시트 이름을 저장
  const firstSheetName = workbook.SheetNames[0];
  // 시트이름에 맞는 시트 자체를 저장
  const firstSheet = workbook.Sheets[firstSheetName];

  // 시트 내용을 json으로..
  let jsonSheet = xlsx.utils.sheet_to_json(firstSheet);
  console.log(jsonSheet);

  // json으로 변환한걸 이용해서 insert
  jsonSheet.forEach(async (customer) => {
    let result = await sql.execute("insert into customers set ?", customer);
    // 콘솔로 확인
    console.log(result);
  });
}

// console.log(firstSheet["A2"].v);
// firstSheet["B2"].v = "Hongkildong";
// firstSheet["A3"] = { v: "99", t: "n" };
// firstSheet["B3"] = { v: "김민규", t: "s" };
// firstSheet["C3"] = { v: "min@email.com", t: "s" };
// firstSheet["D3"] = { v: "010-0000-0000", t: "s" };
// firstSheet["E3"] = { v: "경북 구미시", t: "s" };

// firstSheet["!ref"] = "A1:E3"; // 워크시트 범위 갱신
// // 작업한걸 저장할거다, 해당 경로에 해당 이름으로
// xlsx.writeFile(workbook, "./log/write2.xlsx");
