// MentorGuru Admin Dashboard Script

// Verification guard check
function checkAuth() {
    if (sessionStorage.getItem('mentorGuruAdmin') !== 'true') {
        window.location.href = 'login.html';
    }
}
checkAuth();

// State variables
let courses = JSON.parse(localStorage.getItem('mentorGuruCourses')) || [];
let applications = JSON.parse(localStorage.getItem('mentorGuruApplications')) || [];
let thumbnailBase64 = "";

// DOM Elements
const sidebarLinks = document.querySelectorAll('.admin-sidebar-link');
const views = document.querySelectorAll('.admin-view');
const panelHeader = document.getElementById('panelViewHeader');

// Form & Modal Elements
const courseModalOverlay = document.getElementById('courseModalOverlay');
const courseModalBox = document.getElementById('courseModalBox');
const courseForm = document.getElementById('courseForm');
const editCourseIdInput = document.getElementById('editCourseId');
const courseTitleInput = document.getElementById('courseTitle');
const courseCategoryInput = document.getElementById('courseCategory');
const courseDescInput = document.getElementById('courseDesc');
const courseDurationInput = document.getElementById('courseDuration');
const coursePriceInput = document.getElementById('coursePrice');
const courseModeInput = document.getElementById('courseMode');
const courseSlotsInput = document.getElementById('courseSlots');
const courseThumbnailInput = document.getElementById('courseThumbnail');

// Toast Elements
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

// Initialize activities if empty
let activities = JSON.parse(localStorage.getItem('mentorGuruActivities')) || [
    { text: "System architecture booted successfully", time: "Just now" },
    { text: "Database connection initialized", time: "1 hour ago" },
    { text: "16 default course vectors cataloged", time: "2 hours ago" }
];

// Switch views dynamically inside the single page dashboard
window.switchAdminView = function(viewName) {
    views.forEach(v => v.classList.add('hidden'));
    sidebarLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    document.getElementById(`nav-${viewName}`).classList.add('active');

    // Update Header
    const headers = {
        dashboard: "Dashboard Overview",
        courses: "Course Blueprints Management",
        students: "Student Admissions Logger",
        mentors: "Mentors Desk Controls",
        payments: "Billing Invoices Ledger",
        analytics: "Analytics Control Center",
        settings: "Global System Settings"
    };
    panelHeader.textContent = headers[viewName] || "Dashboard Overview";

    // Refresh respective view components
    if (viewName === 'dashboard') {
        refreshDashboardStats();
    } else if (viewName === 'courses') {
        renderAdminCoursesGrid();
    } else if (viewName === 'students') {
        renderStudentsTable();
    } else if (viewName === 'settings') {
        initializeSettingsView();
    }
};

// Calculate and render Dashboard Counters
function refreshDashboardStats() {
    courses = JSON.parse(localStorage.getItem('mentorGuruCourses')) || [];
    applications = JSON.parse(localStorage.getItem('mentorGuruApplications')) || [];

    // Counters calculations
    const totalStudents = applications.length;
    const totalCourses = courses.length;
    
    // Revenue counts sum of prices of all APPROVED enrollments
    let totalRevenue = 0;
    let approvedEnrollments = 0;

    applications.forEach(app => {
        if (app.status === 'Approved') {
            approvedEnrollments++;
            const matchCourse = courses.find(c => c.name === app.course);
            totalRevenue += matchCourse ? parseFloat(matchCourse.price) : 399;
        }
    });

    // Animate display counters
    animateCounter('statTotalStudents', totalStudents);
    animateCounter('statTotalCourses', totalCourses);
    animateCounter('statTotalRevenue', totalRevenue, true);
    animateCounter('statTotalEnrollments', applications.length);

    renderActivitiesList();
}

// Stats animator counter
function animateCounter(id, targetVal, isCurrency = false) {
    const el = document.getElementById(id);
    if (!el) return;

    let start = 0;
    const duration = 800; // ms
    const increment = targetVal / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= targetVal) {
            clearInterval(timer);
            el.textContent = isCurrency ? `NPR ${Math.round(targetVal).toLocaleString()}` : Math.round(targetVal).toLocaleString();
        } else {
            el.textContent = isCurrency ? `NPR ${Math.round(start).toLocaleString()}` : Math.round(start).toLocaleString();
        }
    }, 16);
}

// Render Activities Logs
function renderActivitiesList() {
    const actList = document.getElementById('recentActivitiesList');
    actList.innerHTML = "";
    
    if (activities.length === 0) {
        actList.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">No recent activity logs.</p>`;
        return;
    }

    activities.forEach(act => {
        actList.innerHTML += `
            <div class="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                <span class="text-red-500 mt-0.5"><i class="fa-solid fa-circle-dot text-[8px]"></i></span>
                <div class="flex-grow">
                    <p class="text-gray-700">${escapeHTML(act.text)}</p>
                    <span class="text-[10px] text-gray-400 font-medium">${escapeHTML(act.time)}</span>
                </div>
            </div>`;
    });
}

// Log a new system activity
function logActivity(text) {
    activities.unshift({ text: text, time: "Just now" });
    if (activities.length > 10) activities.pop(); // Keep only last 10
    localStorage.setItem('mentorGuruActivities', JSON.stringify(activities));
    if (document.getElementById('view-dashboard').classList.contains('hidden') === false) {
        renderActivitiesList();
    }
}

window.clearSystemActivity = function() {
    activities = [];
    localStorage.setItem('mentorGuruActivities', JSON.stringify(activities));
    renderActivitiesList();
};

// ==========================================
// COURSE BLUEPRINTS SECTION (CRUD)
// ==========================================

// Render Grid
function renderAdminCoursesGrid() {
    courses = JSON.parse(localStorage.getItem('mentorGuruCourses')) || [];
    const grid = document.getElementById('adminCoursesGrid');
    grid.innerHTML = "";

    if (courses.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200 w-full">
                <i class="fa-solid fa-graduation-cap text-4xl text-gray-200 mb-4 block"></i>
                <p class="text-gray-500 font-semibold">No courses logged in database</p>
                <button onclick="openCourseModal()" class="mt-4 btn-red px-5 py-2 text-xs font-bold uppercase rounded-lg">Create First Course</button>
            </div>`;
        return;
    }

    courses.forEach(c => {
        const img = c.thumbnail || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100%' height='100%' fill='%23f3f4f6'/></svg>";
        const isIT = c.category === 'IT';
        
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl border border-gray-200 overflow-hidden p-4 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition";
        card.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${img}" class="w-11 h-11 object-cover rounded-lg bg-gray-100 border border-gray-200 flex-shrink-0" alt="${c.name}">
                <div class="min-w-0">
                    <h4 class="font-bold text-gray-900 text-sm truncate" title="${escapeHTML(c.name)}">${escapeHTML(c.name)}</h4>
                    <span class="inline-block text-[9px] font-bold uppercase tracking-wider ${isIT ? 'text-gray-600 bg-gray-100' : 'text-red-600 bg-red-50'} px-2 py-0.5 rounded mt-1">${c.category}</span>
                </div>
            </div>
            
            <div class="text-xs text-gray-500 space-y-1">
                <p><i class="fa-regular fa-calendar-days text-[10px] w-4 text-red-400"></i> Duration: <strong class="text-gray-700">${c.duration}</strong></p>
                <p><i class="fa-solid fa-tags text-[10px] w-4 text-red-400"></i> Price: <strong class="text-gray-700">NPR ${c.price}</strong></p>
                <p><i class="fa-regular fa-clock text-[10px] w-4 text-red-400"></i> Shift: <strong class="text-gray-700">${c.slots}</strong></p>
                <p><i class="fa-solid fa-laptop-code text-[10px] w-4 text-red-400"></i> Mode: <strong class="text-gray-700">${c.mode}</strong></p>
            </div>

            <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                <div class="flex items-center gap-2">
                    <label class="switch">
                        <input type="checkbox" ${c.status === 'active' ? 'checked' : ''} onchange="toggleCourseStatus('${c.id}')">
                        <span class="slider"></span>
                    </label>
                    <span class="text-[10px] font-bold uppercase tracking-wider ${c.status === 'active' ? 'text-red-600' : 'text-gray-400'}">${c.status === 'active' ? 'Active' : 'Inactive'}</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <button onclick="editCourseBlueprint('${c.id}')" class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-500 hover:text-red-600 flex items-center justify-center text-xs transition" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteCourseBlueprint('${c.id}')" class="w-8 h-8 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-500 flex items-center justify-center text-xs transition" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

// Convert thumbnail file to base64
courseThumbnailInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (el) => { thumbnailBase64 = el.target.result; };
        reader.readAsDataURL(file);
    }
});

// Save Course form submit (Add/Edit)
courseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = courseTitleInput.value.trim();
    const cat = courseCategoryInput.value;
    const desc = courseDescInput.value.trim();
    const duration = courseDurationInput.value.trim();
    const price = parseFloat(coursePriceInput.value);
    const mode = courseModeInput.value;
    const slots = courseSlotsInput.value;

    if (!title || !desc || !duration || isNaN(price)) {
        alert('Please fill out all required fields.');
        return;
    }

    const courseId = editCourseIdInput.value;

    if (courseId) {
        // Edit Mode
        const index = courses.findIndex(c => c.id === courseId);
        if (index > -1) {
            courses[index] = {
                ...courses[index],
                name: title,
                category: cat,
                description: desc,
                duration: duration,
                price: price,
                mode: mode,
                slots: slots,
                thumbnail: thumbnailBase64 || courses[index].thumbnail
            };
            logActivity(`Updated course: "${title}"`);
            showToast(`Course "${title}" updated successfully!`);
        }
    } else {
        // Add Mode
        const newCourse = {
            id: 'c-' + Date.now(),
            name: title,
            category: cat,
            description: desc,
            duration: duration,
            price: price,
            mode: mode,
            slots: slots,
            status: 'active',
            thumbnail: thumbnailBase64
        };
        courses.push(newCourse);
        logActivity(`Created new course: "${title}"`);
        showToast(`Course "${title}" published successfully!`);
    }

    localStorage.setItem('mentorGuruCourses', JSON.stringify(courses));
    closeCourseModal();
    renderAdminCoursesGrid();
    
    // Broadcast updates to other opened windows
    window.dispatchEvent(new Event('storage'));
});

// Edit blueprint launcher
window.editCourseBlueprint = function(id) {
    const c = courses.find(c => c.id === id);
    if (!c) return;

    editCourseIdInput.value = c.id;
    courseTitleInput.value = c.name;
    courseCategoryInput.value = c.category;
    courseDescInput.value = c.description;
    courseDurationInput.value = c.duration;
    coursePriceInput.value = c.price;
    courseModeInput.value = c.mode;
    courseSlotsInput.value = c.slots;
    thumbnailBase64 = c.thumbnail;

    // UI Updates
    document.getElementById('courseModalHeader').innerHTML = `<i class="fa-solid fa-pen-to-square text-red-500 mr-2"></i> Edit Course`;
    document.getElementById('submitCourseBtn').textContent = "Update Course";

    openCourseModalOverlay();
};

// Delete blueprint launcher
window.deleteCourseBlueprint = function(id) {
    const c = courses.find(c => c.id === id);
    if (!c) return;

    if (confirm(`Are you sure you want to permanently remove "${c.name}" course?`)) {
        courses = courses.filter(course => course.id !== id);
        localStorage.setItem('mentorGuruCourses', JSON.stringify(courses));
        logActivity(`Deleted course: "${c.name}"`);
        showToast(`Course "${c.name}" has been deleted.`);
        renderAdminCoursesGrid();

        // Broadcast updates to other opened windows
        window.dispatchEvent(new Event('storage'));
    }
};

// Toggle course status switch
window.toggleCourseStatus = function(id) {
    const index = courses.findIndex(c => c.id === id);
    if (index > -1) {
        const item = courses[index];
        item.status = item.status === 'active' ? 'inactive' : 'active';
        localStorage.setItem('mentorGuruCourses', JSON.stringify(courses));
        logActivity(`Toggled status of "${item.name}" to ${item.status}`);
        showToast(`Course status updated to ${item.status}`);
        renderAdminCoursesGrid();

        // Broadcast updates to other opened windows
        window.dispatchEvent(new Event('storage'));
    }
};

// Modal open/close controls
window.openCourseModal = function() {
    // Reset Form
    courseForm.reset();
    editCourseIdInput.value = "";
    thumbnailBase64 = "";
    document.getElementById('courseModalHeader').innerHTML = `<i class="fa-solid fa-circle-plus text-red-500 mr-2"></i> Create New Course`;
    document.getElementById('submitCourseBtn').textContent = "Publish Course";

    openCourseModalOverlay();
};

function openCourseModalOverlay() {
    courseModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    courseModalOverlay.classList.add('opacity-100');
    courseModalBox.classList.remove('scale-[0.95]');
    courseModalBox.classList.add('scale-100');
}

window.closeCourseModal = function() {
    courseModalOverlay.classList.add('opacity-0', 'pointer-events-none');
    courseModalOverlay.classList.remove('opacity-100');
    courseModalBox.classList.add('scale-[0.95]');
    courseModalBox.classList.remove('scale-100');
};

// ==========================================
// STUDENT LOGGER MANAGEMENT SECTION
// ==========================================
const studentSearchInput = document.getElementById('studentSearchInput');

// Filter render table based on search parameter queries
if (studentSearchInput) {
    studentSearchInput.addEventListener('input', () => {
        renderStudentsTable();
    });
}

function renderStudentsTable() {
    applications = JSON.parse(localStorage.getItem('mentorGuruApplications')) || [];
    const tableBody = document.getElementById('adminStudentsTableBody');
    tableBody.innerHTML = "";

    const query = studentSearchInput ? studentSearchInput.value.toLowerCase().trim() : "";
    const filteredApps = applications.filter(app => {
        return app.name.toLowerCase().includes(query) || app.email.toLowerCase().includes(query) || app.course.toLowerCase().includes(query);
    });

    if (filteredApps.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-10 text-xs text-gray-400 font-medium">
                    No entries found matching your search.
                </td>
            </tr>`;
        return;
    }

    // Sort by id reverse order
    filteredApps.sort((a, b) => b.id.localeCompare(a.id));

    filteredApps.forEach(app => {
        const isApproved = app.status === 'Approved';
        
        tableBody.innerHTML += `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition text-sm">
                <td class="px-5 py-3.5 text-gray-400 text-xs">${app.date}</td>
                <td class="px-5 py-3.5 font-semibold text-gray-900">${escapeHTML(app.name)}</td>
                <td class="px-5 py-3.5 text-gray-500">${escapeHTML(app.email)}</td>
                <td class="px-5 py-3.5 text-gray-600 font-mono text-xs">${escapeHTML(app.phone || 'N/A')}</td>
                <td class="px-5 py-3.5"><span class="px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">${escapeHTML(app.course)}</span></td>
                <td class="px-5 py-3.5">
                    <span class="px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[9px] ${app.payFee ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}">
                        ${app.payFee ? 'Paid (NPR 500)' : 'Pay Later'}
                    </span>
                </td>
                <td class="px-5 py-3.5">
                    <span class="px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[9px] ${isApproved ? 'bg-gray-900 text-white' : 'bg-red-50 text-red-600 border border-red-200'}">
                        ${app.status}
                    </span>
                </td>
                <td class="px-5 py-3.5 flex justify-center items-center gap-2">
                    ${!isApproved ? `
                    <button onclick="approveStudentEnrollment('${app.id}')" class="py-1.5 px-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition">
                        Approve
                    </button>
                    ` : `
                    <span class="text-gray-900 text-xs font-semibold"><i class="fa-solid fa-circle-check text-red-500 mr-1"></i> Enrolled</span>
                    `}
                    <button onclick="deleteStudentEnrollment('${app.id}')" class="w-8 h-8 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-500 flex items-center justify-center text-xs transition" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>`;
    });
}

// Approve student enrollment trigger
window.approveStudentEnrollment = function(id) {
    const index = applications.findIndex(app => app.id === id);
    if (index > -1) {
        const item = applications[index];
        item.status = "Approved";
        localStorage.setItem('mentorGuruApplications', JSON.stringify(applications));
        logActivity(`Approved admission: "${item.name}" for "${item.course}"`);
        showToast(`Admission for "${item.name}" approved!`);
        renderStudentsTable();
        
        // Broadcast updates to other opened windows
        window.dispatchEvent(new Event('storage'));
    }
};

// Delete student registration trigger
window.deleteStudentEnrollment = function(id) {
    const app = applications.find(item => item.id === id);
    if (!app) return;

    if (confirm(`Remove admission request for "${app.name}" permanently?`)) {
        applications = applications.filter(item => item.id !== id);
        localStorage.setItem('mentorGuruApplications', JSON.stringify(applications));
        logActivity(`Removed student application: "${app.name}"`);
        showToast(`Enrollment for "${app.name}" has been removed.`);
        renderStudentsTable();
        
        // Broadcast updates to other opened windows
        window.dispatchEvent(new Event('storage'));
    }
};

// ==========================================
// TOAST NOTIFICATIONS & UTILITIES
// ==========================================

function showToast(msg) {
    toastMessage.textContent = msg;
    toastNotification.classList.remove('translate-y-24', 'opacity-0');
    toastNotification.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toastNotification.classList.add('translate-y-24', 'opacity-0');
        toastNotification.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
}

// Simple HTML Escaper
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Session Logoff system
window.logoutAdmin = function() {
    if (confirm("Are you sure you want to sign out?")) {
        sessionStorage.removeItem('mentorGuruAdmin');
        window.location.href = 'login.html';
    }
};

// Real-time synchronization receiver
window.addEventListener('storage', () => {
    courses = JSON.parse(localStorage.getItem('mentorGuruCourses')) || [];
    applications = JSON.parse(localStorage.getItem('mentorGuruApplications')) || [];
    
    // Refresh whatever view is currently active
    const activeSidebar = document.querySelector('.admin-sidebar-link.active');
    if (activeSidebar) {
        const id = activeSidebar.id.replace('nav-', '');
        if (id === 'dashboard') {
            refreshDashboardStats();
        } else if (id === 'courses') {
            renderAdminCoursesGrid();
        } else if (id === 'students') {
            renderStudentsTable();
        }
    }
});

// Pre-fill Gemini API Key input field in Settings View
function initializeSettingsView() {
    const adminGeminiApiKeyInput = document.getElementById('adminGeminiApiKeyInput');
    if (adminGeminiApiKeyInput) {
        adminGeminiApiKeyInput.value = localStorage.getItem('mentorGuruGeminiApiKey') || '';
    }
}

// Save Admin global configurations
window.saveAdminSettings = function() {
    const adminGeminiApiKeyInput = document.getElementById('adminGeminiApiKeyInput');
    if (adminGeminiApiKeyInput) {
        const key = adminGeminiApiKeyInput.value.trim();
        if (key === "") {
            localStorage.removeItem('mentorGuruGeminiApiKey');
            logActivity("Removed Google Gemini API Key from settings");
        } else {
            localStorage.setItem('mentorGuruGeminiApiKey', key);
            logActivity("Configured Google Gemini API Key in settings");
        }
        alert("Global configurations and Gemini API settings saved successfully!");
    } else {
        alert("Settings saved successfully!");
    }
};

// Initial boot settings
refreshDashboardStats();
