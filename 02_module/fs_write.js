const fs = require("fs");

// writeFile = 비동기 파일 쓰기 함수 , 지정한 경로에 파일을 새로 만들거나, 기존 파일 내용을 덮어쓴다.
// writeFile(파일 경로, 파일에 쓸 데이터 (문자열 또는 Buffer), options, 콜백 함수)
// options => encoding: 기본 "utf8", mode: 파일 권한 (기본 0o666), flag: 기본 "w" (덮어쓰기), "a" (추가쓰기)
// (기본 0o666) => 0o => 8진수 6 => (rw- 의미) , 세자리 숫자 => 파일 소유자, 같은 그룹 사용자, 기타 사용자(others) 순서
fs.writeFile(
  "./file_write.txt",
  "\n안녕하세요3\n",
  { encoding: "utf8", flag: "a" },
  (err) => {
    if (err) {
      console.error("예외 발생");
      return;
    }
    console.log("파일 생성 완료!");
  }
);

// fs.readFile / fs.readFileSync 활용해서 stdout.log 정보를 읽어들이고...
// 읽은 값을 writeFile 이용해서 넣기?

fs.readFile("./stdout.log", "utf8", (err, buf) => {
  // callback함수
  if (err) {
    console.error("예외 발생");
    return;
  }
  fs.writeFile(
    "./file_log.txt",
    buf,
    { encoding: "utf8", flag: "a" },
    (err) => {
      if (err) {
        console.error("예외 발생");
        return;
      }
      console.log("파일 생성 완료!");
    }
  );
});
