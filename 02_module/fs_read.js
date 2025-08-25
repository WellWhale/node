// ★ 자주 사용할 예정

const fs = require("fs");

// readFile = 비동기 파일 읽기 함수
// 비동기(non Blocking)/ 동기(Blocking)
// readFile(읽을 파일 경로, 파일 내용을 문자열로 읽어오겠다는 뜻, 콜백 함수)
fs.readFile("./stdout.log", "utf8", (err, buf) => {
  // callback함수
  if (err) {
    console.error("예외 발생");
    return;
  }
  console.log(buf);
});

// readFileSync = 동기 파일 읽기 함수 => 콜백 함수 필요 없음
let errBuf = fs.readFileSync("./stderr.log", "utf8");
console.log(errBuf);

// 아래는 실행되는 순서를 알아보기 위해 만든 console.log()
console.log("다른 코드");
