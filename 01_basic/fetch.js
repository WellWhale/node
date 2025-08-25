// fetch("http://localhost:3000/posts", {
//   method: "post", // 전송방식, post는 추가, put은 수정(1건은 파라미터 필요)
//   body: JSON.stringify({
//     id: "4",
//     body: "second comments for postid: 2",
//     postId: 2,
//   }),
//   header: { "Content-Type": "application/json;charset=utf-8" },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch(console.log);

// fetch("http://localhost:3000/posts/1e25", {
// method: "delete", 다른 정보들은 필요없음

// fetch("http://localhost:3000/posts")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     data.forEach((post) => {
//       console.log("post번호: " + post.id + "에 대한 comments list");
//       // post에 대한 comments를 조회, fetch 또 필요함
//       fetch("http://localhost:3000/comments")
//         .then((response) => response.json())
//         .then((data) => {
//           data.forEach((comment) => {
//             if (comment.postId == post.id) {
//               console.log("    내용: " + comment.body);
//             }
//           });
//         })
//         .catch(console.log);
//     });
//   })
//   .catch(console.log);

// 바로 위 코드가
// 비동기방식이라 기능적 오류가 있는걸, 동기방식으로 처리하려고 함
// async function() {await 호출} <- 동기방식

async function getPost() {
  let response = await fetch("http://localhost:3000/posts");
  let data = await response.json();

  console.log(data);

  data.forEach(async (post) => {
    console.log("post번호: " + post.id + "에 대한 comments list");
    let response = await fetch("http://localhost:3000/comments");
    let data = await response.json();
    data.forEach((comment) => {
      if (comment.postId == post.id) {
        console.log("    내용: " + comment.body);
      }
    });
  });
}
getPost();

// fetch("http://localhost:3000/posts")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     data.forEach((post) => {
//       console.log("post번호: " + post.id + "에 대한 comments list");
//       // post에 대한 comments를 조회, fetch 또 필요함
//       fetch("http://localhost:3000/comments")
//         .then((response) => response.json())
//         .then((data) => {
//           data.forEach((comment) => {
//             if (comment.postId == post.id) {
//               console.log("    내용: " + comment.body);
//             }
//           });
//         })
//         .catch(console.log);
//     });
//   })
//   .catch(console.log);
