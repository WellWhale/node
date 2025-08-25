const fs = require("fs");
const path = require("path");
let sql = require("./sql.js"); // 현재 실행 시점의 ./sql.js 모듈을 불러온 것

// 지정한 파일을 감시하다가 변경이 생기면 콜백 실행
fs.watchFile(__dirname + "/sql.js", () => {
  console.log("재시작 없이 반영");
  // Node.js는 한 번 require한 모듈을 캐싱해두는데, 그 캐시를 삭제
  delete require.cache[require.resolve("./sql.js")];
  // 다시 모듈을 불러와서 최신 코드로 교체
  sql = require("./sql.js");
});
