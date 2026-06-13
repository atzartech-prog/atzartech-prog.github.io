// Global States
let currentSection = 'dashboard';
let todos = [];
let notes = [];
let activeNoteId = null;
let transactions = [];
let shortLinks = [];
let qrCodeInstance = null;

// Pomodoro States
let pomodoroTimer = null;
let timerTimeLeft = 25 * 60; // 25 minutes
let timerDuration = 25 * 60;
let timerMode = 'work'; // work, short, long
let timerIsRunning = false;
let pomodoroSessionsCompleted = 0;

// Category Configs for Financial Tracker
const categories = {
    expense: ['Logistik Kantor', 'Konsumsi Rapat', 'Perjalanan Dinas', 'Periferal & IT', 'Pemeliharaan', 'Lainnya'],
    income: ['Anggaran APBN', 'Dana Masyarakat (PNBP)', 'Jasa Layanan', 'Lainnya']
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Check if redirecting
    if (checkRedirect()) {
        return; // Stop app initialization, let redirect happen
    }
    
    // Initialize Auth (Verify Login Status)
    checkLoginStatus();
});

// --- AUTHENTICATION LOGIC ---
function checkLoginStatus() {
    // Ensure default password exists
    if (!localStorage.getItem('wk_password')) {
        localStorage.setItem('wk_password', 'bismillah');
    }

    const isLoggedIn = localStorage.getItem('wk_is_logged_in') === 'true';
    if (isLoggedIn) {
        showApp();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const userVal = document.getElementById('login-username').value.trim();
    const passVal = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    const correctPassword = localStorage.getItem('wk_password') || 'bismillah';
    
    if (userVal === 'admin' && passVal === correctPassword) {
        localStorage.setItem('wk_is_logged_in', 'true');
        errorDiv.style.display = 'none';
        
        // Reset login form inputs
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        
        showApp();
    } else {
        errorDiv.textContent = 'Username atau password salah!';
        errorDiv.style.display = 'block';
    }
}

function handleLogout() {
    stopTimer(); // Ensure timer stops on logout
    stopAmbientSound();
    localStorage.setItem('wk_is_logged_in', 'false');
    showLogin();
}

function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

function showApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    // Initialize standard application handlers after logging in
    setupNavigation();
    loadLocalStorageData();
    updateLiveDate();
    renderTodos();
    renderNotesList();
    renderTransactions();
    toggleTxCategories();
    updateTimerDisplay();
    updateStatsAndDashboard();
    updateNotulenPreview();
    renderShortenerHistory();
}

// --- PASSWORD CHANGE LOGIC ---
function handleChangePassword(e) {
    e.preventDefault();
    
    const oldPwdVal = document.getElementById('old-pwd').value;
    const newPwdVal = document.getElementById('new-pwd').value;
    const confirmPwdVal = document.getElementById('new-pwd-confirm').value;
    const msgDiv = document.getElementById('pwd-msg');
    
    const currentPassword = localStorage.getItem('wk_password');
    
    // Reset message
    msgDiv.className = 'form-message';
    msgDiv.textContent = '';
    
    if (oldPwdVal !== currentPassword) {
        msgDiv.textContent = 'Password lama tidak sesuai!';
        msgDiv.classList.add('error');
        return;
    }
    
    if (newPwdVal.length < 4) {
        msgDiv.textContent = 'Password baru minimal 4 karakter!';
        msgDiv.classList.add('error');
        return;
    }
    
    if (newPwdVal !== confirmPwdVal) {
        msgDiv.textContent = 'Konfirmasi password baru tidak cocok!';
        msgDiv.classList.add('error');
        return;
    }
    
    // Save new password
    localStorage.setItem('wk_password', newPwdVal);
    msgDiv.textContent = 'Password berhasil diganti!';
    msgDiv.classList.add('success');
    
    // Reset Form
    document.getElementById('change-pwd-form').reset();
    
    // Clear message after 3 seconds
    setTimeout(() => {
        msgDiv.textContent = '';
        msgDiv.className = 'form-message';
    }, 3000);
}

// Navigation logic
function setupNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const targetSection = item.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionId) {
    currentSection = sectionId;
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(sec => sec.classList.remove('active-section'));
    
    const activeSec = document.getElementById(sectionId);
    if (activeSec) {
        activeSec.classList.add('active-section');
    }
    
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    menuItems.forEach(item => {
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const headerTitle = document.getElementById('section-title');
    const headerDesc = document.getElementById('section-desc');
    
    switch (sectionId) {
        case 'dashboard':
            headerTitle.textContent = 'Dashboard';
            headerDesc.textContent = 'Selamat datang kembali. Berikut ringkasan hari ini.';
            break;
        case 'pomodoro':
            headerTitle.textContent = 'Pomodoro Focus';
            headerDesc.textContent = 'Fokus pada pekerjaan Anda tanpa gangguan.';
            break;
        case 'todo':
            headerTitle.textContent = 'Task Manager';
            headerDesc.textContent = 'Kelola daftar tugas dan pekerjaan kantor.';
            break;
        case 'notes':
            headerTitle.textContent = 'Catatan';
            headerDesc.textContent = 'Tulis ide, notulen cepat, atau pengingat.';
            break;
        case 'notulensi':
            headerTitle.textContent = 'Notulensi Rapat';
            headerDesc.textContent = 'Buat risalah rapat secara instan dan rapi.';
            break;
        case 'finance':
            headerTitle.textContent = 'Tracker Keuangan';
            headerDesc.textContent = 'Catat pemasukan dan pengeluaran operasional kantor.';
            break;
        case 'qrcode':
            headerTitle.textContent = 'QR Code Generator';
            headerDesc.textContent = 'Buat QR Code khusus untuk teks, URL, dan dokumen Anda.';
            resetQRCodeGenerator();
            break;
        case 'linkshortener':
            headerTitle.textContent = 'Shortener Link';
            headerDesc.textContent = 'Perpendek link panjang Anda secara lokal maupun online.';
            renderShortenerHistory();
            break;
    }
    
    updateStatsAndDashboard();
}

// Live Date
function updateLiveDate() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    document.getElementById('live-date').textContent = `${dayName}, ${date} ${monthName} ${year}`;
}

// Local Storage Handlers
function loadLocalStorageData() {
    todos = JSON.parse(localStorage.getItem('tp_todos')) || [];
    notes = JSON.parse(localStorage.getItem('tp_notes')) || [];
    transactions = JSON.parse(localStorage.getItem('tp_transactions')) || [];
    shortLinks = JSON.parse(localStorage.getItem('tp_short_links')) || [];
    pomodoroSessionsCompleted = parseInt(localStorage.getItem('tp_pomo_sessions')) || 0;
    
    if (notes.length > 0) {
        activeNoteId = notes[0].id;
        loadNoteIntoEditor(notes[0]);
    } else {
        createNewNote(false);
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// --- STATS & DASHBOARD SYNC ---
function updateStatsAndDashboard() {
    const activeTodos = todos.filter(t => !t.completed);
    document.getElementById('stat-todo-count').textContent = activeTodos.length;
    document.getElementById('stat-pomodoro-count').textContent = pomodoroSessionsCompleted;
    
    const summary = calculateFinancials();
    document.getElementById('stat-balance-display').textContent = formatRupiah(summary.balance);
    
    const dbTodosContainer = document.getElementById('dashboard-todos');
    dbTodosContainer.innerHTML = '';
    
    if (activeTodos.length === 0) {
        dbTodosContainer.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted); padding: 0.5rem 0;">Tidak ada tugas aktif. Nikmati hari Anda!</p>';
    } else {
        activeTodos.slice(0, 3).forEach(todo => {
            const item = document.createElement('div');
            item.className = 'todo-item';
            item.innerHTML = `
                <div class="todo-item-left">
                    <div class="todo-checkbox" onclick="toggleTodoStatus('${todo.id}')">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="todo-info">
                        <h4>${escapeHTML(todo.title)}</h4>
                        <div class="todo-meta">
                            <span class="badge-meta category">${escapeHTML(todo.category)}</span>
                            <span class="badge-meta date"><i class="far fa-clock"></i> ${formatDateString(todo.dueDate)}</span>
                        </div>
                    </div>
                </div>
            `;
            dbTodosContainer.appendChild(item);
        });
    }
}

// --- POMODORO TIMER LOGIC ---
function setTimerMode(mode) {
    stopTimer();
    timerMode = mode;
    
    const modeButtons = document.querySelectorAll('.timer-modes .btn-mode');
    modeButtons.forEach(btn => btn.classList.remove('active'));
    
    if (mode === 'work') {
        timerDuration = 25 * 60;
        document.getElementById('timer-label').textContent = 'Fokus';
        modeButtons[0].classList.add('active');
    } else if (mode === 'short') {
        timerDuration = 5 * 60;
        document.getElementById('timer-label').textContent = 'Istirahat Pendek';
        modeButtons[1].classList.add('active');
    } else if (mode === 'long') {
        timerDuration = 15 * 60;
        document.getElementById('timer-label').textContent = 'Istirahat Panjang';
        modeButtons[2].classList.add('active');
    }
    
    timerTimeLeft = timerDuration;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerTimeLeft / 60);
    const seconds = timerTimeLeft % 60;
    const displayStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('time-display').textContent = displayStr;
    document.title = `(${displayStr}) WaktunyaKerja Productivity Hub`;
    
    const progress = 283 - (283 * (timerTimeLeft / timerDuration));
    document.getElementById('progress-bar').style.strokeDashoffset = progress;
}

function toggleTimer() {
    if (timerIsRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    initAudio();
    timerIsRunning = true;
    document.getElementById('play-icon').className = 'fas fa-pause';
    document.getElementById('quick-pomo-status').textContent = timerMode === 'work' ? 'Fokus bekerja...' : 'Istirahat...';
    
    const noiseSelect = document.getElementById('ambient-sound');
    playAmbientSound(noiseSelect.value);

    pomodoroTimer = setInterval(() => {
        timerTimeLeft--;
        updateTimerDisplay();
        
        if (timerTimeLeft <= 0) {
            timerFinished();
        }
    }, 1000);
}

function stopTimer() {
    timerIsRunning = false;
    clearInterval(pomodoroTimer);
    document.getElementById('play-icon').className = 'fas fa-play';
    stopAmbientSound();
}

function resetTimer() {
    stopTimer();
    timerTimeLeft = timerDuration;
    updateTimerDisplay();
}

function skipTimer() {
    stopTimer();
    timerFinished();
}

function timerFinished() {
    stopTimer();
    playBeepSound();

    if (timerMode === 'work') {
        pomodoroSessionsCompleted++;
        localStorage.setItem('tp_pomo_sessions', pomodoroSessionsCompleted);
        alert('Kerja bagus! Waktunya mengambil istirahat.');
        setTimerMode('short');
    } else {
        alert('Istirahat selesai! Waktunya kembali fokus.');
        setTimerMode('work');
    }
    
    updateStatsAndDashboard();
}

function playBeepSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
        console.error("Gagal mengeluarkan bunyi beep:", e);
    }
}

function changeAmbientSound() {
    if (timerIsRunning) {
        const noiseSelect = document.getElementById('ambient-sound');
        playAmbientSound(noiseSelect.value);
    }
}


// --- TO-DO LIST LOGIC ---
let activeTodoFilter = 'all';

function addTodo(e) {
    e.preventDefault();
    
    const titleInput = document.getElementById('todo-title');
    const categorySelect = document.getElementById('todo-category');
    const prioritySelect = document.getElementById('todo-priority');
    const dateInput = document.getElementById('todo-date');
    
    const newTodo = {
        id: Date.now().toString(),
        title: titleInput.value.trim(),
        category: categorySelect.value,
        priority: prioritySelect.value,
        dueDate: dateInput.value,
        completed: false
    };
    
    todos.push(newTodo);
    saveData('tp_todos', todos);
    
    titleInput.value = '';
    renderTodos();
    updateStatsAndDashboard();
}

function toggleTodoStatus(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveData('tp_todos', todos);
    
    renderTodos();
    updateStatsAndDashboard();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveData('tp_todos', todos);
    
    renderTodos();
    updateStatsAndDashboard();
}

function filterTodos(filter) {
    activeTodoFilter = filter;
    const tabs = document.querySelectorAll('.filter-tabs .btn-tab');
    tabs.forEach(btn => btn.classList.remove('active'));
    
    if (filter === 'all') tabs[0].classList.add('active');
    else if (filter === 'active') tabs[1].classList.add('active');
    else if (filter === 'completed') tabs[2].classList.add('active');
    
    renderTodos();
}

function renderTodos() {
    const listContainer = document.getElementById('todo-list');
    listContainer.innerHTML = '';
    
    let filtered = todos;
    if (activeTodoFilter === 'active') {
        filtered = todos.filter(t => !t.completed);
    } else if (activeTodoFilter === 'completed') {
        filtered = todos.filter(t => t.completed);
    }
    
    const completedCount = todos.filter(t => t.completed).length;
    document.getElementById('todo-progress-text').textContent = `${completedCount} dari ${todos.length} tugas selesai`;
    
    if (filtered.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 2rem 0;">Tidak ada tugas ditemukan.</p>';
        return;
    }
    
    filtered.sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        const pMap = { 'Tinggi': 3, 'Sedang': 2, 'Rendah': 1 };
        if (a.priority !== b.priority) {
            return pMap[b.priority] - pMap[a.priority];
        }
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    filtered.forEach(todo => {
        const item = document.createElement('div');
        item.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const priorityClass = todo.priority === 'Tinggi' ? 'priority-high' : (todo.priority === 'Sedang' ? 'priority-medium' : 'priority-low');
        
        item.innerHTML = `
            <div class="todo-item-left">
                <div class="todo-checkbox" onclick="toggleTodoStatus('${todo.id}')">
                    <i class="fas fa-check"></i>
                </div>
                <div class="todo-info">
                    <h4>${escapeHTML(todo.title)}</h4>
                    <div class="todo-meta">
                        <span class="badge-meta category">${escapeHTML(todo.category)}</span>
                        <span class="badge-meta ${priorityClass}">${todo.priority}</span>
                        <span class="badge-meta date"><i class="far fa-clock"></i> ${formatDateString(todo.dueDate)}</span>
                    </div>
                </div>
            </div>
            <button class="btn-delete" onclick="deleteTodo('${todo.id}')">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        listContainer.appendChild(item);
    });
}


// --- NOTES LOGIC ---
let saveTimeout = null;

function createNewNote(focus = true) {
    const newNote = {
        id: Date.now().toString(),
        title: 'Draft Catatan Baru',
        body: '',
        updatedAt: new Date().toISOString()
    };
    
    notes.unshift(newNote);
    saveData('tp_notes', notes);
    activeNoteId = newNote.id;
    
    renderNotesList();
    loadNoteIntoEditor(newNote);
    
    if (focus) {
        document.getElementById('note-title-input').focus();
    }
}

function loadNoteIntoEditor(note) {
    document.getElementById('note-title-input').value = note.title;
    document.getElementById('note-body-input').value = note.body;
    document.getElementById('save-status').textContent = 'Semua perubahan disimpan';
}

function renderNotesList(filterQuery = '') {
    const listContainer = document.getElementById('notes-list-container');
    listContainer.innerHTML = '';
    
    let filtered = notes;
    if (filterQuery) {
        const query = filterQuery.toLowerCase();
        filtered = notes.filter(note => 
            note.title.toLowerCase().includes(query) || 
            note.body.toLowerCase().includes(query)
        );
    }
    
    if (filtered.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: var(--text-dim); font-size: 0.75rem; padding: 1rem 0;">Catatan tidak ditemukan</p>';
        return;
    }
    
    filtered.forEach(note => {
        const item = document.createElement('div');
        item.className = `note-card-item ${note.id === activeNoteId ? 'active' : ''}`;
        item.onclick = () => selectNote(note.id);
        
        const dateStr = new Date(note.updatedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        const snippet = note.body ? note.body.substring(0, 50) + (note.body.length > 50 ? '...' : '') : 'Tidak ada konten...';
        
        item.innerHTML = `
            <h4>${escapeHTML(note.title)}</h4>
            <p>${escapeHTML(snippet)}</p>
            <span>${dateStr}</span>
        `;
        listContainer.appendChild(item);
    });
}

function selectNote(noteId) {
    activeNoteId = noteId;
    const note = notes.find(n => n.id === noteId);
    if (note) {
        loadNoteIntoEditor(note);
        renderNotesList();
    }
}

function saveCurrentNote() {
    if (!activeNoteId) return;
    
    const titleVal = document.getElementById('note-title-input').value.trim() || 'Draft Catatan Baru';
    const bodyVal = document.getElementById('note-body-input').value;
    const saveStatusSpan = document.getElementById('save-status');
    
    saveStatusSpan.innerHTML = '<i class="fas fa-sync fa-spin"></i> Menyimpan...';
    
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        notes = notes.map(note => {
            if (note.id === activeNoteId) {
                return {
                    ...note,
                    title: titleVal,
                    body: bodyVal,
                    updatedAt: new Date().toISOString()
                };
            }
            return note;
        });
        
        const activeIdx = notes.findIndex(n => n.id === activeNoteId);
        if (activeIdx > 0) {
            const activeNote = notes.splice(activeIdx, 1)[0];
            notes.unshift(activeNote);
        }
        
        saveData('tp_notes', notes);
        renderNotesList();
        
        saveStatusSpan.textContent = 'Perubahan disimpan';
    }, 800);
}

function deleteCurrentNote() {
    if (!activeNoteId) return;
    
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
        notes = notes.filter(n => n.id !== activeNoteId);
        saveData('tp_notes', notes);
        
        if (notes.length > 0) {
            activeNoteId = notes[0].id;
            loadNoteIntoEditor(notes[0]);
        } else {
            createNewNote(false);
        }
        renderNotesList();
    }
}

function searchNotes() {
    const searchVal = document.getElementById('note-search').value;
    renderNotesList(searchVal);
}


// --- NOTULENSI RAPAT LOGIC ---
function updateNotulenPreview() {
    const title = document.getElementById('notulen-title').value.trim() || '[Judul Rapat]';
    const date = document.getElementById('notulen-date').value;
    const time = document.getElementById('notulen-time').value.trim() || '[Waktu Rapat]';
    const leader = document.getElementById('notulen-leader').value.trim() || '[Pimpinan Rapat]';
    const attendees = document.getElementById('notulen-attendees').value.trim() || '[Daftar Hadir]';
    const discussion = document.getElementById('notulen-discussion').value.trim() || '1. [Pokok Bahasan 1]\n2. [Pokok Bahasan 2]';
    const decisions = document.getElementById('notulen-decisions').value.trim() || '1. [Keputusan/Tindak Lanjut 1]\n2. [Keputusan/Tindak Lanjut 2]';
    
    const dateFormatted = date ? new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : '[Hari, Tanggal Rapat]';

    const output = `===========================================================
                      RISALAH RAPAT (NOTULENSI)
===========================================================

Agenda Rapat      : ${title}
Hari, Tanggal     : ${dateFormatted}
Waktu             : ${time}
Pimpinan Rapat    : ${leader}

Daftar Hadir      :
${attendees.split(',').map(a => `  - ${a.trim()}`).join('\n')}

-----------------------------------------------------------
I. POKOK PEMBAHASAN / DISKUSI
-----------------------------------------------------------
${discussion}

-----------------------------------------------------------
II. KEPUTUSAN & TINDAK LANJUT (ACTION PLAN)
-----------------------------------------------------------
${decisions}

-----------------------------------------------------------
Dicatat Oleh: Notulis Rapat
Dibuat Melalui: WaktunyaKerja Productivity Hub
Tanggal Pembuatan: ${new Date().toLocaleDateString('id-ID')}
===========================================================`;

    document.getElementById('notulen-preview').textContent = output;
}

function copyNotulen() {
    const text = document.getElementById('notulen-preview').textContent;
    navigator.clipboard.writeText(text)
        .then(() => alert('Notulensi berhasil disalin ke clipboard!'))
        .catch(() => alert('Gagal menyalin. Silakan salin manual dari kotak pratinjau.'));
}

function downloadNotulen() {
    const text = document.getElementById('notulen-preview').textContent;
    const agendaTitle = document.getElementById('notulen-title').value.trim() || 'notulensi-rapat';
    const filename = `${agendaTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


// --- TRACKER KEUANGAN LOGIC ---
function toggleTxCategories() {
    const type = document.getElementById('tx-type').value;
    const categorySelect = document.getElementById('tx-category');
    categorySelect.innerHTML = '';
    
    categories[type].forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
    });
}

function addTransaction(e) {
    e.preventDefault();
    
    const titleInput = document.getElementById('tx-title');
    const typeSelect = document.getElementById('tx-type');
    const categorySelect = document.getElementById('tx-category');
    const amountInput = document.getElementById('tx-amount');
    
    const newTx = {
        id: Date.now().toString(),
        title: titleInput.value.trim(),
        type: typeSelect.value,
        category: categorySelect.value,
        amount: parseFloat(amountInput.value),
        date: new Date().toISOString()
    };
    
    transactions.unshift(newTx);
    saveData('tp_transactions', transactions);
    
    titleInput.value = '';
    amountInput.value = '';
    
    renderTransactions();
    updateStatsAndDashboard();
}

function deleteTransaction(id) {
    transactions = transactions.filter(tx => tx.id !== id);
    saveData('tp_transactions', transactions);
    
    renderTransactions();
    updateStatsAndDashboard();
}

function calculateFinancials() {
    let income = 0;
    let expense = 0;
    
    transactions.forEach(tx => {
        if (tx.type === 'income') {
            income += tx.amount;
        } else {
            expense += tx.amount;
        }
    });
    
    return {
        income,
        expense,
        balance: income - expense
    };
}

function renderTransactions() {
    const container = document.getElementById('transaction-items');
    container.innerHTML = '';
    
    const summary = calculateFinancials();
    
    document.getElementById('finance-balance').textContent = formatRupiah(summary.balance);
    document.getElementById('finance-income').textContent = formatRupiah(summary.income);
    document.getElementById('finance-expense').textContent = formatRupiah(summary.expense);
    
    const balanceCardP = document.getElementById('finance-balance');
    if (summary.balance < 0) {
        balanceCardP.style.color = 'var(--color-accent)';
    } else {
        balanceCardP.style.color = 'var(--color-secondary)';
    }
    
    if (transactions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-dim); font-size: 0.8rem; padding: 2rem 0;">Belum ada riwayat transaksi.</p>';
        return;
    }
    
    transactions.forEach(tx => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        
        const isIncome = tx.type === 'income';
        const iconClass = isIncome ? 'fas fa-arrow-down income-icon' : 'fas fa-arrow-up expense-icon';
        const amtClass = isIncome ? 'income' : 'expense';
        const sign = isIncome ? '+' : '-';
        
        const dateStr = new Date(tx.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        item.innerHTML = `
            <div class="transaction-details">
                <i class="${iconClass}"></i>
                <div class="transaction-info">
                    <h4>${escapeHTML(tx.title)}</h4>
                    <p>${escapeHTML(tx.category)} • ${dateStr}</p>
                </div>
            </div>
            <div class="transaction-amount ${amtClass}">
                ${sign} ${formatRupiah(tx.amount)}
                <button class="btn-delete" style="margin-left: 0.5rem;" onclick="deleteTransaction('${tx.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}


// --- UTILITY FUNCTIONS ---
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(number);
}

function formatDateString(dateStr) {
    if (!dateStr) return '';
    const now = new Date(dateStr);
    return now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
    });
}

// --- REDIRECT ENGINE ---
function checkRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('s');
    if (code) {
        // Show redirect screen immediately
        const redirectScreen = document.getElementById('redirect-screen');
        if (redirectScreen) {
            redirectScreen.style.display = 'flex';
        }
        
        // Find long URL in local storage
        const links = JSON.parse(localStorage.getItem('tp_short_links')) || [];
        const linkObj = links.find(link => link.code === code);
        
        const statusText = document.getElementById('redirect-status');
        const urlDisplay = document.getElementById('redirect-url-display');
        const immediateBtn = document.getElementById('redirect-immediate-btn');
        
        if (linkObj) {
            const destUrl = linkObj.longUrl;
            if (statusText) statusText.textContent = 'Mengarahkan Anda ke tujuan...';
            if (urlDisplay) urlDisplay.textContent = destUrl;
            if (immediateBtn) {
                immediateBtn.href = destUrl;
                immediateBtn.onclick = () => {
                    window.location.href = destUrl;
                    return false;
                };
            }
            
            // Animation progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                const progressBar = document.getElementById('redirect-progress-bar');
                if (progressBar) {
                    progressBar.style.strokeDashoffset = 283 - (283 * (progress / 100));
                }
                if (progress >= 100) {
                    clearInterval(interval);
                    window.location.href = destUrl;
                }
            }, 50); // 1 second total redirect delay
        } else {
            if (statusText) statusText.textContent = 'Tautan tidak ditemukan!';
            if (urlDisplay) urlDisplay.textContent = 'Kode tautan pendek "' + code + '" tidak valid atau telah dihapus.';
            if (immediateBtn) {
                immediateBtn.textContent = 'Kembali ke Beranda';
                immediateBtn.href = window.location.origin + window.location.pathname;
                immediateBtn.onclick = () => {
                    window.location.href = window.location.origin + window.location.pathname;
                    return false;
                };
            }
        }
        return true; // We handled redirection
    }
    return false;
}

// --- QR CODE GENERATOR LOGIC ---
function generateQRCode(e) {
    if (e) e.preventDefault();
    
    const text = document.getElementById('qrcode-text').value.trim();
    const size = parseInt(document.getElementById('qrcode-size').value) || 256;
    const colorFg = document.getElementById('qrcode-color-fg').value || '#8a2be2';
    const colorBg = document.getElementById('qrcode-color-bg').value || '#ffffff';
    
    const canvasContainer = document.getElementById('qrcode-canvas');
    canvasContainer.innerHTML = ''; // Clear previous content
    
    try {
        qrCodeInstance = new QRCode(canvasContainer, {
            text: text,
            width: size,
            height: size,
            colorDark: colorFg,
            colorLight: colorBg,
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Show actions, hide placeholder
        document.getElementById('qrcode-actions').style.display = 'flex';
        document.getElementById('qrcode-placeholder-text').style.display = 'none';
    } catch (err) {
        console.error("Gagal membuat QR Code:", err);
        alert("Gagal membuat QR Code. Silakan periksa kembali input Anda.");
    }
}

function resetQRCodeGenerator() {
    document.getElementById('qrcode-form').reset();
    document.getElementById('qrcode-canvas').innerHTML = '<i class="fas fa-qrcode" style="font-size: 4rem; color: var(--text-dim);"></i>';
    document.getElementById('qrcode-actions').style.display = 'none';
    document.getElementById('qrcode-placeholder-text').style.display = 'block';
    qrCodeInstance = null;
}

function downloadQRCode() {
    const qrImg = document.querySelector('#qrcode-canvas img');
    if (qrImg && qrImg.src) {
        const link = document.createElement('a');
        link.href = qrImg.src;
        link.download = 'qrcode.png';
        link.click();
    } else {
        const canvas = document.querySelector('#qrcode-canvas canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL("image/png");
            link.download = 'qrcode.png';
            link.click();
        } else {
            alert('Gagal mengunduh QR Code. Silakan buat ulang.');
        }
    }
}

// --- LINK SHORTENER LOGIC ---
async function fetchOnlineShortener(longUrl) {
    try {
        // Attempt using corsproxy.io first
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(longUrl))}`;
        const response = await fetch(proxyUrl);
        if (response.ok) {
            const text = await response.text();
            if (text && text.startsWith('http')) {
                return text.trim();
            }
        }
        throw new Error('Gagal menggunakan Proxy');
    } catch (err) {
        console.warn("Proxy gagal, mencoba langsung ke TinyURL...", err);
        try {
            const directUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
            const response = await fetch(directUrl);
            if (response.ok) {
                const text = await response.text();
                if (text && text.startsWith('http')) {
                    return text.trim();
                }
            }
        } catch (e) {
            console.error("Direct attempt failed:", e);
        }
        throw new Error("Layanan penyingkat online sedang sibuk atau tidak dapat diakses.");
    }
}

async function shortenLink(e) {
    e.preventDefault();
    
    const longUrlInput = document.getElementById('shortener-url');
    const aliasInput = document.getElementById('shortener-alias');
    const typeSelect = document.getElementById('shortener-type');
    
    const longUrl = longUrlInput.value.trim();
    let alias = aliasInput.value.trim().toLowerCase();
    const type = typeSelect.value;
    
    if (!longUrl) return;
    
    if (alias && !/^[a-z0-9\-_]+$/.test(alias)) {
        alert("Alias hanya boleh berisi huruf, angka, strip (-), dan garis bawah (_).");
        return;
    }
    
    shortLinks = JSON.parse(localStorage.getItem('tp_short_links')) || [];
    
    if (alias) {
        const duplicate = shortLinks.find(link => link.code === alias);
        if (duplicate) {
            alert("Alias '" + alias + "' sudah digunakan. Silakan gunakan alias lain.");
            return;
        }
    } else {
        let isUnique = false;
        while (!isUnique) {
            alias = Math.random().toString(36).substring(2, 7);
            if (!shortLinks.find(link => link.code === alias)) {
                isUnique = true;
            }
        }
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    
    let shortUrl = '';
    
    try {
        if (type === 'local') {
            const cleanOrigin = window.location.origin;
            const cleanPath = window.location.pathname;
            shortUrl = `${cleanOrigin}${cleanPath}?s=${alias}`;
        } else {
            shortUrl = await fetchOnlineShortener(longUrl);
        }
        
        const newLink = {
            id: Date.now().toString(),
            code: alias,
            longUrl: longUrl,
            shortUrl: shortUrl,
            type: type,
            date: new Date().toISOString()
        };
        
        shortLinks.unshift(newLink);
        localStorage.setItem('tp_short_links', JSON.stringify(shortLinks));
        
        longUrlInput.value = '';
        aliasInput.value = '';
        
        renderShortenerHistory();
        
        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                alert(`Tautan berhasil dipersingkat!\n\nShort URL: ${shortUrl}\n\n(Tautan telah disalin ke clipboard Anda)`);
            })
            .catch(() => {
                alert(`Tautan berhasil dipersingkat!\n\nShort URL: ${shortUrl}`);
            });
            
    } catch (err) {
        alert(err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

function renderShortenerHistory() {
    const container = document.getElementById('shortener-items');
    if (!container) return;
    
    container.innerHTML = '';
    shortLinks = JSON.parse(localStorage.getItem('tp_short_links')) || [];
    
    if (shortLinks.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-dim); font-size: 0.8rem; padding: 2rem 0;">Belum ada riwayat tautan singkat.</p>';
        return;
    }
    
    shortLinks.forEach(link => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        
        const isLocal = link.type === 'local';
        const typeBadge = isLocal ? 'Lokal' : 'Online';
        const typeClass = isLocal ? 'background: rgba(0, 210, 255, 0.15); color: var(--color-secondary); border: 1px solid rgba(0, 210, 255, 0.25);' : 'background: rgba(138, 43, 226, 0.15); color: var(--color-primary); border: 1px solid rgba(138, 43, 226, 0.25);';
        
        const dateStr = new Date(link.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        item.innerHTML = `
            <div class="transaction-details">
                <i class="fas fa-link" style="${typeClass}"></i>
                <div class="transaction-info" style="max-width: 320px; overflow: hidden;">
                    <h4 style="font-size: 0.9rem; font-weight: 600; color: #fff; user-select: all; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(link.shortUrl)}</h4>
                    <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHTML(link.longUrl)}">${escapeHTML(link.longUrl)}</p>
                    <p style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.15rem;">${typeBadge} • ${dateStr}</p>
                </div>
            </div>
            <div class="transaction-amount">
                <button type="button" class="btn-action-outline" style="padding: 0.4rem 0.65rem;" onclick="copyToClipboardText('${escapeHTML(link.shortUrl)}')">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button type="button" class="btn-delete" style="margin-left: 0.5rem;" onclick="deleteShortLink('${link.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function copyToClipboardText(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert('Tautan berhasil disalin ke clipboard!'))
        .catch(() => alert('Gagal menyalin. Silakan salin manual dari kotak teks.'));
}

function deleteShortLink(id) {
    if (confirm("Apakah Anda yakin ingin menghapus tautan singkat ini dari riwayat?")) {
        shortLinks = JSON.parse(localStorage.getItem('tp_short_links')) || [];
        shortLinks = shortLinks.filter(link => link.id !== id);
        localStorage.setItem('tp_short_links', JSON.stringify(shortLinks));
        renderShortenerHistory();
    }
}

function clearShortenerHistory() {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat tautan singkat?")) {
        localStorage.removeItem('tp_short_links');
        shortLinks = [];
        renderShortenerHistory();
    }
}
