// 책 79p - 80p

const arr = [
  { name: "John Doe", email: "john@mail.com" },
  { name: "Jeremy Go", email: "jeremy@mail.com" },
];

console.table(arr);

const obj = {
  students: {
    grade1: {
      classA: {
        student1: { name: "Alice", age: 7 },
        student2: { name: "Bob", age: 7 },
      },
      classB: {
        student1: { name: "Charlie", age: 8 },
        student2: { name: "Henry", age: 8 },
      },
    },
    grade2: {
      classA: {
        student1: { name: "David", age: 9 },
        student2: { name: "Ella", age: 9 },
      },
      classB: {
        student1: { name: "Frank", age: 10 },
        student2: { name: "Grace", age: 10 },
      },
    },
  },
  teachers: ["John Doe", "Jeremy Go"],
};

console.dir(obj, { depth: 1, colors: true });

console.dir(obj, { depth: 2, colors: true });

console.dir(obj, { depth: 3, colors: true });

console.dir(obj, { depth: 4, colors: true });

// timer
console.time("time for for-loop");

for (let i = 0; i < 999999; i++) {}
console.timeEnd("time for for-loop");
