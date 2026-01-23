// Admin Seeds Data & Authentication
// Place this code in a separate file: js/admin-setup.js

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
            password: 'admin123', // In production, hash this!
            role: 'admin',
            courses: [],
            createdAt: new Date().toISOString(),
        };

        users.push(admin);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ Admin user created successfully');
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
        console.log('✅ Categories initialized');
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

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isAdmin, protectAdminRoute };
}
