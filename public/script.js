// --- CẤU HÌNH KẾT NỐI SUPABASE & TELEGRAM ---
const SUPABASE_URL = "https://miasmllplfprvtjxfsgs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pYXNtbGxwbGZwcnZ0anhmc2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NTkwODksImV4cCI6MjEwMzEzNTA4OX0.IUuZ7PckUs_eYibFyrZ0kbOvjUmvlpjGZRpyej5-mq8";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

const BOT_USERNAME = "tacoinmining_bot";

// --- CẤU HÌNH THÔNG BÁO ADMIN QUA TELEGRAM ---
const ADMIN_BOT_TOKEN = "8931580328:AAH1yBF1GUyVJgTxXng6z-Pm1OKSkRd1fvs";
const ADMIN_CHAT_ID = "5436443148";

// HỆ THỐNG ĐA NGÔN NGỮ (VI / EN)
const translations = {
  vi: {
    balance_label: "SỐ DƯ",
    btn_start: "Bắt đầu đào (6 Tiếng)",
    btn_mining: "Đang đào $TA...",
    btn_claim: "🎁 Thu Hoạch",
    level_label: "CẤP ĐỘ:",
    speed_label: "Tốc độ:",
    upgrade_btn: "NÂNG CẤP",
    nav_mining: "Mining",
    nav_tasks: "Tasks",
    nav_invite: "Invite",
    nav_wallet: "Wallet",

    wallet_title: "Ví Web3 & Rút Coin",
    wallet_label_address: "Địa chỉ ví TON",
    wallet_placeholder_address: "Nhập địa chỉ ví (ví dụ: EQD...)",
    wallet_label_amount: "Số lượng ⚡ muốn rút",
    wallet_placeholder_amount: "Nhập số coin (Tối thiểu 10,000 ⚡)",
    wallet_btn_submit: "🚀 GỬI YÊU CẦU RÚT COIN",
    wallet_history_title: "📜 Lịch Sử Rút Tiền",
    wallet_empty_history: "Chưa có lịch sử rút tiền nào.",

    daily_title: "Điểm Danh Hằng Ngày",
    ads_tasks_title: "Xem Quảng Cáo Nhận Thưởng",
    ad_task_name: "Xem video quảng cáo",
    btn_watch: "Xem ngay",
    social_tasks_title: "Nhiệm Vụ Telegram",
    task_channel_name: "Kênh Telegram chính thức",
    task_group_name: "Nhóm Chat Telegram",
    btn_checkin: "Điểm danh ngay",
    btn_do_task: "Thực hiện",
    btn_claim_task: "Nhận Coin",
    btn_done: "Đã hoàn thành",

    promo_title: "🎁 Mã Quà Tặng",
    promo_subtitle: "Nhập mã code để nhận phần thưởng hấp dẫn",
    promo_placeholder: "NHẬP MÃ CODE...",
    promo_btn: "Xác Nhận",

    invite_banner_title: "Mời Bạn Bè!",
    invite_banner_desc: "Nhận ngay +200 ⚡ cho mỗi người bạn tham gia!",
    ref_link_label: "LINK GIỚI THIỆU CỦA BẠN",
    btn_copy: "Copy",
    btn_copied: "Đã Copy!",
    btn_invite_friend: "Mời Bạn Bè Trên Telegram",
    frends_list_title: "Danh Sách Bạn Bè",
    unit_friends: "Bạn",
    empty_frends: "Chưa có ai tham gia. Hãy gửi link để mời bạn bè ngay!",

    modal_start_title: "Khởi Động Thành Công! 🚀",
    modal_start_desc:
      "Máy đào đã hoạt động. Hãy quay lại sau 6 tiếng để thu hoạch coin nhé!",
    modal_upgrade_title: "Nâng Cấp Thành Công! ⚡",
    modal_upgrade_desc: "Máy đào của bạn đã đạt Cấp độ ",
    modal_claim_title: "Thu Hoạch Thành Công! 🎁",
    modal_claim_desc: "Bạn đã nhận thành công ",
    modal_task_title: "Nhiệm Vụ Hoàn Thành! 🎉",
    modal_task_desc: "Bạn đã nhận được ",
    modal_copied_title: "Đã Sao Chép! 📋",
    modal_copied_desc: "Link giới thiệu đã được lưu vào bộ nhớ tạm.",
    modal_close_btn: "ĐÃ HIỂU",

    alert_err_address_title: "Địa Chỉ Không Hợp Lệ! ❌",
    alert_err_address_desc: "Vui lòng nhập địa chỉ ví TON hợp lệ.",
    alert_err_min_title: "Không Thể Rút! ⚠️",
    alert_err_min_desc: "Số lượng rút tối thiểu là 10,000 ⚡.",
    alert_err_balance_title: "Thiếu Số Dư! 💸",
    alert_err_balance_desc:
      "Số dư của bạn không đủ để thực hiện giao dịch này.",
    alert_pending_title: "Đã Gửi Yêu Cầu! ⏳",
    alert_pending_desc:
      "Yêu cầu rút tiền của bạn đã được gửi. Đang chờ Admin duyệt!",

    status_pending: "Đang chờ ⏳",
    status_success: "Thành công ✅",
    status_rejected: "Từ chối ❌",
  },
  en: {
    balance_label: "BALANCE",
    btn_start: "Start Mining (6 Hours)",
    btn_mining: "Mining $TA...",
    btn_claim: "🎁 Claim Reward",
    level_label: "LEVEL:",
    speed_label: "Speed:",
    upgrade_btn: "UPGRADE",
    nav_mining: "Mining",
    nav_tasks: "Tasks",
    nav_invite: "Invite",
    nav_wallet: "Wallet",

    wallet_title: "Web3 Wallet & Withdraw",
    wallet_label_address: "TON Wallet Address",
    wallet_placeholder_address: "Enter wallet address (e.g. EQD...)",
    wallet_label_amount: "Amount ⚡ to withdraw",
    wallet_placeholder_amount: "Enter amount (Min 10,000 ⚡)",
    wallet_btn_submit: "🚀 SUBMIT WITHDRAWAL REQUEST",
    wallet_history_title: "📜 Withdrawal History",
    wallet_empty_history: "No withdrawal history yet.",

    daily_title: "Daily Check-in",
    ads_tasks_title: "Watch Ads for Rewards",
    ad_task_name: "Watch video advertisement",
    btn_watch: "Watch",
    social_tasks_title: "Telegram Tasks",
    task_channel_name: "Official Telegram Channel",
    task_group_name: "Telegram Chat Group",
    btn_checkin: "Check-in",
    btn_do_task: "Start",
    btn_claim_task: "Claim",
    btn_done: "Completed",

    promo_title: "🎁 Promo Code",
    promo_subtitle: "Enter code to claim exciting rewards",
    promo_placeholder: "ENTER CODE...",
    promo_btn: "Claim",

    invite_banner_title: "Invite Friends!",
    invite_banner_desc: "Get +200 ⚡ per friend who joins!",
    ref_link_label: "YOUR REFERRAL LINK",
    btn_copy: "Copy",
    btn_copied: "Copied!",
    btn_invite_friend: "Invite Friends via Telegram",
    frends_list_title: "Friends List",
    unit_friends: "Friends",
    empty_frends: "No one has joined yet. Send the link to invite friends now!",

    modal_start_title: "Started Successfully! 🚀",
    modal_start_desc:
      "Miner is active. Come back in 6 hours to claim your reward!",
    modal_upgrade_title: "Upgraded Successfully! ⚡",
    modal_upgrade_desc: "Your miner has reached Level ",
    modal_claim_title: "Claimed Successfully! 🎁",
    modal_claim_desc: "You have successfully claimed ",
    modal_task_title: "Task Completed! 🎉",
    modal_task_desc: "You have received ",
    modal_copied_title: "Copied! 📋",
    modal_copied_desc: "Referral link copied to clipboard.",
    modal_close_btn: "GOT IT",

    alert_err_address_title: "Invalid Address! ❌",
    alert_err_address_desc: "Please enter a valid TON wallet address.",
    alert_err_min_title: "Cannot Withdraw! ⚠️",
    alert_err_min_desc: "Minimum withdrawal amount is 10,000 ⚡.",
    alert_err_balance_title: "Insufficient Balance! 💸",
    alert_err_balance_desc:
      "Your balance is insufficient for this transaction.",
    alert_pending_title: "Request Submitted! ⏳",
    alert_pending_desc:
      "Your withdrawal request has been submitted. Pending Admin approval!",

    status_pending: "Pending ⏳",
    status_success: "Success ✅",
    status_rejected: "Rejected ❌",
  },
};

// THÔNG SỐ CẤU HÌNH
const MINING_DURATION = 6 * 60 * 60 * 1000;
const UPGRADE_COST = 3000.0;
const BASE_HOURLY_RATE = 40.0;
const RATE_INCREASE_PER_LEVEL = 1.0;
const TON_RATE = 0.000001;
const DAILY_COOLDOWN = 24 * 60 * 60 * 1000;

// BIẾN TRẠNG THÁI GAME
let balance = 0.0;
let minerLevel = 1;
let endTime = null;
let currentLang = "vi";
let userId = "12345678";
let currentUsername = "TestUser";
let userIpAddress = "";
let savedTonAddress = "";

let timerInterval = null;

let taskState = {
  daily: false,
  channel: "init",
  group: "init",
};
let lastCheckinTime = 0;
let withdrawHistory = [];
let usedPromoCodes = [];

// CẬP NHẬT TRẠNG THÁI THANH LOADING
function updateLoadingProgress(text, percent) {
  const statusTextEl = document.getElementById("loading-status-text");
  const progressFillEl = document.getElementById("loading-progress-fill");
  if (statusTextEl) statusTextEl.innerText = text;
  if (progressFillEl) progressFillEl.style.width = `${percent}%`;
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
}

// KHỞI CHẠY ỨNG DỤNG VÀ TẢI TỪ SUPABASE
document.addEventListener("DOMContentLoaded", async () => {
  updateLoadingProgress("Đang khởi tạo Telegram...", 20);
  initUserTelegram();

  updateLoadingProgress("Đang kiểm tra mạng & IP...", 40);
  await fetchUserIP();

  updateLoadingProgress("Đang tải dữ liệu tài khoản...", 70);
  const isBanned = await loadStateFromSupabase();
  if (isBanned) {
    hideLoadingScreen();
    showBannedScreen();
    return;
  }

  await loadWithdrawHistory();

  updateLoadingProgress("Hoàn tất!", 100);
  applyLanguage();
  updateUI();
  updateTaskUI();
  setupRefLink();
  updateWalletUIState();
  initSupabaseRealtime();

  setTimeout(() => {
    hideLoadingScreen();
  }, 400);
});

// --- HIỂN THỊ MÀN HÌNH KHÓA TÀI KHOẢN ---
function showBannedScreen() {
  const bodyEl = document.body;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #0f172a; color: #fff; text-align: center; padding: 20px; font-family: sans-serif;">
        <div style="font-size: 60px; margin-bottom: 20px;">🚫</div>
        <h2 style="color: #ef4444; margin-bottom: 10px; font-size: 24px;">Tài khoản đã bị khóa</h2>
        <p style="color: #94a3b8; font-size: 14px; max-width: 320px; line-height: 1.5;">Tài khoản Telegram của bạn đã bị vô hiệu hóa do phát hiện hành vi gian lận hoặc vi phạm quy tắc hệ thống.</p>
      </div>
    `;
  }
}

// --- LẮNG NGHE REALTIME TỪ SUPABASE ---
function initSupabaseRealtime() {
  supabaseClient
    .channel("public:withdrawals")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "withdrawals",
        filter: `telegram_id=eq.${userId}`,
      },
      () => {
        loadWithdrawHistory();
      },
    )
    .subscribe();
}

// --- LẤY ĐỊA CHỈ IP ---
async function fetchUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    userIpAddress = data.ip || "";
  } catch (err) {
    console.warn("Không thể lấy địa chỉ IP:", err);
  }
}

// --- TẢI LỊCH SỬ RÚT TIỀN ---
async function loadWithdrawHistory() {
  try {
    let { data, error } = await supabaseClient
      .from("withdrawals")
      .select("*")
      .eq("telegram_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LỖI TẢI LỊCH SỬ RÚT TIỀN:", error);
      return;
    }

    if (data) {
      withdrawHistory = data.map((tx) => ({
        id: tx.id,
        amount: tx.amount,
        tonAmount: tx.ton_amount,
        address: tx.address,
        status: tx.status,
        createdAt: new Date(tx.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      renderWithdrawHistory();
    }
  } catch (err) {
    console.error("Lỗi ngoại lệ tải lịch sử:", err);
  }
}

// --- ĐỒNG BỘ DỮ LIỆU VỚI SUPABASE ---
async function loadStateFromSupabase() {
  try {
    let { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("telegram_id", userId)
      .single();

    if (error || !data) {
      const newUser = {
        telegram_id: userId,
        username: currentUsername,
        balance: 0.0,
        miner_level: 1,
        end_time: 0,
        last_checkin: 0,
        task_channel: "init",
        task_group: "init",
        ip_address: userIpAddress,
        is_banned: false,
        used_promo_codes: [],
        ton_address: "",
      };

      await supabaseClient.from("users").insert([newUser]);

      balance = 0.0;
      minerLevel = 1;
      endTime = null;
      lastCheckinTime = 0;
      taskState.channel = "init";
      taskState.group = "init";
      savedTonAddress = "";
      usedPromoCodes = [];
      return false;
    } else {
      if (data.is_banned === true) return true;

      balance = parseFloat(data.balance) || 0;
      minerLevel = parseInt(data.miner_level) || 1;
      endTime = data.end_time ? parseInt(data.end_time) : null;
      lastCheckinTime = data.last_checkin ? parseInt(data.last_checkin) : 0;
      taskState.channel = data.task_channel || "init";
      taskState.group = data.task_group || "init";
      savedTonAddress = data.ton_address || "";
      usedPromoCodes = data.used_promo_codes || [];

      if (userIpAddress && data.ip_address !== userIpAddress) {
        await supabaseClient
          .from("users")
          .update({ ip_address: userIpAddress })
          .eq("telegram_id", userId);
      }
      return false;
    }
  } catch (err) {
    console.error("Lỗi kết nối Supabase:", err);
    return false;
  }
}

async function saveState() {
  try {
    await supabaseClient
      .from("users")
      .update({
        balance: balance,
        miner_level: minerLevel,
        end_time: endTime ? endTime : 0,
        username: currentUsername,
        last_checkin: lastCheckinTime,
        task_channel: taskState.channel,
        task_group: taskState.group,
        ip_address: userIpAddress,
        ton_address: savedTonAddress ? String(savedTonAddress) : "",
        used_promo_codes: usedPromoCodes,
      })
      .eq("telegram_id", userId);
  } catch (err) {
    console.error("Lỗi ngoại lệ khi lưu trạng thái:", err);
  }
}

function initUserTelegram() {
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    userId = String(user.id);
    currentUsername = user.username
      ? `@${user.username}`
      : user.first_name || "User";

    const fullName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(" ");

    const userFullnameEl = document.getElementById("user-fullname");
    if (userFullnameEl) userFullnameEl.innerText = fullName || "Telegram User";

    const usernameElem = document.getElementById("username");
    if (usernameElem) {
      usernameElem.innerText = user.username
        ? `@${user.username}`
        : "#no_username";
    }
  } else {
    userId = "12345678";
  }
}

/* TÍNH NĂNG PROMO CODE */
async function claimPromoCode() {
  const inputEl = document.getElementById("promo-code-input");
  if (!inputEl) return;
  const code = inputEl.value.trim().toUpperCase();

  if (!code) {
    showModal("⚠️", "Mã Trống", "Vui lòng nhập mã promo code hợp lệ!");
    return;
  }

  if (usedPromoCodes.includes(code)) {
    showModal(
      "❌",
      "Đã Sử Dụng",
      "Bạn đã nhập mã này rồi, không thể sử dụng lại!",
    );
    return;
  }

  try {
    let { data, error } = await supabaseClient
      .from("promo_codes")
      .select("*")
      .eq("code", code)
      .single();

    if (error || !data) {
      showModal(
        "❌",
        "Không Tồn Tại",
        "Mã promo code không tồn tại hoặc đã hết hạn!",
      );
      if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
      return;
    }

    const rewardAmount = parseFloat(data.reward) || 1000;
    const maxUses = parseInt(data.max_uses) || 10;
    const currentUsedCount = parseInt(data.used_count) || 0;

    if (currentUsedCount >= maxUses) {
      showModal(
        "⚠️",
        "Hết Lượt Nhập",
        "Mã quà tặng này đã đạt giới hạn tối đa số lượt sử dụng!",
      );
      if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("warning");
      return;
    }

    let updateRes = await supabaseClient
      .from("promo_codes")
      .update({ used_count: currentUsedCount + 1 })
      .eq("code", code);

    if (updateRes.error) {
      showModal(
        "❌",
        "Lỗi Hệ Thống",
        "Không thể xác thực mã lúc này. Vui lòng thử lại sau.",
      );
      return;
    }

    balance += rewardAmount;
    usedPromoCodes.push(code);

    await saveState();
    updateUI();

    inputEl.value = "";
    showModal(
      "🎉",
      "Thành Công!",
      `Bạn đã nhận được +${rewardAmount} ⚡ từ mã code ${code}!`,
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  } catch (err) {
    console.error("Lỗi xác thực promo code:", err);
  }
}

/* LOGIC MỜI BẠN BÈ */
function setupRefLink() {
  const refLink = `https://t.me/${BOT_USERNAME}?start=ref_${userId}`;
  const input = document.getElementById("ref-link-input");
  if (input) input.value = refLink;
}

function copyRefLink() {
  const input = document.getElementById("ref-link-input");
  if (!input) return;
  input.select();
  document.execCommand("copy");

  const copyBtnText = document.getElementById("copy-btn-text");
  if (copyBtnText) copyBtnText.innerText = translations[currentLang].btn_copied;

  showModal(
    "📋",
    translations[currentLang].modal_copied_title,
    translations[currentLang].modal_copied_desc,
  );
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");

  setTimeout(() => {
    if (copyBtnText) copyBtnText.innerText = translations[currentLang].btn_copy;
  }, 2000);
}

function shareRefLink() {
  const refLink = `https://t.me/${BOT_USERNAME}?start=ref_${userId}`;
  const shareText =
    "🚀 Tham gia ngay để nhận 200 ⚡ và đào $TA Token miễn phí!";
  const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareText)}`;

  if (tg?.openTelegramLink) tg.openTelegramLink(fullUrl);
  else window.open(fullUrl, "_blank");

  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
}

/* TÍNH TOÁN TỐC ĐỘ MÁY ĐÀO */
function getHourlyRate() {
  return BASE_HOURLY_RATE + (minerLevel - 1) * RATE_INCREASE_PER_LEVEL;
}

function getCycleReward() {
  return getHourlyRate() * 6.0;
}

function showModal(icon, title, desc) {
  const iconEl = document.getElementById("modal-icon");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");
  const modalEl = document.getElementById("custom-modal");

  if (iconEl) iconEl.innerText = icon;
  if (titleEl) titleEl.innerText = title;
  if (descEl) descEl.innerText = desc;
  if (modalEl) modalEl.classList.add("active");
}

function closeModal() {
  const modalEl = document.getElementById("custom-modal");
  if (modalEl) modalEl.classList.remove("active");
}

/* NHIỆM VỤ ĐIỂM DANH HẮNG NGÀY */
function claimDailyReward() {
  const now = Date.now();
  if (lastCheckinTime > 0 && now - lastCheckinTime < DAILY_COOLDOWN) return;

  lastCheckinTime = now;
  balance += 100.0;

  saveState();
  updateUI();
  updateTaskUI();

  showModal(
    "📅",
    translations[currentLang].modal_task_title,
    `${translations[currentLang].modal_task_desc} +100 ⚡!`,
  );
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function updateDailyCheckInUI() {
  const dailyBtn = document.getElementById("daily-btn");
  if (!dailyBtn) return;

  const now = Date.now();
  const elapsed = now - lastCheckinTime;

  if (lastCheckinTime > 0 && elapsed < DAILY_COOLDOWN) {
    const remaining = DAILY_COOLDOWN - elapsed;
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    dailyBtn.className = "task-btn done-btn disabled";
    dailyBtn.innerText = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    dailyBtn.onclick = null;
  } else {
    dailyBtn.className = "task-btn claim-btn";
    dailyBtn.innerText = translations[currentLang].btn_checkin;
    dailyBtn.onclick = claimDailyReward;
  }
}

// XEM QUẢNG CÁO TÍCH HỢP MONETAG TRONG TAB TASKS
function watchAdForReward() {
  if (typeof show_11651812 === "function") {
    show_11651812()
      .then(() => {
        const reward = 150.0;
        balance += reward;
        saveState();
        updateUI();
        showModal(
          "🎁",
          translations[currentLang].modal_task_title,
          `${translations[currentLang].modal_task_desc} +${reward} ⚡!`,
        );
        if (tg?.HapticFeedback)
          tg.HapticFeedback.notificationOccurred("success");
      })
      .catch((err) => {
        console.log("Quảng cáo bị lỗi hoặc bị tắt:", err);
        showModal(
          "⚠️",
          "Thông Báo",
          "Không thể hiển thị quảng cáo lúc này. Vui lòng thử lại sau!",
        );
      });
  } else {
    // Trường hợp chạy môi trường test không có SDK
    const reward = 150.0;
    balance += reward;
    saveState();
    updateUI();
    showModal(
      "🎁",
      translations[currentLang].modal_task_title,
      `${translations[currentLang].modal_task_desc} +${reward} ⚡!`,
    );
  }
}

function processTask(taskId, url) {
  const btn = document.getElementById(`btn-task-${taskId}`);
  if (!btn) return;

  if (taskState[taskId] === "init") {
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, "_blank");

    taskState[taskId] = "waiting";
    btn.innerText = "3s...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.className = "task-btn claim-btn";
      btn.innerText = translations[currentLang].btn_claim_task;
      btn.style.opacity = "1";
    }, 3000);
  } else if (taskState[taskId] === "waiting") {
    const reward = 500.0;
    balance += reward;
    taskState[taskId] = "claimed";

    saveState();
    updateUI();
    updateTaskUI();

    showModal(
      "🎉",
      translations[currentLang].modal_task_title,
      `${translations[currentLang].modal_task_desc} +${reward} ⚡!`,
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  }
}

function updateTaskUI() {
  updateDailyCheckInUI();

  ["channel", "group"].forEach((taskId) => {
    const btn = document.getElementById(`btn-task-${taskId}`);
    if (!btn) return;
    const taskItemElement = btn.closest(".task-item");

    if (taskState[taskId] === "claimed") {
      if (taskItemElement) taskItemElement.style.display = "none";
    } else if (taskState[taskId] === "waiting") {
      btn.className = "task-btn claim-btn";
      btn.innerText = translations[currentLang].btn_claim_task;
    }
  });
}

/* ĐIỀU KHIỂN MINING */
function upgradeMiner() {
  if (balance >= UPGRADE_COST) {
    balance -= UPGRADE_COST;
    minerLevel += 1;
    saveState();
    updateUI();
    showModal(
      "⚡",
      translations[currentLang].modal_upgrade_title,
      `${translations[currentLang].modal_upgrade_desc} ${minerLevel}!`,
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  } else {
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
  }
}

// Xử lý action bắt đầu/thu hoạch kết hợp quảng cáo Monetag
function handleAction() {
  const now = Date.now();

  if (!endTime) {
    if (typeof show_11651812 === "function") {
      show_11651812()
        .then(() => {
          startMining();
        })
        .catch((err) => {
          console.log("Quảng cáo bị lỗi hoặc bị tắt:", err);
          startMining();
        });
    } else {
      startMining();
    }
  } else if (now >= endTime) {
    if (typeof show_11651812 === "function") {
      show_11651812()
        .then(() => {
          claimReward();
        })
        .catch((err) => {
          console.log("Quảng cáo bị lỗi hoặc bị tắt:", err);
          claimReward();
        });
    } else {
      claimReward();
    }
  }
}

function startMining() {
  endTime = Date.now() + MINING_DURATION;
  saveState();
  updateUI();
  showModal(
    "🚀",
    translations[currentLang].modal_start_title,
    translations[currentLang].modal_start_desc,
  );
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function claimReward() {
  const reward = getCycleReward();
  balance += reward;
  endTime = null;
  saveState();
  updateUI();
  showModal(
    "🎁",
    translations[currentLang].modal_claim_title,
    `${translations[currentLang].modal_claim_desc} +${reward.toFixed(0)} ⚡!`,
  );
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function updateUI() {
  const now = Date.now();
  const startBtn = document.getElementById("start-btn");
  const btnText = document.getElementById("btn-text");
  const timerDisplay = document.getElementById("timer-display");
  const neonRing = document.getElementById("neon-ring");
  const upgradeBtn = document.getElementById("upgrade-btn");

  if (!startBtn) return;

  const balanceEl = document.getElementById("balance");
  const minerLevelEl = document.getElementById("miner-level");
  const hourlyRateEl = document.getElementById("hourly-rate");
  const rateDisplayEl = document.getElementById("rate-display");

  if (balanceEl) balanceEl.innerText = balance.toFixed(2);
  if (minerLevelEl) minerLevelEl.innerText = `LV ${minerLevel}`;
  if (hourlyRateEl)
    hourlyRateEl.innerText = `${getHourlyRate().toFixed(1)} ⚡/h`;
  if (rateDisplayEl)
    rateDisplayEl.innerText = `+${getCycleReward().toFixed(0)} ⚡ / 6h`;

  if (upgradeBtn) {
    if (balance < UPGRADE_COST) upgradeBtn.classList.add("disabled");
    else upgradeBtn.classList.remove("disabled");
  }

  if (timerInterval) clearInterval(timerInterval);

  if (!endTime) {
    startBtn.className = "neon-btn";
    if (btnText) btnText.innerText = translations[currentLang].btn_start;
    if (timerDisplay) timerDisplay.style.display = "none";
    if (neonRing) neonRing.classList.remove("active");
  } else if (now < endTime) {
    startBtn.className = "neon-btn mining";
    if (btnText) btnText.innerText = translations[currentLang].btn_mining;
    if (timerDisplay) timerDisplay.style.display = "block";
    if (neonRing) neonRing.classList.add("active");
    renderTimer();
    timerInterval = setInterval(renderTimer, 1000);
  } else {
    startBtn.className = "neon-btn claim";
    if (btnText)
      btnText.innerText = `${translations[currentLang].btn_claim} +${getCycleReward().toFixed(0)} ⚡`;
    if (timerDisplay) timerDisplay.style.display = "none";
    if (neonRing) neonRing.classList.remove("active");
  }
}

function renderTimer() {
  const remaining = endTime - Date.now();
  if (remaining <= 0) {
    clearInterval(timerInterval);
    updateUI();
    return;
  }
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const timerEl = document.getElementById("timer-display");
  if (timerEl) {
    timerEl.innerText = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
}

/* ĐỔI NGÔN NGỮ & ĐIỀU HƯỚNG TAB */
function toggleLanguage() {
  currentLang = currentLang === "vi" ? "en" : "vi";
  applyLanguage();
  updateUI();
  updateTaskUI();
  renderWithdrawHistory();
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
}

function applyLanguage() {
  const langBtn = document.getElementById("lang-btn");
  if (langBtn) langBtn.innerText = currentLang === "vi" ? "EN" : "VI";

  document.querySelectorAll("[data-i18n]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      elem.innerText = translations[currentLang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n-placeholder");
    if (translations[currentLang][key]) {
      elem.placeholder = translations[currentLang][key];
    }
  });
}

function switchTab(tabName, clickedBtn) {
  document
    .querySelectorAll(".tab-view")
    .forEach((view) => view.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((btn) => btn.classList.remove("active"));

  const targetView = document.getElementById(`tab-${tabName}`);
  if (targetView) {
    targetView.classList.add("active");
    if (clickedBtn) clickedBtn.classList.add("active");
  }

  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
}

/* QUẢN LÝ VÍ TON & RÚT TIỀN */
function saveWalletAddress() {
  const addressInput = document.getElementById("withdraw-address");
  if (!addressInput) return;
  const address = addressInput.value.trim();

  if (!address || address.length < 10) {
    showModal(
      "❌",
      translations[currentLang].alert_err_address_title,
      translations[currentLang].alert_err_address_desc,
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
    return;
  }

  savedTonAddress = address;
  updateWalletUIState();
  saveState();

  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function editWalletAddress() {
  savedTonAddress = "";
  updateWalletUIState();
  saveState();
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
}

function updateWalletUIState() {
  const inputContainer = document.getElementById("wallet-input-container");
  const savedBox = document.getElementById("wallet-saved-box");
  const savedDisplay = document.getElementById("saved-address-display");
  const addressInput = document.getElementById("withdraw-address");

  if (!inputContainer || !savedBox || !savedDisplay) return;

  if (savedTonAddress) {
    inputContainer.style.display = "none";
    savedBox.style.display = "flex";
    savedDisplay.innerText = savedTonAddress;
  } else {
    inputContainer.style.display = "flex";
    savedBox.style.display = "none";
    if (addressInput) addressInput.value = "";
  }
}

function updateTonEstimate() {
  const amountInput = document.getElementById("withdraw-amount");
  const calcText = document.getElementById("calc-ton-text");
  if (!amountInput || !calcText) return;
  const amount = parseFloat(amountInput.value) || 0;
  const estimatedTon = amount * TON_RATE;
  calcText.innerText = `≈ ${estimatedTon.toFixed(4)} TON`;
}

function maskWalletAddress(wallet) {
  if (!wallet || wallet.length <= 8) return "***";
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
}

async function sendTelegramAdminNotification(
  withdrawalId,
  username,
  amount,
  tonAmount,
  address,
) {
  if (!ADMIN_BOT_TOKEN || !ADMIN_CHAT_ID) return;

  const url = `https://api.telegram.org/bot${ADMIN_BOT_TOKEN}/sendMessage`;
  const maskedWallet = maskWalletAddress(address);

  const message1 = `🚨 <b>CÓ YÊU CẦU RÚT TIỀN MỚI!</b>\n\n👤 <b>User:</b> ${username}\n⚡ <b>Số coin rút:</b> ${amount.toLocaleString()} ⚡\n💎 <b>Quy đổi:</b> ${tonAmount} TON\n👛 <b>Ví TON:</b>\n<code>${address}</code>\n\n👉 Vào ngay Supabase để duyệt đơn nhé!`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Duyệt", callback_data: `approve_${withdrawalId}` },
        { text: "❌ Từ chối", callback_data: `reject_${withdrawalId}` },
      ],
    ],
  };

  const message2 = `✅ <b>TRANSFER SUCCESSFUL!</b>\n\n👤 <b>User:</b> ${username}\n💎 <b>Amount:</b> ${tonAmount} TON\n👛 <b>TON Wallet:</b> <code>${maskedWallet}</code>`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message1,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
      }),
    });

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message2,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Lỗi gửi thông báo Telegram cho Admin:", err);
  }
}

async function submitWithdrawRequest() {
  const amountInput = document.getElementById("withdraw-amount");
  if (!amountInput) return;

  const address = savedTonAddress;
  const amount = parseFloat(amountInput.value);

  if (!address || address.length < 10) {
    showModal(
      "❌",
      translations[currentLang].alert_err_address_title,
      "Vui lòng nhập và lưu địa chỉ ví TON trước khi rút!",
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
    return;
  }

  if (isNaN(amount) || amount < 10000) {
    showModal(
      "⚠️",
      translations[currentLang].alert_err_min_title,
      translations[currentLang].alert_err_min_desc,
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("warning");
    return;
  }

  if (amount > balance) {
    showModal(
      "💸",
      translations[currentLang].alert_err_balance_title,
      translations[currentLang].alert_err_balance_desc,
    );
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
    return;
  }

  const tonAmountCalc = parseFloat((amount * TON_RATE).toFixed(4));

  const newTx = {
    telegram_id: userId,
    amount: amount,
    ton_amount: tonAmountCalc,
    address: address,
    status: "pending",
  };

  const { data, error } = await supabaseClient
    .from("withdrawals")
    .insert([newTx])
    .select();

  if (error || !data || data.length === 0) {
    showModal(
      "❌",
      "Lỗi Server",
      "Không thể gửi yêu cầu rút tiền. Vui lòng thử lại sau.",
    );
    return;
  }

  await sendTelegramAdminNotification(
    data[0].id,
    currentUsername,
    amount,
    tonAmountCalc,
    address,
  );

  balance -= amount;
  await saveState();

  amountInput.value = "";
  updateTonEstimate();
  updateUI();
  await loadWithdrawHistory();

  showModal(
    "⏳",
    translations[currentLang].alert_pending_title,
    translations[currentLang].alert_pending_desc,
  );
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function renderWithdrawHistory() {
  const historyList = document.getElementById("history-list");
  if (!historyList) return;

  if (withdrawHistory.length === 0) {
    historyList.innerHTML = `<div class="empty-frends">${translations[currentLang].wallet_empty_history}</div>`;
    return;
  }

  historyList.innerHTML = withdrawHistory
    .map((tx) => {
      let statusText = translations[currentLang].status_pending;
      let statusClass = "pending";

      if (tx.status === "success") {
        statusText = translations[currentLang].status_success;
        statusClass = "success";
      } else if (tx.status === "rejected") {
        statusText = translations[currentLang].status_rejected;
        statusClass = "rejected";
      }

      return `
      <div class="history-item">
        <div class="history-info-left">
          <span class="history-amount">-${tx.amount} ⚡</span>
          <span class="history-ton">≈ ${tx.tonAmount} TON</span>
          <span class="history-address" title="${tx.address}">${tx.address}</span>
        </div>
        <div class="status-badge ${statusClass}">${statusText}</div>
      </div>
    `;
    })
    .join("");
}

// KHỞI CHẠY ỨNG DỤNG VÀ TẢI TỪ SUPABASE
document.addEventListener("DOMContentLoaded", async () => {
  updateLoadingProgress("Đang khởi tạo Telegram...", 20);
  initUserTelegram();

  updateLoadingProgress("Đang kiểm tra mạng & IP...", 40);
  await fetchUserIP();

  updateLoadingProgress("Đang tải dữ liệu tài khoản...", 70);
  const isBanned = await loadStateFromSupabase();
  if (isBanned) {
    hideLoadingScreen();
    showBannedScreen();
    return;
  }

  await loadWithdrawHistory();

  updateLoadingProgress("Hoàn tất!", 100);
  applyLanguage();
  updateUI();
  updateTaskUI();
  setupRefLink();
  updateWalletUIState();
  initSupabaseRealtime();

  setTimeout(() => {
    hideLoadingScreen();

    // --- TỰ ĐỘNG KÍCH HOẠT IN-APP INTERSTITIAL CỦA MONETAG ---
    if (typeof show_11651812 === "function") {
      show_11651812({
        type: "inApp",
        inAppSettings: {
          frequency: 2,
          capping: 0.1,
          interval: 30,
          timeout: 5,
          everyPage: false,
        },
      }).catch((err) => {
        console.log("In-App Interstitial error:", err);
      });
    }
  }, 400);
});
