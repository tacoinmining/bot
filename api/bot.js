const { Telegraf } = require("telegraf");
const { createClient } = require("@supabase/supabase-js");

// Cấu hình kết nối Supabase
const SUPABASE_URL = "https://miasmllplfprvtjxfsgs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pYXNtbGxwbGZwcnZ0anhmc2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NTkwODksImV4cCI6MjEwMzEzNTA4OX0.IUuZ7PckUs_eYibFyrZ0kbOvjUmvlpjGZRpyej5-mq8";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lấy Token bot từ biến môi trường trên Vercel
const bot = new Telegraf("8931580328:AAH1yBF1GUyVJgTxXng6z-Pm1OKSkRd1fvs");

// Xử lý lệnh /start (Hỗ trợ bắt link giới thiệu ref_)
bot.start(async (ctx) => {
  const payload = ctx.payload; // Lấy đoạn text đằng sau /start (ví dụ: ref_12345678)[cite: 10]
  const newUserId = String(ctx.from.id);
  const newUsername = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name || "User";

  // Kiểm tra nếu có mã giới thiệu ref_
  if (payload && payload.startsWith("ref_")) {
    const referrerId = payload.replace("ref_", "");

    // Đảm bảo không tự mời chính mình
    if (referrerId !== newUserId) {
      try {
        // 1. Kiểm tra xem người dùng mới này đã được ghi nhận giới thiệu trước đó chưa
        const { data: existingRef } = await supabaseClient
          .from("referrals")
          .select("*")
          .eq("invited_id", newUserId)
          .single();

        if (!existingRef) {
          // 2. Thêm dòng mới vào bảng referrals trên Supabase
          await supabaseClient.from("referrals").insert([
            {
              referrer_id: referrerId,
              invited_id: newUserId,
              invited_username: newUsername,
              reward: 200,
            },
          ]);

          // 3. Cộng +200 ⚡ vào số dư của người giới thiệu (referrerId)
          const { data: refUser } = await supabaseClient
            .from("users")
            .select("balance")
            .eq("telegram_id", referrerId)
            .single();

          if (refUser) {
            const updatedBalance = (parseFloat(refUser.balance) || 0) + 200;
            await supabaseClient
              .from("users")
              .update({ balance: updatedBalance })
              .eq("telegram_id", referrerId);
          }
        }
      } catch (err) {
        console.error("Lỗi xử lý giới thiệu (referral):", err);
      }
    }
  }

  const welcomeMessage =
    `🚀*Welcome to TA COINS MINING – Your Ultimate Mining Empire!*\n\n` +
    `Step into the future of digital asset generation with TA COINS MINING, the most engaging and rewarding tap-to-earn Mini App right inside Telegram!\n\n` +
    `⛏️ *Start Mining Instantly:* Launch the app and begin accumulating TA Coins.\n\n` +
    `⚡ *Watch & Earn More:* Watch short video ads to instantly claim *+150 ⚡ Energy*.\n\n` +
    `📊 *Track Your Progress:* Monitor your live balance and manage your profile seamlessly.\n\n` +
    `👉 *Tap the button below to launch the Mini App and start mining!*\n\n` +
    `❗❗❗PLEASE SET YOUR USERNAME; OTHERWISE, YOUR DATE WILL NOT BE SAVED TO THE SYSTEM`;

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
