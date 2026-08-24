const tg = window.Telegram.WebApp;
tg.expand();

// Tự động lấy Tên và Username Telegram
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  const user = tg.initDataUnsafe.user;

  // 1. Lấy Tên hiển thị (First Name + Last Name)
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  document.getElementById("user-fullname").innerText =
    fullName || "Telegram User";

  // 2. Lấy Username (@username)
  const usernameElem = document.getElementById("username");
  if (user.username) {
    usernameElem.innerText = `@${user.username}`;
  } else {
    usernameElem.innerText = "#no_username"; // Hoặc ẩn đi nếu không có username
  }
}

const MINING_DURATION = 6 * 60 * 60 * 1000; // Đã sửa chuẩn 6 tiếng (21.600.000 ms)
const REWARD_AMOUNT = 20.0;

let balance = 0.0;
let timerInterval = null;
let endTime = null;

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

  if (tg.HapticFeedback) {
    tg.HapticFeedback.notificationOccurred("success");
  }
}

function claimReward() {
  balance += REWARD_AMOUNT;
  document.getElementById("balance").innerText = balance.toFixed(2);
  endTime = null;
  updateUI();

  if (tg.HapticFeedback) {
    tg.HapticFeedback.notificationOccurred("success");
  }
}

function updateUI() {
  const now = Date.now();
  const startBtn = document.getElementById("start-btn");
  const btnText = document.getElementById("btn-text");
  const timerDisplay = document.getElementById("timer-display");
  const neonRing = document.getElementById("neon-ring");

  if (timerInterval) clearInterval(timerInterval);

  if (!endTime) {
    startBtn.className = "neon-btn";
    btnText.innerText = "Bắt đầu đào (6 Tiếng)";
    timerDisplay.style.display = "none";
    neonRing.classList.remove("active");
  } else if (now < endTime) {
    startBtn.className = "neon-btn mining";
    btnText.innerText = "Đang đào $TA...";
    timerDisplay.style.display = "block";
    neonRing.classList.add("active");

    renderTimer();
    timerInterval = setInterval(renderTimer, 1000);
  } else {
    startBtn.className = "neon-btn claim";
    btnText.innerText = "🎁 Thu Hoạch +20 $TA";
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

// HÀM CHUYỂN TAB NAVIGATION
function switchTab(tabName, clickedBtn) {
  // 1. Ẩn toàn bộ nội dung các tab
  const allViews = document.querySelectorAll(".tab-view");
  allViews.forEach((view) => view.classList.remove("active"));

  // 2. Bỏ trạng thái active của tất cả các nút nav
  const allNavBtns = document.querySelectorAll(".nav-item");
  allNavBtns.forEach((btn) => btn.classList.remove("active"));

  // 3. Hiển thị tab được chọn & highlight nút tương ứng
  const targetView = document.getElementById(`tab-${tabName}`);
  if (targetView) {
    targetView.classList.add("active");
    clickedBtn.classList.add("active");
  }

  // Phản hồi rung nhẹ trên bàn phím điện thoại (Telegram)
  if (tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred("light");
  }
}
