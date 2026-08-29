import fs from "node:fs";
import jsonServer from "json-server";

function loadEnvFile() {
  try {
    const lines = fs.readFileSync(".env", "utf8").split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  } catch {
   
  }
}

loadEnvFile();

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = 4001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/orders", async (request, response, next) => {
  const order = request.body;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || "8750446875";

  if (token) {
    const itemLines = (order.items || []).map((item) => `- ${item.courseTitle}: ${item.price.toLocaleString("uz-UZ")} so'm`);
    const message = [
      "Yangi StudyHub buyurtmasi",
      `Mijoz: ${order.name}`,
      `Telefon: ${order.phone}`,
      `To'lov: Naqd pul`,
      ...itemLines,
      `Jami: ${(order.total || 0).toLocaleString("uz-UZ")} so'm`,
    ].join("\n");

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
      if (!telegramResponse.ok) console.error("Telegram xabari yuborilmadi:", await telegramResponse.text());
    } catch (error) {
      console.error("Telegram ulanish xatosi:", error.message);
    }
  } else {
    console.warn("TELEGRAM_BOT_TOKEN topilmadi; buyurtma faqat db.json ga saqlanadi.");
  }

  next();
});

server.use(router);
server.listen(port, () => {
  console.log(`StudyHub API http://localhost:${port}`);
});
