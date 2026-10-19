
(() => {
'use strict';
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const ICONS = {
 win:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 2H15C16.65685 2 18 3.34315 18 5V9C18 12.31371 15.31371 15 12 15C8.68629 15 6 12.31371 6 9V5C6 3.34315 7.34315 2 9 2ZM6 5H4C2.89543 5 2 5.89543 2 7V9C2 10.10457 2.89543 11 4 11H6M18 5H20C21.10457 5 22 5.89543 22 7V9C22 10.10457 21.10457 11 20 11H18M12 15V19M9 19H15C16.65685 19 18 20.34315 18 22H6C6 20.34315 7.34315 19 9 19Z"/></svg>',
 focus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.89 4.049a1 1 0 1 0 .22-1.988l-.11.994zm9.049 6.841a1 1 0 0 0-1.988.22l.994-.11zm-10.69-1.796a1 1 0 1 0-.498-1.936l.249.968zm5.593 4.155a1 1 0 1 0-1.936-.498l.968.249zm-2.256-3.835h-1a1 1 0 0 0 1 1zm0-2.828l-.707-.708a1 1 0 0 0-.293.708zM18.12 3.05h1a1 1 0 0 0-1.707-.707zm0 2.828h-1a1 1 0 0 0 1 1zm2.829 0l.707.708a1 1 0 0 0-.707-1.708zm-3.536 3.536v1a1 1 0 0 0 .707-.293zm-2.414 1A1 1 0 0 0 13.586 9l.707.707zm-3.242.414a1 1 0 1 0 1.414 1.414l-.707-.707zM21 12h-1a8 8 0 0 1-8 8v2c5.523 0 10-4.477 10-10zm-9 9v-1a8 8 0 0 1-8-8H2c0 5.523 4.477 10 10 10zm-9-9h1a8 8 0 0 1 8-8V2C6.477 2 2 6.477 2 12zm9-9v1q.452 0 .89.049l.11-.994l.11-.994A10 10 0 0 0 12 2zm8.945 8l-.994.11q.048.438.049.89h2q0-.562-.061-1.11zM12 16v-1a3 3 0 0 1-3-3H7a5 5 0 0 0 5 5zm-4-4h1c0-1.396.955-2.572 2.25-2.906L11 8.126l-.25-.968A5 5 0 0 0 7 12zm7.874 1l-.969-.25A3 3 0 0 1 12 15v2a5 5 0 0 0 4.842-3.75zm-1.288-3.586h1V6.586h-2v2.828zm0-2.828l.707.707l3.535-3.536l-.707-.707l-.707-.707l-3.535 3.535zM18.12 3.05h-1v2.828h2V3.05zm0 2.828v1h2.829v-2H18.12zm2.829 0l-.707-.707l-3.536 3.536l.707.707l.707.707l3.536-3.535zm-3.536 3.536v-1h-2.828v2h2.828zm-3.121.293L13.586 9l-1.828 1.828l.707.707l.707.707L15 10.414z"/></svg>',
 challenge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m7.048 13.406l3.535 3.536l-1.413 1.414l1.415 1.415l-1.414 1.414l-2.475-2.475l-2.829 2.829l-1.414-1.414l2.829-2.83l-2.475-2.474l1.414-1.414l1.414 1.413zM3 3l3.546.003l11.817 11.818l1.415-1.414l1.415 1.414l-2.475 2.475l2.828 2.829l-1.414 1.414l-2.829-2.829l-2.474 2.475l-1.415-1.414l1.414-1.415L3.002 6.531zm14.457 0L21 3.003l.002 3.523l-4.053 4.052l-3.536-3.535z"/></svg>',
 dashboard:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"/></svg>',
 calendar:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h2v3h6V2h2v3h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2zm12 7H5v11h14zM7 11h3v3H7zm5 0h3v3h-3zm-5 5h3v2H7zm5 0h3v2h-3z"/></svg>',
 report:'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><title>task-daily-02</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 16V8c0-2.828 0-4.243-.879-5.121C18.243 2 16.828 2 14 2h-4c-2.828 0-4.243 0-5.121.879C4 3.757 4 5.172 4 8v8c0 2.828 0 4.243.879 5.121C5.757 22 7.172 22 10 22h4c2.828 0 4.243 0 5.121-.879C20 20.243 20 18.828 20 16"/><path d="M15.5 2h-7c0 1.414 0 2.121.44 2.56c.439.44 1.146.44 2.56.44h1c1.414 0 2.121 0 2.56-.44c.44-.439.44-1.146.44-2.56m-8 9l1 1l2-2.5m3 7.5h3m-3-6h3m-7.875 6H8.5m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0"/></g></svg>',
 analytics:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 19h18v2H1V3h2zm3-2H4v-5h2zm5 0H9V8h2zm5 0h-2V4h2zm5 0h-2v-8h2z"/><path d="m4 9 5-4 4 2 6-5 1.3 1.5-7 5.8-4-2-4 3.2z" fill="currentColor"/></svg>',
 reminder:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 3H4a2 2 0 0 0-2 2v14h20V5a2 2 0 0 0-2-2M4 5h16v2l-8 5-8-5zm16 12H4V9l8 5 8-5z"/><path fill="currentColor" d="M19 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6m.7 4.2-1.1-1.1.8-.8.3.3.8-.8.8.8z"/></svg>',
 documents:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z"/></svg>',
 settings:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/></svg>',
 notification:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 17a3 3 0 1 1-6 0M6 9v3.528a2 2 0 0 1-.211.894l-1.717 3.433a.1.1 0 0 0 .09.145h15.676a.1.1 0 0 0 .09-.145l-1.717-3.433a2 2 0 0 1-.211-.894V9A6 6 0 0 0 6 9Z"/></svg>',
 total:'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M208 80h264v32H208zM40 96a64 64 0 1 0 64-64a64.07 64.07 0 0 0-64 64m64-32a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32m104 176h264v32H208zm-104 80a64 64 0 1 0-64-64a64.07 64.07 0 0 0 64 64m0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32m104 176h264v32H208zm-104 80a64 64 0 1 0-64-64a64.07 64.07 0 0 0 64 64m0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32"/></svg>',
 done:'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"/></svg>',
 progress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M1 1h22M10 4.5h4V6c0 1-2 2-2 2s-2-1-2-2zM5 1v5c0 3 5 3.235 5 6s-5 3-5 6v5M19 1v5c0 3-5 3.235-5 6s5 3 5 6v5M1 23h22M8 21c0-2 4-4 4-4s4 2 4 4v2H8z"/></svg>',
 pending:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 dark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" aria-hidden="true"><path fill="currentColor" d="m16.07 3.344l-1.428.781l1.428.781l.781 1.428l.781-1.428l1.428-.781l-1.428-.781l-.78-1.428zM2.226 12c0-5.523 4.477-10 10-10h1.734l-.868 1.5c-.579 1-.866 2.189-.866 3.5a7 7 0 0 0 8.348 6.87l1.682-.327l-.543 1.626A10 10 0 0 1 12.227 22c-5.523 0-10-4.477-10-10"/></svg>',
 light:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8M11 1h2v4h-2zm0 18h2v4h-2zM1 11h4v2H1zm18 0h4v2h-4zM4.2 5.6l1.4-1.4l2.8 2.8L7 8.4zM15.6 17l1.4-1.4l2.8 2.8l-1.4 1.4zM15.6 7l2.8-2.8l1.4 1.4L17 8.4zM4.2 18.4L7 15.6l1.4 1.4l-2.8 2.8z"/></svg>'
};
const icon = (name, cls='') => `<span class="svg-icon ${cls}">${ICONS[name]||''}</span>`;

const KEYS = {activities:'dailyflow_activities_v1', reminders:'dailyflow_reminders_v1', notes:'dailyflow_notes_v1', units:'dailyflow_units_v1', theme:'dailyflow_theme_v1', profile:'dailyflow_profile_v1', unitBranding:'dailyflow_unit_branding_v1', workdays:'dailyflow_workday_status_v1', calendarColors:'dailyflow_calendar_colors_v1'};

// Sinkronkan favicon tab browser dengan foto profil berbentuk lingkaran.
function syncProfileFavicon() {
  try {
    const savedProfile = JSON.parse(localStorage.getItem(KEYS.profile) || '{}');
    if (!savedProfile.photo) return;

    const img = new Image();
    img.onload = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Potong foto menjadi lingkaran dan pertahankan transparansi di sudut.
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      const scale = Math.max(size / width, size / height);
      const drawWidth = width * scale;
      const drawHeight = height * scale;
      ctx.drawImage(img, (size - drawWidth) / 2, (size - drawHeight) / 2, drawWidth, drawHeight);
      ctx.restore();

      let favicon = document.querySelector('link[rel~="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.type = 'image/png';
      favicon.href = canvas.toDataURL('image/png');
    };
    img.onerror = () => console.warn('Foto profil tidak dapat dimuat sebagai favicon.');
    img.src = savedProfile.photo;
  } catch (error) {
    console.warn('Favicon foto profil tidak dapat diperbarui.', error);
  }
}

syncProfileFavicon();

const defaultUnits = ['Bukit Darmo Golf','Fairway Nine Mall','9 Boulevard','Hyatt Centric','Goshen Power','Goshen 3D','Personal / Other'];
const today = new Date(); today.setHours(0,0,0,0);
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parseDate = s => { const d = new Date(`${s}T12:00:00`); return Number.isNaN(+d) ? null : d; };
const fmtDate = (s, opts={day:'2-digit',month:'short',year:'numeric'}) => { const d=parseDate(s); return d ? new Intl.DateTimeFormat('id-ID',opts).format(d) : '—'; };
const monthName = d => new Intl.DateTimeFormat('id-ID',{month:'long',year:'numeric'}).format(d);

// Google Calendar Kreatif Desain (read-only).
const CREATIVE_CALENDAR_API = 'https://script.google.com/macros/s/AKfycbzjaCBVIeq4Bagj3MaqGULyrWF2LtzaZdEtVusmVFwiuwnpGJbk74fxSxuj34kuMT9t/exec';
const REMINDER_SYNC_API = CREATIVE_CALENDAR_API;

// Sinkronkan reminder baru maupun hasil edit ke Google Calendar Daily Reports.
// Menggunakan text/plain + no-cors agar tidak memicu preflight CORS pada Apps Script.
function syncNewReminderToGoogleCalendar(reminder, action = 'upsertReminder') {
  if (!reminder || !reminder.id) return;
  if (action !== 'deleteReminder' && (!reminder.title || !reminder.date)) return;
  const payload = { action, id: String(reminder.id) };
  if (action !== 'deleteReminder') Object.assign(payload, {
    title: String(reminder.title), date: String(reminder.date),
    time: String(reminder.time || ''), priority: String(reminder.priority || 'Medium'),
    notes: String(reminder.notes || '')
  });
  fetch(REMINDER_SYNC_API, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  }).catch(error => {
    console.error('Gagal menyinkronkan reminder ke Google Calendar:', error);
    toast('Reminder tersimpan di website, tetapi sinkronisasi Google Calendar gagal.');
  });
}
let creativeCalendarEvents = [];
let creativeCalendarState = 'loading';
let creativeCalendarError = '';
let creativeCalendarLoadedAt = null;
let creativeCalendarRequestStarted = false;

(function addCreativeCalendarStyles(){
  if (document.getElementById('creativeCalendarStyles')) return;
  const style = document.createElement('style');
  style.id = 'creativeCalendarStyles';
  style.textContent = `
    .day.has-items::after{content:none!important}
    .day.has-creative-events:not(.has-workday-status){position:relative;box-shadow:inset 0 0 0 1px var(--calendar-creative-color,#8b5cf6)!important;border-color:var(--calendar-creative-color,#8b5cf6)!important}\n    .day:not(.has-workday-status):not(.has-creative-events){box-shadow:none!important;border-color:transparent!important;background:transparent!important}\n    .day.selected:not(.has-workday-status):not(.has-creative-events){background:transparent!important;color:inherit!important}
    .calendar-dot-row{display:flex;align-items:center;justify-content:center;gap:3px;width:100%;height:7px;margin-top:2px;flex-wrap:nowrap}
    .calendar-dot-row .calendar-dot{display:block;flex:0 0 5px;width:5px;height:5px;border-radius:50%;margin:0;padding:0}
    .activity-calendar-dot{background:var(--calendar-activity-color,#ef4444)!important}
    .creative-calendar-dot{background:var(--calendar-creative-color,#8b5cf6)!important}
    .workday-dot{background:var(--calendar-workday-color,#ec4899)!important}
    .creative-calendar-section{margin-top:18px;padding-top:16px;border-top:1px solid var(--border,rgba(128,128,128,.25))}
    .creative-calendar-heading{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
    .creative-calendar-heading h3{margin:0;font-size:1rem}
    .creative-calendar-event{border:1px solid color-mix(in srgb,var(--calendar-creative-color,#8b5cf6) 22%,transparent);border-radius:10px;padding:10px;margin-bottom:8px}
    .creative-event-mark{display:grid;place-items:center;width:28px;height:28px;flex:0 0 28px;border-radius:8px;background:color-mix(in srgb,var(--calendar-creative-color,#8b5cf6) 12%,transparent);color:var(--calendar-creative-color,#8b5cf6);font-weight:700}
    .tag.purple{background:color-mix(in srgb,var(--calendar-creative-color,#8b5cf6) 12%,transparent);color:var(--calendar-creative-color,#8b5cf6)}
  `;
  document.head.appendChild(style);
})();

function loadCreativeCalendarEvents(force=false) {
  if (creativeCalendarRequestStarted && !force) return;
  creativeCalendarRequestStarted = true;
  creativeCalendarState = 'loading';
  const callbackName = '__dailyReportsCalendarCallback_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  const script = document.createElement('script');
  let finished = false;
  const timeout = setTimeout(() => finish(new Error('Waktu koneksi habis.')), 15000);
  function finish(error, payload) {
    if (finished) return;
    finished = true; clearTimeout(timeout);
    try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
    script.remove();
    if (error || !payload || payload.success !== true || !Array.isArray(payload.events)) {
      creativeCalendarState = 'error';
      creativeCalendarError = error ? error.message : (payload && payload.error) || 'Respons kalender tidak valid.';
    } else {
      creativeCalendarEvents = payload.events.map(event => ({
        ...event,
        date: event.start ? iso(new Date(event.start)) : '',
        time: event.start && !event.allDay ? new Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Jakarta'}).format(new Date(event.start)) : '',
        endTime: event.end && !event.allDay ? new Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Jakarta'}).format(new Date(event.end)) : ''
      }));
      creativeCalendarState = 'loaded';
      creativeCalendarError = '';
      creativeCalendarLoadedAt = new Date();
    }
    if (document.body.dataset.page === 'calendar') renderCalendarPage();
  }
  window[callbackName] = payload => finish(null, payload);
  script.onerror = () => finish(new Error('Gagal memuat data Google Calendar.'));
  script.src = CREATIVE_CALENDAR_API + (CREATIVE_CALENDAR_API.includes('?') ? '&' : '?') + 'callback=' + encodeURIComponent(callbackName);
  document.head.appendChild(script);
}

function creativeEventsForDate(date) {
  return creativeCalendarEvents.filter(event => event.date === date);
}

function creativeEventRow(event) {
  const time = event.allDay ? 'Sepanjang hari' : (event.time || '—') + (event.endTime ? '–' + event.endTime : '');
  return `<div class="activity creative-calendar-event" data-searchable><div class="activity-time">${escapeHtml(time)}</div><div><div class="activity-name">${escapeHtml(event.title || 'Tanpa judul')}</div><div class="activity-meta"><span class="tag purple">Google Calendar</span><span class="tag blue">Kreatif Desain</span></div></div><div class="creative-event-mark" aria-label="Event Google Calendar">G</div></div>`;
}

const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read = (key, fallback=[]) => { try { const v=JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; } };
const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const DEFAULT_CALENDAR_COLORS = {activity:'#ef4444', creative:'#8b5cf6', workday:'#ec4899', workingDay:'#4f9b70', dayOff:'#e879b9', dayPayment:'#f29a38', publicHoliday:'#e34b4b', sickLeave:'#e8c542', annualLeave:'#9299a3'};
function getCalendarColors(){
  const stored = read(KEYS.calendarColors, {});
  return {...DEFAULT_CALENDAR_COLORS, ...(stored && typeof stored === 'object' ? stored : {})};
}
function applyCalendarColors(){
  const colors = getCalendarColors();
  const root = document.documentElement;
  root.style.setProperty('--calendar-activity-color', colors.activity);
  root.style.setProperty('--calendar-creative-color', colors.creative);
  root.style.setProperty('--calendar-workday-color', colors.workday);
  const statusStyle = document.getElementById('calendar-workday-status-colors') || document.createElement('style');
  statusStyle.id = 'calendar-workday-status-colors';
  const statusColors = [
    ['working-day', colors.workingDay], ['day-off', colors.dayOff],
    ['day-payment', colors.dayPayment], ['public-holiday', colors.publicHoliday],
    ['sick-leave', colors.sickLeave], ['annual-leave', colors.annualLeave]
  ];
  statusStyle.textContent = statusColors.map(([slug, color]) =>
    `.day.has-workday-status.workday-${slug}, body[data-theme=\"dark\"] .day.has-workday-status.workday-${slug}{box-shadow:inset 0 0 0 1px ${color} !important;--workday-color:${color} !important}.day.has-workday-status.workday-${slug} .workday-dot{background:${color} !important}.workday-card-${slug}{border-color:${color} !important;border-left:4px solid ${color} !important}.workday-card-${slug} strong{color:${color} !important}`
  ).join('\n');
  statusStyle.textContent += '\n.day.has-workday-status{background:transparent!important;border-color:var(--workday-color,#c6a66b)!important;box-shadow:inset 0 0 0 1px var(--workday-color,#c6a66b)!important}';
  if (!statusStyle.isConnected) document.head.appendChild(statusStyle);
}
function saveCalendarColors(){
  const colors = {
    activity: $('#calendarColorActivity')?.value || DEFAULT_CALENDAR_COLORS.activity,
    creative: $('#calendarColorCreative')?.value || DEFAULT_CALENDAR_COLORS.creative,
    workday: $('#calendarColorWorkday')?.value || DEFAULT_CALENDAR_COLORS.workday,
    workingDay: $('#calendarColorWorkingDay')?.value || DEFAULT_CALENDAR_COLORS.workingDay,
    dayOff: $('#calendarColorDayOff')?.value || DEFAULT_CALENDAR_COLORS.dayOff,
    dayPayment: $('#calendarColorDayPayment')?.value || DEFAULT_CALENDAR_COLORS.dayPayment,
    publicHoliday: $('#calendarColorPublicHoliday')?.value || DEFAULT_CALENDAR_COLORS.publicHoliday,
    sickLeave: $('#calendarColorSickLeave')?.value || DEFAULT_CALENDAR_COLORS.sickLeave,
    annualLeave: $('#calendarColorAnnualLeave')?.value || DEFAULT_CALENDAR_COLORS.annualLeave
  };
  write(KEYS.calendarColors, colors);
  applyCalendarColors();
  toast('Warna kalender berhasil disimpan.');
}
applyCalendarColors();
let activities = read(KEYS.activities, [
{id:crypto.randomUUID(),date:iso(today),time:'09:00',name:'Website Development',description:'Revisi Section Footer Home',output:'Footer responsive dan update konten',status:'Done',priority:'Medium',unit:'Bukit Darmo Golf',notes:'Periksa kembali tampilan mobile.',photos:[]},
{id:crypto.randomUUID(),date:iso(today),time:'10:30',name:'Ratecard Endorsement',description:'Ratecard Endorsement',output:'Ratecard siap dikirim',status:'Done',priority:'High',unit:'Bukit Darmo Golf',notes:'',photos:[]},
{id:crypto.randomUUID(),date:iso(today),time:'14:00',name:'Content Plan Instagram',description:'Buat content plan minggu ini',output:'Draft kalender konten',status:'On Progress',priority:'Medium',unit:'Fairway Nine Mall',notes:'',photos:[]}
]);
let workdayStatuses = read(KEYS.workdays, []);
let reminders = read(KEYS.reminders, [
{id:crypto.randomUUID(),title:'Publish Manual WhatsApp',date:iso(today),time:'15:00',priority:'High',done:false,notes:''},
{id:crypto.randomUUID(),title:'Edit Video Reels',date:iso(today),time:'18:00',priority:'Medium',done:false,notes:''},
{id:crypto.randomUUID(),title:'Cek Ads Performance',date:iso(new Date(+today+86400000)),time:'10:00',priority:'Low',done:false,notes:''}
]);
let notes = read(KEYS.notes,{win:'',challenge:'',focus:''});
let units = read(KEYS.units,defaultUnits);
let profile = read(KEYS.profile,{name:'Fiqi Naufaldy', role:'Digital Marketing Executive', department:'Digital Marketing', company:'', photo:''});
let unitBranding = read(KEYS.unitBranding,{});
let selectedDate = iso(today), shownMonth = new Date(today.getFullYear(),today.getMonth(),1), editingId=null;
const statusClass = s => s==='Done'?'done':s==='On Progress'?'progress':'pending';
const statusLabel = s => s==='Done'?'Selesai':s==='On Progress'?'On Progress':'Pending';
const toast = msg => { const el=$('#toast'); if(!el)return; el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600); };
const save = () => {write(KEYS.activities,activities);write(KEYS.reminders,reminders);write(KEYS.notes,notes);write(KEYS.units,units);write(KEYS.profile,profile);write(KEYS.unitBranding,unitBranding);write(KEYS.workdays,workdayStatuses);};
function applyTheme(theme){document.body.dataset.theme=theme;document.documentElement.dataset.theme=theme;const b=$('#themeToggle');if(b){b.innerHTML=icon(theme==='dark'?'light':'dark');b.title=theme==='dark'?'Aktifkan mode terang':'Aktifkan mode gelap';}try{localStorage.setItem(KEYS.theme,theme)}catch{}}
function updateDateTime(){const dateText=$('#todayText');if(!dateText)return;const now=new Date();const date=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now);const time=new Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now);dateText.textContent=`${date} · ${time}`;}
function shell(){
 const page=document.body.dataset.page||'dashboard';
 const links=[['dashboard','dashboard','Dashboard','index.html'],['calendar','calendar','Calendar','calendar.html'],['daily-report','report','Daily Report','daily-report.html'],['analytics','analytics','Analytics','analytics.html'],['reminder','reminder','Work Order & Reminder','reminder.html'],['documents','documents','Documents','documents.html'],['settings','settings','Settings','settings.html']];
 const nav=$('#sidebarNav'); if(nav) nav.innerHTML=links.map(([id,iconName,label,url])=>`<a href="${url}" class="${page===id?'active':''}"><span class="nav-icon">${icon(iconName)}</span>${label}</a>`).join('');
 updateDateTime(); if(!window.__dailyFlowClock){window.__dailyFlowClock=setInterval(updateDateTime,1000);}
 const greeting=$('#greeting');if(greeting){const h=new Date().getHours();greeting.textContent=(h<11?'Good Morning':h<15?'Good Afternoon':h<18?'Good Evening':'Good Night')+', '+(profile.name||'DailyFlow')+' ';const wave=document.createElement('span');wave.className='wave-hand';wave.textContent='👋';wave.setAttribute('aria-label','Waving hand');greeting.appendChild(wave);}
 const profileEl=$('.sidebar .profile');if(profileEl){profileEl.innerHTML=`${profile.photo?`<img class="profile-photo" src="${profile.photo}" alt="Foto profil">`:`<div class="avatar">${escapeHtml((profile.name||'DF').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div>`}<div class="profile-copy"><strong>${escapeHtml(profile.name||'Nama Pengguna')}</strong><small>${escapeHtml(profile.role||'Tambahkan jabatan di Settings')}</small></div>`;}
 // Theme is stored as a plain string (not JSON); read it directly so navigation never resets to light.
 let savedTheme='light';try{const storedTheme=localStorage.getItem(KEYS.theme);if(storedTheme==='dark'||storedTheme==='light')savedTheme=storedTheme;}catch{}
 applyTheme(savedTheme);
 $('#themeToggle')?.addEventListener('click',()=>applyTheme(document.body.dataset.theme==='dark'?'light':'dark'));
 $('#globalSearch')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();$$('[data-searchable]').forEach(el=>el.hidden=!el.textContent.toLowerCase().includes(q));});
}
function statsMarkup(){const total=activities.length,done=activities.filter(a=>a.status==='Done').length,prog=activities.filter(a=>a.status==='On Progress').length,pending=activities.filter(a=>a.status==='Pending').length;const pct=total?Math.round(done/total*100):0;return `<div class="grid stats"><div class="stat"><div class="stat-top">Total Activities <span class="stat-icon">${icon('total')}</span></div><strong>${total}</strong><small>Seluruh aktivitas yang tercatat</small></div><div class="stat"><div class="stat-top">Completed <span class="stat-icon">${icon('done')}</span></div><strong>${done}</strong><small>${pct}% completion</small></div><div class="stat"><div class="stat-top">On Progress <span class="stat-icon">${icon('progress')}</span></div><strong>${prog}</strong><small>Aktivitas berjalan</small></div><div class="stat"><div class="stat-top">Pending <span class="stat-icon">${icon('pending')}</span></div><strong>${pending}</strong><small>Perlu ditindaklanjuti</small></div></div>`;}
function calendarMarkup(targetMonth=shownMonth, compact=false){const year=targetMonth.getFullYear(),month=targetMonth.getMonth(),first=new Date(year,month,1),start=(first.getDay()+6)%7,days=new Date(year,month+1,0).getDate(),prevDays=new Date(year,month,0).getDate();let html=`<div class="calendar-head"><button type="button" data-month="-1" aria-label="Bulan sebelumnya">‹</button><strong>${monthName(targetMonth)}</strong><button type="button" data-month="1" aria-label="Bulan berikutnya">›</button></div><div class="calendar-grid">${['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(x=>`<div class="weekday">${x}</div>`).join('')}`;
 for(let i=0;i<42;i++){let n=i-start+1,d,other=false;if(n<1){d=new Date(year,month-1,prevDays+n);other=true;}else if(n>days){d=new Date(year,month+1,n-days);other=true;}else d=new Date(year,month,n);const key=iso(d),has=activities.some(a=>a.date===key),hasCreative=creativeEventsForDate(key).length>0,wd=workdayStatuses.find(x=>x.date===key),wdClass=wd?'workday-'+String(wd.type).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''):'',cls=['day',other?'muted-day':'',key===selectedDate?'selected':'',key===iso(today)?'today':'',has?'has-items':'',hasCreative?'has-creative-events':'',wd?'has-workday-status':'',wdClass].filter(Boolean).join(' ');const dots=[];if(has)dots.push('<i class="calendar-dot activity-calendar-dot" title="Aktivitas manual"></i>');if(hasCreative)dots.push('<i class="calendar-dot creative-calendar-dot" title="Event Kreatif Desain"></i>');if(wd)dots.push('<i class="calendar-dot workday-dot" title="'+escapeHtml(wd.type)+'"></i>');html+=`<button type="button" class="${cls}" data-date="${key}" title="${wd?escapeHtml(wd.type):''}">${d.getDate()}${dots.length?`<span class="calendar-dot-row">${dots.slice(0,4).join('')}</span>`:''}</button>`;if(i>=start+days-1 && i>=34)break;}
 return html+'</div>';
}
function activityRow(a){const photo=a.photos?.[0],brand=unitBranding[a.unit]?.logo;return `<div class="activity" data-searchable><div class="activity-time">${escapeHtml(a.time||'—')}</div><div><div class="activity-name">${escapeHtml(a.name)}</div><div class="activity-desc">${escapeHtml(a.description||a.output||'Tanpa deskripsi')}</div><div class="activity-meta"><span class="tag blue">${brand?`<img class="activity-unit-logo" src="${brand}" alt="">`:''}${escapeHtml(a.unit||'Personal / Other')}</span><span class="tag ${statusClass(a.status)}">${statusLabel(a.status)}</span></div></div>${photo?`<img class="photo-thumb" src="${photo}" alt="Dokumentasi">`:`<div class="photo-thumb" style="display:grid;place-items:center;color:var(--muted)">＋</div>`}</div>`;}
function reminderCard(r){return `<div class="reminder-card" data-searchable><div class="reminder-symbol">${icon(r.done?'done':'reminder')}</div><div style="min-width:0;flex:1"><strong>${escapeHtml(r.title)}</strong><small>${fmtDate(r.date,{day:'numeric',month:'short'})} · ${escapeHtml(r.time||'')}</small><div style="margin-top:6px;display:flex;gap:5px;align-items:center"><span class="tag ${r.done?'done':r.priority==='High'?'pending':r.priority==='Medium'?'progress':'done'}">${r.done?'Done':escapeHtml(r.priority)}</span><button class="btn small" data-reminder-toggle="${r.id}">${r.done?'Batal':'Selesai'}</button></div></div></div>`;}
function renderDashboard(){const root=$('#pageContent');if(!root)return;root.innerHTML=`${statsMarkup()}<div class="grid two-col"><section class="panel"><div class="panel-head"><div><h2>Calendar</h2><p>Pilih tanggal untuk melihat aktivitas yang tercatat</p></div><button class="btn small" onclick="location.href='calendar.html'">Buka Calendar ↗</button></div><div id="dashboardCalendar">${calendarMarkup(shownMonth,true)}</div></section><section class="panel"><div class="panel-head"><div><h2>Today’s Activities</h2><p>${fmtDate(selectedDate,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p></div><button class="btn primary small" data-open-activity>＋ Tambah</button></div><div class="activity-list" id="dashboardActivities">${activities.filter(a=>a.date===selectedDate).sort((a,b)=>(a.time||'').localeCompare(b.time||'')).map(activityRow).join('')||'<div class="empty">Belum ada aktivitas pada tanggal ini.</div>'}</div></section></div><section class="panel" style="margin-top:14px"><div class="panel-head"><div><h2>Work Order &amp; Reminder</h2><p>Hal yang perlu kamu tindak lanjuti</p></div><a class="btn small" href="reminder.html">Lihat Semua ↗</a></div><div class="reminder-list">${reminders.filter(r=>!r.done).slice(0,3).map(reminderCard).join('')||'<div class="empty">Tidak ada reminder aktif.</div>'}</div></section><section class="panel" style="margin-top:14px"><div class="panel-head"><div><h2>Quick Notes</h2><p>Notes singkat untuk hari ini</p></div></div><div class="form-grid"><div class="field"><label>${icon('win','note-label-icon')} TODAY'S WIN</label><textarea id="noteWin" placeholder="Apa pencapaian utama hari ini?">${escapeHtml(notes.win)}</textarea></div><div class="field"><label>${icon('challenge','note-label-icon')} CHALLENGE</label><textarea id="noteChallenge" placeholder="Kendala dan dampaknya...">${escapeHtml(notes.challenge)}</textarea></div><div class="field full"><label>${icon('focus','note-label-icon')} NEXT FOCUS</label><textarea id="noteFocus" placeholder="Priority berikutnya...">${escapeHtml(notes.focus)}</textarea></div></div><div class="form-actions"><button class="btn primary" id="saveNotes">Simpan Notes</button></div></section>`;
 root.querySelectorAll('[data-month]').forEach(b=>b.addEventListener('click',()=>{shownMonth=new Date(shownMonth.getFullYear(),shownMonth.getMonth()+Number(b.dataset.month),1);renderDashboard();}));
 root.querySelectorAll('[data-date]').forEach(b=>b.addEventListener('click',()=>{selectedDate=b.dataset.date;renderDashboard();}));
 root.querySelector('[data-open-activity]')?.addEventListener('click',()=>openActivityModal());
 root.querySelector('#saveNotes')?.addEventListener('click',()=>{notes={win:$('#noteWin').value,challenge:$('#noteChallenge').value,focus:$('#noteFocus').value};save();toast('Notes berhasil disimpan.');});
 bindReminderToggles(root);
}
function bindReminderToggles(root=document){root.querySelectorAll('[data-reminder-toggle]').forEach(b=>b.addEventListener('click',()=>{const r=reminders.find(x=>x.id===b.dataset.reminderToggle);if(!r)return;r.done=!r.done;let activityMessage='';if(r.done&&r.addToActivities&&!r.completionActivityId){const activity={id:crypto.randomUUID(),date:r.date||iso(today),time:r.time||'',name:r.title,description:'Dibuat otomatis dari reminder yang ditandai selesai.',output:'Reminder selesai',status:'Done',priority:r.priority||'Medium',unit:units[0]||'Personal / Other',notes:r.notes||'',photos:[],sourceReminderId:r.id};activities.push(activity);r.completionActivityId=activity.id;activityMessage=' Aktivitas juga ditambahkan.';}else if(!r.done&&r.completionActivityId){activities=activities.filter(a=>a.id!==r.completionActivityId);r.completionActivityId='';activityMessage=' Aktivitas otomatis terkait dihapus.';}try{save();}catch(err){r.done=!r.done;toast('Perubahan gagal disimpan. Periksa ruang penyimpanan browser.');return;}syncNewReminderToGoogleCalendar(r,r.done?'deleteReminder':'upsertReminder');renderPage();toast((r.done?'Reminder selesai; event Google Calendar dihapus.':'Reminder diaktifkan kembali; event Google Calendar dibuat.')+activityMessage);}));}
function openActivityModal(id=null){editingId=id;const old=activities.find(a=>a.id===id)||{date:selectedDate,time:'09:00',name:'',description:'',output:'',status:'On Progress',priority:'Medium',unit:units[0]||'Personal / Other',notes:'',photos:[]};let modal=$('#activityModal');if(!modal){modal=document.createElement('div');modal.id='activityModal';modal.className='modal-backdrop';modal.innerHTML=`<div class="modal"><div class="modal-title"><h2 id="activityModalTitle">Add Activity</h2><button class="icon-btn" data-close-modal>×</button></div><form id="activityForm"><div class="form-grid"><div class="field"><label>Date *</label><input name="date" type="date" required></div><div class="field"><label>Time</label><input name="time" type="time"></div><div class="field full"><label>Activity Name *</label><input name="name" required placeholder="Contoh: Update website"></div><div class="field"><label>Business Unit</label><select name="unit"></select></div><div class="field"><label>Status</label><select name="status"><option>On Progress</option><option>Done</option><option>Pending</option></select></div><div class="field"><label>Priority</label><select name="priority"><option>Low</option><option>Medium</option><option>High</option></select></div><div class="field"><label>Output / Result</label><input name="output" placeholder="Hasil pekerjaan"></div><div class="field full"><label>Activity Description</label><textarea name="description" placeholder="Detail pekerjaan..."></textarea></div><div class="field full"><label>Notes</label><textarea name="notes" placeholder="Notes tambahan..."></textarea></div><div class="field full"><label>Dokumentasi foto</label><input name="photos" type="file" accept="image/*" multiple><div class="paste-photo-hint" tabindex="0">📋 <strong>Paste screenshot di sini</strong><br><small class="muted">Tekan Ctrl + V setelah mengambil screenshot, atau gunakan Upload Photo.</small><div id="existingPhotos" class="bar-legend"></div></div></div></div><div class="form-actions"><button type="button" class="btn" data-close-modal>Batal</button><button class="btn primary" type="submit">Simpan Aktivitas</button></div></form></div>`;document.body.append(modal);modal.querySelectorAll('[data-close-modal]').forEach(b=>b.addEventListener('click',()=>modal.classList.remove('open')));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});modal.querySelector('#activityForm').addEventListener('submit',saveActivityForm);}
 const form=$('#activityForm',modal);form.reset();$('#activityModalTitle',modal).textContent=id?'Edit Activity':'Add Activity';form.elements.date.value=old.date;form.elements.time.value=old.time;form.elements.name.value=old.name;form.elements.description.value=old.description;form.elements.output.value=old.output;form.elements.status.value=old.status;form.elements.priority.value=old.priority;form.elements.notes.value=old.notes;form.elements.unit.innerHTML=units.map(u=>`<option ${u===old.unit?'selected':''}>${escapeHtml(u)}</option>`).join('');$('#existingPhotos',modal).innerHTML=(old.photos||[]).map(src=>`<img src="${src}" class="photo-thumb">`).join('');modal.classList.add('open');
}
async function saveActivityForm(e){e.preventDefault();const f=e.currentTarget;const old=activities.find(a=>a.id===editingId);let photos=old?.photos||[];const input=f.elements.photos;const newFiles=[...(input.files||[])].filter(file=>file.type.startsWith('image/'));for(const file of newFiles){photos.push(await fileToDataURL(file));}const obj={id:editingId||crypto.randomUUID(),date:f.elements.date.value,time:f.elements.time.value,name:f.elements.name.value.trim(),unit:f.elements.unit.value,status:f.elements.status.value,priority:f.elements.priority.value,output:f.elements.output.value.trim(),description:f.elements.description.value.trim(),notes:f.elements.notes.value.trim(),photos};if(!obj.date||!obj.name){toast('Date dan nama aktivitas wajib diisi.');return;}if(editingId)activities=activities.map(a=>a.id===editingId?obj:a);else activities.push(obj);selectedDate=obj.date;shownMonth=new Date(obj.date+'T12:00:00');try{save();}catch(err){toast('Data gagal disimpan di browser. Kurangi ukuran/jumlah foto.');return;}let folderSaved=0,folderErrors=[];for(const file of newFiles){try{await saveWorkPhotoToProjectAssets(file,obj.date,obj.name);folderSaved++;}catch(err){folderErrors.push(err.message||'gagal menyimpan file');}}$('#activityModal').classList.remove('open');renderPage();toast(folderErrors.length?`Aktivitas tersimpan. ${folderSaved} foto masuk assets/work; foto lain gagal disimpan ke folder (${folderErrors[0]}).`:newFiles.length?`Aktivitas tersimpan dan ${newFiles.length} foto disalin ke assets/work.`:(editingId?'Aktivitas diperbarui.':'Aktivitas ditambahkan.'));}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('File tidak bisa dibaca.'));

    reader.onload = () => {
      const source = reader.result;

      if (file.type === 'image/svg+xml') {
        resolve(source);
        return;
      }

      const img = new Image();

      img.onerror = () => reject(new Error('Format gambar tidak dapat diproses.'));

      img.onload = () => {
        // Simpan foto dengan resolusi lebih tinggi.
        const max = 1600;
        const scale = Math.min(
          1,
          max / Math.max(img.naturalWidth, img.naturalHeight)
        );

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        try {
          resolve(canvas.toDataURL('image/webp', 0.85));
        } catch (err) {
          reject(err);
        }
      };

      img.src = source;
    };

    reader.readAsDataURL(file);
  });
}

function renderCalendarPage(){const root=$('#pageContent');if(!root)return;const localActivities=activities.filter(a=>a.date===selectedDate).sort((a,b)=>(a.time||'').localeCompare(b.time||''));const googleEvents=creativeEventsForDate(selectedDate).sort((a,b)=>(a.start||'').localeCompare(b.start||''));const googleStatus=creativeCalendarState==='loading'?'<div class="empty">Mengambil event Kreatif Desain dari Google Calendar…</div>':creativeCalendarState==='error'?`<div class="empty">Event Google Calendar belum dapat dimuat. ${escapeHtml(creativeCalendarError)} <button class="btn small" id="retryCreativeCalendar">Coba lagi</button></div>`:googleEvents.map(creativeEventRow).join('')||'<div class="empty">Tidak ada event Kreatif Desain pada tanggal ini.</div>';root.innerHTML=`<div class="grid two-col"><section class="panel"><div class="panel-head"><div><h2>Activity Calendar</h2><p>Pantau aktivitas, event, dan status harianmu dalam satu kalender.</p></div><button class="btn small" id="todayBtn">Today</button><button class="btn primary small" id="setTomorrowStatus">Jadwal Besok</button></div><div id="fullCalendar">${calendarMarkup(shownMonth)}</div><div class="footnote">Event Google Calendar hanya ditampilkan sebagai referensi dan tidak dapat diedit dari website.</div></section><section class="panel"><div class="panel-head"><div><h2 id="selectedDateTitle">${fmtDate(selectedDate,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</h2><p>Aktivitas dan event pada tanggal yang dipilih</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" id="setWorkdayStatus">Workday Status</button><button class="btn primary small" data-open-activity>＋ Tambah</button></div></div><div id="workdayStatusInfo"></div><div class="activity-list">${localActivities.map(a=>activityRow(a)+`<div class="row-actions" style="justify-content:flex-end;margin-top:-5px"><button class="btn small" data-edit="${a.id}">Edit</button><button class="btn danger small" data-delete="${a.id}">Hapus</button></div>`).join('')||'<div class="empty">Belum ada aktivitas manual.</div>'}</div><div class="creative-calendar-section"><div class="creative-calendar-heading"><h3>Event Kreatif Desain</h3><span class="tag purple">Google Calendar</span></div><div class="activity-list" id="creativeCalendarEvents">${googleStatus}</div></div></section></div>`;root.querySelectorAll('[data-month]').forEach(b=>b.addEventListener('click',()=>{shownMonth=new Date(shownMonth.getFullYear(),shownMonth.getMonth()+Number(b.dataset.month),1);renderCalendarPage();}));root.querySelectorAll('[data-date]').forEach(b=>b.addEventListener('click',()=>{selectedDate=b.dataset.date;renderCalendarPage();}));root.querySelector('#todayBtn').onclick=()=>{selectedDate=iso(today);shownMonth=new Date(today.getFullYear(),today.getMonth(),1);renderCalendarPage();};root.querySelector('#setTomorrowStatus').onclick=()=>{const tomorrow=new Date(today);tomorrow.setDate(tomorrow.getDate()+1);openWorkdayStatusModal(iso(tomorrow));};root.querySelector('[data-open-activity]').onclick=()=>openActivityModal();root.querySelector('#setWorkdayStatus').onclick=()=>openWorkdayStatusModal(selectedDate);const retry=root.querySelector('#retryCreativeCalendar');if(retry)retry.onclick=()=>{creativeCalendarRequestStarted=false;loadCreativeCalendarEvents(true);};renderWorkdayStatusInfo(root,selectedDate);bindActivityActions(root);}

function renderWorkdayStatusInfo(root,date){const box=root.querySelector('#workdayStatusInfo');if(!box)return;const item=workdayStatuses.find(x=>x.date===date);if(!item){box.innerHTML='';return;}box.innerHTML=`<div class="workday-status-card workday-card-${String(item.type).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}"><strong>${escapeHtml(item.type)}</strong>${item.sourceDate?`<div class="muted">Hari kerja pengganti dari: ${fmtDate(item.sourceDate,{day:'numeric',month:'long',year:'numeric'})}</div>`:''}${item.note?`<div class="muted">${escapeHtml(item.note)}</div>`:''}<button class="btn small" id="removeWorkdayStatus">Hapus status</button></div>`;box.querySelector('#removeWorkdayStatus').onclick=()=>{workdayStatuses=workdayStatuses.filter(x=>x.date!==date);save();renderPage();toast('Status hari kerja dihapus.');};}
function openWorkdayStatusModal(date){let modal=$('#workdayStatusModal');if(!modal){modal=document.createElement('div');modal.id='workdayStatusModal';modal.className='modal-backdrop';modal.innerHTML=`<div class="modal"><div class="modal-title"><h2>Workday Status</h2><button class="icon-btn" data-close-workday>×</button></div><form id="workdayStatusForm"><div class="form-grid"><div class="field full"><label>Tanggal *</label><input name="date" type="date" required></div><div class="field full"><label>Status hari *</label><select name="type"><option>Working Day</option><option>Day Off</option><option>Day Payment</option><option>Public Holiday</option><option>Sick Leave</option><option>Annual Leave</option></select></div><div class="field full" id="sourceDateField"><label>Tanggal masuk kerja asal (untuk Day Payment)</label><input name="sourceDate" type="date"><small class="muted">Tanggal saat kamu masuk kerja dan mendapatkan hari pengganti.</small></div><div class="field full"><label>Catatan / alasan</label><textarea name="note" placeholder="Contoh: Pengganti masuk saat event hari Minggu"></textarea></div></div><div class="form-actions"><button type="button" class="btn" data-close-workday>Batal</button><button class="btn primary" type="submit">Simpan Status</button></div></form></div>`;document.body.append(modal);modal.querySelectorAll('[data-close-workday]').forEach(b=>b.onclick=()=>modal.classList.remove('open'));modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open');};const form=modal.querySelector('#workdayStatusForm');form.elements.type.onchange=()=>{modal.querySelector('#sourceDateField').style.display=form.elements.type.value==='Day Payment'?'':'none';};form.onsubmit=e=>{e.preventDefault();const obj={date:form.elements.date.value,type:form.elements.type.value,sourceDate:form.elements.type.value==='Day Payment'?form.elements.sourceDate.value:'',note:form.elements.note.value.trim()};if(obj.type==='Day Payment'&&!obj.sourceDate){toast('Isi tanggal masuk kerja asal untuk Day Payment.');return;}workdayStatuses=workdayStatuses.filter(x=>x.date!==obj.date);workdayStatuses.push(obj);try{save();modal.classList.remove('open');selectedDate=obj.date;shownMonth=new Date(obj.date+'T12:00:00');renderPage();toast('Status hari kerja disimpan.');}catch(err){toast('Status gagal disimpan.');}};}const existing=workdayStatuses.find(x=>x.date===date);modal.querySelector('#workdayStatusForm').elements.date.value=date;modal.querySelector('#workdayStatusForm').elements.type.value=existing?.type||'Working Day';modal.querySelector('#workdayStatusForm').elements.sourceDate.value=existing?.sourceDate||'';modal.querySelector('#workdayStatusForm').elements.note.value=existing?.note||'';modal.querySelector('#sourceDateField').style.display=modal.querySelector('#workdayStatusForm').elements.type.value==='Day Payment'?'':'none';modal.classList.add('open');}
function bindActivityActions(root=document){root.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openActivityModal(b.dataset.edit));root.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{if(confirm('Hapus aktivitas ini?')){activities=activities.filter(a=>a.id!==b.dataset.delete);save();renderPage();toast('Aktivitas dihapus.');}});}
function renderDailyReport(){const root=$('#pageContent');if(!root)return;root.innerHTML=`<section class="panel"><div class="panel-head"><div><h2>Daily Report</h2><p>Catat pekerjaan dengan cepat. Foto dokumentasi dapat ditambahkan ke setiap aktivitas.</p></div><button class="btn primary" data-open-activity>＋ Add Activity</button></div><div class="filters" style="margin-bottom:14px"><input id="reportSearch" placeholder="Cari aktivitas..."><input id="reportDate" type="date"><select id="reportUnit"><option value="">Semua unit bisnis</option>${units.map(u=>`<option>${escapeHtml(u)}</option>`).join('')}</select><select id="reportStatus"><option value="">Semua status</option><option>Done</option><option>On Progress</option><option>Pending</option></select><button class="btn" id="clearFilters">Reset</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Aktivitas</th><th>Business Unit</th><th>Status</th><th>Priority</th><th>Dokumentasi</th><th>Aksi</th></tr></thead><tbody id="reportRows"></tbody></table></div><p class="footnote">Data disimpan di browser perangkat ini sampai database cloud dihubungkan.</p></section><section class="panel import-panel"><div class="panel-head import-heading"><div class="import-heading-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>import</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3v12m-4-4l4 4l4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></g></svg></div><div><h2>Import Center</h2><p>Unduh template resmi Daily Reports, isi data, lalu upload kembali.</p></div></div><div class="import-step import-template-step"><div class="step-heading"><span class="step-number">1</span><div><h3>Download Template</h3><p>Gunakan template resmi agar data terbaca dengan benar. Template Excel menyediakan dropdown untuk Status, Priority, dan Business Unit.</p></div></div><div class="template-layout"><div class="template-actions"><a class="template-card template-card-primary" href="templates/dailyflow-import-template.xlsx" download><span class="template-file-icon excel-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><title>excel</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M8 15V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-9"/><path d="M31 15h3m-6 8h6m-6 8h6"/><path stroke-linejoin="round" d="M4 15h18v18H4zm6 6l6 6m0-6l-6 6"/></g></svg></span><span class="template-card-copy"><strong>Template Excel</strong><small>Format .xlsx</small></span><span class="template-download"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><title>arrow-down-outline-bold</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"><path d="M12 4v16"/><path d="m7 15 5 5 5 -5"/></g></svg></span></a><a class="template-card" href="templates/dailyflow-import-template.csv" download><span class="template-file-icon csv-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title>file-csv</title><path fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0h160v128c0 17.7 14.3 32 32 32h128v144H176c-35.3 0-64 28.7-64 64v144H64c-35.3 0-64-28.7-64-64zm384 64H256V0zM200 352h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40h-16c-22.1 0-40-17.9-40-40v-80c0-22.1 17.9-40 40-40m133.1 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16h-34.9c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1m98.9 0c8.8 0 16 7.2 16 16v31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66V368c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V368c0-8.8 7.2-16 16-16"/></svg></span><span class="template-card-copy"><strong>Template CSV</strong><small>Format .csv</small></span><span class="template-download"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><title>arrow-down-outline-bold</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"><path d="M12 4v16"/><path d="m7 15 5 5 5 -5"/></g></svg></span></a></div><div class="column-guide"><div class="column-guide-title"><span class="guide-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>column-line</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v16m6-16v16M5 20h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1"/></svg></span><div><strong>Format Kolom</strong><p>Isi satu aktivitas per baris dengan kolom berikut:</p></div></div><div class="column-chips"><span>Date</span><span>Activity Name</span><span>Status</span><span>Format Date</span><span>YYYY-MM-DD</span></div></div></div></div><div class="import-step import-upload-step"><div class="step-heading"><span class="step-number">2</span><div><h3>Upload File</h3><p>Pilih file Excel (.xlsx) atau CSV yang sudah diisi. Pastikan kolom sesuai template.</p></div></div><label class="import-dropzone" id="importDropzone" for="importFile"><span class="upload-cloud" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>drag-02</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m8.492 16.77l.248-.242c.561-.55.88-1.302.889-2.09l.05-5.143c.006-.697.231-1.434.864-1.724c.957-.437 2.14-.19 2.352 1.856l.328 1.729l5.58-6.701c1.167-1.102 3.24.29 2.336 2.016l-3.281 3.95c1.28.86 6.004 5.75 2.178 8.24c-.552.48-1.858 1.178-2.998 1.54c-1.087.346-1.77 1.53-2.104 1.8M9.484 3.514c0 .836.651 1.514 1.455 1.514c.803 0 1.455-.678 1.455-1.514S11.742 2 10.939 2c-.804 0-1.455.678-1.455 1.514m0 0H8.84l-.77.072M3.99 8.943c.836-.014 1.474.642 1.487 1.453c.013.812-.61 1.51-1.447 1.524a1.52 1.52 0 0 1-1.532-1.483c-.013-.811.655-1.48 1.492-1.494m0 0l.09-1.333m1.693-2.96l-.327.307l-.29.313"/></svg></span><strong id="importDropTitle">Drag &amp; drop file di sini</strong><span class="drop-subtitle">atau klik tombol pilih file</span><span class="btn primary choose-file-btn"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><title>file</title><path fill="currentColor" d="M13 9V3.5L18.5 9M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/></svg><span>Pilih File</span></span><span class="drop-note" id="importFileName">Format yang didukung: .xlsx, .xls, .csv</span><input id="importFile" type="file" accept=".csv,.xlsx,.xls"></label><div id="importPreview" class="import-preview"></div></div><button class="btn primary import-submit" id="importConfirm" disabled><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><title>import</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3v12m-4-4l4 4l4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></g></svg><span>Import Data</span></button><div class="import-notice"><span class="notice-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>information</title><path fill="currentColor" d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg></span><div><strong>Catatan Penting</strong><ul><li>Jangan mengubah nama kolom di baris pertama.</li><li>Format tanggal: YYYY-MM-DD (contoh: 2026-10-13).</li><li>Status: Done, On Progress, Pending. Priority: Low, Medium, High.</li><li>Template Excel menyediakan dropdown Status, Priority, dan Business Unit; CSV tidak mendukung dropdown.</li><li>Setiap baris mewakili satu aktivitas.</li></ul></div></div></section>`;
 const filter=()=>{const q=$('#reportSearch').value.toLowerCase(),date=$('#reportDate').value,unit=$('#reportUnit').value,status=$('#reportStatus').value;const list=activities.filter(a=>(!q||[a.name,a.description,a.output,a.notes].join(' ').toLowerCase().includes(q))&&(!date||a.date===date)&&(!unit||a.unit===unit)&&(!status||a.status===status)).sort((a,b)=>b.date.localeCompare(a.date)||(a.time||'').localeCompare(b.time||''));$('#reportRows').innerHTML=list.map(a=>`<tr><td>${fmtDate(a.date,{day:'2-digit',month:'short',year:'numeric'})}<br><span class="muted">${escapeHtml(a.time||'')}</span></td><td><strong>${escapeHtml(a.name)}</strong><br><span class="muted">${escapeHtml(a.description||a.output||'')}</span></td><td>${escapeHtml(a.unit)}</td><td><span class="tag ${statusClass(a.status)}">${statusLabel(a.status)}</span></td><td>${escapeHtml(a.priority)}</td><td>${a.photos?.length||0} foto</td><td><div class="row-actions"><button class="btn small" data-edit="${a.id}">Edit</button><button class="btn danger small" data-delete="${a.id}">Hapus</button></div></td></tr>`).join('')||'<tr><td colspan="7"><div class="empty">Tidak ada aktivitas yang cocok.</div></td></tr>';bindActivityActions(root);};
 ['reportSearch','reportDate','reportUnit','reportStatus'].forEach(id=>$('#'+id).addEventListener('input',filter));$('#clearFilters').onclick=()=>{['reportSearch','reportDate','reportUnit','reportStatus'].forEach(id=>$('#'+id).value='');filter();};root.querySelector('[data-open-activity]').onclick=()=>openActivityModal();filter();setupImport();
}
function setupImport(){let parsed=[];const fileInput=$('#importFile'),preview=$('#importPreview'),confirmBtn=$('#importConfirm'),dropzone=$('#importDropzone'),fileName=$('#importFileName'),dropTitle=$('#importDropTitle');const loadSelectedFile=()=>fileInput.dispatchEvent(new Event('change'));['dragenter','dragover'].forEach(type=>dropzone.addEventListener(type,e=>{e.preventDefault();dropzone.classList.add('is-dragging');}));['dragleave','drop'].forEach(type=>dropzone.addEventListener(type,e=>{e.preventDefault();dropzone.classList.remove('is-dragging');}));dropzone.addEventListener('drop',e=>{const file=e.dataTransfer?.files?.[0];if(!file)return;const dt=new DataTransfer();dt.items.add(file);fileInput.files=dt.files;loadSelectedFile();});fileInput.addEventListener('change',async()=>{parsed=[];confirmBtn.disabled=true;preview.innerHTML='';const file=fileInput.files[0];if(!file){fileName.textContent='Format yang didukung: .xlsx, .xls, .csv';dropTitle.textContent='Drag & drop file di sini';return;}fileName.textContent=file.name;dropTitle.textContent='File siap diproses';try{let rows;if(file.name.toLowerCase().endsWith('.csv')){const txt=await file.text();rows=parseCSV(txt);}else{if(!window.XLSX){await loadXLSX();}const buf=await file.arrayBuffer(),wb=XLSX.read(buf,{type:'array'});rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:''});}if(!rows.length)throw new Error('File tidak memiliki baris data.');parsed=rows.map(mapImportedRow).filter(a=>a.date&&a.name);preview.innerHTML=`<strong>${parsed.length} baris valid</strong> dari ${rows.length} baris terbaca.<div class="table-wrap" style="margin-top:10px;max-height:220px"><table class="data-table"><thead><tr><th>Date</th><th>Aktivitas</th><th>Business Unit</th><th>Status</th></tr></thead><tbody>${parsed.slice(0,8).map(a=>`<tr><td>${escapeHtml(a.date)}</td><td>${escapeHtml(a.name)}</td><td>${escapeHtml(a.unit)}</td><td>${escapeHtml(a.status)}</td></tr>`).join('')}</tbody></table></div>${parsed.length>8?`<small class="muted">Menampilkan 8 baris pertama.</small>`:''}`;confirmBtn.disabled=!parsed.length;}catch(err){preview.textContent='Gagal membaca file: '+err.message;}});confirmBtn.onclick=()=>{let added=0,skipped=0;parsed.forEach(a=>{const dup=activities.some(x=>x.date===a.date&&x.name.toLowerCase()===a.name.toLowerCase());if(dup){skipped++;return;}activities.push({...a,id:crypto.randomUUID(),photos:[]});added++;});save();toast(`${added} aktivitas diimpor${skipped?`, ${skipped} duplikat dilewati`:''}.`);renderPage();};}
function parseCSV(text){const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(x=>x.trim());if(!lines.length)return[];const parseLine=line=>{let out=[],v='',q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'&&line[i+1]==='"'&&q){v+='"';i++;}else if(c==='"')q=!q;else if(c===','&&!q){out.push(v);v='';}else v+=c;}out.push(v);return out;};const headers=parseLine(lines[0]).map(x=>x.trim());return lines.slice(1).map(line=>{const vals=parseLine(line);return Object.fromEntries(headers.map((h,i)=>[h,vals[i]??'']));});}
function mapImportedRow(row){const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');const get=names=>{const key=Object.keys(row).find(k=>names.includes(norm(k)));return key?row[key]:'';};let rawDate=get(['tanggal','date','activitydate','reportdate']);let date='';if(rawDate instanceof Date)date=iso(rawDate);else if(typeof rawDate==='number'&&rawDate>20000){date=iso(new Date(Date.UTC(1899,11,30)+rawDate*86400000));}else{const s=String(rawDate||'').trim();let m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);if(m){const a=+m[1],b=+m[2],y=+m[3];date=iso(new Date(y,b>12?a:b-1,b>12?b:a));}else if(/^\d{4}-\d{2}-\d{2}$/.test(s))date=s;else{const d=new Date(s);if(!Number.isNaN(+d))date=iso(d);}}const rawStatus=String(get(['status','progress','state'])||'Pending').toLowerCase();const status=rawStatus.includes('done')||rawStatus.includes('selesai')||rawStatus.includes('complete')?'Done':rawStatus.includes('progress')||rawStatus.includes('proses')?'On Progress':'Pending';const rawUnit=String(get(['businessunit','unit','divisi','brandproject','project'])||units[0]||'Personal / Other');const unit=units.find(u=>u.toLowerCase()===rawUnit.toLowerCase())||rawUnit; if(!units.includes(unit)){units.push(unit);write(KEYS.units,units);}return {date,name:String(get(['namaaktivitas','aktivitas','activity','task','nama','title'])||'').trim(),description:String(get(['deskripsiaktivitas','deskripsi','description','detail'])||''),output:String(get(['outputhasil','output','hasil','result'])||''),status,priority:String(get(['prioritas','priority'])||'Medium'),unit,time:String(get(['waktu','time','jam'])||''),notes:String(get(['notes','catatan','keterangan'])||'')};}
function loadXLSX(){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';s.onload=resolve;s.onerror=()=>reject(new Error('Library XLSX tidak dapat dimuat. Coba CSV atau pastikan internet aktif.'));document.head.appendChild(s);});}
function renderAnalytics(){const root=$('#pageContent');if(!root)return;const month=shownMonth.getMonth(),year=shownMonth.getFullYear(),monthly=activities.filter(a=>{const d=parseDate(a.date);return d&&d.getMonth()===month&&d.getFullYear()===year;});const done=monthly.filter(a=>a.status==='Done').length,pct=monthly.length?Math.round(done/monthly.length*100):0;const byUnit=units.map(u=>({u,n:monthly.filter(a=>a.unit===u).length})).filter(x=>x.n).sort((a,b)=>b.n-a.n);root.innerHTML=`<div class="section-title"><div><h2>Performance Overview</h2><p>Ringkasan produktivitas berdasarkan bulan yang dipilih.</p></div><div class="filters"><button class="btn" id="analyticsPrev">‹</button><strong>${monthName(shownMonth)}</strong><button class="btn" id="analyticsNext">›</button></div></div><div class="grid stats"><div class="stat"><div class="stat-top">Total Activities</div><strong>${monthly.length}</strong><small>Dalam bulan ini</small></div><div class="stat"><div class="stat-top">Selesai</div><strong>${done}</strong><small>${pct}% completion</small></div><div class="stat"><div class="stat-top">On Progress</div><strong>${monthly.filter(a=>a.status==='On Progress').length}</strong><small>Masih berjalan</small></div><div class="stat"><div class="stat-top">Business Unit</div><strong>${byUnit.length}</strong><small>Unit dengan aktivitas</small></div></div><div class="grid two-col"><section class="panel"><div class="panel-head"><div><h2>Activities by Day</h2><p>Jumlah aktivitas harian pada bulan terpilih</p></div></div><div class="chart-box"><canvas id="dailyChart"></canvas></div><div class="bar-legend"><span><i class="legend-dot" style="background:var(--green)"></i>Selesai</span><span><i class="legend-dot" style="background:var(--amber)"></i>On Progress</span><span><i class="legend-dot" style="background:var(--red)"></i>Pending</span></div></section><section class="panel"><div class="panel-head"><div><h2>Business Unit Distribution</h2><p>Aktivitas berdasarkan unit</p></div></div><div class="chart-box"><canvas id="unitChart"></canvas></div><div class="bar-legend">${byUnit.map(x=>`<span>${escapeHtml(x.u)} (${x.n})</span>`).join(' ')||'Belum ada data bulan ini.'}</div></section></div><section class="panel" style="margin-top:14px"><div class="panel-head"><div><h2>Summary by Business Unit</h2><p>Perbandingan aktivitas selesai dan total aktivitas.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Business Unit</th><th>Total</th><th>Selesai</th><th>On Progress</th><th>Pending</th><th>Completion</th></tr></thead><tbody>${units.map(u=>{const arr=monthly.filter(a=>a.unit===u),d=arr.filter(a=>a.status==='Done').length;return `<tr><td>${escapeHtml(u)}</td><td>${arr.length}</td><td>${d}</td><td>${arr.filter(a=>a.status==='On Progress').length}</td><td>${arr.filter(a=>a.status==='Pending').length}</td><td>${arr.length?Math.round(d/arr.length*100):0}%</td></tr>`}).join('')}</tbody></table></div></section>`;
 $('#analyticsPrev').onclick=()=>{shownMonth=new Date(year,month-1,1);renderAnalytics();};$('#analyticsNext').onclick=()=>{shownMonth=new Date(year,month+1,1);renderAnalytics();};drawCharts(monthly,year,month,byUnit);}
function drawCharts(monthly,year,month,byUnit){const colors=['#208566','#d9902d','#dc5a63','#4786c6','#8d78ca','#54c7a0','#c17b58'];const setup=canvas=>{const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;canvas.width=Math.max(1,rect.width*dpr);canvas.height=Math.max(1,rect.height*dpr);const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);return {ctx,w:rect.width,h:rect.height};};const c=$('#dailyChart');if(c){const {ctx,w,h}=setup(c),days=new Date(year,month+1,0).getDate(),vals=Array.from({length:days},(_,i)=>{const date=iso(new Date(year,month,i+1));return ['Done','On Progress','Pending'].map(s=>monthly.filter(a=>a.date===date&&a.status===s).length)}),max=Math.max(1,...vals.map(v=>v.reduce((a,b)=>a+b,0)));ctx.strokeStyle=getComputedStyle(document.body).getPropertyValue('--line');ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--muted');ctx.font='10px DM Sans';for(let j=0;j<4;j++){let y=12+(h-38)*j/3;ctx.beginPath();ctx.moveTo(25,y);ctx.lineTo(w-5,y);ctx.stroke();ctx.fillText(String(Math.ceil(max*(3-j)/3)),2,y+3);}const step=(w-34)/days,bw=Math.max(2,step*.55);vals.forEach((v,i)=>{let ybase=h-25,x=28+i*step;v.forEach((n,k)=>{const bh=n/max*(h-55);ybase-=bh;ctx.fillStyle=colors[k];ctx.fillRect(x,ybase,bw,bh);});if(days<18||(i+1)%5===0){ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--muted');ctx.fillText(String(i+1),x,h-8);}});}
 const u=$('#unitChart');if(u){const {ctx,w,h}=setup(u),total=byUnit.reduce((s,x)=>s+x.n,0);let start=-Math.PI/2;const cx=w/2,cy=h/2,r=Math.min(w,h)*.34;byUnit.forEach((x,i)=>{const end=start+(total?x.n/total:1/Math.max(1,byUnit.length))*Math.PI*2;ctx.beginPath();ctx.arc(cx,cy,r,start,end);ctx.arc(cx,cy,r*.62,end,start,true);ctx.closePath();ctx.fillStyle=colors[i%colors.length];ctx.fill();start=end;});ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--ink');ctx.textAlign='center';ctx.font='800 22px Manrope';ctx.fillText(String(total),cx,cy+3);ctx.font='10px DM Sans';ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--muted');ctx.fillText('Aktivitas',cx,cy+18);}}
function renderReminders(){
 const root=$('#pageContent');if(!root)return;
 root.innerHTML=`<section class="panel"><div class="panel-head"><div><h2>Work Order &amp; Reminder</h2><p>Kelola follow-up, ide, deadline, dan pekerjaan berikutnya.</p></div><button class="btn primary" id="addReminder">＋ Add Reminder</button></div><div class="filters" style="margin-bottom:14px"><select id="reminderFilter"><option value="active">Aktif</option><option value="all">Semua</option><option value="done">Selesai</option></select><input id="reminderSearch" placeholder="Cari reminder..."></div><div id="reminderRows" class="grid three-col"></div></section><div class="modal-backdrop" id="reminderModal"><div class="modal"><div class="modal-title"><h2 id="reminderModalTitle">Add Reminder</h2><button class="icon-btn" id="closeReminder">×</button></div><form id="reminderForm"><div class="form-grid"><div class="field full"><label>Judul reminder *</label><input name="title" required placeholder="Contoh: Review ads performance"></div><div class="field"><label>Date *</label><input name="date" type="date" required value="${iso(today)}"></div><div class="field"><label>Time</label><input name="time" type="time"></div><div class="field"><label>Priority</label><select name="priority"><option>Low</option><option selected>Medium</option><option>High</option></select></div><div class="field full"><label>Notes</label><textarea name="notes"></textarea></div><div class="field full"><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" name="addToActivities" style="width:auto"> Ketika ditandai selesai, masukkan ke Aktivitas</label><small class="muted">Reminder akan otomatis tercatat sebagai aktivitas berstatus Done.</small></div></div><div class="form-actions"><button type="button" class="btn" id="cancelReminder">Batal</button><button class="btn primary" id="saveReminderButton">Simpan Reminder</button></div></form></div></div>`;
 const modal=$('#reminderModal'),form=$('#reminderForm');let editingReminderId=null;
 const close=()=>{modal.classList.remove('open');editingReminderId=null;form.reset();form.elements.date.value=iso(today);$('#reminderModalTitle').textContent='Add Reminder';$('#saveReminderButton').textContent='Simpan Reminder';};
 $('#addReminder').onclick=()=>{close();modal.classList.add('open');};
 $('#closeReminder').onclick=$('#cancelReminder').onclick=close;
 form.onsubmit=e=>{e.preventDefault();const f=e.currentTarget;const values={title:f.elements.title.value.trim(),date:f.elements.date.value,time:f.elements.time.value,priority:f.elements.priority.value,notes:f.elements.notes.value,addToActivities:f.elements.addToActivities.checked};
  if(editingReminderId){const existing=reminders.find(r=>r.id===editingReminderId);if(existing){Object.assign(existing,values);try{save();}catch(err){toast('Perubahan reminder gagal disimpan di browser.');return;}syncNewReminderToGoogleCalendar(existing,existing.done?'deleteReminder':'upsertReminder');close();draw();toast('Perubahan tersimpan dan sinkronisasi Google Calendar dimulai.');}}
  else{const newReminder={id:crypto.randomUUID(),...values,done:false};reminders.push(newReminder);try{save();}catch(err){reminders=reminders.filter(r=>r.id!==newReminder.id);toast('Reminder gagal disimpan di browser.');return;}syncNewReminderToGoogleCalendar(newReminder);close();draw();toast('Reminder ditambahkan. Pengiriman ke Google Calendar dimulai.');}
 };
 const draw=()=>{const mode=$('#reminderFilter').value,q=$('#reminderSearch').value.toLowerCase();const arr=reminders.filter(r=>(mode==='all'||(mode==='done'?r.done:!r.done))&&r.title.toLowerCase().includes(q)).sort((a,b)=>a.date.localeCompare(b.date));
  $('#reminderRows').innerHTML=arr.map(r=>`<div class="panel"><div class="panel-head"><span class="tag ${r.done?'done':r.priority==='High'?'pending':r.priority==='Medium'?'progress':'blue'}">${r.done?'Selesai':escapeHtml(r.priority)}</span><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end"><button class="btn small" data-reminder-edit="${r.id}">Edit</button><button class="btn danger small" data-reminder-delete="${r.id}">Hapus</button></div></div><h3 style="font-size:13px;margin:0 0 5px">${escapeHtml(r.title)}</h3><p class="muted" style="font-size:11px;margin:0 0 12px">${fmtDate(r.date,{weekday:'short',day:'numeric',month:'short',year:'numeric'})} ${r.time?'· '+escapeHtml(r.time):''}</p>${r.notes?`<p style="font-size:11px">${escapeHtml(r.notes)}</p>`:''}<button class="btn small ${r.done?'':'soft'}" data-reminder-toggle="${r.id}">${r.done?'Tandai aktif':'Tandai selesai'}</button></div>`).join('')||'<div class="empty">Tidak ada reminder.</div>';
  bindReminderToggles(root);
  root.querySelectorAll('[data-reminder-edit]').forEach(b=>b.onclick=()=>{const r=reminders.find(x=>x.id===b.dataset.reminderEdit);if(!r)return;editingReminderId=r.id;form.elements.title.value=r.title||'';form.elements.date.value=r.date||iso(today);form.elements.time.value=r.time||'';form.elements.priority.value=r.priority||'Medium';form.elements.notes.value=r.notes||'';form.elements.addToActivities.checked=!!r.addToActivities;$('#reminderModalTitle').textContent='Edit Reminder';$('#saveReminderButton').textContent='Simpan Perubahan';modal.classList.add('open');});
  root.querySelectorAll('[data-reminder-delete]').forEach(b=>b.onclick=()=>{if(confirm('Hapus reminder? Event terkait di Google Calendar juga akan dihapus.')){const target=reminders.find(r=>r.id===b.dataset.reminderDelete);if(target)syncNewReminderToGoogleCalendar(target,'deleteReminder');reminders=reminders.filter(r=>r.id!==b.dataset.reminderDelete);save();draw();toast('Reminder dihapus. Penghapusan event Google Calendar dimulai.');}});
 };
 $('#reminderFilter').onchange=draw;$('#reminderSearch').oninput=draw;draw();
}
function openPhotoLightbox(src,name,date,unit){
 let box=document.getElementById('photoLightbox');
 if(!box){
  box=document.createElement('div');box.id='photoLightbox';box.className='photo-lightbox';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Full photo viewer');
  box.innerHTML=`<button class="photo-lightbox-close" type="button" aria-label="Tutup foto">×</button><div class="photo-lightbox-stage"><img alt=""><div class="photo-lightbox-caption"></div></div>`;
  document.body.append(box);
  box.querySelector('.photo-lightbox-close').onclick=()=>box.classList.remove('open');
  box.addEventListener('click',e=>{if(e.target===box)box.classList.remove('open');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('photoLightbox')?.classList.remove('open');});
 }
 box.querySelector('img').src=src;
 box.querySelector('img').alt=name||'Dokumentasi foto';
 box.querySelector('.photo-lightbox-caption').textContent=[name,date,unit].filter(Boolean).join(' · ');
 box.classList.add('open');
}
async function addDocumentImageFiles(inputFiles){
 const files=inputFiles.filter(f=>f&&f.type.startsWith('image/'));if(!files.length)return;
 const date=iso(today),photos=[];for(let i=0;i<files.length;i++){const f=files[i];photos.push(await fileToDataURL(f));}
 const activityName='Dokumentasi Umum';const activity={id:crypto.randomUUID(),date,time:'',name:activityName,description:'Foto yang diunggah atau ditempel dari Documents',output:'',status:'Done',priority:'Low',unit:units[0]||'Personal / Other',notes:'',photos};activities.push(activity);
 try{save();}catch(err){activities.pop();toast('Foto terlalu besar untuk penyimpanan browser. Coba unggah foto lebih kecil.');return;}
 let saved=0,failed=[];for(const file of files){try{await saveWorkPhotoToProjectAssets(file,date,activityName);saved++;}catch(err){failed.push(err.message||'gagal');}}
 renderDocuments();toast(failed.length?`${photos.length} foto masuk galeri browser; ${saved} file tersimpan di assets/work. Gagal: ${failed[0]}`:`${photos.length} foto ditambahkan dan disalin ke assets/work.`);
}
function clipboardImages(event){const items=[...(event.clipboardData?.items||[])];return items.filter(i=>i.kind==='file'&&i.type.startsWith('image/')).map((item,i)=>{const blob=item.getAsFile();if(!blob)return null;const ext=(blob.type.split('/')[1]||'png').replace('jpeg','jpg');return new File([blob],`screenshot-${Date.now()}-${i+1}.${ext}`,{type:blob.type||'image/png'});}).filter(Boolean);}
function handleScreenshotPaste(event){
 const files=clipboardImages(event);if(!files.length)return;
 const modal=$('#activityModal.open');
 if(modal){event.preventDefault();const input=$('#activityForm',modal)?.elements.photos;if(!input){toast('Kolom foto tidak ditemukan.');return;}const dt=new DataTransfer();[...(input.files||[]),...files].forEach(f=>dt.items.add(f));input.files=dt.files;const preview=$('#existingPhotos',modal);if(preview)preview.innerHTML=[...preview.querySelectorAll('img')].map(x=>x.outerHTML).join('')+files.map(f=>`<span class="paste-file-chip">📋 ${escapeHtml(f.name)}</span>`).join('');toast(`${files.length} screenshot ditambahkan. Klik Simpan Aktivitas untuk menyimpan.`);return;}
 if($('#documentUpload')){event.preventDefault();addDocumentImageFiles(files);}
}
function renderDocuments(){const root=$('#pageContent');if(!root)return;const docs=activities.flatMap(a=>(a.photos||[]).map((src,i)=>({src,name:a.name,date:a.date,unit:a.unit,id:a.id,index:i})));root.innerHTML=`<section class="panel"><div class="panel-head"><div><h2>Documentation Library</h2><p>Semua foto yang terhubung dengan aktivitas tersimpan di sini.</p></div><label class="btn primary" for="documentUpload">＋ Upload Photo</label><input id="documentUpload" class="file-input" type="file" accept="image/*" multiple></div><div class="upload-zone paste-photo-zone" id="pastePhotoZone" tabindex="0" style="margin-bottom:16px"><strong>Dokumentasi pekerjaan</strong><p>Upload file atau klik area ini lalu tekan <b>Ctrl + V</b> untuk menempelkan screenshot dari clipboard.</p><small>Foto akan masuk ke galeri dan disalin ke assets/work/NamaBulan/ pada folder proyek yang sudah diizinkan.</small></div><div id="photoGallery" class="photo-grid">${docs.map(d=>`<div class="photo-card"><button type="button" class="photo-preview-btn" data-full-photo="${d.id}" data-photo-index="${d.index}" aria-label="Lihat foto ukuran penuh: ${escapeHtml(d.name)}"><img src="${d.src}" alt="${escapeHtml(d.name)}"><span class="photo-expand-hint">⤢ Lihat full photo</span></button><div class="photo-info"><strong>${escapeHtml(d.name)}</strong><small>${fmtDate(d.date,{day:'numeric',month:'short',year:'numeric'})} · ${escapeHtml(d.unit)}</small><div class="photo-card-actions" style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px"><button class="btn small" data-full-photo="${d.id}" data-photo-index="${d.index}">Lihat Full Photo</button><button class="btn small" data-photo-open="${d.id}">Lihat Aktivitas</button><label class="btn small" style="cursor:pointer">Ganti Foto<input class="file-input" type="file" accept="image/*" data-photo-change="${d.id}" data-photo-index="${d.index}"></label><button class="btn small" data-photo-save="${d.id}" data-photo-index="${d.index}">Simpan Foto</button><button class="btn small" data-photo-delete="${d.id}" data-photo-index="${d.index}" style="color:#dc5a63">Hapus Foto</button></div></div></div>`).join('')||'<div class="empty">Belum ada dokumentasi foto.</div>'}</div></section><p class="footnote">Prototype lokal menyimpan foto sebagai data browser. Untuk penggunaan jangka panjang, integrasikan Supabase Storage.</p>`;
 $('#documentUpload').onchange=async e=>{await addDocumentImageFiles([...e.target.files]);e.target.value='';};root.querySelectorAll('[data-full-photo]').forEach(b=>b.onclick=()=>{const a=activities.find(x=>x.id===b.dataset.fullPhoto);const src=a?.photos?.[Number(b.dataset.photoIndex)];if(src)openPhotoLightbox(src,a.name,a.date,a.unit);});root.querySelectorAll('[data-photo-open]').forEach(b=>b.onclick=()=>{const a=activities.find(x=>x.id===b.dataset.photoOpen);if(a){selectedDate=a.date;location.href='daily-report.html';}});
 root.querySelectorAll('[data-photo-change]').forEach(input=>input.onchange=async()=>{const a=activities.find(x=>x.id===input.dataset.photoChange),i=Number(input.dataset.photoIndex),file=input.files?.[0];if(!a||!file)return;try{const data=await fileToDataURL(file);const previous=a.photos[i];a.photos[i]=data;try{save();}catch(err){a.photos[i]=previous;toast('Foto gagal disimpan. File mungkin terlalu besar.');return;}renderDocuments();toast('Foto berhasil diganti dan disimpan.');}catch(err){toast('Foto gagal diganti.');}});
 root.querySelectorAll('[data-photo-save]').forEach(b=>b.onclick=()=>{const a=activities.find(x=>x.id===b.dataset.photoSave),src=a?.photos?.[Number(b.dataset.photoIndex)];if(!src)return;const link=document.createElement('a');link.href=src;link.download=`Dokumentasi-${(a.name||'Foto').replace(/[^a-z0-9_-]+/gi,'-')}-${a.date||iso(today)}.png`;document.body.append(link);link.click();link.remove();});
 root.querySelectorAll('[data-photo-delete]').forEach(b=>b.onclick=()=>{const a=activities.find(x=>x.id===b.dataset.photoDelete),i=Number(b.dataset.photoIndex);if(!a||!a.photos?.[i])return;if(!confirm('Hapus foto ini dari Documentation Library?'))return;a.photos.splice(i,1);if(!a.photos.length&&a.name==='Dokumentasi Umum')activities=activities.filter(x=>x.id!==a.id);try{save();renderDocuments();toast('Foto berhasil dihapus.');}catch(err){toast('Foto gagal dihapus.');}});
}

// Persist the project directory handle in IndexedDB. After first folder authorization,
// every subsequent logo upload writes a copy directly into assets/logo.
const LOGO_FOLDER_DB='daily-reports-local-folders';
function openFolderDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(LOGO_FOLDER_DB,1);req.onupgradeneeded=()=>req.result.createObjectStore('handles');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
async function getSavedProjectFolder(){const db=await openFolderDB();return new Promise((resolve,reject)=>{const req=db.transaction('handles','readonly').objectStore('handles').get('project');req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error);});}
async function rememberProjectFolder(handle){const db=await openFolderDB();return new Promise((resolve,reject)=>{const tx=db.transaction('handles','readwrite');tx.objectStore('handles').put(handle,'project');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
async function getWritableProjectFolder(){if(!('showDirectoryPicker' in window))throw new Error('Penyimpanan folder perlu Chrome/Edge terbaru melalui localhost atau HTTPS.');let projectDir=await getSavedProjectFolder();if(!projectDir){projectDir=await window.showDirectoryPicker({mode:'readwrite'});await rememberProjectFolder(projectDir);}let permission=await projectDir.queryPermission({mode:'readwrite'});if(permission!=='granted')permission=await projectDir.requestPermission({mode:'readwrite'});if(permission!=='granted')throw new Error('Izin menulis ke folder proyek belum diberikan.');return projectDir;}
function safeFilePart(value){return String(value||'dokumentasi').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-|-$/g,'').slice(0,70)||'dokumentasi';}
async function saveWorkPhotoToProjectAssets(file,date,activityName){const projectDir=await getWritableProjectFolder();const assets=await projectDir.getDirectoryHandle('assets',{create:true});const workDir=await assets.getDirectoryHandle('work',{create:true});const d=parseDate(date)||new Date();const month=new Intl.DateTimeFormat('en-US',{month:'long'}).format(d);const monthDir=await workDir.getDirectoryHandle(month,{create:true});const ext=(file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg';const stamp=new Date().toISOString().replace(/[:.]/g,'-');const filename=`${date}_${safeFilePart(activityName)}_${stamp}.${ext}`;const handle=await monthDir.getFileHandle(filename,{create:true});const writable=await handle.createWritable();await writable.write(file);await writable.close();return `assets/work/${month}/${filename}`;}
function logoFileDetails(unit,dataUrl){const m=String(dataUrl).match(/^data:image\/([a-zA-Z0-9.+-]+);base64,/);let ext=m?(m[1].toLowerCase()==='jpeg'?'jpg':m[1].toLowerCase()==='svg+xml'?'svg':m[1].toLowerCase().split('+')[0]):'png';const slug=String(unit).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'business-unit';return {name:`${slug}.${ext}`};}
async function saveLogoToProjectAssets(unit,dataUrl){if(!('showDirectoryPicker' in window))throw new Error('Fitur ini memerlukan Chrome/Edge terbaru melalui localhost atau HTTPS.');let projectDir=await getSavedProjectFolder();if(!projectDir){projectDir=await window.showDirectoryPicker({mode:'readwrite'});await rememberProjectFolder(projectDir);}let permission=await projectDir.queryPermission({mode:'readwrite'});if(permission!=='granted')permission=await projectDir.requestPermission({mode:'readwrite'});if(permission!=='granted')throw new Error('Izin menulis ke folder proyek belum diberikan.');const assets=await projectDir.getDirectoryHandle('assets',{create:true});const logoDir=await assets.getDirectoryHandle('logo',{create:true});const {name}=logoFileDetails(unit,dataUrl);const blob=await (await fetch(dataUrl)).blob();const handle=await logoDir.getFileHandle(name,{create:true});const writable=await handle.createWritable();await writable.write(blob);await writable.close();return name;}

function renderSettings(){
 const root=$('#pageContent');if(!root)return;
 const initials=(name)=>escapeHtml((name||'BU').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase());
 root.innerHTML=`<div class="settings-layout">
 <section class="panel settings-profile-panel"><div class="panel-head"><div><h2>Profile & Work</h2><p>Informasi ini ditampilkan di sidebar Daily Reports</p></div></div>
 <div class="profile-editor"><div class="profile-photo-wrap">${profile.photo?`<img id="profilePreview" src="${profile.photo}" alt="Foto profil">`:`<div id="profilePreview" class="profile-placeholder">${initials(profile.name)}</div>`}<div class="profile-photo-actions"><label class="btn small" for="profilePhoto">Ganti foto</label>${profile.photo?`<button type="button" class="btn danger small" id="removeProfilePhoto">Hapus foto</button>`:""}<input id="profilePhoto" class="file-input" type="file" accept="image/*"></div></div>
 <div class="profile-form form-grid"><div class="field"><label for="settingName">Nama lengkap</label><input id="settingName" value="${escapeHtml(profile.name||'')}" placeholder="Nama kamu"></div><div class="field"><label for="settingRole">Jabatan / pekerjaan</label><input id="settingRole" value="${escapeHtml(profile.role||'')}" placeholder="Contoh: Digital Marketing Executive"></div><div class="field"><label for="settingDepartment">Departemen / bidang</label><input id="settingDepartment" value="${escapeHtml(profile.department||'')}" placeholder="Contoh: Marketing"></div><div class="field"><label for="settingCompany">Perusahaan utama</label><input id="settingCompany" value="${escapeHtml(profile.company||'')}" placeholder="Nama perusahaan (opsional)"></div><div class="field full"><button class="btn primary" id="saveProfile">Simpan Profil</button></div></div></div></section>
 <section class="panel"><div class="panel-head"><div><h2>Business Unit & Logo</h2><p>Unggah logo tiap perusahaan/unit agar tampil konsisten.</p></div><button class="btn soft" id="addUnit">＋ Add Unit</button></div><div class="unit-branding-list">${units.map((u,i)=>{const meta=unitBranding[u]||{};return `<article class="unit-branding-card"><div class="unit-logo-preview">${meta.logo?`<img src="${meta.logo}" alt="Logo ${escapeHtml(u)}">`:`<span>${initials(u)}</span>`}</div><div class="unit-branding-fields"><div class="field"><label>Nama unit bisnis</label><input data-unit-name="${i}" value="${escapeHtml(u)}" aria-label="Nama unit bisnis"></div><div class="field"><label>Logo perusahaan</label><label class="btn small logo-upload-label" for="unitLogo${i}">${meta.logo?'Ganti Logo':'＋ Upload Logo'}</label><input id="unitLogo${i}" class="file-input" type="file" accept="image/*" data-unit-logo="${i}"><small class="muted">${meta.logo?'Logo sudah dipilih':'PNG, JPG, SVG yang dirender sebagai gambar'}</small></div></div><div class="unit-card-actions"><button class="btn small" data-unit-save="${i}">Simpan</button><button class="btn danger small" data-unit-delete="${i}">Hapus</button></div></article>`;}).join('')||'<div class="empty">Belum ada business unit.</div>'}</div><div class="settings-row" style="margin-top:14px"><div><strong>Penyimpanan otomatis ke assets/logo</strong><p>Pilih folder proyek satu kali. Logo masuk ke <code>assets/logo/</code> dan dokumentasi pekerjaan ke <code>assets/work/NamaBulan/</code>.</p></div><button class="btn primary" id="chooseLogoFolder">Pilih Folder Proyek</button></div><p class="footnote">Gunakan Chrome/Edge melalui localhost atau HTTPS. Browser meminta izin folder untuk keamanan; logo tetap disimpan di browser sebagai cadangan.</p></section>
 <section class="panel"><div class="panel-head"><div><h2>Preferences</h2><p>Sesuaikan tampilan Daily Reports</p></div></div><div class="settings-row"><div><strong>Tampilan</strong><p>Ganti mode terang atau gelap.</p></div><button class="btn" id="settingsTheme">${icon(document.body.dataset.theme==='dark'?'light':'dark')} ${document.body.dataset.theme==='dark'?'Mode Terang':'Mode Gelap'}</button></div><div style="margin-top:18px"><div style="margin-bottom:12px"><strong>Warna Kalender</strong><p class="muted" style="margin:4px 0 0">Pilih warna titik penanda kalender. Gunakan palet warna untuk memilih warna custom.</p></div><div class="form-grid"><div class="field"><label for="calendarColorActivity">Aktivitas manual</label><div style="display:flex;align-items:center;gap:10px"><input id="calendarColorActivity" type="color" value="${getCalendarColors().activity}" style="width:54px;height:40px;padding:3px"><span class="muted">Titik aktivitas</span></div></div><div class="field"><label for="calendarColorCreative">Google Calendar / Kreatif Desain</label><div style="display:flex;align-items:center;gap:10px"><input id="calendarColorCreative" type="color" value="${getCalendarColors().creative}" style="width:54px;height:40px;padding:3px"><span class="muted">Event eksternal</span></div></div><div class="field"><label for="calendarColorWorkday">Warna umum status</label><div style="display:flex;align-items:center;gap:10px"><input id="calendarColorWorkday" type="color" value="${getCalendarColors().workday}" style="width:54px;height:40px;padding:3px"><span class="muted">Fallback</span></div></div>
 ${[{id:'WorkingDay',key:'workingDay',label:'Working Day'},{id:'DayOff',key:'dayOff',label:'Day Off'},{id:'DayPayment',key:'dayPayment',label:'Day Payment'},{id:'PublicHoliday',key:'publicHoliday',label:'Public Holiday'},{id:'SickLeave',key:'sickLeave',label:'Sick Leave'},{id:'AnnualLeave',key:'annualLeave',label:'Annual Leave'}].map(x=>`<div class="field"><label for="calendarColor${x.id}">${x.label}</label><div style="display:flex;align-items:center;gap:10px"><input id="calendarColor${x.id}" type="color" value="${getCalendarColors()[x.key]}" style="width:54px;height:40px;padding:3px"><span class="muted">Warna status</span></div></div>`).join('')}</div><div class="form-actions"><button class="btn primary" id="saveCalendarColors">Simpan Warna Kalender</button><button class="btn" id="resetCalendarColors">Reset Default</button></div></div></section>
 <section class="panel"><div class="panel-head"><div><h2>Data Management</h2><p>Cadangkan atau pindahkan data Daily Reports.</p></div></div><div class="settings-row"><div><strong>Export JSON Backup</strong><p>Unduh aktivitas, pengingat, catatan, unit bisnis, profil, dan logo.</p></div><button class="btn primary" id="exportBackup">Export JSON</button></div><div class="settings-row"><div><strong>Import JSON Backup</strong><p>Pulihkan data dari cadangan Daily Reports.</p></div><label class="btn" for="backupFile">Choose File<input id="backupFile" class="file-input" type="file" accept=".json"></label></div><div class="settings-row"><div><strong>Delete All Local Data</strong><p>Tindakan ini tidak dapat dibatalkan.</p></div><button class="btn danger" id="clearData">Hapus Data</button></div><p class="footnote">Penyimpanan lokal browser aktif. Database cloud belum tersambung secara otomatis.</p></section></div>`;
 $('#settingsTheme').onclick=()=>{applyTheme(document.body.dataset.theme==='dark'?'light':'dark');renderSettings();};
 $('#saveCalendarColors')?.addEventListener('click',saveCalendarColors);
 $('#resetCalendarColors')?.addEventListener('click',()=>{
   write(KEYS.calendarColors, DEFAULT_CALENDAR_COLORS);
   renderSettings();
   applyCalendarColors();
   toast('Warna kalender dikembalikan ke default.');
 });
 $('#profilePhoto').onchange=async e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){toast('Pilih file gambar.');return;}profile.photo=await fileToDataURL(f);$('#profilePreview').outerHTML=`<img id="profilePreview" src="${profile.photo}" alt="Foto profil">`;};
 $('#removeProfilePhoto')?.addEventListener('click',()=>{profile.photo='';save();syncProfileFavicon();shell();renderSettings();toast('Foto profil berhasil dihapus.');});
 $('#saveProfile').onclick=()=>{profile.name=$('#settingName').value.trim()||'Nama Pengguna';profile.role=$('#settingRole').value.trim();profile.department=$('#settingDepartment').value.trim();profile.company=$('#settingCompany').value.trim();save();syncProfileFavicon();shell();renderSettings();toast('Profil berhasil disimpan.');};
 $('#addUnit').onclick=()=>{const u=prompt('Nama unit bisnis baru:');if(u&&u.trim()&&!units.includes(u.trim())){units.push(u.trim());save();renderSettings();toast('Business unit ditambahkan.');}};
 root.querySelectorAll('[data-unit-logo]').forEach(inp=>inp.onchange=async e=>{
  const f=e.target.files[0];if(!f)return;
  if(!f.type.startsWith('image/')){toast('Pilih file gambar untuk logo.');return;}
  const idx=Number(inp.dataset.unitLogo),unit=units[idx];
  try{
   const optimized=await fileToDataURL(f);
   const previous=unitBranding[unit]?.logo;
   unitBranding[unit]=unitBranding[unit]||{};unitBranding[unit].logo=optimized;
   try{save();}
   catch(storageError){if(previous)unitBranding[unit].logo=previous;else delete unitBranding[unit].logo;
    toast('Logo belum tersimpan karena ruang penyimpanan browser penuh. Hapus foto dokumentasi lama atau data yang tidak diperlukan, lalu unggah ulang.');return;}
   let folderMessage='Logo tersimpan di browser.';
   try{
    const filename=await saveLogoToProjectAssets(unit,optimized,false);
    folderMessage=`Logo tersimpan di browser dan assets/logo/${filename}.`;
   }catch(folderErr){
    if(folderErr.name==='AbortError') folderMessage='Logo tersimpan di browser. Folder proyek belum dipilih.';
    else {console.warn('Penyimpanan assets/logo:',folderErr);folderMessage='Logo tersimpan di browser, tetapi file folder belum tersimpan: '+folderErr.message;}
   }
   renderSettings();toast(folderMessage);
  }catch(err){toast('Logo gagal diproses: '+err.message);}
 });
 root.querySelectorAll('[data-unit-save]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.unitSave),old=units[i],input=root.querySelector(`[data-unit-name="${i}"]`),next=input.value.trim();if(!next){toast('Nama unit tidak boleh kosong.');return;}if(next!==old&&units.includes(next)){toast('Nama unit sudah digunakan.');return;}units[i]=next;if(unitBranding[old]){unitBranding[next]=unitBranding[old];delete unitBranding[old];}activities.forEach(a=>{if(a.unit===old)a.unit=next;});save();renderSettings();toast('Business unit disimpan.');});
 root.querySelectorAll('[data-unit-delete]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.unitDelete),u=units[i];if(confirm(`Hapus unit "${u}" dari daftar? Aktivitas lama tidak dihapus.`)){units.splice(i,1);delete unitBranding[u];save();renderSettings();}});
 $('#chooseLogoFolder').onclick=async()=>{
  try{
   if(!('showDirectoryPicker' in window)){toast('Gunakan Chrome/Edge terbaru melalui localhost atau HTTPS.');return;}
   const handle=await window.showDirectoryPicker({mode:'readwrite'});
   await rememberProjectFolder(handle);
   let permission=await handle.requestPermission({mode:'readwrite'});
   if(permission!=='granted'){toast('Izin folder belum diberikan.');return;}
   const assets=await handle.getDirectoryHandle('assets',{create:true});
   await assets.getDirectoryHandle('logo',{create:true});
   toast('Folder proyek tersambung. Upload logo berikutnya otomatis tersimpan ke assets/logo.');
  }catch(err){if(err.name!=='AbortError')toast('Folder belum tersambung: '+(err.message||'izin ditolak'));}
 };
 $('#exportBackup').onclick=()=>download('dailyflow-backup.json',JSON.stringify({version:2,exportedAt:new Date().toISOString(),activities,reminders,notes,units,profile,unitBranding,workdayStatuses,calendarColors:getCalendarColors(),theme:localStorage.getItem(KEYS.theme)||'light'},null,2),'application/json');
 $('#backupFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!Array.isArray(data.activities))throw new Error('Format backup tidak sesuai.');activities=data.activities;reminders=Array.isArray(data.reminders)?data.reminders:[];notes=data.notes||{};units=Array.isArray(data.units)?data.units:defaultUnits;profile=data.profile||profile;unitBranding=data.unitBranding||{};workdayStatuses=Array.isArray(data.workdayStatuses)?data.workdayStatuses:workdayStatuses;if(data.calendarColors&&typeof data.calendarColors==='object')write(KEYS.calendarColors,{...DEFAULT_CALENDAR_COLORS,...data.calendarColors});if(data.theme==='dark'||data.theme==='light')applyTheme(data.theme);save();applyCalendarColors();toast('Backup berhasil dipulihkan.');shell();renderSettings();}catch(err){toast('Gagal memulihkan backup: '+err.message);}};
 $('#clearData').onclick=()=>{if(confirm('Yakin ingin menghapus seluruh aktivitas, pengingat, catatan, status hari kerja, profil, logo, dan preferensi warna kalender lokal?')){activities=[];reminders=[];notes={win:'',challenge:'',focus:''};workdayStatuses=[];profile={name:'Fiqi Naufaldy',role:'',department:'',company:'',photo:''};unitBranding={};write(KEYS.calendarColors,DEFAULT_CALENDAR_COLORS);save();applyCalendarColors();syncProfileFavicon();shell();toast('Data lokal dihapus.');renderSettings();}};
}

function download(name,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}

function initNotificationDropdown(){
 // Temukan ikon notifikasi yang sebenarnya, termasuk jika dibungkus elemen <a>.
 // Beberapa halaman memakai markup header berbeda; jangan menebak dari tombol lain.
 let toggle=document.getElementById('notificationToggle');
 if(!toggle){
  const candidates=[...document.querySelectorAll('a,button,[role="button"]')];
  toggle=candidates.find(el=>{
   const label=[el.getAttribute('aria-label'),el.getAttribute('title'),el.getAttribute('data-tooltip'),el.getAttribute('data-action'),el.getAttribute('data-testid')].filter(Boolean).join(' ').toLowerCase();
   return /notification|notifikasi|bell|lonceng/.test(label);
  });
  if(!toggle){
   toggle=candidates.find(el=>{
    const svg=el.querySelector('svg');
    if(!svg)return false;
    const pathData=[...svg.querySelectorAll('path')].map(p=>p.getAttribute('d')||'').join(' ');
    // Cocokkan bentuk lonceng yang dipakai DailyFlow, bukan ikon lain secara umum.
    return /M15\s*17.*V9A6\s*6\s*0\s*0\s*0\s*6\s*9Z/i.test(pathData);
   });
  }
  if(toggle)toggle.id='notificationToggle';
 }
 if(!toggle)return;
 const READ_KEY='dailyflow_notifications_read_v1';
 const notificationIcon=(kind)=>kind==='insight'
  ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>'
  : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l5-3 5 4 6-3v12l-6 3-5-4-5 3z"/><path d="M9 4v12M14 8v12"/></svg>';
 const relTime=(date)=>{if(!date)return 'Hari ini';const d=new Date(date+'T00:00:00'),days=Math.max(0,Math.floor((new Date()-d)/86400000));return days===0?'Hari ini':days+' hari lalu';};
 const readIds=()=>{try{return JSON.parse(localStorage.getItem(READ_KEY)||'[]')}catch{return []}};
 const saveReadIds=(ids)=>{try{localStorage.setItem(READ_KEY,JSON.stringify([...new Set(ids)]))}catch{}};
 const getItems=()=>{
  const items=[];
  const todayActivities=activities.filter(a=>a.date===iso(today));
  const todayWorkdayStatus=workdayStatuses.find(x=>x.date===iso(today));
  const nonWorkingDay=todayWorkdayStatus&&['Cuti','Day Off','Day Payment','Sakit','Sick Leave','Izin','Annual Leave','Public Holiday'].includes(todayWorkdayStatus.type);
  if(todayActivities.length===0&&!nonWorkingDay)items.push({id:'activity-not-recorded-'+iso(today),kind:'insight',title:'Activity Not Recorded',desc:'Kamu belum mengisi data aktivitas hari ini. Yuk, catat aktivitasmu agar Daily Reports tetap lengkap.',time:'Hari ini'});
  reminders.filter(r=>!r.done&&r.date&&r.date<iso(today)).sort((a,b)=>a.date.localeCompare(b.date)).forEach(r=>items.push({id:'overdue-'+r.id,kind:'task',title:'Overdue Reminder',desc:`${r.title} — tenggat ${r.deadline||r.date}.`,time:relTime(r.date)}));
  reminders.filter(r=>!r.done&&r.date&&r.date>=iso(today)).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5).forEach(r=>items.push({id:'upcoming-'+r.id,kind:'task',title:'Upcoming Reminder',desc:`${r.title} — jadwal ${r.date}${r.time?' pukul '+r.time:''}${r.deadline?' · deadline '+r.deadline:''}.`,time:relTime(r.date)}));
  return items;
 };
 let pop=document.getElementById('notificationPopover');
 if(!pop){
  pop=document.createElement('section');pop.id='notificationPopover';pop.hidden=true;
  pop.style.cssText='position:absolute;top:calc(100% + 10px);right:0;width:min(390px,calc(100vw - 32px));max-height:min(70vh,520px);overflow:auto;background:var(--panel,#1c2722);color:var(--text,#f3f5f4);border:1px solid var(--border,#34443b);border-radius:16px;box-shadow:0 16px 42px #0005;padding:0;z-index:10050;';
  pop.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 14px 10px"><strong>Notifikasi</strong><button type="button" data-notification-close aria-label="Tutup notifikasi" style="border:0;background:transparent;color:inherit;font-size:22px;cursor:pointer">×</button></div><button type="button" data-mark-all-read style="display:block;width:100%;padding:10px 14px;border:0;border-bottom:1px solid var(--border,#33443a);background:transparent;color:var(--text,inherit);text-align:right;font:inherit;font-size:12px;cursor:pointer">Tandai semua sudah dibaca</button><div id="notificationList"></div>';
  // Tempatkan panel pada wadah ikon/header, bukan pada elemen link yang dapat mengubah halaman.
  const holder=toggle.parentElement||toggle;
  if(holder!==toggle&&getComputedStyle(holder).position==='static')holder.style.position='relative';
  holder.appendChild(pop);
 }else if(!pop.querySelector('[data-mark-all-read]')){
  const mark=document.createElement('button');mark.type='button';mark.textContent='Tandai semua sudah dibaca';mark.setAttribute('data-mark-all-read','');mark.style.cssText='display:block;width:100%;padding:10px 14px;border:0;border-bottom:1px solid var(--border,#33443a);background:transparent;color:var(--text,inherit);text-align:right;font:inherit;font-size:12px;cursor:pointer;';
  pop.insertBefore(mark,pop.querySelector('#notificationList')||pop.firstChild);
 }
 const list=pop.querySelector('#notificationList');if(!list)return;
 let badge=toggle.querySelector('.notification-badge, .notification-count, [data-notification-count]');
 if(!badge){badge=document.createElement('span');badge.className='notification-badge';badge.setAttribute('data-notification-count','');badge.style.cssText='position:absolute;top:-5px;right:-5px;min-width:19px;height:19px;padding:0 4px;border-radius:999px;background:#e5484d;color:white;font-size:12px;font-weight:700;line-height:19px;text-align:center;display:none;';if(getComputedStyle(toggle).position==='static')toggle.style.position='relative';toggle.appendChild(badge);}
 function renderItems(){
  const items=getItems(),read=readIds(),unread=items.filter(n=>!read.includes(n.id));
  badge.textContent=String(unread.length);badge.style.display=unread.length?'inline-block':'none';badge.setAttribute('aria-label',unread.length+' notifikasi belum dibaca');
  list.innerHTML=items.map(n=>`<button type="button" class="notification-item${read.includes(n.id)?' is-read':''}" data-notification-item="${escapeHtml(n.id)}" style="display:flex;width:100%;text-align:left;gap:10px;padding:12px 14px;color:inherit;font:inherit;background:transparent;border:0;border-bottom:1px solid var(--border,#33443b);cursor:pointer;${read.includes(n.id)?'opacity:.62;':''}"><span class="notification-item-icon">${notificationIcon(n.kind)}</span><span style="min-width:0"><div class="notification-item-title" style="font-size:13px;font-weight:700;margin-bottom:3px">${escapeHtml(n.title)}</div><div class="notification-item-desc" style="font-size:12px;line-height:1.45;opacity:.82">${escapeHtml(n.desc)}</div><div class="notification-item-time" style="font-size:11px;opacity:.6;margin-top:5px">${escapeHtml(n.time)}</div></span></button>`).join('')||'<div class="notification-empty" style="padding:18px 14px;text-align:center;opacity:.7">Belum ada notifikasi.</div>';
  const mark=pop.querySelector('[data-mark-all-read]');if(mark){mark.disabled=!unread.length;mark.style.opacity=unread.length?'1':'.5';}
 }
 toggle.setAttribute('aria-label','Buka notifikasi');toggle.setAttribute('aria-expanded',String(!pop.hidden));
 // Tangkap klik di tingkat document sebelum event mencapai link/handler header.
 // Ini penting karena ikon lonceng di beberapa halaman berada di dalam anchor yang href-nya reminder.html.
 if(!document.documentElement.dataset.dailyFlowNotificationCaptureBound){
  document.documentElement.dataset.dailyFlowNotificationCaptureBound='1';
  document.addEventListener('click',e=>{
   const path=typeof e.composedPath==='function'?e.composedPath():[];
   const nodes=path.length?path:(()=>{const a=[];let n=e.target;while(n){a.push(n);n=n.parentElement;}return a;})();
   const isBellHost=el=>{
    if(!(el instanceof Element)||!el.matches('a,button,[role="button"]'))return false;
    // Jangan anggap tombol di dalam dropdown (termasuk tombol silang) sebagai ikon lonceng.
    if(el.closest('#notificationPopover'))return false;
    const label=[el.id,el.getAttribute('aria-label'),el.getAttribute('title'),el.getAttribute('data-tooltip'),el.getAttribute('data-action'),el.getAttribute('data-testid')].filter(Boolean).join(' ').toLowerCase();
    if(/notification|notifikasi|bell|lonceng/.test(label))return true;
    return [...el.querySelectorAll('svg path')].some(pathEl=>/M15\s*17a3\s*3\s*0\s*1\s*1-6\s*0/i.test(pathEl.getAttribute('d')||''));
   };
   const host=nodes.find(isBellHost);
   if(!host)return;
   const currentPop=document.getElementById('notificationPopover');
   if(!currentPop)return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   // Gunakan host yang benar-benar diklik, bukan link Work Order yang kebetulan terdeteksi lebih dulu.
   if(host!==toggle){toggle=host;toggle.id='notificationToggle';}
   const holder=toggle.parentElement;
   if(holder&&currentPop.parentElement!==holder){
    if(getComputedStyle(holder).position==='static')holder.style.position='relative';
    holder.appendChild(currentPop);
   }
   currentPop.hidden=!currentPop.hidden;
   toggle.setAttribute('aria-label','Buka notifikasi');
   toggle.setAttribute('aria-expanded',String(!currentPop.hidden));
   if(!currentPop.hidden)renderItems();
  },true);
 }
 const mark=pop.querySelector('[data-mark-all-read]');if(mark&&!mark.dataset.bound){mark.dataset.bound='1';mark.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();saveReadIds([...readIds(),...getItems().map(n=>n.id)]);renderItems();});}
 const close=pop.querySelector('[data-notification-close]');if(close&&!close.dataset.bound){close.dataset.bound='1';close.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();pop.hidden=true;toggle.setAttribute('aria-expanded','false');});}
 if(!list.dataset.notificationBound){list.dataset.notificationBound='1';list.addEventListener('click',e=>{const item=e.target.closest('button[data-notification-item]');if(!item)return;e.preventDefault();e.stopPropagation();saveReadIds([...readIds(),item.getAttribute('data-notification-item')]);renderItems();});}
 renderItems();
 if(!document.documentElement.dataset.notificationOutsideBound){document.documentElement.dataset.notificationOutsideBound='1';document.addEventListener('click',e=>{const t=document.getElementById('notificationToggle'),p=document.getElementById('notificationPopover');if(t&&p&&!t.contains(e.target)&&!p.contains(e.target)){p.hidden=true;t.setAttribute('aria-expanded','false');}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){const t=document.getElementById('notificationToggle'),p=document.getElementById('notificationPopover');if(p){p.hidden=true;t?.setAttribute('aria-expanded','false');}}});}
}
function renderPage(){applyCalendarColors();shell();initNotificationDropdown();const page=document.body.dataset.page||'dashboard';({dashboard:renderDashboard,calendar:renderCalendarPage,'daily-report':renderDailyReport,analytics:renderAnalytics,reminder:renderReminders,documents:renderDocuments,settings:renderSettings}[page]||renderDashboard)();}
// Apply the saved theme before rendering page content to prevent theme resets/flicker on navigation.
try{const savedTheme=localStorage.getItem(KEYS.theme);if(savedTheme==='dark'||savedTheme==='light'){document.documentElement.dataset.theme=savedTheme;document.body.dataset.theme=savedTheme;}}catch{}
document.addEventListener('DOMContentLoaded',()=>{renderPage();loadCreativeCalendarEvents();});
document.addEventListener('paste',handleScreenshotPaste);
window.addEventListener('resize',()=>{if(document.body.dataset.page==='analytics')renderAnalytics();});
})();
