// 책 92p ~ 93p
// 기억하면 좋음
const urlInfo =
  "https://username:pass@test.example.com:8080/prod/computer/pageInfo?page=3&pcode=ABC#hash";
const myUrl = new URL(urlInfo);

console.log(myUrl.href); // 전체경로가 href
console.log(myUrl.origin); // https://test.example.com:8080 / protocol부터 port까지
console.log(myUrl.searchParams); // { 'page' => '3', 'pcode' => 'ABC' }
console.log(myUrl.searchParams.get("page")); // 3
console.log(myUrl.searchParams.get("pcode")); // ABC
console.log(myUrl.searchParams.keys()); // { 'page', 'pcode' }
console.log(myUrl.searchParams.values()); // { '3', 'ABC' }
