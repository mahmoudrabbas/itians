function initializeAdmin() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const adminExists = users.find((u) => u.email === 'admin@gmail.com');

    if (!adminExists) {
        const admin1 = {
            id: 'admin_1' + Date.now(),
            name: 'Admin1',
            email: 'admin1@gmail.com',
            password: 'admin123',
            role: 'admin',
            courses: [],
            wishlists: [],
            createdAt: new Date().toISOString(),
        };

        const admin2 = {
            id: 'admin_2' + Date.now(),
            name: 'Admin2',
            email: 'admin2@gmail.com',
            password: 'admin123',
            role: 'admin',
            wishlists: [],
            courses: [],
            createdAt: new Date().toISOString(),
        };

        users.push(admin1);
        users.push(admin2);

        localStorage.setItem('users', JSON.stringify(users));
    }
}

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
    }
}

function isAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.role === 'admin';
}

function protectAdminRoute() {
    if (!isAdmin()) {
        alert('Access Denied: Admin only!');
        window.location.href = '../index.html';
    }
}

initializeAdmin();
initializeCategories();

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

    if (user.courses.includes(courseId)) {
        alert('You are already enrolled in this course!');
        return;
    }

    if (course.price > 0) {
        window.location.href = `../payment/payment.html?courseId=${courseId}`;
    } else {
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

// export functions to use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isAdmin, protectAdminRoute, handleEnrollment };
}
