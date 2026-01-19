// /**
//  * Ravan.ai - Main Application Logic
//  */

// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize all components
//     initIndustryTabs();
//     initFAQ();
//     initROICalculator();
//     initCountryDropdown();
//     initScrollAnimations();
// });

// /**
//  * 1. Industry ROI Tabs Logic
//  */
// window.switchIndustry = function (industryId) {
//     const tabs = document.querySelectorAll(".tab-btn");
//     tabs.forEach((tab) => {
//         const onclick = tab.getAttribute("onclick");
//         if (onclick && onclick.includes(industryId)) {
//             tab.classList.add("active");
//         } else {
//             tab.classList.remove("active");
//         }
//     });

//     const contents = document.querySelectorAll(".snapshot-content");
//     contents.forEach((content) => content.classList.remove("active"));

//     const target = document.getElementById(industryId);
//     if (target) target.classList.add("active");
// };

// function initIndustryTabs() {
//     // Initial call if needed is handled by inline HTML usually,
//     // but we can ensure global is active.
//     const activeTab = document.querySelector('.tab-btn.active');
//     if (activeTab) {
//         const onclick = activeTab.getAttribute('onclick');
//         if (onclick) {
//             const match = onclick.match(/'([^']+)'/);
//             if (match) switchIndustry(match[1]);
//         }
//     }
// }

// /**
//  * 2. FAQ Accordion Logic
//  */
// function initFAQ() {
//     document.querySelectorAll(".faq-question").forEach((button) => {
//         button.addEventListener("click", () => {
//             const faqItem = button.parentElement;
//             const isActive = faqItem.classList.contains("active");

//             // Close all other items
//             document.querySelectorAll(".faq-item").forEach((item) => {
//                 item.classList.remove("active");
//                 const answer = item.querySelector(".faq-answer");
//                 if (answer) answer.style.maxHeight = null;
//             });

//             if (!isActive) {
//                 faqItem.classList.add("active");
//                 const answer = faqItem.querySelector(".faq-answer");
//                 if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
//             }
//         });
//     });
// }

// /**
//  * 3. ROI Calculator Logic
//  */
// function initROICalculator() {
//     const leadsInput = document.getElementById("input-leads");
//     const dealInput = document.getElementById("input-deal");
//     const rateInput = document.getElementById("input-rate");

//     const valLeads = document.getElementById("val-leads");
//     const valDeal = document.getElementById("val-deal");
//     const valRate = document.getElementById("val-rate");
//     const resultRevenue = document.getElementById("result-revenue");

//     if (!leadsInput || !dealInput || !rateInput) return;

//     function formatMoney(number) {
//         return new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//             maximumFractionDigits: 0,
//         }).format(number);
//     }

//     function calculateROI() {
//         const leads = parseInt(leadsInput.value) || 0;
//         const deal = parseInt(dealInput.value) || 0;
//         const rate = parseFloat(rateInput.value) || 0;

//         // Update display values
//         if (valLeads) valLeads.innerText = leads.toLocaleString();
//         if (valDeal) valDeal.innerText = deal.toLocaleString();
//         if (valRate) valRate.innerText = rate;

//         // Logic: Difference = Current Revenue * 0.3 (30% uplift assumption)
//         const currentRevenue = leads * (rate / 100) * deal;
//         const additionalRevenue = currentRevenue * 0.3;

//         if (resultRevenue) resultRevenue.innerText = formatMoney(additionalRevenue);
//     }

//     leadsInput.addEventListener("input", calculateROI);
//     dealInput.addEventListener("input", calculateROI);
//     rateInput.addEventListener("input", calculateROI);

//     // Initial calculation
//     calculateROI();
// }

// /**
//  * 4. Country Dropdown & Phone Logic
//  */
// let allCountries = [];
// let selectedCountryCode = "+1";

// async function initCountryDropdown() {
//     const optionsList = document.getElementById('optionsList');
//     if (!optionsList) return;

//     try {
//         const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,flag');
//         const countries = await response.json();

//         allCountries = countries
//             .filter(c => c.idd && c.idd.root)
//             .map(c => {
//                 const root = c.idd.root || '';
//                 const suffix = (c.idd.suffixes && c.idd.suffixes.length === 1) ? c.idd.suffixes[0] : '';
//                 return {
//                     name: c.name.common,
//                     flag: c.flag,
//                     code: root + suffix
//                 };
//             })
//             .sort((a, b) => a.name.localeCompare(b.name));

//         renderOptions(allCountries);

//         // Set US by default
//         const us = allCountries.find(c => c.name === 'United States');
//         if (us) selectCountry(us);
//     } catch (error) {
//         console.error('Error fetching country data:', error);
//     }

//     const phoneInput = document.getElementById('phoneInput');
//     if (phoneInput) {
//         phoneInput.addEventListener('input', function (e) {
//             this.value = this.value.replace(/\D/g, '');
//             this.style.borderColor = "#e2e8f0";
//         });
//     }

//     const dropdown = document.getElementById('countryDropdown');
//     if (dropdown) {
//         dropdown.addEventListener('click', (e) => {
//             e.stopPropagation();
//             toggleDropdown();
//         });
//     }

//     const searchInput = document.getElementById('countrySearch');
//     if (searchInput) {
//         searchInput.addEventListener('click', (e) => e.stopPropagation());
//         searchInput.addEventListener('input', (e) => {
//             const term = e.target.value.toLowerCase();
//             const filtered = allCountries.filter(c =>
//                 c.name.toLowerCase().includes(term) ||
//                 c.code.includes(term)
//             );
//             renderOptions(filtered);
//         });
//     }

//     document.addEventListener('click', () => toggleDropdown(false));
// }

// function renderOptions(countries) {
//     const optionsList = document.getElementById('optionsList');
//     if (!optionsList) return;
//     optionsList.innerHTML = '';

//     countries.forEach(c => {
//         const div = document.createElement('div');
//         div.className = 'dropdown-option';
//         div.innerHTML = `<span>${c.flag}</span> <span>${c.name}</span> <span style="margin-left:auto; color:#94a3b8;">${c.code}</span>`;
//         div.onclick = (e) => {
//             e.stopPropagation();
//             selectCountry(c);
//             toggleDropdown(false);
//         };
//         optionsList.appendChild(div);
//     });
// }

// function selectCountry(country) {
//     const selectedDisplay = document.getElementById('selectedCountry');
//     if (selectedDisplay) {
//         selectedDisplay.textContent = `${country.flag} ${country.code}`;
//     }
//     selectedCountryCode = country.code;
// }

// function toggleDropdown(show) {
//     const menu = document.getElementById('dropdownMenu');
//     if (!menu) return;

//     if (show === undefined) {
//         menu.classList.toggle('active');
//         if (menu.classList.contains('active')) {
//             const searchInput = document.getElementById('countrySearch');
//             if (searchInput) searchInput.focus();
//         }
//     } else if (show) {
//         menu.classList.add('active');
//         const searchInput = document.getElementById('countrySearch');
//         if (searchInput) searchInput.focus();
//     } else {
//         menu.classList.remove('active');
//         const searchInput = document.getElementById('countrySearch');
//         if (searchInput) {
//             searchInput.value = '';
//             renderOptions(allCountries);
//         }
//     }
// }

// /**
//  * 5. Demo Call Logic
//  */
// window.startDemoCall = function () {
//     const phoneInput = document.getElementById("phoneInput");
//     const nameInput = document.getElementById("phoneName");
//     const emailInput = document.getElementById("phoneEmail");

//     const demoForm = document.getElementById("demoForm");
//     const successMessage = document.getElementById("successMessage");

//     if (!nameInput || !nameInput.value.trim()) {
//         alert("Please enter your name");
//         return;
//     }

//     if (!emailInput || !emailInput.value.trim()) {
//         alert("Please enter your email");
//         return;
//     }

//     if (!phoneInput || !phoneInput.value || phoneInput.value.length < 7) {
//         if (phoneInput) {
//             phoneInput.focus();
//             phoneInput.style.borderColor = "#ef4444";
//             alert("Please enter a valid phone number (minimum 7 digits)");
//         }
//         return;
//     }

//     // Check call limit
//     let callCount = parseInt(localStorage.getItem('ravan_call_count') || '0');
//     const lastCallTime = localStorage.getItem('ravan_last_call_time');
//     const now = Date.now();

//     if (lastCallTime && (now - parseInt(lastCallTime)) > 86400000) {
//         callCount = 0;
//         localStorage.setItem('ravan_call_count', '0');
//     }

//     if (callCount >= 2) {
//         const shouldProceed = confirm(
//             "You've already received 2 demo calls today. Would you like to book a full demo meeting instead?"
//         );
//         if (shouldProceed) {
//             window.location.href = "https://atomicx.ravan.ai/book";
//         }
//         return;
//     }

//     const phoneNumber = selectedCountryCode + phoneInput.value.replace(/\D/g, '');

//     const payload = {
//         "email": emailInput.value.trim(),
//         "receiver_number": phoneNumber,
//         "name": nameInput.value.trim(),
//         "new_agent": 172,
//         "access_key": "testmycall",
//         "calling_number": "+13364438645"
//     };

//     const btn = document.querySelector('.screen-btn');
//     const originalBtnText = btn.innerText;
//     btn.innerText = "Connecting...";
//     btn.disabled = true;

//     const apiUrl = `https://app.closerx.ai/api/testcall/voizerfreeaccount/`;

//     console.log("RAVAN API DEBUG START");
//     console.log("URL:", apiUrl);
//     console.log("Payload:", JSON.stringify(payload, null, 2));
//     console.log("Phone Number:", phoneNumber);

//     fetch(apiUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     })
//         .then(async response => {
//             const responseText = await response.text();
//             if (!response.ok) {
//                 throw new Error(`API Error (${response.status}): ${responseText}`);
//             }
//             try {
//                 return JSON.parse(responseText);
//             } catch (e) {
//                 throw new Error("Invalid JSON response: " + responseText);
//             }
//         })
//         .then(data => {
//             console.log("✅ Call success:", data);
//             localStorage.setItem('ravan_call_count', (callCount + 1).toString());
//             localStorage.setItem('ravan_last_call_time', now.toString());
//             if (demoForm) demoForm.style.display = "none";
//             if (successMessage) successMessage.style.display = "flex";
//         })
//         .catch(error => {
//             console.error("❌ === CALL FAILED ===", error);
//             let errorMsg = "We couldn't connect the call right now.";
//             if (error.message.includes("404")) {
//                 errorMsg = "API endpoint not found. Please contact support.";
//             } else if (error.message.includes("401") || error.message.includes("403")) {
//                 errorMsg = "Authentication failed. API key invalid or blocked.";
//             } else if (error.message.includes("400")) {
//                 errorMsg = "Invalid phone number or payload format.";
//             }
//             alert(errorMsg + "\n\nTechnical details:\n" + error.message);
//             btn.innerText = originalBtnText;
//             btn.disabled = false;
//         });
// };

// /**
//  * 6. Scroll Animations & Reveal
//  */
// function initScrollAnimations() {
//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: "0px 0px -50px 0px"
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('reveal-active');
//                 // If it's a number, we could trigger a count-up here
//                 if (entry.target.classList.contains('trust-value')) {
//                     animateNumber(entry.target);
//                 }
//             }
//         });
//     }, observerOptions);

//     // Elements to reveal
//     const revealElements = document.querySelectorAll('.trust-item, .lead-header, .math-card, .failure-card, .workforce-glass-card, .roi-snapshot-header');
//     revealElements.forEach(el => {
//         el.classList.add('reveal-hidden');
//         observer.observe(el);
//     });

//     // Special observer for numbers
//     const numbers = document.querySelectorAll('.trust-value');
//     numbers.forEach(num => observer.observe(num));
// }

// function animateNumber(el) {
//     if (el.dataset.animated) return;
//     el.dataset.animated = "true";

//     const target = parseInt(el.innerText.replace(/\D/g, ''));
//     if (isNaN(target)) return;

//     let start = 0;
//     const duration = 2000;
//     const startTime = performance.now();
//     const suffix = el.innerText.replace(/[0-9]/g, '');

//     function update(currentTime) {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);
//         const current = Math.floor(progress * target);
//         el.innerText = current.toLocaleString() + suffix;

//         if (progress < 1) {
//             requestAnimationFrame(update);
//         } else {
//             el.innerText = target.toLocaleString() + suffix;
//         }
//     }
//     requestAnimationFrame(update);
// }


// Speed to Lead Section Logic
(function () {
    let speedAllCountries = [];
    let speedSelectedCountryCode = "+1";

    const wrapper = document.getElementById('speedCountryWrapper');
    const display = document.getElementById('speedCountryDisplay');
    const dropdown = document.getElementById('speedDropdown');
    const search = document.getElementById('speedCountrySearch');
    const list = document.getElementById('speedOptionsList');

    // reuse the fetch from main script if possible, but safer to fetch again or copy logic to avoid scope issues
    // Since this is inside an IIFE, we'll implement independently

    async function initCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,flag');
            const data = await response.json();

            speedAllCountries = data
                .filter(c => c.idd && c.idd.root)
                .map(c => {
                    const root = c.idd.root || '';
                    const suffix = (c.idd.suffixes && c.idd.suffixes.length === 1) ? c.idd.suffixes[0] : '';
                    return {
                        name: c.name.common,
                        flag: c.flag,
                        code: root + suffix
                    };
                })
                .sort((a, b) => a.name.localeCompare(b.name));

            renderSpeedOptions(speedAllCountries);
        } catch (e) {
            console.error("Speed Lead Country Fetch Error", e);
        }
    }

    function renderSpeedOptions(countries) {
        list.innerHTML = '';
        countries.forEach(c => {
            const div = document.createElement('div');
            div.className = 'speed-option';
            div.innerHTML = `<span>${c.flag}</span> <span>${c.name}</span> <span style="margin-left:auto; color:#94a3b8;">${c.code}</span>`;
            div.onclick = (e) => {
                e.stopPropagation();
                selectSpeedCountry(c);
                dropdown.classList.remove('active');
            };
            list.appendChild(div);
        });
    }

    function selectSpeedCountry(c) {
        display.innerHTML = `<span>${c.flag} ${c.code}</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
        speedSelectedCountryCode = c.code;
    }

    // Events
    display.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) search.focus();
    });

    search.addEventListener('click', e => e.stopPropagation());
    search.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = speedAllCountries.filter(c =>
            c.name.toLowerCase().includes(term) ||
            c.code.includes(term)
        );
        renderSpeedOptions(filtered);
    });

    document.addEventListener('click', () => dropdown.classList.remove('active'));

    // Phone formatting
    const phoneInput = document.getElementById('speedPhone');
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    initCountries();

    // Export selected code for the submit function
    window.getSpeedCountryCode = () => speedSelectedCountryCode;
})();

// Rate Limiting Helpers for Speed Call
function canMakeCall() {
    const MAX_DAILY_CALLS = 2;
    const storageKeyDate = 'speed_call_date';
    const storageKeyCount = 'speed_call_count';

    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(storageKeyDate);
    let count = parseInt(localStorage.getItem(storageKeyCount) || '0');

    if (lastDate !== today) {
        // New day, reset
        count = 0;
        localStorage.setItem(storageKeyDate, today);
        localStorage.setItem(storageKeyCount, '0');
    }

    return count < MAX_DAILY_CALLS;
}

function incrementCallCount() {
    const storageKeyCount = 'speed_call_count';
    const storageKeyDate = 'speed_call_date';

    let count = parseInt(localStorage.getItem(storageKeyCount) || '0');
    localStorage.setItem(storageKeyCount, (count + 1).toString());

    // Ensure date is set
    if (!localStorage.getItem(storageKeyDate)) {
        localStorage.setItem(storageKeyDate, new Date().toDateString());
    }
}

async function submitSpeedToLeadCall() {
    // 1. Bot Detection (Honeypot)
    const hp = document.getElementById('website_hp');
    if (hp && hp.value) {
        console.warn("Bot detected.");
        return;
    }

    const name = document.getElementById('speedName').value.trim();
    const email = document.getElementById('speedEmail').value.trim();
    const phone = document.getElementById('speedPhone').value.trim();

    if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    // 2. Strict Input Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (phone.length < 7) {
        alert("Please enter a valid phone number.");
        return;
    }

    const btn = document.getElementById('speedSubmitBtn');
    const originalText = btn.innerText;

    // Check rate limit
    if (!canMakeCall()) {
        alert("You can only initiate 3 calls per day.");
        btn.disabled = false;
        return;
    }

    btn.innerText = "Calling...";
    btn.disabled = true;

    const countryCode = window.getSpeedCountryCode ? window.getSpeedCountryCode() : "+1";
    const fullNumber = countryCode + phone;

    const payload = {
        "email": email,
        "receiver_number": fullNumber,
        "name": name,
        "new_agent": 172,
        "access_key": "testmycall",
        "calling_number": "+13364438645"
    };

    try {
        const res = await fetch("https://app.closerx.ai/api/testcall/voizerfreeaccount/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // 3. Robust Error Handling
        if (!res.ok) {
            const errorText = await res.text().catch(() => "Unknown error");
            throw new Error(`Server returned ${res.status}: ${errorText}`);
        }

        const data = await res.json();

        incrementCallCount();

        console.log("Speed Call Success:", data);
        btn.innerText = "Call Initiated!";
        btn.style.background = "#10b981"; // Green success
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.background = ""; // Reset
        }, 3000);
        alert("Call initiated! Your phone should ring shortly.");

    } catch (err) {
        console.error("Speed Call Error:", err);

        // Show a user-friendly message but log the technical details
        let msg = "Failed to initiate call. Please try again.";
        if (err.message.includes("401") || err.message.includes("403")) {
            msg = "Authorization failed. Please contact support.";
        } else if (err.message.includes("429")) {
            msg = "Too many requests. Please wait a moment.";
        } else if (err.message.includes("500")) {
            msg = "Server error. We are working on it.";
        }

        alert(msg);
        btn.innerText = originalText;
        btn.disabled = false;
    }
}


function switchIndustry(industryId) {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach((tab) => {
        const onclick = tab.getAttribute("onclick");
        if (onclick && onclick.includes(industryId)) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    const contents = document.querySelectorAll(".snapshot-content");
    contents.forEach((content) => content.classList.remove("active"));

    const target = document.getElementById(industryId);
    if (target) target.classList.add("active");
}


document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains("active");

        // Close all other items
        document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("active");
            item.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isActive) {
            faqItem.classList.add("active");
            const answer = faqItem.querySelector(".faq-answer");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// ROI Calculator Logic
const leadsInput = document.getElementById("input-leads");
const dealInput = document.getElementById("input-deal");
const rateInput = document.getElementById("input-rate");

const valLeads = document.getElementById("val-leads");
const valDeal = document.getElementById("val-deal");
const valRate = document.getElementById("val-rate");
const resultRevenue = document.getElementById("result-revenue");

function formatMoney(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(number);
}

function calculateROI() {
    const leads = parseInt(leadsInput.value);
    const deal = parseInt(dealInput.value);
    const rate = parseFloat(rateInput.value);

    // Update display values
    valLeads.innerText = leads.toLocaleString();
    valDeal.innerText = deal.toLocaleString();
    valRate.innerText = rate;

    // Logic:
    // Current Revenue = Leads * (Rate/100) * Deal
    // AI Revenue (Assumption: 30% uplift in conversion) = Leads * (Rate * 1.3 / 100) * Deal
    // Difference = AI Revenue - Current Revenue

    // Simplified: Difference = Current Revenue * 0.3
    const currentRevenue = leads * (rate / 100) * deal;
    const additionalRevenue = currentRevenue * 0.3;

    resultRevenue.innerText = formatMoney(additionalRevenue);
}

if (leadsInput && dealInput && rateInput) {
    leadsInput.addEventListener("input", calculateROI);
    dealInput.addEventListener("input", calculateROI);
    rateInput.addEventListener("input", calculateROI);

    // Initial calculation
    calculateROI();
}

let allCountries = [];
let selectedCountryCode = "+1";

async function populateCountrySelect() {
    const optionsList = document.getElementById('optionsList');
    if (!optionsList) return;

    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,flag');
        const countries = await response.json();

        allCountries = countries
            .filter(c => c.idd && c.idd.root)
            .map(c => {
                const root = c.idd.root || '';
                const suffix = (c.idd.suffixes && c.idd.suffixes.length === 1) ? c.idd.suffixes[0] : '';
                return {
                    name: c.name.common,
                    flag: c.flag,
                    code: root + suffix
                };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

        renderOptions(allCountries);

        // Set US by default
        const us = allCountries.find(c => c.name === 'United States');
        if (us) selectCountry(us);
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

function renderOptions(countries) {
    const optionsList = document.getElementById('optionsList');
    if (!optionsList) return;
    optionsList.innerHTML = '';

    countries.forEach(c => {
        const div = document.createElement('div');
        div.className = 'dropdown-option';
        div.innerHTML = `<span>${c.flag}</span> <span>${c.name}</span> <span style="margin-left:auto; color:#94a3b8;">${c.code}</span>`;
        div.onclick = (e) => {
            e.stopPropagation();
            selectCountry(c);
            toggleDropdown(false);
        };
        optionsList.appendChild(div);
    });
}

function selectCountry(country) {
    const selectedDisplay = document.getElementById('selectedCountry');
    if (selectedDisplay) {
        selectedDisplay.textContent = `${country.flag} ${country.code}`;
    }
    selectedCountryCode = country.code;
}

function toggleDropdown(show) {
    const menu = document.getElementById('dropdownMenu');
    if (!menu) return;

    if (show === undefined) {
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            const searchInput = document.getElementById('countrySearch');
            if (searchInput) searchInput.focus();
        }
    } else if (show) {
        menu.classList.add('active');
        const searchInput = document.getElementById('countrySearch');
        if (searchInput) searchInput.focus();
    } else {
        menu.classList.remove('active');
        const searchInput = document.getElementById('countrySearch');
        if (searchInput) {
            searchInput.value = '';
            renderOptions(allCountries);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateCountrySelect();

    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/\D/g, '');
            this.style.borderColor = "#e2e8f0";
        });
    }

    const dropdown = document.getElementById('countryDropdown');
    if (dropdown) {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });
    }

    const searchInput = document.getElementById('countrySearch');
    if (searchInput) {
        searchInput.addEventListener('click', (e) => e.stopPropagation());
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allCountries.filter(c =>
                c.name.toLowerCase().includes(term) ||
                c.code.includes(term)
            );
            renderOptions(filtered);
        });
    }

    document.addEventListener('click', () => toggleDropdown(false));
});

function startDemoCall() {
    const phoneInput = document.getElementById("phoneInput");
    const nameInput = document.getElementById("phoneName");
    const emailInput = document.getElementById("phoneEmail");

    const demoForm = document.getElementById("demoForm");
    const successMessage = document.getElementById("successMessage");

    if (!nameInput || !nameInput.value.trim()) {
        alert("Please enter your name");
        return;
    }

    if (!emailInput || !emailInput.value.trim()) {
        alert("Please enter your email");
        return;
    }

    if (!phoneInput || !phoneInput.value || phoneInput.value.length < 7) {
        if (phoneInput) {
            phoneInput.focus();
            phoneInput.style.borderColor = "#ef4444";
            alert("Please enter a valid phone number (minimum 7 digits)");
        }
        return;
    }

    // Check call limit
    let callCount = parseInt(localStorage.getItem('ravan_call_count') || '0');
    const lastCallTime = localStorage.getItem('ravan_last_call_time');
    const now = Date.now();

    if (lastCallTime && (now - parseInt(lastCallTime)) > 86400000) {
        callCount = 0;
        localStorage.setItem('ravan_call_count', '0');
    }

    if (callCount >= 2) {
        const shouldProceed = confirm(
            "You've already received 2 demo calls today. Would you like to book a full demo meeting instead?"
        );
        if (shouldProceed) {
            window.location.href = "https://atomicx.ravan.ai/book";
        }
        return;
    }

    const phoneNumber = selectedCountryCode + phoneInput.value.replace(/\D/g, '');

    const payload = {
        "email": emailInput.value.trim(),
        "receiver_number": phoneNumber,
        "name": nameInput.value.trim(),
        "new_agent": 172,
        "access_key": "testmycall",
        "calling_number": "+13364438645"
    };

    const btn = document.querySelector('.screen-btn');
    const originalBtnText = btn.innerText;
    btn.innerText = "Connecting...";
    btn.disabled = true;

    const apiUrl = `https://app.closerx.ai/api/testcall/voizerfreeaccount/`;

    console.log("RAVAN API DEBUG START"); // Kept as requested
    console.log("URL:", apiUrl);
    console.log("Payload:", JSON.stringify(payload, null, 2));
    console.log("Phone Number:", phoneNumber);

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(async response => {
            console.log("Response Status:", response.status);
            console.log("Response Headers:", [...response.headers.entries()]);

            const responseText = await response.text();
            console.log("Response Body:", responseText);

            if (!response.ok) {
                throw new Error(`API Error (${response.status}): ${responseText}`);
            }

            try {
                return JSON.parse(responseText);
            } catch (e) {
                throw new Error("Invalid JSON response: " + responseText);
            }
        })
        .then(data => {
            console.log("✅ Call success:", data);

            localStorage.setItem('ravan_call_count', (callCount + 1).toString());
            localStorage.setItem('ravan_last_call_time', now.toString());

            demoForm.style.display = "none";
            successMessage.style.display = "flex";
        })
        .catch(error => {
            console.error("❌ === CALL FAILED ===");
            console.error("Error Object:", error);
            console.error("Error Message:", error.message);

            let errorMsg = "We couldn't connect the call right now.";

            if (error.message.includes("404")) {
                errorMsg = "API endpoint not found. Please contact support.";
            } else if (error.message.includes("401") || error.message.includes("403")) {
                errorMsg = "Authentication failed. API key invalid or blocked.";
            } else if (error.message.includes("400")) {
                errorMsg = "Invalid phone number or payload format.";
            } else if (error.message.includes("CORS")) {
                errorMsg = "CORS blocked the request. Backend required.";
            }

            alert(errorMsg + "\n\nTechnical details:\n" + error.message);

            btn.innerText = originalBtnText;
            btn.disabled = false;
        });
}

