/**
 * AI · 工具函数 — v0.1.0
 */

// ---- 日期处理 ----

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${day} ${h}:${min}`;
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function daysSince(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : 0;
}

function daysUntil(targetDate) {
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((target - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : 0;
}

function getChineseDateDivider(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const dayNum = daysSince(CONFIG.ANNIVERSARY_START);
  const postDay = Math.floor((new Date(dateStr) - new Date(CONFIG.ANNIVERSARY_START)) / (1000 * 60 * 60 * 24)) + 1;
  return `${y}年${m}月${day}日 · 第 ${postDay > 0 ? postDay : 1} 天`;
}

// ---- DOM 操作 ----

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function showToast(msg) {
  const existing = $('.toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function showModal(title, contentHTML) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h3>${title}</h3>
      <div class="modal-body">${contentHTML}</div>
    </div>
  `;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
  return overlay;
}

// ---- HTML 转义 ----

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- 格式化换行 ----

function formatContent(text) {
  return text.split('\n').map(p => `<p>${escapeHTML(p)}</p>`).join('');
}

// ---- 用户信息 ----

function getCurrentUser() {
  const user = localStorage.getItem('ai_user');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('ai_user', JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem('ai_user');
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function getUserAvatar(user) {
  if (!user) return '?';
  if (user.role === 'male') return CONFIG.MALE_AVATAR;
  return CONFIG.FEMALE_AVATAR;
}

function getUserAvatarClass(user) {
  if (!user) return '';
  return user.role === 'male' ? 'avatar-ren' : 'avatar-tian';
}

function getUserName(user) {
  if (!user) return '';
  return user.role === 'male' ? CONFIG.MALE_NAME : CONFIG.FEMALE_NAME;
}

// ---- 页面保护 ----

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}