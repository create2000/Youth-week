document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');
    const nameInput = document.getElementById('name');
    const dietaryInput = document.getElementById('dietary');
    const attendeeList = document.getElementById('attendeeList');
    const attendeesList = document.getElementById('attendees');
    const adminBtn = document.getElementById('adminBtn');
    const adminLogin = document.getElementById('adminLogin');
    const adminView = document.getElementById('adminView');
    const adminPassword = document.getElementById('adminPassword');
    const loginBtn = document.getElementById('loginBtn');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    const closeAdminViewBtn = document.getElementById('closeAdminViewBtn');
    const totalRsvp = document.getElementById('totalRsvp');
    const adminAttendeeList = document.getElementById('adminAttendeeList');

    const ADMIN_PASSWORD = 'YOUTHWEEK'; 

    // Load existing attendees from localStorage
    let attendees = JSON.parse(localStorage.getItem('attendees') || '[]');

    // Admin button click handler
    adminBtn.addEventListener('click', () => {
        adminLogin.classList.remove('hidden');
    });

    // Close admin login modal
    closeAdminBtn.addEventListener('click', () => {
        adminLogin.classList.add('hidden');
        adminPassword.value = '';
    });

    // Close admin view
    closeAdminViewBtn.addEventListener('click', () => {
        adminView.classList.add('hidden');
    });

    // Close modal when clicking outside
    adminLogin.addEventListener('click', (e) => {
        if (e.target === adminLogin) {
            adminLogin.classList.add('hidden');
            adminPassword.value = '';
        }
    });

    // Admin login handler
    loginBtn.addEventListener('click', () => {
        if (adminPassword.value === ADMIN_PASSWORD) {
            adminLogin.classList.add('hidden');
            adminView.classList.remove('hidden');
            updateAdminView();
        } else {
            alert('Incorrect password');
        }
        adminPassword.value = '';
    });

    function updateAdminView() {
        const attendees = JSON.parse(localStorage.getItem('attendees') || '[]');
        totalRsvp.textContent = attendees.length;
        
        adminAttendeeList.innerHTML = attendees
            .map((attendee, index) => {
                const dietaryInfo = attendee.dietary 
                    ? ` - Dietary: ${attendee.dietary}` 
                    : '';
                return `<p>${index + 1}. ${attendee.name}${dietaryInfo}</p>`;
            })
            .join('');
    }

    // Modified RSVP handler
    yesBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const dietary = dietaryInput.value.trim();

        if (!name) {
            message.textContent = "Please enter your name first!";
            message.classList.remove('hidden');
            return;
        }

        if (attendees.some(a => a.name === name)) {
            message.textContent = "You've already RSVP'd!";
            message.classList.remove('hidden');
            return;
        }

        // Store both name and dietary restrictions
        attendees.push({ name, dietary });
        localStorage.setItem('attendees', JSON.stringify(attendees));
        
        // Show success message and refresh page after delay
        message.textContent = `Great! Your RSVP has been recorded! 🎉`;
        message.classList.remove('hidden');

        setTimeout(() => {
            window.location.reload();
        }, 3000); // Refresh after 3 seconds

        // Disable buttons after selection
        yesBtn.disabled = true;
        noBtn.disabled = true;
        nameInput.disabled = true;
        dietaryInput.disabled = true;
    });

    noBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            message.textContent = "Please enter your name first!";
            message.classList.remove('hidden');
            return;
        }

        message.textContent = "We'll miss you! Hope to see you next time! 👋";
        message.classList.remove('hidden');
        
        // Disable buttons after selection
        yesBtn.disabled = true;
        noBtn.disabled = true;
        nameInput.disabled = true;
        dietaryInput.disabled = true;
    });
});