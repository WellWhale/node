// mysql2 임포트(Node.js에서 MySQL 데이터베이스와 연결할 수 있게 해주는 도구)
const mysql = require("mysql2");

// connect pool 생성(데이터베이스 연결준비, 연결선 미리 묶음)
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});

function execute(sql = "select * from customers", param = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // pool << 연결선 하나 따오겠다, 연결선 고장이면 err
      if (err) {
        return reject(err);
      }
      // 아래에 insert나 delete 넣어도 될듯
      connection.query(sql, param, (queryErr, results) => {
        // 여기까지 왔으면 연결선으로 sql과 연결성공
        // sql >> customers라는 테이블에 있는 데이터 꺼내와라
        connection.release();
        // release << 썻던 연결선 반납
        if (queryErr) {
          return reject(queryErr);
        }
        resolve(results);
        // 위처럼 작성하면 json문자열로 볼 수 있다
      });
    });
  });
}

module.exports = {
  execute,
};
