//http://192.168.0.83/HelloJSP/replyList.do?bno=145

fetch("http://192.168.0.83/HelloJSP/replyList.do?bno=145")
  .then((response) => response.json()) // 배열객체처럼 생긴 문자열을 가져와서 실제배열객체로 만든다
  .then((result) => {
    // 그것의 이름은 result다
    result
      .filter((elem) => {
        if (elem.reply.indexOf("연습") !== -1) {
          //없으면 -1
          return true;
        }
      })
      .forEach((elem) => {
        console.log(elem.replyNo);
      });
  })
  .catch();

// map (mapping)
// {first_name, last_name} => {name}
