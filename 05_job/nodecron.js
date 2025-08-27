const cron = require("node-cron");

cron.schedule("1,5,10 * * * * *", () => {
  let current = new Date();
  console.log(current.toISOString() + " => cron실행");
});
