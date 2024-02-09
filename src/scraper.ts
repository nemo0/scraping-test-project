import puppeteer from "puppeteer";
import cron from "node-cron";

export async function scrapeTitles(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll("tr.athing"));
    return items.map((item: any) => {
      const title = item.querySelector(".titleline > a").innerText;
      const link = item.querySelector(".titleline > a").href;
      return { title, link };
    });
  });

  await browser.close();

  if (data) {
    return data;
  }
  return [];
}

cron.schedule("* * * * *", async () => {
  const titles = await scrapeTitles("https://news.ycombinator.com/");
  console.log(titles);
});
