const tg = window.Telegram.WebApp;
tg.expand();

// DICTIONARY ĐA NGÔN NGỮ (VI / EN)
const translations = {
  vi: {
    balance_label: "SỐ DƯ",
    btn_start: "Bắt đầu đào (6 Tiếng)",
    btn_mining: "Đang đào $TA...",
    btn_claim: "🎁 Thu Hoạch",
    level_label: "CẤP ĐỘ:",
    speed_label: "Tốc độ:",
    upgrade_btn: "NÂNG CẤP",
    tasks_title: "Nhiệm Vụ Nhận Coin",
    tasks_desc: "Hoàn thành nhiệm vụ để kiếm thêm $TA",
    invite_title: "Mời Bạn Bè",
    invite_desc: "Nhận 10% hoa hồng từ người bạn giới thiệu",
    invite_box: "👥 Link giới thiệu sẽ cập nhật ở đây",
    wallet_title: "Ví Web3",
    wallet_desc: "Rút $TA về ví cá nhân của bạn",
    wallet_box: "👛 Cổng kết nối ví (TON Wallet)",
    nav_mining: "Mining",
    nav_tasks: "Tasks",
    nav_invite: "Invite",
    nav_wallet: "Wallet",

    // TASKS TRANSLATIONS
    daily_title: "Điểm Danh Hằng Ngày",
    social_tasks_title: "Nhiệm Vụ Telegram",
    task_channel_name: "Kênh Telegram chính thức",
    task_group_name: "Nhóm Chat Telegram",
    btn_checkin: "Nhận",
    btn_do_task: "Thực hiện",
    btn_claim_task: "Nhận Coin",
    btn_done: "Đã hoàn thành",

    // MODAL TEXTS
    modal_start_title: "Khởi Động Thành Công! 🚀",
    modal_start_desc:
      "Máy đào đã hoạt động. Hãy quay lại sau 6 tiếng để thu hoạch coin nhé!",
    modal_upgrade_title: "Nâng Cấp Thành Công! ⚡",
    modal_upgrade_desc: "Máy đào của bạn đã đạt Cấp độ ",
    modal_claim_title: "Thu Hoạch Thành Công! 🎁",
    modal_claim_desc: "Bạn đã nhận thành công ",
    modal_task_title: "Nhiệm Vụ Hoàn Thành! 🎉",
    modal_task_desc: "Bạn đã nhận được ",
    modal_close_btn: "ĐÃ HIỂU",
  },
  en: {
    balance_label: "BALANCE",
    btn_start: "Start Mining (6 Hours)",
    btn_mining: "Mining $TA...",
    btn_claim: "🎁 Claim Reward",
    level_label: "LEVEL:",
    speed_label: "Speed:",
    upgrade_btn: "UPGRADE",
    tasks_title: "Earn Tasks",
    tasks_desc: "Complete tasks to earn more $TA",
    invite_title: "Invite Friends",
    invite_desc: "Get 10% commission from your friends",
    invite_box: "👥 Referral link will be updated here",
    wallet_title: "Web3 Wallet",
    wallet_desc: "Withdraw $TA to your personal wallet",
    wallet_box: "👛 Wallet connection (TON Wallet)",
    nav_mining: "Mining",
    nav_tasks: "Tasks",
    nav_invite: "Invite",
    nav_wallet: "Wallet",

    // TASKS TRANSLATIONS
    daily_title: "Daily Check-in",
    social_tasks_title: "Telegram Tasks",
    task_channel_name: "Official Telegram Channel",
    task_group_name: "Telegram Chat Group",
    btn_checkin: "Claim",
    btn_do_task: "Start",
    btn_claim_task: "Claim",
    btn_done: "Completed",

    // MODAL TEXTS
    modal_start_title: "Started Successfully! 🚀",
    modal_start_desc:
      "Miner is active. Come back in 6 hours to claim your reward!",
    modal_upgrade_title: "Upgraded Successfully! ⚡",
    modal_upgrade_desc: "Your miner has reached Level ",
    modal_claim_title: "Claimed Successfully! 🎁",
    modal_claim_desc: "You have successfully claimed ",
    modal_task_title: "Task Completed! 🎉",
    modal_task_desc: "You have received ",
    modal_close_btn: "GOT IT",
  },
};

// CẤU HÌNH BAN ĐẦU
const MINING_DURATION = 6 * 60 * 60 * 1000;
const UPGRADE_COST = 100.0;

let balance = 500.0;
let minerLevel = 1;
let endTime = null;
let currentLang = "vi";
let timerInterval = null;

// QUẢN LÝ TRẠNG THÁI 2 NHIỆM VỤ TELEGRAM
const taskState = {
  daily: false,
  channel: "init", // init -> waiting -> claimed
  group: "init",
};

document.addEventListener("DOMContentLoaded", () => {
  initUserTelegram();
  applyLanguage();
  updateUI();
});

function initUserTelegram() {
  if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    const fullName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(" ");
    document.getElementById("user-fullname").innerText =
      fullName || "Telegram User";

    const usernameElem = document.getElementById("username");
    if (user.username) {
      usernameElem.innerText = `@${user.username}`;
    } else {
      usernameElem.innerText = "#no_username";
    }
  }
}

function getCycleReward() {
  return 20.0 + (minerLevel - 1) * 2.0;
}

function getHourlyRate() {
  return getCycleReward() / 6.0;
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

/* ========================================================= */
/* LOGIC TAB NHIỆM VỤ (TASKS) */
/* ========================================================= */
function claimDailyReward() {
  if (!taskState.daily) {
    taskState.daily = true;
    balance += 10.0;
    updateUI();
    updateTaskUI();

    showModal(
      "📅",
      translations[currentLang].modal_task_title,
      `${translations[currentLang].modal_task_desc} +10 ⚡!`,
    );

    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  }
}

function processTask(taskId, url) {
  const btn = document.getElementById(`btn-task-${taskId}`);

  if (taskState[taskId] === "init") {
    if (tg.openTelegramLink) {
      tg.openTelegramLink(url);
    } else {
      window.open(url, "_blank");
    }

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

    updateUI();
    updateTaskUI();

    showModal(
      "🎉",
      translations[currentLang].modal_task_title,
      `${translations[currentLang].modal_task_desc} +${reward} ⚡!`,
    );

    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
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
    const item = document.getElementById(`task-${taskId}`);
    const btn = document.getElementById(`btn-task-${taskId}`);

    if (taskState[taskId] === "claimed") {
      item.classList.add("completed");
      btn.className = "task-btn done-btn";
      btn.innerText = translations[currentLang].btn_done;
      btn.onclick = null;
    }
  });
}

/* ========================================================= */
/* MINING & UPGRADE LOGIC */
/* ========================================================= */
function upgradeMiner() {
  if (balance >= UPGRADE_COST) {
    balance -= UPGRADE_COST;
    minerLevel += 1;
    updateUI();

    showModal(
      "⚡",
      translations[currentLang].modal_upgrade_title,
      `${translations[currentLang].modal_upgrade_desc} ${minerLevel}!`,
    );

    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  } else {
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
  }
}

function handleAction() {
  const now = Date.now();
  if (!endTime) {
    startMining();
  } else if (now >= endTime) {
    claimReward();
  }
}

function startMining() {
  endTime = Date.now() + MINING_DURATION;
  updateUI();

  showModal(
    "🚀",
    translations[currentLang].modal_start_title,
    translations[currentLang].modal_start_desc,
  );

  if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function claimReward() {
  const reward = getCycleReward();
  balance += reward;
  endTime = null;
  updateUI();

  showModal(
    "🎁",
    translations[currentLang].modal_claim_title,
    `${translations[currentLang].modal_claim_desc} +${reward.toFixed(1)} ⚡!`,
  );

  if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
}

function updateUI() {
  const now = Date.now();
  const startBtn = document.getElementById("start-btn");
  const btnText = document.getElementById("btn-text");
  const timerDisplay = document.getElementById("timer-display");
  const neonRing = document.getElementById("neon-ring");
  const upgradeBtn = document.getElementById("upgrade-btn");

  document.getElementById("balance").innerText = balance.toFixed(2);
  document.getElementById("miner-level").innerText = `LV ${minerLevel}`;
  document.getElementById("hourly-rate").innerText =
    `${getHourlyRate().toFixed(2)} ⚡/h`;
  document.getElementById("rate-display").innerText =
    `+${getCycleReward().toFixed(1)} ⚡ / 6h`;

  if (balance < UPGRADE_COST) {
    upgradeBtn.classList.add("disabled");
  } else {
    upgradeBtn.classList.remove("disabled");
  }

  if (timerInterval) clearInterval(timerInterval);

  if (!endTime) {
    startBtn.className = "neon-btn";
    btnText.innerText = translations[currentLang].btn_start;
    timerDisplay.style.display = "none";
    neonRing.classList.remove("active");
  } else if (now < endTime) {
    startBtn.className = "neon-btn mining";
    btnText.innerText = translations[currentLang].btn_mining;
    timerDisplay.style.display = "block";
    neonRing.classList.add("active");

    renderTimer();
    timerInterval = setInterval(renderTimer, 1000);
  } else {
    startBtn.className = "neon-btn claim";
    btnText.innerText = `${translations[currentLang].btn_claim} +${getCycleReward().toFixed(1)} ⚡`;
    timerDisplay.style.display = "none";
    neonRing.classList.remove("active");
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

  document.getElementById("timer-display").innerText =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}

function toggleLanguage() {
  currentLang = currentLang === "vi" ? "en" : "vi";
  applyLanguage();
  updateUI();
  updateTaskUI();

  if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
}

function applyLanguage() {
  document.getElementById("lang-btn").innerText =
    currentLang === "vi" ? "EN" : "VI";
  const closeBtn = document.querySelector(".modal-btn");
  if (closeBtn) closeBtn.innerText = translations[currentLang].modal_close_btn;

  document.querySelectorAll("[data-i18n]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      elem.innerText = translations[currentLang][key];
    }
  });
}

function switchTab(tabName, clickedBtn) {
  const allViews = document.querySelectorAll(".tab-view");
  allViews.forEach((view) => view.classList.remove("active"));

  const allNavBtns = document.querySelectorAll(".nav-item");
  allNavBtns.forEach((btn) => btn.classList.remove("active"));

  const targetView = document.getElementById(`tab-${tabName}`);
  if (targetView) {
    targetView.classList.add("active");
    clickedBtn.classList.add("active");
  }

  if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
}
