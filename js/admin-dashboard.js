// Protect admin route
protectAdminRoute();

// Global variables
let currentCourseId = null;
let currentCategoryId = null;

// Load admin info
const admin = JSON.parse(localStorage.getItem('currentUser'));
document.getElementById('adminName').textContent = admin.name;

// Initialize dashboard
initDashboard();

function initDashboard() {
    loadStatistics();
    loadRecentCourses();
    loadCoursesTable();
    loadCategoriesGrid();
    loadStudentsTable();
    loadEnrollmentsTable();
    populateCategoryFilters();
}

// ==================== NAVIGATION ====================
document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', function () {
        // Remove active from all
        document
            .querySelectorAll('.menu-item')
            .forEach((i) => i.classList.remove('active'));
        document
            .querySelectorAll('.content-section')
            .forEach((s) => s.classList.remove('active'));

        // Add active to clicked
        this.classList.add('active');
        const section = this.dataset.section;
        document.getElementById(section).classList.add('active');
    });
});

// ==================== STATISTICS ====================
function loadStatistics() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    const students = users.filter((u) => u.role !== 'admin');
    const totalEnrollments = students.reduce(
        (sum, student) => sum + (student.courses?.length || 0),
        0
    );

    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalEnrollments').textContent = totalEnrollments;
    document.getElementById('totalCategories').textContent = categories.length;
}

// ==================== RECENT COURSES ====================
function loadRecentCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const recentCourses = courses.slice(0, 3);

    const grid = document.getElementById('recentCourses');
    grid.innerHTML = '';

    recentCourses.forEach((course) => {
        const card = document.createElement('div');
        card.className = 'course-card';

        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-body">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">By ${course.instructor}</p>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ==================== COURSES CRUD ====================
function loadCoursesTable() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const search =
        document.getElementById('courseSearch')?.value.toLowerCase() || '';
    const categoryFilter =
        document.getElementById('courseCategoryFilter')?.value || 'all';

    let filtered = courses.filter((c) => {
        const matchesSearch =
            c.title.toLowerCase().includes(search) ||
            c.instructor.toLowerCase().includes(search);
        const matchesCategory =
            categoryFilter === 'all' || c.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const table = document.getElementById('coursesTable');

    if (filtered.length === 0) {
        table.innerHTML =
            '<p style="padding: 20px; text-align: center; color: #999;">No courses found</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Instructor</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    filtered.forEach((course) => {
        html += `
            <tr>
                <td>${course.id}</td>
                <td><strong>${course.title}</strong></td>
                <td><span class="course-category">${course.category}</span></td>
                <td>${course.instructor}</td>
                <td>${course.price === 0 ? 'Free' : '$' + course.price}</td>
                <td>${course.duration}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editCourse(${course.id})">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteCourse(${course.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    table.innerHTML = html;
}

function openCourseModal(courseId = null) {
    const modal = document.getElementById('courseModal');
    const form = document.getElementById('courseForm');
    form.reset();

    if (courseId) {
        // Edit mode
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        const course = courses.find((c) => c.id === courseId);

        document.getElementById('courseModalTitle').textContent = 'Edit Course';
        document.getElementById('courseId').value = course.id;
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('courseCategory').value = course.category;
        document.getElementById('courseInstructor').value = course.instructor;
        document.getElementById('courseDescription').value = course.description;
        document.getElementById('courseImage').value = course.image;
        document.getElementById('coursePrice').value = course.price;
        document.getElementById('courseDuration').value = course.duration;
    } else {
        // Add mode
        document.getElementById('courseModalTitle').textContent =
            'Add New Course';
        document.getElementById('courseId').value = '';
    }

    // Populate category dropdown
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const select = document.getElementById('courseCategory');
    select.innerHTML = categories
        .map((cat) => `<option value="${cat.name}">${cat.name}</option>`)
        .join('');

    modal.style.display = 'block';
}

function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
}

function saveCourse(event) {
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const courseData = {
        title: document.getElementById('courseTitle').value.trim(),
        category: document.getElementById('courseCategory').value,
        instructor: document.getElementById('courseInstructor').value.trim(),
        description: document.getElementById('courseDescription').value.trim(),
        image: document.getElementById('courseImage').value.trim(),
        price: parseInt(document.getElementById('coursePrice').value),
        duration: document.getElementById('courseDuration').value.trim(),
    };

    // Validation
    if (!courseData.title || courseData.title.length < 5) {
        alert('Course title must be at least 5 characters');
        return;
    }

    if (!courseData.description || courseData.description.length < 20) {
        alert('Course description must be at least 20 characters');
        return;
    }

    if (courseData.price < 0) {
        alert('Price cannot be negative');
        return;
    }

    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    if (courseId) {
        // Update existing
        const index = courses.findIndex((c) => c.id == courseId);
        courses[index] = { ...courses[index], ...courseData };
        alert('✅ Course updated successfully!');
    } else {
        // Add new
        const newCourse = {
            id: Date.now(),
            ...courseData,
            content: [],
        };
        courses.push(newCourse);
        alert('✅ Course added successfully!');
    }

    localStorage.setItem('courses', JSON.stringify(courses));
    closeCourseModal();
    loadCoursesTable();
    loadRecentCourses();
    loadStatistics();
}

function editCourse(id) {
    openCourseModal(id);
}

function deleteCourse(id) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.filter((c) => c.id !== id);
    localStorage.setItem('courses', JSON.stringify(courses));

    // Remove from students' enrollments
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map((user) => {
        if (user.courses) {
            user.courses = user.courses.filter((courseId) => courseId !== id);
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(users));

    alert('✅ Course deleted successfully!');
    loadCoursesTable();
    loadRecentCourses();
    loadStatistics();
}

// ==================== CATEGORIES CRUD ====================
function loadCategoriesGrid() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const grid = document.getElementById('categoriesGrid');

    grid.innerHTML = '';

    categories.forEach((category) => {
        const card = document.createElement('div');
        card.className = 'category-card';

        card.innerHTML = `
            <div class="category-icon">${category.icon || '📁'}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-actions">
                <button class="action-btn btn-edit" onclick="editCategory(${category.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteCategory(${category.id})">Delete</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    form.reset();

    if (categoryId) {
        // Edit mode
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        const category = categories.find((c) => c.id === categoryId);

        document.getElementById('categoryModalTitle').textContent =
            'Edit Category';
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryDescription').value =
            category.description;
        document.getElementById('categoryIcon').value = category.icon || '';
    } else {
        // Add mode
        document.getElementById('categoryModalTitle').textContent =
            'Add New Category';
        document.getElementById('categoryId').value = '';
    }

    modal.style.display = 'block';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

function saveCategory(event) {
    event.preventDefault();

    const categoryId = document.getElementById('categoryId').value;
    const categoryData = {
        name: document.getElementById('categoryName').value.trim(),
        description: document
            .getElementById('categoryDescription')
            .value.trim(),
        icon: document.getElementById('categoryIcon').value.trim() || '📁',
    };

    // Validation
    if (!categoryData.name || categoryData.name.length < 3) {
        alert('Category name must be at least 3 characters');
        return;
    }

    if (!categoryData.description || categoryData.description.length < 10) {
        alert('Category description must be at least 10 characters');
        return;
    }

    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    if (categoryId) {
        // Update existing
        const index = categories.findIndex((c) => c.id == categoryId);
        categories[index] = { ...categories[index], ...categoryData };
        alert('✅ Category updated successfully!');
    } else {
        // Add new
        const newCategory = {
            id: Date.now(),
            ...categoryData,
        };
        categories.push(newCategory);
        alert('✅ Category added successfully!');
    }

    localStorage.setItem('categories', JSON.stringify(categories));
    closeCategoryModal();
    loadCategoriesGrid();
    loadStatistics();
    populateCategoryFilters();
}

function editCategory(id) {
    openCategoryModal(id);
}

function deleteCategory(id) {
    if (
        !confirm(
            'Are you sure you want to delete this category? All courses in this category will remain but need to be recategorized.'
        )
    )
        return;

    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories = categories.filter((c) => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(categories));

    alert('✅ Category deleted successfully!');
    loadCategoriesGrid();
    loadStatistics();
    populateCategoryFilters();
}

// ==================== STUDENTS MANAGEMENT ====================
function loadStudentsTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const students = users.filter((u) => u.role !== 'admin');
    const search =
        document.getElementById('studentSearch')?.value.toLowerCase() || '';

    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search) ||
            s.email.toLowerCase().includes(search)
    );

    const table = document.getElementById('studentsTable');

    if (filtered.length === 0) {
        table.innerHTML =
            '<p style="padding: 20px; text-align: center; color: #999;">No students found</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrolled Courses</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    filtered.forEach((student) => {
        html += `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td>${student.courses?.length || 0} courses</td>
                <td>
                    <button class="action-btn btn-view" onclick="viewStudentDetails('${student.id}')">View Details</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    table.innerHTML = html;
}

function viewStudentDetails(studentId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const student = users.find((u) => u.id === studentId);
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    const enrolledCourses = courses.filter((c) =>
        student.courses?.includes(c.id)
    );

    let details = `Student: ${student.name}\nEmail: ${student.email}\n\nEnrolled Courses:\n`;
    enrolledCourses.forEach((c) => {
        details += `- ${c.title}\n`;
    });

    alert(details);
}

// ==================== ENROLLMENTS ====================
function loadEnrollmentsTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const students = users.filter((u) => u.role !== 'admin');

    const enrollments = [];
    students.forEach((student) => {
        student.courses?.forEach((courseId) => {
            const course = courses.find((c) => c.id === courseId);
            if (course) {
                enrollments.push({
                    studentName: student.name,
                    studentEmail: student.email,
                    courseTitle: course.title,
                    courseCategory: course.category,
                });
            }
        });
    });

    const table = document.getElementById('enrollmentsTable');

    if (enrollments.length === 0) {
        table.innerHTML =
            '<p style="padding: 20px; text-align: center; color: #999;">No enrollments yet</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student Email</th>
                    <th>Course</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
    `;

    enrollments.forEach((enrollment) => {
        html += `
            <tr>
                <td><strong>${enrollment.studentName}</strong></td>
                <td>${enrollment.studentEmail}</td>
                <td>${enrollment.courseTitle}</td>
                <td><span class="course-category">${enrollment.courseCategory}</span></td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    table.innerHTML = html;
}

// ==================== UTILITIES ====================
function populateCategoryFilters() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const select = document.getElementById('courseCategoryFilter');

    if (select) {
        select.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach((cat) => {
            select.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
        });
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../login.html';
    }
}

// Search and filter listeners
document
    .getElementById('courseSearch')
    ?.addEventListener('input', loadCoursesTable);
document
    .getElementById('courseCategoryFilter')
    ?.addEventListener('change', loadCoursesTable);
document
    .getElementById('studentSearch')
    ?.addEventListener('input', loadStudentsTable);

// Close modals on outside click
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};
