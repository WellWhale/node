// 책 83p process.env ~ 90p
const process = require("process"); // import process from "process"; 는 ESM(ES Module) 방식
const os = require("os"); // import os from "os";
const path = require("path"); //CommonJS(require) 환경에서만 기본 제공.

console.log(process.env); // 시스템 정보(environment 환경)
console.log(process.env.JAVA_HOME); // 이런 방식으로 확인하고 싶은 정보 확인 가능
console.log(os.totalmem());

// ★ 밑에 두 개는 기억하기
console.log(__filename); // 현재 실행 중인 파일의 절대 경로를 출력  D:\git\node\02_module\process_exe.js
console.log(__dirname); // 현재 실행 중인 파일이 있는 디렉토리 절대 경로 /D:\git\node\02_module

console.log(path.basename(__filename)); // process_exe.js
console.log(path.basename(__dirname)); //02_module

//format(객체) → 세부 요소 객체를 경로 문자열로 조립
//parse(문자열) → 경로를 세부 요소 객체로 변환
let result = path.format({ dir: "C:Usersadmin", base: ".gitconfig" }); // C:Usersadmin\.gitconfig
result = path.parse("C:/Users/admin/.gitconfig"); // 전체 경로를 넣어주면 format형태로
console.log(result);
