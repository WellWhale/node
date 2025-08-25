// console에 "hello, world" 구문을 출력하는 함수 myFunc을 선언
function myFunc() {
  console.log("hello, world");
}

//myFunc(); import해서 실행하면 이것도 실행되어서 결과적으로 두 번 출력

const defaultNum = 12;

// = 0 은 초기값
const sum = (num1 = 0, num2 = 0) => {
  return num1 + num2;
};

// export { myFunc, defaultNum, sum };
module.exports = {
  myFunc,
  defaultNum,
  sum,
};
