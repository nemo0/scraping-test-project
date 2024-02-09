import Queue from "bull";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const q = new Queue("scheduleMessages", process.env.REDIS_URL as string);

q.process(async (job) => {
  console.log(job.data);
  return job.data;
});

cron.schedule("* * * * *", async () => {
  console.log("Adding a message to the queue");
  await q.add({ message: "Hello World" });
});
