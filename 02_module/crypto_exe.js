// 책 94p
// Crypto 모듈 암호화
const crypto = require("crypto"); // 반드시 임포트해야 사용 가능

// createHash = 해시 알고리즘(암호화) 방식 정하는 것,
// update = 해싱할 문자열(데이터)을 입력하는 단계,
//  digest = 최종 해시값을 어떤 형식으로 출력할지 지정
let pass = crypto.createHash("sha512").update("test1234").digest("base64");

//test1324 => K74MSLkafRuKZ1Ooucvh2xa4Q3nz+R/hFWIShN96SPHNcem+uQ6mFMe9kkJQqp5EaoZnJeaFpl310TmlzRgNyQ==
// test1234 => (salt) 매 번 다른 값이 나오게

console.log(pass);

// crypto.randomBytes를 비동기 콜백 기반에서 → Promise 기반으로 바꾸려는 흐름
// randomBytes(a, (b,c)) // a = 몇 바이트 만들지 /(b,c) 함수 err: 실패했을 때 에러 객체 , buf: 성공했을 때 랜덤 바이트(Buffer 객체)
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        // 랜덤 바이트 생성에 실패 -> catch로
        reject(err);
      }
      // 성공 -> then으로
      resolve(buf.toString("base64")); //
    });
  });

  // promise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => console.error(err));
  // 위 promise 사용하고 싶으면 let promise = new Promise ...
};

// createSalt(); 함수 호출

// salt 값을 활용해서 평문 -> 암호화문 변경
// pdkdf2 = Password-Based Key Derivation Function 2
// 비밀번호를 바로 저장하지 않고, salt(소금) + 반복 계산을 이용해서 **해시값(derived key)**을 만들어주는 알고리즘
// crypto.pbkdf2(원본 비밀번호, 랜덤 문자열, 반복 횟수, 생성할 바이트 길이, 해시 알고리즘, callback(결과));
// ☆ 추후 이해가 필요할 듯
const createCryptoPassword = async (trPw) => {
  let salt = await createSalt();
  console.log(salt);
  salt =
    "94Kfu38GyeLIF9c3U0MJrxAFazIxZGutOohKic2lhSv6YA0wuUXaIKSeNU4UlhOfMn+0GMOxi1/WHZqC3oMLAg=="; // test1234의 salt한 문자열 , 아마 DB 저장용 대체?
  pw =
    "dNJzKz16QRpWixeIfOemmdwYZZl0gDgyaMC0KiYqv9LSgFiLEJZUeA6EVjuCIn4+zlL0dNkTQCRLMguzvo5nkg=="; // test1234dml crypto.pbkdf2한 값
  crypto.pbkdf2(trPw, salt, 100000, 64, "sha512", (err, buf) => {
    if (err) {
      console.log("err=> ", err);
    }
    console.log(buf.toString("base64"));
    let crPw = buf.toString("base64");
    if (pw == crPw) {
      console.log("비밀번호가 일치합니다.");
    } else {
      console.log("비밀번호를 다시 확인하세요");
    }
  });
};

createCryptoPassword("test1234");
