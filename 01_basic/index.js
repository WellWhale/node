let name = "오민수";
let score = "80";

console.log(
  // 간단한 계산도 가능, if 같은걸 때려넣을 순 없다
  `이름은 ${name}, 점수는 ${score}, 합격여부: ${score > 60 ? "합격" : "불합격"}`
);

[1, 2, 3].forEach((element) => {
  console.log(element);
});

function sum(num1, num2) {
  let result;
  result = num1 + num2;
  return result;
}

const numberFormat = "2025.08.08";
//numberFormat = "2025.08.09"; 상수 >> 재할당 불가
for (let i = 1; i <= 5; i++) {
  // falsy : 0, null, "", undefined
  if (i % 2) {
    let name = "king";
    console.log(name);
  } else {
    console.log(name);
  }
}

if (score) {
  // 값이 있으면
  let name = "홍길동";
  console.log(name);
}

// ======================= 위 >> 복기 =================================
