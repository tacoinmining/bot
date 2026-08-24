// --- CẤU HÌNH KẾT NỐI SUPABASE ---
const SUPABASE_URL = "https://miasllplfprvtjxfgs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pYXNtbGxwbGZwcnZ0anhmc2gsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg3NTU5MDg5LCJleHAiOjIxMDMxMzUwODl9.IUuZ7PckUs_eYibFyrZ0kbOvjUmvlpjGZRpyej5-mq8";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

const BOT_USERNAME = "tacoinmining_bot";

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
    social_tasks_title: "Nhiệm Vụ Telegram",
    task_channel_name: "Kênh Telegram chính thức",
    task_group_name: "Nhóm Chat Telegram",
    btn_checkin: "Nhận",
    btn_do_task: "Thực hiện",
    btn_claim_task: "Nhận Coin",
    btn_done: "Đã hoàn thành",

    invite_banner_title: "Mời Bạn Bè!",
    invite_banner_desc: "Nhận ngay +100 ⚡ cho mỗi người bạn tham gia!",
    ref_link_label: "LINK GIỚI THIỆU CỦA BẠN",
    btn_copy: "Copy",
    btn_copied: "Đã Copy!",
    btn_invite_friend: "Mời Bạn Bè Trên Telegram",

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

    ads_card_title: "XEM QUẢNG CÁO",
    ads_box_name: "Xem Quảng Cáo",
    ads_note_warning: "⚠️ Chú ý: Xem hết video để nhận quà!",
    ads_note_cooldown: "* Có thể nhận lại sau 15 phút",
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
    social_tasks_title: "Telegram Tasks",
    task_channel_name: "Official Telegram Channel",
    task_group_name: "Telegram Chat Group",
    btn_checkin: "Claim",
    btn_do_task: "Start",
    btn_claim_task: "Claim",
    btn_done: "Completed",

    invite_banner_title: "Invite Friends!",
    invite_banner_desc: "Get +100 ⚡ per friend who joins!",
    ref_link_label: "YOUR REFERRAL LINK",
    btn_copy: "Copy",
    btn_copied: "Copied!",
    btn_invite_friend: "Invite Friends via Telegram",

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

    ads_card_title: "WATCH ADS",
    ads_box_name: "Watch Ad",
    ads_note_warning: "⚠️ Note: Watch the full video to get reward!",
    ads_note_cooldown: "* Can be claimed again after 15 minutes",
  },
};

// THÔNG SỐ CẤU HÌNH
const MINING_DURATION = 6 * 60 * 60 * 1000;
const UPGRADE_COST = 400.0;
const BASE_HOURLY_RATE = 40.0;
const RATE_INCREASE_PER_LEVEL = 1.0;
const TON_RATE = 0.000001;
const ADS_COOLDOWN_TIME = 15 * 60 * 1000;

// BIẾN TRẠNG THÁI GAME
let balance = 0.0;
let minerLevel = 1;
let endTime = null;
let currentLang = "vi";
let userId = "12345678";
let currentUsername = "TestUser";

let timerInterval = null;
let adsTimerInterval = null;
let adsNextAvailableTime = 0;

let taskState = {
  daily: false,
  channel: "init",
  group: "init",
};

let withdrawHistory = [];

// KHỞI CHẠY ỨNG DỤNG VÀ TẢI TỪ SUPABASE
document.addEventListener("DOMContentLoaded", async () => {
  initUserTelegram();
  await loadStateFromSupabase();
  applyLanguage();
  updateUI();
  updateTaskUI();
  setupRefLink();
  renderWithdrawHistory();
  initAdsSystem();
});

// --- HÀM ĐỒNG BỘ DỮ LIỆU VỚI SUPABASE ---
async function loadStateFromSupabase() {
  try {
    let { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("telegram_id", userId)
      .single();

    if (error || !data) {
      // Nếu chưa có user trong Database, tạo mới mặc định
      const newUser = {
        telegram_id: userId,
        username: currentUsername,
        balance: 1000.0,
        miner_level: 1,
        end_time: 0,
      };
      await supabaseClient.from("users").insert([newUser]);
      balance = 1000.0;
      minerLevel = 1;
      endTime = null;
    } else {
      balance = parseFloat(data.balance) || 0;
      minerLevel = parseInt(data.miner_level) || 1;
      endTime = data.end_time ? parseInt(data.end_time) : null;
    }
  } catch (err) {
    console.error("Lỗi kết nối Supabase:", err);
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
      })
      .eq("telegram_id", userId);
  } catch (err) {
    console.error("Lỗi lưu dữ liệu lên Supabase:", err);
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
    document.getElementById("user-fullname").innerText =
      fullName || "Telegram User";

    const usernameElem = document.getElementById("username");
    usernameElem.innerText = user.username
      ? `@${user.username}`
      : "#no_username";
  }
}

/* HỆ THỐNG XEM QUẢNG CÁO (150 COINS - 15 PHÚT CHỜ) */
function initAdsSystem() {
  updateAdsUI();
  if (adsTimerInterval) clearInterval(adsTimerInterval);
  adsTimerInterval = setInterval(updateAdsUI, 1000);
}

function watchAds() {
  const now = Date.now();
  if (now < adsNextAvailableTime) return;

  if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");

  balance += 150.0;
  adsNextAvailableTime = Date.now() + ADS_COOLDOWN_TIME;

  saveState();
  updateUI();
  updateAdsUI();

  showModal(
    "🎁",
    translations[currentLang].modal_task_title,
    `${translations[currentLang].modal_task_desc} +150 ⚡ từ xem quảng cáo!`,
  );
  if (tg && tg.HapticFeedback)
    tg.HapticFeedback.notificationOccurred("success");
}

function updateAdsUI() {
  const now = Date.now();
  const adsBtn = document.getElementById("ads-banner-btn");
  const timerBadge = document.getElementById("ads-timer-badge");
  if (!adsBtn || !timerBadge) return;

  if (now < adsNextAvailableTime) {
    adsBtn.classList.add("disabled");
    timerBadge.style.display = "block";

    const remaining = adsNextAvailableTime - now;
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    timerBadge.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    adsBtn.classList.remove("disabled");
    timerBadge.style.display = "none";
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
  input.select();
  document.execCommand("copy");

  const copyBtnText = document.getElementById("copy-btn-text");
  copyBtnText.innerText = translations[currentLang].btn_copied;

  showModal(
    "📋",
    translations[currentLang].modal_copied_title,
    translations[currentLang].modal_copied_desc,
  );

  if (tg && tg.HapticFeedback)
    tg.HapticFeedback.notificationOccurred("success");

  setTimeout(() => {
    copyBtnText.innerText = translations[currentLang].btn_copy;
  }, 2000);
}

function shareRefLink() {
  const refLink = `https://t.me/${BOT_USERNAME}?start=ref_${userId}`;
  const shareText =
    "🚀 Tham gia ngay để nhận 100 ⚡ và đào $TA Token miễn phí!";
  const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareText)}`;

  if (tg && tg.openTelegramLink) tg.openTelegramLink(fullUrl);
  else window.open(fullUrl, "_blank");

  if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
}

/* TÍNH TOÁN TỐC ĐỘ MÁY ĐÀO */
function getHourlyRate() {
  return BASE_HOURLY_RATE + (minerLevel - 1) * RATE_INCREASE_PER_LEVEL;
}

function getCycleReward() {
  return getHourlyRate() * 6.0;
}

function showModal(icon, title, desc) {
  document.getElementById("modal-icon").innerText = icon;
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("custom-modal").classList.add("active");
}

function closeModal() {
  document.getElementById("custom-modal").classList.remove("active");
}

/* NHIỆM VỤ THƯỜNG & TELEGRAM */
function claimDailyReward() {
  if (!taskState.daily) {
    taskState.daily = true;
    balance += 10.0;
    saveState();
    updateUI();
    updateTaskUI();

    showModal(
      "📅",
      translations[currentLang].modal_task_title,
      `${translations[currentLang].modal_task_desc} +10 ⚡!`,
    );
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("success");
  }
}

function processTask(taskId, url) {
  const btn = document.getElementById(`btn-task-${taskId}`);

  if (taskState[taskId] === "init") {
    if (tg && tg.openTelegramLink) tg.openTelegramLink(url);
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
    const reward = 50.0;
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
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("success");
  }
}

function updateTaskUI() {
  const dailyBtn = document.getElementById("daily-btn");
  if (taskState.daily) {
    dailyBtn.className = "task-btn done-btn";
    dailyBtn.innerText = translations[currentLang].btn_done;
    dailyBtn.onclick = null;
  }

  ["channel", "group"].forEach((taskId) => {
    const btn = document.getElementById(`btn-task-${taskId}`);
    if (!btn) return;
    if (taskState[taskId] === "claimed") {
      btn.className = "task-btn done-btn";
      btn.innerText = translations[currentLang].btn_done;
      btn.onclick = null;
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
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("success");
  } else {
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("error");
  }
}

function handleAction() {
  const now = Date.now();
  if (!endTime) startMining();
  else if (now >= endTime) claimReward();
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
  if (tg && tg.HapticFeedback)
    tg.HapticFeedback.notificationOccurred("success");
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
  if (tg && tg.HapticFeedback)
    tg.HapticFeedback.notificationOccurred("success");
}

function updateUI() {
  const now = Date.now();
  const startBtn = document.getElementById("start-btn");
  const btnText = document.getElementById("btn-text");
  const timerDisplay = document.getElementById("timer-display");
  const neonRing = document.getElementById("neon-ring");
  const upgradeBtn = document.getElementById("upgrade-btn");

  if (!startBtn) return;

  document.getElementById("balance").innerText = balance.toFixed(2);
  document.getElementById("miner-level").innerText = `LV ${minerLevel}`;
  document.getElementById("hourly-rate").innerText =
    `${getHourlyRate().toFixed(1)} ⚡/h`;
  document.getElementById("rate-display").innerText =
    `+${getCycleReward().toFixed(0)} ⚡ / 6h`;

  if (balance < UPGRADE_COST) upgradeBtn.classList.add("disabled");
  else upgradeBtn.classList.remove("disabled");

  if (timerInterval) clearInterval(timerInterval);

  if (!endTime) {
    startBtn.className = "neon-btn";
    btnText.innerText = translations[currentLang].btn_start;
    timerDisplay.style.display = "none";
    if (neonRing) neonRing.classList.remove("active");
  } else if (now < endTime) {
    startBtn.className = "neon-btn mining";
    btnText.innerText = translations[currentLang].btn_mining;
    timerDisplay.style.display = "block";
    if (neonRing) neonRing.classList.add("active");
    renderTimer();
    timerInterval = setInterval(renderTimer, 1000);
  } else {
    startBtn.className = "neon-btn claim";
    btnText.innerText = `${translations[currentLang].btn_claim} +${getCycleReward().toFixed(0)} ⚡`;
    timerDisplay.style.display = "none";
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
    timerEl.innerText =
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");
  }
}

/* ĐỔI NGÔN NGỮ & ĐIỀU HƯỚNG TAB */
function toggleLanguage() {
  currentLang = currentLang === "vi" ? "en" : "vi";
  applyLanguage();
  updateUI();
  updateTaskUI();
  renderWithdrawHistory();
  if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
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
    clickedBtn.classList.add("active");
  }

  if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
}

/* RÚT TIỀN (WALLET) */
function updateTonEstimate() {
  const amountInput = document.getElementById("withdraw-amount");
  const calcText = document.getElementById("calc-ton-text");
  if (!amountInput || !calcText) return;
  const amount = parseFloat(amountInput.value) || 0;
  const estimatedTon = amount * TON_RATE;
  calcText.innerText = `≈ ${estimatedTon.toFixed(4)} TON`;
}

function submitWithdrawRequest() {
  const addressInput = document.getElementById("withdraw-address");
  const amountInput = document.getElementById("withdraw-amount");
  if (!addressInput || !amountInput) return;

  const address = addressInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!address || address.length < 10) {
    showModal(
      "❌",
      translations[currentLang].alert_err_address_title,
      translations[currentLang].alert_err_address_desc,
    );
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("error");
    return;
  }

  if (isNaN(amount) || amount < 10000) {
    showModal(
      "⚠️",
      translations[currentLang].alert_err_min_title,
      translations[currentLang].alert_err_min_desc,
    );
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("warning");
    return;
  }

  if (amount > balance) {
    showModal(
      "💸",
      translations[currentLang].alert_err_balance_title,
      translations[currentLang].alert_err_balance_desc,
    );
    if (tg && tg.HapticFeedback)
      tg.HapticFeedback.notificationOccurred("error");
    return;
  }

  balance -= amount;

  const newTx = {
    id: "TX" + Date.now(),
    amount: amount,
    tonAmount: (amount * TON_RATE).toFixed(4),
    address: address,
    status: "pending",
    createdAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  withdrawHistory.unshift(newTx);
  saveState();

  addressInput.value = "";
  amountInput.value = "";
  updateTonEstimate();
  updateUI();
  renderWithdrawHistory();

  showModal(
    "⏳",
    translations[currentLang].alert_pending_title,
    translations[currentLang].alert_pending_desc,
  );
  if (tg && tg.HapticFeedback)
    tg.HapticFeedback.notificationOccurred("success");
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
        (statusClass, (statusClass = "rejected"));
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
