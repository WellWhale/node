// [] reduce()

// acc -> 이전 값
// elem -> 지금 값
let result = [10, 15, 20, 25, 30].reduce((acc, elem) => {
  console.log(acc, elem);
  return acc + elem; // 다음번 acc로 쓰여짐, elem만 있으면 max 값..
}, 0);
// 초기값
console.log(result);

// [10, 20, 30]이 출력되게..
let result2 = [10, 15, 20, 25, 30].reduce((acc, elem) => {
  if (elem % 2 == 0) {
    acc.push(elem); // acc가 배열이다
  }
  return acc;
}, []); // 초기값으로 배열 선언, push로 넣을 수 있다
console.log(result2); // [10, 20, 30] 나오게..
