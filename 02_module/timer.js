// 책 81p
// (콜백함수, 밀리초)
setTimeout(() => {
  console.log("1초후에 실행됩니다.");
}, 1000);

// 컨트롤 C 누르면 종료됨
const interval = setInterval(() => {
  console.log("매 1초 단위로 실행됩니다.");
}, 1000);

setTimeout(() => {
  clearInterval(interval); // interval 종료
}, 5000); // 5초 후 종료

// 실행 순서 : sum -> immediate -> 1초 경과한 후 setTimeout, interval
setImmediate(() => {
  console.log("코드 실행 후 실행"); // 이벤트 루트 stack에 작업을 완료 // queue에 작업을 실행하기 전 실행
}); // 모든 동기 코드 실행이 끝나고 → 바로 실행

let sum = 0;
for (let i = 0; i < 999999; i++) {
  sum += i;
}
console.log("sum=> " + sum);
