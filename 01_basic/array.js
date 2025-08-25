// [].sort() 정렬

let fruits = ["apple", "cherry", "banana"];
fruits.sort(); // 정렬

fruits.forEach((fruits) => {
  console.log(fruits);
});

let numbers = [1, 10, 100, 2, 12, 44];
numbers.sort(function (a, b) {
  // 계속 a, b 자리 바꾸다가 자리바꿈이 안일어나면 그때 종료됨
  if (a > b) {
    // 내림차순 하고싶으면 a < b
    return 1; // 위치변경을 원할땐 양의값
  } else {
    return -1; // 아닐시 음의값
  }
});
numbers.forEach(function (numbers) {
  console.log(numbers);
});

// filter() 배열 메소드에서 사용 가능
[10, 23, 46, 17, 56]
  .filter(function (elem, idx, ary) {
    // console.log(elem);
    if (elem > 30) {
      return true;
    }
  })
  .forEach((elem) => {
    console.log(elem);
  }); // 기존배열에 조건을 달고, 조건에 만족하는 elem들로 새 배열 생성

[
  // 위 예제를 배열내용 바꿔서..
  { name: "Hong", point: 10 },
  { name: "Kim", point: 23 },
  { name: "Part", point: 46 },
  { name: "Choi", point: 17 },
  { name: "Hwang", point: 56 },
]
  .filter(function (elem) {
    if (elem.point > 30) {
      return true;
    }
  })
  .forEach(function (elem) {
    console.log(`이름: ${elem.name}`);
  });
