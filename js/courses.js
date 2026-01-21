// Courses Data
const courses = [
    {
        id: 1,
        title: 'Full Stack Web Development',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
        category: 'Programming',
        instructor: 'Ahmed Hassan',
        description:
            'Master HTML, CSS, JavaScript, React, Node.js and MongoDB. Build complete web applications from scratch.',
        price: 499,
        duration: '12 weeks',
        content: [
            {
                title: 'Introduction to HTML & CSS',
                type: 'video',
                link: 'https://www.youtube.com/embed/UB1O30fR-EE',
            },
            {
                title: 'JavaScript Fundamentals',
                type: 'video',
                link: 'https://www.youtube.com/embed/hdI2bqOjy3c',
            },
            {
                title: 'React Basics',
                type: 'video',
                link: 'https://www.youtube.com/embed/SqcY0GlETPk',
            },
            {
                title: 'Node.js & Express',
                type: 'video',
                link: 'https://www.youtube.com/embed/Oe421EPjeBE',
            },
            {
                title: 'MongoDB Database',
                type: 'video',
                link: 'https://www.youtube.com/embed/ExcRbA7fy_A',
            },
            { title: 'Final Project Guide', type: 'pdf', link: '#' },
        ],
    },
    {
        id: 2,
        title: 'Cybersecurity Fundamentals',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500',
        category: 'Cybersecurity',
        instructor: 'Sara Mohamed',
        description:
            'Learn ethical hacking, penetration testing, network security, and how to protect systems from cyber threats.',
        price: 599,
        duration: '10 weeks',
        content: [
            {
                title: 'Introduction to Cybersecurity',
                type: 'video',
                link: 'https://www.youtube.com/embed/inWWhr5tnEA',
            },
            {
                title: 'Networking Basics',
                type: 'video',
                link: 'https://www.youtube.com/embed/vrh0epPAC5w',
            },
            {
                title: 'Linux for Hackers',
                type: 'video',
                link: 'https://www.youtube.com/embed/U1w4T03B30I',
            },
            {
                title: 'Penetration Testing',
                type: 'video',
                link: 'https://www.youtube.com/embed/3Kq1MIfTWCE',
            },
            {
                title: 'Web Application Security',
                type: 'video',
                link: 'https://www.youtube.com/embed/WlmKwIe9z1Q',
            },
        ],
    },
    {
        id: 3,
        title: 'Python for Data Science',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500',
        category: 'Data Science',
        instructor: 'Omar Ali',
        description:
            'Learn Python programming, data analysis with Pandas, visualization with Matplotlib, and machine learning basics.',
        price: 0,
        duration: '8 weeks',
        content: [
            {
                title: 'Python Basics',
                type: 'video',
                link: 'https://www.youtube.com/embed/rfscVS0vtbw',
            },
            {
                title: 'NumPy & Pandas',
                type: 'video',
                link: 'https://www.youtube.com/embed/ZyhVh-qRZPA',
            },
            {
                title: 'Data Visualization',
                type: 'video',
                link: 'https://www.youtube.com/embed/DAQNHzOcO5A',
            },
            {
                title: 'Machine Learning Intro',
                type: 'video',
                link: 'https://www.youtube.com/embed/ukzFI9rgwfU',
            },
        ],
    },
    {
        id: 4,
        title: 'CCNA - Networking Essentials',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500',
        category: 'Networking',
        instructor: 'Mahmoud Sayed',
        description:
            'Prepare for CCNA certification. Learn routing, switching, IP addressing, and network protocols.',
        price: 699,
        duration: '14 weeks',
        content: [
            {
                title: 'OSI Model',
                type: 'video',
                link: 'https://www.youtube.com/embed/vv4y_uOneC0',
            },
            {
                title: 'IP Addressing & Subnetting',
                type: 'video',
                link: 'https://www.youtube.com/embed/s_Ntt6eTn94',
            },
            {
                title: 'Routing Protocols',
                type: 'video',
                link: 'https://www.youtube.com/embed/YRzr56cwgCg',
            },
            {
                title: 'VLANs & Trunking',
                type: 'video',
                link: 'https://www.youtube.com/embed/A9lMH0ye1HU',
            },
            { title: 'Practice Labs', type: 'pdf', link: '#' },
        ],
    },
    {
        id: 5,
        title: 'Java Spring Boot Masterclass',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
        category: 'Programming',
        instructor: 'Youssef Ibrahim',
        description:
            'Build powerful REST APIs with Java Spring Boot. Learn Spring Security, JPA, and microservices architecture.',
        price: 549,
        duration: '10 weeks',
        content: [
            {
                title: 'Java Fundamentals Review',
                type: 'video',
                link: 'https://www.youtube.com/embed/eIrMbAQSU34',
            },
            {
                title: 'Spring Boot Basics',
                type: 'video',
                link: 'https://www.youtube.com/embed/9SGDpanrc8U',
            },
            {
                title: 'REST API Development',
                type: 'video',
                link: 'https://www.youtube.com/embed/1aWhYEynZQw',
            },
            {
                title: 'Spring Security',
                type: 'video',
                link: 'https://www.youtube.com/embed/b9O9NI-RJ3o',
            },
            {
                title: 'Microservices Architecture',
                type: 'video',
                link: 'https://www.youtube.com/embed/y8IQb4ofjDo',
            },
        ],
    },
    {
        id: 6,
        title: 'React Native Mobile Development',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
        category: 'Programming',
        instructor: 'Nour Ahmed',
        description:
            'Build cross-platform mobile apps for iOS and Android using React Native and JavaScript.',
        price: 0,
        duration: '9 weeks',
        content: [
            {
                title: 'React Native Setup',
                type: 'video',
                link: 'https://www.youtube.com/embed/0-S5a0eXPoc',
            },
            {
                title: 'Components & Navigation',
                type: 'video',
                link: 'https://www.youtube.com/embed/Hf4MJH0jDb4',
            },
            {
                title: 'State Management',
                type: 'video',
                link: 'https://www.youtube.com/embed/35lXWvCuM8o',
            },
            {
                title: 'API Integration',
                type: 'video',
                link: 'https://www.youtube.com/embed/qbLyDMsal8w',
            },
            {
                title: 'Publishing Your App',
                type: 'video',
                link: 'https://www.youtube.com/embed/LE4Mgkrf7Sk',
            },
        ],
    },
];

// Initialize courses in localStorage if not exists
if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get courses from localStorage
let allCourses = JSON.parse(localStorage.getItem('courses'));

// Display courses
function displayCourses(coursesToDisplay) {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';

    coursesToDisplay.forEach((course) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => showCourseDetails(course.id);

        const priceHTML =
            course.price === 0
                ? '<span class="course-price free">Free</span>'
                : `<span class="course-price">$${course.price}</span>`;

        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-body">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">By ${course.instructor}</p>
                <p class="course-description">${course.description.substring(0, 100)}...</p>
                <div class="course-footer">
                    ${priceHTML}
                    <span class="course-duration">${course.duration}</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Show course details in modal
let selectedCourseId = null;

function showCourseDetails(courseId) {
    selectedCourseId = courseId;
    const course = allCourses.find((c) => c.id === courseId);

    document.getElementById('modalTitle').textContent = course.title;
    document.getElementById('modalCategory').textContent = course.category;
    document.getElementById('modalImage').src = course.image;
    document.getElementById('modalInstructor').textContent =
        `Instructor: ${course.instructor}`;
    document.getElementById('modalDescription').textContent =
        course.description;
    document.getElementById('modalDuration').textContent = course.duration;
    document.getElementById('modalPrice').textContent =
        course.price === 0 ? 'Free' : `$${course.price}`;

    const contentList = document.getElementById('modalContent');
    contentList.innerHTML = '';
    course.content.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${item.title}</span>
            <span style="color: #3498db;">${item.type.toUpperCase()}</span>
        `;
        contentList.appendChild(li);
    });

    document.getElementById('courseModal').style.display = 'block';
}

// Enroll in course
function enrollCourse() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        alert('Please login to enroll in courses!');
        window.location.href = 'login.html';
        return;
    }

    const course = allCourses.find((c) => c.id === selectedCourseId);

    // Check if already enrolled
    if (user.courses.includes(selectedCourseId)) {
        alert('You are already enrolled in this course!');
        return;
    }

    // Add course to user
    user.courses.push(selectedCourseId);
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Update user in users array
    let users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert(`Successfully enrolled in ${course.title}!`);
    document.getElementById('courseModal').style.display = 'none';
}

// Filter functionality
document
    .getElementById('categoryFilter')
    .addEventListener('change', filterCourses);
document
    .getElementById('priceFilter')
    .addEventListener('change', filterCourses);
document.getElementById('searchInput').addEventListener('input', filterCourses);

function filterCourses() {
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    let filtered = allCourses;

    if (category !== 'all') {
        filtered = filtered.filter((c) => c.category === category);
    }

    if (price === 'free') {
        filtered = filtered.filter((c) => c.price === 0);
    } else if (price === 'paid') {
        filtered = filtered.filter((c) => c.price > 0);
    }

    if (search) {
        filtered = filtered.filter(
            (c) =>
                c.title.toLowerCase().includes(search) ||
                c.description.toLowerCase().includes(search) ||
                c.instructor.toLowerCase().includes(search)
        );
    }

    displayCourses(filtered);
}

// Close modal
document.querySelector('.close').onclick = function () {
    document.getElementById('courseModal').style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == document.getElementById('courseModal')) {
        document.getElementById('courseModal').style.display = 'none';
    }
};

// Handle navbar for logged in users
const loginBtn = document.getElementById('loginbtn');
const navLinks = document.querySelector('.nav-links');
const user = JSON.parse(localStorage.getItem('currentUser'));

if (user) {
    const aboutLink = navLinks.querySelector('a[href="about.html"]');
    const contactLink = navLinks.querySelector('a[href="contact.html"]');

    if (aboutLink) aboutLink.parentElement.style.display = 'none';
    if (contactLink) contactLink.parentElement.style.display = 'none';

    loginBtn.style.display = 'none';

    const profileLi = document.createElement('li');
    profileLi.innerHTML = '<a href="/student/profile.html">Profile</a>';
    navLinks.appendChild(profileLi);

    const logoutLi = document.createElement('li');
    logoutLi.innerHTML =
        '<a href="#" class="btn" onclick="logout()">Logout</a>';
    navLinks.appendChild(logoutLi);
}

function logout() {
    localStorage.removeItem('currentUser');
    location.href = 'login.html';
}

// Display all courses on page load
displayCourses(allCourses);
