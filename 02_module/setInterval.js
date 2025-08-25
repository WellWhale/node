const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let wordAry = "Lorem ipsum dolor sit, amet consectetur adipisicing elit." //
  .split(" "); // 문자열을 잘라서 배열로 만들어주는 메서드
//Nam eaque maxime
//blanditiis maiores possimus quisquam! Obcaecati cupiditate quo, possimus
//omnis necessitatibus est. Fuga reprehenderit labore excepturi. Eligendi odit
//temporibus ex.

// count: 100 -> 0 1씩 감소
let count = 100;
const timer = setInterval(() => {
  count--;
  //console.log(`현재 count: ${count}`);
}, 1000);

// 100이 완료되기 전에 배열에 있는 값을 clear하면 성공.
// 100이 완료된 후 배열에 값이 있으면 실패
function myFunction() {
  rl.question("단어를 입력하세요:", (answer) => {
    let search = answer;
    let idx = wordAry.indexOf(search);
    console.log(idx);
    if (idx != -1) {
      wordAry.splice(idx, 1); // 대체할 값이 없으면 삭제, 있으면 수정 / 삭제
    }

    wordAry.forEach((word) => {
      console.log(word);
    });

    if (wordAry.length > 0) {
      if (count < 0) {
        console.log("시간 초과, 실패");
        clearInterval(timer);
        rl.close();
      }
    } else {
      if (count >= 0) {
        console.log(`${100 - count}초 경과, 성공`);
        clearInterval(timer);
        rl.close();
      }
    }
    if (wordAry.length > 0 && count > 0) {
      myFunction(); // 재귀 호출
    }
  }); // 입력한 단어를 answer에 저장
  //  if (wordAry.length == 0) {
  //    break;
  //  }
}

myFunction();

// if (count < 0) {
//   rl.close(); // 사용자의 입력을 받는 stream은 사용 후 close()
// }
// process.exit(); node프로세스 강제로 종료
