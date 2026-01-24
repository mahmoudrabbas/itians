// Initialize Admin User
function initializeAdmin() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if admin already exists
    const adminExists = users.find((u) => u.email === 'admin@gmail.com');

    if (!adminExists) {
        const admin = {
            id: 'admin_' + Date.now(),
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin',
            courses: [],
            createdAt: new Date().toISOString(),
        };

        users.push(admin);
        localStorage.setItem('users', JSON.stringify(users));
        // console.log('Admin user created successfully');
    }
}

// Initialize Categories
function initializeCategories() {
    const categories = [
        {
            id: 1,
            name: 'Programming',
            description: 'Web, Mobile & Software Development',
            icon: '💻',
        },
        {
            id: 2,
            name: 'Cybersecurity',
            description: 'Ethical Hacking & Security',
            icon: '🔒',
        },
        {
            id: 3,
            name: 'Data Science',
            description: 'Analytics & Machine Learning',
            icon: '📊',
        },
        {
            id: 4,
            name: 'Networking',
            description: 'Network Administration & Security',
            icon: '🌐',
        },
    ];

    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(categories));
        // console.log('Categories initialized');
    }
}

// Check if user is admin
function isAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.role === 'admin';
}

// Protect admin routes
function protectAdminRoute() {
    if (!isAdmin()) {
        alert('Access Denied: Admin only!');
        window.location.href = '../login.html';
    }
}

// Initialize on page load
initializeAdmin();
initializeCategories();

// Handle course enrollment with payment check
function handleEnrollment(courseId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        alert('Please login to enroll in courses!');
        window.location.href = '../login.html';
        return;
    }

    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
        alert('Course not found!');
        return;
    }

    // Check if already enrolled
    if (user.courses.includes(courseId)) {
        alert('You are already enrolled in this course!');
        return;
    }

    // Check if course is paid
    if (course.price > 0) {
        // Redirect to payment page
        window.location.href = `../payment/payment.html?courseId=${courseId}`;
    } else {
        // Free course - enroll directly
        enrollFree(courseId);
    }
}

function enrollFree(courseId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    user.courses.push(courseId);
    localStorage.setItem('currentUser', JSON.stringify(user));

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert('Successfully enrolled in this free course!');
    location.reload();
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isAdmin, protectAdminRoute, handleEnrollment };
}
