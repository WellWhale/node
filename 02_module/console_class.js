// console_class.js
// 새로운 콘솔 인스턴스를 직접 만들 수 있게 해주는 클래스(즉, 기본 console.log가 아니라 logger.log처럼 커스텀 가능)
// console 객체 안에 Console 클래스가 있음 -> 구조 분해 할당으로 {Console} 모양임
const { Console } = require("console"); // 기본 내장 모듈 console에서 Console 클래스를 불러옴
const fs = require("fs"); // 파일 시스템 모듈
const { defaultNum } = require("./helloworld"); // 임포트 해옴

// 로그 정보는 (.log)에 기록됨
const output = fs.createWriteStream("./stdout.log"); // 표준 출력(stdout)을 대신해서 기록할 파일 스트림을 생성 , std 스탠다드 / 표준 출력
const errput = fs.createWriteStream("./stderr.log", { flags: "a" }); // 표준 에러  / { flags: "a" } 기존 내용 유지 + 새 로그 누적 (append)

const logger = new Console({ stdout: output, stderr: errput }); // 입출력 처리를 output에, 에러 처리를 errput에
logger.log("디폴트 값 : %d", defaultNum);
logger.error("에러가 발생했습니다.");

for (let i = 0; i < 10; i++) {
  logger.log(`i의 값은 ${i}`); // 파일에 작성  / logger.log()를 사용했기 때문에 출력이 콘솔이 아닌 stdout.log 파일에 기록됨
  console.log(`i의 값은 ${i}`); // 콘솔에 출력
}
