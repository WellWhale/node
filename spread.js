// ...args 펼침연산자

// result에 arr1, arr2 펼쳐서 넣기(분해)
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2];
console.log(result);

// 문자열 펼치기(분해)
let str1 = "abcde";
console.log(...str1);

// Object Destructuring

// 이건 다른방식의 펼침(아래쪽 let 참고)
let obj = {
  firstName: "Kildong",
  lastName: "Hong",
  age: 20,
};
// let fn = obj.firstName;// 이거랑 아래꺼중에 선택
// let ln = obj.lastName;
// let ag = obj.age;
let { firstName, lastName, age } = obj;

// 바로 위 방식
// Array Destructuring
let arr = [1, 2, 3];
// let a = arr[0]; 이거랑 아래꺼중에 선택
// let b = arr[1];
// let c = arr[2];
let [n1, n2, n3] = arr;

// 함수(매개변수), 매개변수에 디폴트값을 주는법
function sum(num1 = 0, num2 = 0) {
  // if (num2 == undefined) {
  //   if (num1 == undefined) {
  //     // num1도 없을 경우
  //     return 0;
  //   }
  //   // num2가 비어있을 경우
  //   return num1;
  // }
  let result = num1 + num2;
  return result;
}
console.log(sum(10, 20));
