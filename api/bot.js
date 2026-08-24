const { Telegraf } = require("telegraf");

// Lấy Token bot từ biến môi trường trên Vercel
const bot = new Telegraf(process.env.BOT_TOKEN);

// Xử lý lệnh /start
bot.start((ctx) => {
  const welcomeMessage =
    `🚀 *Welcome to TA COINS MINING – Your Ultimate Mining Empire!* 🚀\n\n` +
    `Step into the future of digital asset generation with TA COINS MINING, the most engaging and rewarding tap-to-earn Mini App right inside Telegram!\n\n` +
    `⛏️ *Start Mining Instantly:* Launch the app and begin accumulating TA Coins.\n` +
    `⚡ *Watch & Earn More:* Watch short video ads to instantly claim *+150 ⚡ Energy*.\n` +
    `📊 *Track Your Progress:* Monitor your live balance and manage your profile seamlessly.\n\n` +
    `👉 *Tap the button below to launch the Mini App and start mining!*`;

  return ctx.reply(welcomeMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Play TA COINS MINING",
            web_app: { url: "https://bot-gamma-snowy.vercel.app/" },
          },
        ],
      ],
    },
  });
});

// Xuất ra dạng Serverless Function cho Vercel
module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      await bot.handleUpdate(req.body);
    }
    res.status(200).json({ status: "ok" });
  } catch (e) {
    console.error("Error handling update:", e);
    res.status(500).json({ error: "Error handling update" });
  }
};
