const { firefox } = require("playwright");

(async () => {
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();

  console.log(
    "Before resize:",
    await page.evaluate(() => [innerWidth, innerHeight])
  );

  console.log("Starting setViewportSize...");

  const timeout = setTimeout(() => {
    console.error("setViewportSize did not return within 20 seconds");
    process.exit(124);
  }, 20_000);

  try {
    await page.setViewportSize({ width: 400, height: 800 });
    clearTimeout(timeout);

    console.log(
      "After resize:",
      await page.evaluate(() => [innerWidth, innerHeight])
    );
  } finally {
    await browser.close();
  }
})();
