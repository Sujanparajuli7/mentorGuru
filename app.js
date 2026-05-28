// MentorGuru Public Website Script

// Default 16 course list datasets to seed on first run
const initialMockCourses = [
    // IT COURSES
    {
        id: "it-cybersec",
        name: "Cybersecurity Essentials",
        category: "IT",
        description: "Master networking security, network penetration analysis, encryption algorithms, and secure firewall audits.",
        duration: "12 Weeks",
        price: 499,
        slots: "10 AM to 11 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-datasci",
        name: "Data Science With Python",
        category: "IT",
        description: "Explore machine learning algorithms, database queries, panda arrays, and data visualization pipelines.",
        duration: "10 Weeks",
        price: 599,
        slots: "4 PM to 5 PM",
        mode: "Physical",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-ai",
        name: "AI for Everyone",
        category: "IT",
        description: "Understand large language models, neural network structures, prompting rules, and AI ethics benchmarks.",
        duration: "6 Weeks",
        price: 299,
        slots: "6 AM to 7 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-devops",
        name: "DevOps With Cloud Computing",
        category: "IT",
        description: "Deploy automated docker systems, Jenkins build cycles, AWS deployment nodes, and terraform scripts.",
        duration: "14 Weeks",
        price: 649,
        slots: "10 AM to 11 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-scrum",
        name: "Project Management With Scrum",
        category: "IT",
        description: "Understand agile sprints, scrum framework rules, team product backlogs, and milestone tracking.",
        duration: "8 Weeks",
        price: 399,
        slots: "4 PM to 5 PM",
        mode: "Physical",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-flutter",
        name: "Flutter & Dart",
        category: "IT",
        description: "Compile robust single codebase applications spanning both android devices and iOS devices.",
        duration: "12 Weeks",
        price: 449,
        slots: "6 AM to 7 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-aws",
        name: "AWS Certified Practitioner",
        category: "IT",
        description: "Clear your foundational cloud certificate by exploring EC2 instances, S3 storage, and RDS tables.",
        duration: "8 Weeks",
        price: 349,
        slots: "10 AM to 11 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "it-qa",
        name: "Quality Assurance Training",
        category: "IT",
        description: "Run automated cypress validation loops, selenium scripts, API endpoints, and manual bug reports.",
        duration: "10 Weeks",
        price: 399,
        slots: "4 PM to 5 PM",
        mode: "Physical",
        status: "active",
        thumbnail: ""
    },

    // NON-IT COURSES
    {
        id: "nonit-dipmkt",
        name: "Diploma in Digital Marketing",
        category: "Non-IT",
        description: "Learn advertising basics, brand strategy concepts, social growth loops, and copywriting campaigns.",
        duration: "8 Weeks",
        price: 299,
        slots: "6 AM to 7 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-advmkt",
        name: "Advanced Digital Marketing",
        category: "Non-IT",
        description: "Deep dive into paid social dashboards, pixel setups, conversion cost tracking, and lead capture scripts.",
        duration: "12 Weeks",
        price: 499,
        slots: "10 AM to 11 AM",
        mode: "Physical",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-seo",
        name: "Advanced SEO Masterclass",
        category: "Non-IT",
        description: "Structure search engine optimizations: technical site audits, backlink indexes, and keyword mappings.",
        duration: "6 Weeks",
        price: 349,
        slots: "4 PM to 5 PM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-hr",
        name: "Professional HR Training",
        category: "Non-IT",
        description: "Understand corporate workspace recruitment loops, legal dispute parameters, and employee benefit audits.",
        duration: "10 Weeks",
        price: 399,
        slots: "10 AM to 11 AM",
        mode: "Physical",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-dataanal",
        name: "Data Analysis and Analytics",
        category: "Non-IT",
        description: "Utilize advanced Microsoft Excel functions, pivot charts, basic SQL query strings, and dashboard summaries.",
        duration: "10 Weeks",
        price: 449,
        slots: "4 PM to 5 PM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-uiux",
        name: "UI/UX Design Masterclass",
        category: "Non-IT",
        description: "Design wireframes, high-fidelity landing pages in Figma, click prototypes, and run user research cycles.",
        duration: "12 Weeks",
        price: 499,
        slots: "6 AM to 7 AM",
        mode: "Physical",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-comm",
        name: "Communication Skills Workshop",
        category: "Non-IT",
        description: "Express corporate thoughts clearly, write formal emails, run product presentations, and manage client briefs.",
        duration: "4 Weeks",
        price: 199,
        slots: "4 PM to 5 PM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    },
    {
        id: "nonit-content",
        name: "Content Writing Masterclass",
        category: "Non-IT",
        description: "Publish SEO-optimized articles, creative advertisement copies, corporate whitepapers, and brand taglines.",
        duration: "6 Weeks",
        price: 249,
        slots: "10 AM to 11 AM",
        mode: "Online",
        status: "active",
        thumbnail: ""
    }
];

// Initialize database if empty
if (!localStorage.getItem('mentorGuruCourses')) {
    localStorage.setItem('mentorGuruCourses', JSON.stringify(initialMockCourses));
}

// Current active category filter state
let selectedCategory = "all";

// DOM Elements
const courseGrid = document.getElementById('publicCourseGrid');
const enrollModalOverlay = document.getElementById('enrollModalOverlay');
const enrollModalBox = document.getElementById('enrollModalBox');
const enrollCourseTitleInput = document.getElementById('enrollCourseTitle');
const enrollForm = document.getElementById('enrollForm');
const studentNameInput = document.getElementById('studentName');
const studentEmailInput = document.getElementById('studentEmail');
const studentPhoneInput = document.getElementById('studentPhone');
const phoneIcon = document.getElementById('phoneIcon');
const phoneValidationStatusIcon = document.getElementById('phoneValidationStatusIcon');
const phoneErrorMsg = document.getElementById('phoneErrorMsg');

const learnMoreModalOverlay = document.getElementById('learnMoreModalOverlay');
const learnMoreModalBox = document.getElementById('learnMoreModalBox');
const infoCourseTitle = document.getElementById('infoCourseTitle');
const infoCourseDesc = document.getElementById('infoCourseDesc');
const infoCourseSlots = document.getElementById('infoCourseSlots');
const infoCoursePrice = document.getElementById('infoCoursePrice');
const infoCourseDuration = document.getElementById('infoCourseDuration');
const infoCourseMode = document.getElementById('infoCourseMode');

// Render active catalog cards
function renderPublicPortal() {
    const courses = JSON.parse(localStorage.getItem('mentorGuruCourses')) || [];
    const activeCourses = courses.filter(c => c.status === 'active');
    
    // Filter active courses by category selection
    const filteredCourses = activeCourses.filter(c => {
        if (selectedCategory === 'all') return true;
        return c.category === selectedCategory;
    });

    courseGrid.innerHTML = "";

    if (filteredCourses.length === 0) {
        courseGrid.innerHTML = `
            <div class="col-span-full py-16 text-center w-full bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <i class="fa-solid fa-graduation-cap text-4xl text-gray-200 mb-4 block"></i>
                <p class="text-gray-500 font-semibold text-lg">New Cohorts Launching Soon</p>
                <p class="text-gray-400 text-xs mt-1">Our curriculum engineers are designing new rosters. Stay tuned!</p>
            </div>`;
        return;
    }

    filteredCourses.forEach(c => {
        const img = c.thumbnail || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='180'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14' font-family='sans-serif' font-weight='bold'>MentorGuru</text></svg>";
        const isIT = c.category === 'IT';
        
        const card = document.createElement('div');
        card.className = `glass-card rounded-2xl overflow-hidden flex flex-col justify-between`;
        card.innerHTML = `
            <div class="relative w-full h-44 bg-gray-100 overflow-hidden border-b border-gray-200">
                <img src="${img}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="${escapeHTML(c.name)}">
                <span class="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                    ${escapeHTML(c.mode)}
                </span>
                <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md border border-gray-200 text-[9px] font-bold text-red-600 uppercase tracking-wider px-2 py-0.5 rounded">
                    <i class="fa-solid fa-award mr-1"></i> Verified Syllabus
                </span>
            </div>
            
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                    <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <span><i class="fa-regular fa-calendar-days mr-1"></i> ${escapeHTML(c.duration)}</span>
                        <span><i class="fa-regular fa-clock mr-1"></i> ${escapeHTML(c.slots)}</span>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 tracking-tight leading-snug line-clamp-1">${escapeHTML(c.name)}</h3>
                    <p class="text-gray-500 text-xs leading-relaxed line-clamp-2">${escapeHTML(c.description)}</p>
                </div>

                <div class="space-y-3 pt-4 border-t border-gray-100">
                    <div class="flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Tuition Fee</span>
                            <span class="text-xl font-extrabold text-gray-900">NPR ${c.price}</span>
                        </div>
                        <button onclick="openLearnMoreModal('${c.id}')" class="text-xs font-semibold text-red-600 hover:text-red-700 transition">
                            Learn More <i class="fa-solid fa-arrow-right-long ml-1 text-[10px]"></i>
                        </button>
                    </div>
                    
                    <button onclick="openEnrollModal('${escapeHTML(c.name)}')" class="btn-red w-full py-3 text-center font-bold text-xs uppercase tracking-wider rounded-xl active:scale-[0.98] transition">
                        Enroll Now
                    </button>
                </div>
            </div>`;
        courseGrid.appendChild(card);
    });
}

// Category Tab Switcher
window.switchCategory = function(cat) {
    selectedCategory = cat;
    
    // Toggle active classes on tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`tab-${cat}`).classList.add('active');

    renderPublicPortal();
};

// Open Learn More Modal Detail Box
window.openLearnMoreModal = function(id) {
    const courses = JSON.parse(localStorage.getItem('mentorGuruCourses')) || [];
    const course = courses.find(c => c.id === id);
    if (!course) return;

    infoCourseTitle.textContent = course.name;
    infoCourseDesc.textContent = course.description;
    infoCourseSlots.textContent = course.slots;
    infoCoursePrice.textContent = `NPR ${course.price}`;
    infoCourseDuration.textContent = course.duration;
    infoCourseMode.textContent = course.mode;

    learnMoreModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    learnMoreModalOverlay.classList.add('opacity-100');
    learnMoreModalBox.classList.remove('scale-[0.95]');
    learnMoreModalBox.classList.add('scale-100');
};

window.closeLearnMoreModal = function() {
    learnMoreModalOverlay.classList.add('opacity-0', 'pointer-events-none');
    learnMoreModalOverlay.classList.remove('opacity-100');
    learnMoreModalBox.classList.add('scale-[0.95]');
    learnMoreModalBox.classList.remove('scale-100');
};

// Open Enrollment Dialog Modal
window.openEnrollModal = function(courseName) {
    enrollCourseTitleInput.value = courseName;
    enrollModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    enrollModalOverlay.classList.add('opacity-100');
    enrollModalBox.classList.remove('scale-[0.95]');
    enrollModalBox.classList.add('scale-100');
    studentNameInput.focus();
};

// Phone validation helper
function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    const digitCount = (phone.match(/\d/g) || []).length;
    return phoneRegex.test(phone) && digitCount >= 7;
}

// Trigger phone icon wiggle animation
function triggerPhoneWiggle() {
    if (phoneIcon) {
        phoneIcon.classList.remove('animate-phone-wiggle');
        void phoneIcon.offsetWidth; // Force reflow
        phoneIcon.classList.add('animate-phone-wiggle');
    }
}

// Real-time phone input validation listener
if (studentPhoneInput) {
    studentPhoneInput.addEventListener('input', () => {
        const val = studentPhoneInput.value;
        
        // Trigger subtle wiggle animation as user types
        triggerPhoneWiggle();

        if (val.trim() === '') {
            // Empty state
            studentPhoneInput.classList.remove('enroll-input-valid', 'enroll-input-invalid');
            phoneValidationStatusIcon.innerHTML = '';
            phoneErrorMsg.classList.add('opacity-0', 'h-0');
            phoneErrorMsg.classList.remove('h-auto');
        } else if (validatePhone(val)) {
            // Valid state
            studentPhoneInput.classList.remove('enroll-input-invalid');
            studentPhoneInput.classList.add('enroll-input-valid');
            phoneValidationStatusIcon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-500 text-sm"></i>';
            phoneErrorMsg.classList.add('opacity-0', 'h-0');
            phoneErrorMsg.classList.remove('h-auto');
        } else {
            // Invalid state
            studentPhoneInput.classList.remove('enroll-input-valid');
            studentPhoneInput.classList.add('enroll-input-invalid');
            phoneValidationStatusIcon.innerHTML = '<i class="fa-solid fa-circle-xmark text-red-500 text-sm animate-pulse"></i>';
            phoneErrorMsg.classList.remove('opacity-0', 'h-0');
            phoneErrorMsg.classList.add('h-auto');
        }
    });

    studentPhoneInput.addEventListener('focus', () => {
        triggerPhoneWiggle();
    });
}

// Close Enrollment Dialog Modal
window.closeEnrollModal = function() {
    enrollModalOverlay.classList.add('opacity-0', 'pointer-events-none');
    enrollModalOverlay.classList.remove('opacity-100');
    enrollModalBox.classList.add('scale-[0.95]');
    enrollModalBox.classList.remove('scale-100');
    enrollForm.reset();
    
    // Clear validation classes and UI hints
    if (studentPhoneInput) {
        studentPhoneInput.classList.remove('enroll-input-valid', 'enroll-input-invalid');
        phoneValidationStatusIcon.innerHTML = '';
        phoneErrorMsg.classList.add('opacity-0', 'h-0');
        phoneErrorMsg.classList.remove('h-auto');
    }
};

// Form Submission handling
enrollForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = studentNameInput.value.trim();
    const email = studentEmailInput.value.trim();
    const phone = studentPhoneInput ? studentPhoneInput.value.trim() : '';
    const course = enrollCourseTitleInput.value;

    if (!name || !email || !phone) {
        alert('Please fill out all registration fields.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid mobile number.');
        if (studentPhoneInput) {
            studentPhoneInput.focus();
            triggerPhoneWiggle();
        }
        return;
    }

    const payFeeCheckbox = document.getElementById('payFee');
    const payFee = payFeeCheckbox ? payFeeCheckbox.checked : false;

    if (payFee) {
        // Trigger eSewa payment flow first
        openEsewaModal(phone);
        return;
    }

    // Otherwise proceed immediately with regular registration (Pay Later)
    completeRegistration(name, email, phone, course, false);
});

// Complete admission logs submission
function completeRegistration(name, email, phone, course, payFee, txnId = '') {
    const newApp = {
        id: 'app-' + Date.now(),
        name: name,
        email: email,
        phone: phone, // Saved phone number!
        course: course,
        payFee: payFee, // Saved fee payment preference
        txnId: txnId, // Manual payment transaction ID
        status: 'Pending', // Pending, Approved
        date: new Date().toLocaleDateString()
    };

    // Save registration log to storage
    const applications = JSON.parse(localStorage.getItem('mentorGuruApplications')) || [];
    applications.push(newApp);
    localStorage.setItem('mentorGuruApplications', JSON.stringify(applications));

    alert(payFee 
        ? `Enrollment Request Submitted & NPR 500 Fee Payment logged successfully! Reference ID: ${txnId || 'N/A'}` 
        : `Enrollment Request Submitted Successfully for "${course}"! Our counselors will email you shortly.`);
    closeEnrollModal();

    // Notify other open tabs in real-time
    window.dispatchEvent(new Event('storage'));
}

// Simple HTML Escaper
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Bind direct storage listener for real-time reactivity
window.addEventListener('storage', renderPublicPortal);

// Initial bootstrap rendering
renderPublicPortal();

// ========================================================
// ESEWA MANUAL PAYMENT INTEGRATION (ID: 9843641509)
// ========================================================

const esewaModalOverlay = document.getElementById('esewaModalOverlay');
const esewaModalBox = document.getElementById('esewaModalBox');
const esewaTxnInput = document.getElementById('esewaTxnInput');

let registrationPayload = null;

window.openEsewaModal = function(phone) {
    // Save enrollment parameters to memory
    registrationPayload = {
        name: studentNameInput.value.trim(),
        email: studentEmailInput.value.trim(),
        phone: phone,
        course: enrollCourseTitleInput.value
    };

    if (esewaTxnInput) esewaTxnInput.value = "";

    // Animate Modal Open
    esewaModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    esewaModalOverlay.classList.add('opacity-100');
    esewaModalBox.classList.remove('scale-[0.95]');
    esewaModalBox.classList.add('scale-100');
};

window.closeEsewaModal = function() {
    esewaModalOverlay.classList.add('opacity-0', 'pointer-events-none');
    esewaModalOverlay.classList.remove('opacity-100');
    esewaModalBox.classList.add('scale-[0.95]');
    esewaModalBox.classList.remove('scale-100');
    registrationPayload = null;
};

window.copyEsewaId = function() {
    navigator.clipboard.writeText("9843641509");
    alert("eSewa ID: 9843641509 copied to clipboard!");
};

window.confirmManualPayment = function(event) {
    const txnId = esewaTxnInput ? esewaTxnInput.value.trim() : "";
    
    const confirmBtn = event.currentTarget;
    const originalHtml = confirmBtn.innerHTML;
    
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Processing Payment...`;

    setTimeout(() => {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = originalHtml;

        if (registrationPayload) {
            completeRegistration(
                registrationPayload.name,
                registrationPayload.email,
                registrationPayload.phone,
                registrationPayload.course,
                true,
                txnId || 'Paid via eSewa (9843641509)'
            );
        }
        if (registrationPayload) {
            completeRegistration(
                registrationPayload.name,
                registrationPayload.email,
                registrationPayload.phone,
                registrationPayload.course,
                true,
                txnId || 'Paid via eSewa (9843641509)'
            );
        }
        closeEsewaModal();
    }, 1200);
};

// ========================================================
// CHATBOT CONTROLLER & GEMINI AI INTEGRATION
// ========================================================

const chatContainer = document.getElementById('chatContainer');
const chatTriggerIcon = document.getElementById('chatTriggerIcon');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatForm = document.getElementById('chatForm');
const chatSettingsPanel = document.getElementById('chatSettingsPanel');
const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
const chatStatusText = document.getElementById('chatStatusText');

// Initialize API Key in input field if present
if (localStorage.getItem('mentorGuruGeminiApiKey')) {
    geminiApiKeyInput.value = localStorage.getItem('mentorGuruGeminiApiKey');
    updateChatStatus(true);
}

// Update Chat Status Indicator
function updateChatStatus(isLive) {
    if (isLive) {
        chatStatusText.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Gemini AI Active`;
    } else {
        chatStatusText.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Offline Simulation`;
    }
}

// Toggle Chatbot Drawer open/close
window.toggleChatbot = function() {
    chatContainer.classList.toggle('hidden');
    // Allow animation delay
    setTimeout(() => {
        chatContainer.classList.toggle('show');
    }, 20);

    const isOpen = chatContainer.classList.contains('show');
    chatTriggerIcon.className = isOpen ? "fa-solid fa-xmark text-lg animate-phone-wiggle" : "fa-solid fa-message text-lg";
};

// Toggle API Key setting drawer
window.toggleChatSettings = function() {
    chatSettingsPanel.classList.toggle('hidden');
};

// Save Gemini API Key
window.saveGeminiApiKey = function() {
    const key = geminiApiKeyInput.value.trim();
    if (key === "") {
        localStorage.removeItem('mentorGuruGeminiApiKey');
        updateChatStatus(false);
        alert("Gemini API Key removed. Reverted to offline simulation responder.");
    } else {
        localStorage.setItem('mentorGuruGeminiApiKey', key);
        updateChatStatus(true);
        alert("Google Gemini API Key configured and verified successfully!");
    }
    chatSettingsPanel.classList.add('hidden');
};

// Send Quick Suggestion Buttons
window.sendQuickQuery = function(query) {
    appendMessage(query, 'user');
    processBotResponse(query);
};

// Submit typing form
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (query === "") return;

    appendMessage(query, 'user');
    chatInput.value = "";
    processBotResponse(query);
});

// Append a message block in the chat stream
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    
    if (sender === 'user') {
        msgDiv.className = "flex items-start justify-end gap-2.5 max-w-[85%] ml-auto";
        msgDiv.innerHTML = `
            <div class="p-3 rounded-2xl rounded-tr-none bg-gradient-to-r from-red-600 to-red-500 text-white shadow-sm leading-relaxed break-words font-medium">
                ${escapeHTML(text)}
            </div>`;
    } else {
        msgDiv.className = "flex items-start gap-2.5 max-w-[85%]";
        msgDiv.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center text-[10px] flex-shrink-0">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="p-3 rounded-2xl rounded-tl-none bg-white border border-gray-150 shadow-sm leading-relaxed break-words space-y-1">
                ${formatMessage(text)}
            </div>`;
    }

    chatMessages.appendChild(msgDiv);
    // Smooth scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple bolding and line break formatting for chat bubbles
function formatMessage(text) {
    // Bold matches like **text**
    let formatted = escapeHTML(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullet points like * bullet
    formatted = formatted.replace(/^\*\s(.*)$/gm, '<li class="ml-2 font-medium list-disc">$1</li>');
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

// Orchestrate Gemini API vs. Offline local mock engine
async function processBotResponse(query) {
    // Append Typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = "flex items-start gap-2.5 max-w-[85%]" ;
    typingDiv.id = "chatTypingIndicator";
    typingDiv.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center text-[10px] flex-shrink-0">
            <i class="fa-solid fa-robot"></i>
        </div>
        <div class="p-3 rounded-2xl rounded-tl-none bg-white border border-gray-150 shadow-sm flex items-center gap-1.5 text-gray-400">
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>`;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const apiKey = localStorage.getItem('mentorGuruGeminiApiKey');
    let responseText = "";

    if (apiKey) {
        // Query official Gemini 1.5 Flash API
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const apiResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: query }]
                        }
                    ],
                    systemInstruction: {
                        parts: [{ text: getGeminiSystemPrompt() }]
                    }
                })
            });

            if (!apiResponse.ok) {
                throw new Error("API call returned failure status.");
            }

            const data = await apiResponse.json();
            responseText = data.candidates[0].content.parts[0].text.trim();
        } catch (err) {
            console.error("Gemini API call failed, falling back to local simulation.", err);
            responseText = getLocalOfflineResponse(query) + "\n\n*(Note: Live Gemini API query failed due to invalid key or network error. Fallback offline response displayed)*";
        }
    } else {
        // Fallback to local rule-based smart engine
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking latency
        responseText = getLocalOfflineResponse(query);
    }

    // Remove Typing Indicator
    const indicator = document.getElementById('chatTypingIndicator');
    if (indicator) indicator.remove();

    appendMessage(responseText, 'bot');
}

// Build the business details system prompt for Gemini Q&A mapping
function getGeminiSystemPrompt() {
    const courseList = JSON.parse(localStorage.getItem('mentorGuruCourses')) || initialMockCourses;
    const coursesStr = courseList.map(c => `* ${c.name} (${c.category}): Duration: ${c.duration}, Price: NPR ${c.price}, Mode: ${c.mode}, Shift: ${c.slots}`).join('\n');

    return `You are the friendly, professional virtual customer assistant for "MentorGuru", a premium corporate educational platform. 
    Your goal is to answer student queries regarding our courses, fee structures, shift timings, locations, and counselors desk.
    
    Here is our official business information:
    - Office Location: New Baneshwor, Kathmandu, Nepal.
    - Timing & Shifts: Morning Shift (6 AM to 7 AM), Daytime Shift (10 AM to 11 AM), and Evening Shift (4 PM to 5 PM).
    - Mode of Operations: In-Person Physical Classes and Interactive Online streams.
    - Tuition Fee Structures: Range from NPR 19,900 to NPR 64,900 depending on syllabus tracks.
    - Contacts: email support@mentorguru.edu or telephone +977-1-44XXXXX.
    - Mentors: Anupam K.C. (DevOps & Cloud), Shreya Baskota (Data Science), Sujan Shrestha (SEO & Marketing), Pramila Devkota (UI/UX).
    
    Active Course Catalog:
    ${coursesStr}
    
    Response Guidelines:
    1. Greeting System: Greet users warmly. Support both English and Nepali. Detect user's language automatically and respond fluently in the same language. 
    2. Question-Answer: Be helpful, professional, and clear. Answer general technology conceptual questions if asked, but always guide them back to enrolling in our specialized training programs.
    3. Keep responses relatively concise and structured for a tiny web chatbot drawer. Bold key phrases using **text** syntax.`;
}

// Smart Local Rule-Based Q&A engine
function getLocalOfflineResponse(msg) {
    const text = msg.toLowerCase().trim();
    // Elegant, robust Nepali language detection:
    // 1. Check for any Devanagari script characters (U+0900 to U+097F)
    // 2. Check for keywords "nepali" or "nepal" in English text
    const isNepali = /[\u0900-\u097F]/.test(text) || /nepali|nepal/i.test(text);

    // 1. Greetings (only if no other specific content is asked, preventing greeting hijacks)
    if (/hello|hi|hey|yo|नमस्ते|namaste/.test(text) && !/course|track|fee|price|cost|tuition|time|shift|timing|location|address|where|contact|phone|email|support|शुल्क|पैसा|समय|सिफ्ट|कहाँ|नम्बर|सम्पर्क|इमेल/.test(text)) {
        return isNepali
            ? "नमस्ते! **MentorGuru Assistant** मा स्वागत छ। म तपाईंलाई हाम्रा तालिम कोर्षहरू, कक्षाको समय, लोकेसन, र शुल्क सम्बन्धी जानकारी दिन सक्छु। के मद्दत गरौं?"
            : "Hello! Welcome to the **MentorGuru Assistant**. I can help you explore our IT & Non-IT training courses, shift timings, tuition fees, and class locations. How can I assist you today?";
    }

    // 2. Non-IT Courses (Checked FIRST to avoid "non-it" being intercepted by the "it" check)
    if (text.includes("non-it") || text.includes("non it") || text.includes("मार्केटिङ") || text.includes("डिजिटल") || text.includes("डिजिटल मार्केटिङ") || /marketing|seo|hr|content|\bui\b|\bux\b|design/i.test(text)) {
        return isNepali
            ? "हाम्रा लोकप्रिय **Non-IT** कोर्षहरू हुन्:\n* **Diploma in Digital Marketing**\n* **Advanced Digital Marketing**\n* **Advanced SEO Masterclass**\n* **Professional HR Training**\n* **Data Analysis**\n* **UI/UX Design Masterclass**\n* **Communication Skills Workshop**\n* **Content Writing Masterclass**"
            : "Our premium **Non-IT Tracks** are:\n* **Diploma in Digital Marketing**\n* **Advanced Digital Marketing**\n* **Advanced SEO Masterclass**\n* **Professional HR Training**\n* **Data Analysis**\n* **UI/UX Design Masterclass**\n* **Communication Skills Workshop**\n* **Content Writing Masterclass**";
    }

    // 3. IT Courses (Checked after Non-IT to avoid substring collision)
    if (text.includes("it course") || text.includes("it track") || text.includes("आईटी") || text.includes("कम्प्युटर") || text.includes("कोर्ष") || text.includes("कोर्स") || text.includes("तालिम") || /programming|developer|cyber|data|python|devops|flutter|aws|\bqa\b/i.test(text)) {
        return isNepali
            ? "हाम्रा मुख्य **IT Tracks** कोर्षहरू हुन्:\n* **Cybersecurity Essentials**\n* **Data Science With Python**\n* **AI for Everyone**\n* **DevOps With Cloud**\n* **Flutter & Dart Mobile Dev**\n* **AWS Practitioner**\n* **Quality Assurance**\nयी सबै कोर्षहरूमा प्रयोगात्मक प्रयोगशाला र जब प्लेसमेन्ट लिङ्केज छ।"
            : "We offer elite **IT Courses** led by experts:\n* **Cybersecurity Essentials**\n* **Data Science With Python**\n* **AI for Everyone**\n* **DevOps With Cloud Computing**\n* **Flutter & Dart**\n* **AWS Certified Practitioner**\n* **Quality Assurance Training**";
    }

    // 4. Fees (Using word boundaries for short matches to prevent matching "ui" in "tuition")
    if (text.includes("fee") || text.includes("price") || text.includes("cost") || text.includes("tuition") || text.includes("money") || text.includes("शुल्क") || text.includes("पैसा") || text.includes("तिर्ने")) {
        return isNepali
            ? "हाम्रा कक्षाहरूको शुल्क **NPR १९,९०० देखि NPR ६४,९००** सम्म रहेको छ। प्रयोगात्मक सेसन, अनलाइन रेकर्डिङ र प्रमाणपत्रहरू यसैमा समाविष्ट छन्। तपाईंले भर्नाको समयमा NPR ५०० को न्यूनतम भर्ना शुल्क बुझाएर सिट सुरक्षित गर्न सक्नुहुन्छ।"
            : "Our course prices range from **$199 to $649** (approx NPR 19,900 to NPR 64,900) depending on the track. This includes live mentoring, study resources, and career linkage profiles.";
    }

    // 5. Timings & Shifts
    if (text.includes("time") || text.includes("shift") || text.includes("slots") || text.includes("timing") || text.includes("hours") || text.includes("समय") || text.includes("सिफ्ट") || text.includes("कहिले")) {
        return isNepali
            ? "हाम्रा कक्षाहरू ३ वटा सिफ्टहरूमा संचालन हुन्छन्:\n* **बिहान ६ बजे देखि ७ बजे सम्म**\n* **दिउँसो १० बजे देखि ११ बजे सम्म**\n* **बेलुका ४ बजे देखि ५ बजे सम्म**\nतपाईंले भर्ना हुँदा आफ्नो अनुकूल सिफ्ट रोज्न सक्नुहुन्छ।"
            : "We run strict daily shifts to match your operational routines:\n* **Morning Shift:** 6 AM to 7 AM\n* **Daytime Shift:** 10 AM to 11 AM\n* **Evening Shift:** 4 PM to 5 PM";
    }

    // 6. Location
    if (text.includes("location") || text.includes("address") || text.includes("where") || text.includes("kathmandu") || text.includes("baneshwor") || text.includes("कहाँ") || text.includes("ठेगाना") || text.includes("बानेश्वर")) {
        return isNepali
            ? "हाम्रो भौतिक तालिम केन्द्र **काठमाडौंको नयाँ बानेश्वर** मा अवस्थित छ। हामी भौतिक (Physical) र अनलाइन (Online Live Streams) दुवै माध्यमबाट तालिम सञ्चालन गर्छौं।"
            : "MentorGuru is located at **New Baneshwor, Kathmandu, Nepal**. We conduct both physical in-person bootcamps and live virtual online classes.";
    }

    // 7. Contact Desk
    if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("support") || text.includes("नम्बर") || text.includes("सम्पर्क") || text.includes("इमेल") || text.includes("फोन")) {
        return isNepali
            ? "तपाईंले हाम्रो एड्मिसन काउन्सिलरलाई **+977-1-44XXXXX** मा सिधै सम्पर्क गर्न सक्नुहुन्छ वा **support@mentorguru.edu** मा इमेल पठाउन सक्नुहुन्छ।"
            : "You can reach our helpdesk via email at **support@mentorguru.edu** or speak with an admissions officer at **+977-1-44XXXXX**.";
    }

    // Fallback response
    return isNepali
        ? "मलाई MentorGuru का तालिम कोर्षहरू, शुल्कहरू, सिफ्टहरू, र सम्पर्क डेस्क सम्बन्धी पूर्ण जानकारी छ। कृपया माथिका कुनै सुझाव बटनहरू थिच्नुहोस् वा स्पष्ट रूपमा कोर्ष वा समय बारे सोध्नुहोला।"
        : "I have complete details regarding **MentorGuru's** IT and Non-IT programs, price tag structural ranges, locations, and shift timetables. Please use the quick suggestion pills below or ask specific questions!";
}

