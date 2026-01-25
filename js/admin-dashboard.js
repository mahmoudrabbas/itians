const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = '../index.html';
}

// read courses from localStorage
let courses = JSON.parse(localStorage.getItem('courses')) || [
    {
        id: 1,
        title: 'Full Stack Web Development',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
        category: 'Programming',
        instructor: 'Ahmed Hassan',
        description:
            'Master HTML, CSS, JavaScript, React, Node.js and MongoDB.',
        price: 499,
        duration: '12 weeks',
        content: [],
    },
    {
        id: 2,
        title: 'Cybersecurity Fundamentals',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500',
        category: 'Cybersecurity',
        instructor: 'Sara Mohamed',
        description: 'Learn ethical hacking and penetration testing.',
        price: 599,
        duration: '10 weeks',
        content: [],
    },
    {
        id: 3,
        title: 'Python for Data Science',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500',
        category: 'Data Science',
        instructor: 'Omar Ali',
        description: 'Learn Python programming and data analysis.',
        price: 0,
        duration: '8 weeks',
        content: [],
    },
];

let categories = JSON.parse(localStorage.getItem('categories')) || [
    {
        id: 1,
        name: 'Programming',
        description: 'Programming languages',
        icon: '💻',
    },
    {
        id: 2,
        name: 'Cybersecurity',
        description: 'Security courses',
        icon: '🔒',
    },
    {
        id: 3,
        name: 'Data Science',
        description: 'Data analysis',
        icon: '📊',
    },
    {
        id: 4,
        name: 'Networking',
        description: 'Network infrastructure',
        icon: '🌐',
    },
];

let students = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        name: 'Mahmoud Abbas',
        email: 'mahmoud@gmail.com',
        password: '_Mahmoud123',
        courses: [1, 2],
    },
    {
        id: 2,
        name: 'Mohk ',
        email: '_mokh@example.com',
        password: '_Mokh123',
        courses: [1],
    },
];

function saveToLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('users', JSON.stringify(students));
}

let editingCourseId = null;
let editingCategoryId = null;
let courseContent = [];

function switchSection(section) {
    document
        .querySelectorAll('.content-section')
        .forEach((s) => s.classList.remove('active'));
    document
        .querySelectorAll('.menu-item')
        .forEach((m) => m.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    event.target.closest('.menu-item').classList.add('active');

    if (section === 'overview') renderOverview();
    if (section === 'courses') renderCourses();
    if (section === 'categories') renderCategories();
    if (section === 'students') renderStudents();
    if (section === 'enrollments') renderEnrollments();
}

function renderOverview() {
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalCategories').textContent = categories.length;
    let total = students.reduce((sum, s) => sum + s.courses.length, 0);
    document.getElementById('totalEnrollments').textContent = total;

    let html = '';
    courses.slice(0, 3).forEach((c) => {
        html += `<div class="course-card">
                    <img src="${c.image}" class="course-image">
                    <div class="course-body">
                        <span class="course-category">${c.category}</span>
                        <h3>${c.title}</h3>
                        <p>By ${c.instructor}</p>
                    </div>
                </div>`;
    });
    document.getElementById('recentCourses').innerHTML = html;
}

function renderCourses() {
    updateCategoryFilter();
    let html =
        '<table><thead><tr><th>Title</th><th>Category</th><th>Instructor</th><th>Price</th><th>Duration</th><th>Actions</th></tr></thead><tbody>';
    courses.forEach((c) => {
        html += `<tr>
                    <td>${c.title}</td>
                    <td>${c.category}</td>
                    <td>${c.instructor}</td>
                    <td>${c.price === 0 ? 'Free' : '$' + c.price}</td>
                    <td>${c.duration}</td>
                    <td>
                        <button class="action-btn btn-edit" onclick="editCourse(${c.id})">Edit</button>
                        <button class="action-btn btn-delete" onclick="deleteCourse(${c.id})">Delete</button>
                    </td>
                </tr>`;
    });
    html += '</tbody></table>';
    document.getElementById('coursesTable').innerHTML = html;
}

function filterCourses() {
    let search = document.getElementById('courseSearch').value.toLowerCase();
    let catFilter = document.getElementById('courseCategoryFilter').value;
    let filtered = courses.filter((c) => {
        let match1 =
            c.title.toLowerCase().includes(search) ||
            c.instructor.toLowerCase().includes(search);
        let match2 = catFilter === 'all' || c.category === catFilter;
        return match1 && match2;
    });

    let html =
        '<table><thead><tr><th>Title</th><th>Category</th><th>Instructor</th><th>Price</th><th>Duration</th><th>Actions</th></tr></thead><tbody>';
    filtered.forEach((c) => {
        html += `<tr>
                    <td>${c.title}</td>
                    <td>${c.category}</td>
                    <td>${c.instructor}</td>
                    <td>${c.price === 0 ? 'Free' : '$' + c.price}</td>
                    <td>${c.duration}</td>
                    <td>
                        <button class="action-btn btn-edit" onclick="editCourse(${c.id})">Edit</button>
                        <button class="action-btn btn-delete" onclick="deleteCourse(${c.id})">Delete</button>
                    </td>
                </tr>`;
    });
    html += '</tbody></table>';
    document.getElementById('coursesTable').innerHTML = html;
}

function updateCategoryFilter() {
    let html1 = '<option value="all">All Categories</option>';
    let html2 = '';
    categories.forEach((cat) => {
        html1 += `<option value="${cat.name}">${cat.name}</option>`;
        html2 += `<option value="${cat.name}">${cat.name}</option>`;
    });
    document.getElementById('courseCategoryFilter').innerHTML = html1;
    document.getElementById('courseCategory').innerHTML = html2;
}

function openCourseModal() {
    editingCourseId = null;
    courseContent = [];
    document.getElementById('courseModalTitle').textContent = 'Add New Course';
    document.getElementById('courseForm').reset();
    updateCategoryFilter();
    renderContentItems();
    document.getElementById('courseModal').classList.add('show');
}

function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('show');
}

function editCourse(id) {
    let c = courses.find((x) => x.id === id);
    editingCourseId = id;
    courseContent = c.content || [];
    document.getElementById('courseModalTitle').textContent = 'Edit Course';
    document.getElementById('courseTitle').value = c.title;
    document.getElementById('courseCategory').value = c.category;
    document.getElementById('courseInstructor').value = c.instructor;
    document.getElementById('courseDescription').value = c.description;
    document.getElementById('courseImage').value = c.image;
    document.getElementById('coursePrice').value = c.price;
    document.getElementById('courseDuration').value = c.duration;
    updateCategoryFilter();
    renderContentItems();
    document.getElementById('courseModal').classList.add('show');
}

function saveCourse(e) {
    e.preventDefault();
    let data = {
        title: document.getElementById('courseTitle').value,
        category: document.getElementById('courseCategory').value,
        instructor: document.getElementById('courseInstructor').value,
        description: document.getElementById('courseDescription').value,
        image: document.getElementById('courseImage').value,
        price: Number(document.getElementById('coursePrice').value),
        duration: document.getElementById('courseDuration').value,
        content: courseContent,
    };

    if (editingCourseId) {
        let idx = courses.findIndex((c) => c.id === editingCourseId);
        courses[idx] = { ...data, id: editingCourseId };
    } else {
        courses.push({ ...data, id: Date.now() });
    }

    saveToLocalStorage();
    closeCourseModal();
    renderCourses();
    renderOverview();
}

function addContentItem() {
    courseContent.push({ title: '', type: 'video', link: '' });
    renderContentItems();
}

function removeContentItem(index) {
    courseContent.splice(index, 1);
    renderContentItems();
}

function updateContentItem(index, field, value) {
    courseContent[index][field] = value;
}

function renderContentItems() {
    let html = '';
    courseContent.forEach((item, i) => {
        html += `
                    <div class="content-item">
                        <div class="content-item-header">
                            <div class="content-number">${i + 1}</div>
                            <button type="button" class="btn-remove" onclick="removeContentItem(${i})">Remove</button>
                        </div>
                        <div class="form-group">
                            <label>Content Title</label>
                            <input type="text" value="${item.title}" onchange="updateContentItem(${i}, 'title', this.value)" placeholder="e.g., Introduction to HTML">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                            <div class="form-group">
                                <label>Type</label>
                                <select onchange="updateContentItem(${i}, 'type', this.value)">
                                    <option value="video" ${item.type === 'video' ? 'selected' : ''}>Video</option>
                                    <option value="pdf" ${item.type === 'pdf' ? 'selected' : ''}>PDF</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Link (YouTube embed or PDF URL)</label>
                                <input type="url" value="${item.link}" onchange="updateContentItem(${i}, 'link', this.value)" placeholder="https://www.youtube.com/embed/...">
                            </div>
                        </div>
                    </div>
                `;
    });
    document.getElementById('contentItems').innerHTML = html;
}

function deleteCourse(id) {
    if (confirm('Delete this course?')) {
        courses = courses.filter((c) => c.id !== id);
        saveToLocalStorage();
        renderCourses();
        renderOverview();
    }
}

function renderCategories() {
    let html = '';
    categories.forEach((cat) => {
        html += `<div class="category-card">
                    <div class="category-icon">${cat.icon}</div>
                    <h3>${cat.name}</h3>
                    <p>${cat.description}</p>
                    <div class="category-actions">
                        <button class="action-btn btn-edit" onclick="editCategory(${cat.id})">Edit</button>
                        <button class="action-btn btn-delete" onclick="deleteCategory(${cat.id})">Delete</button>
                    </div>
                </div>`;
    });
    document.getElementById('categoriesGrid').innerHTML = html;
}

function openCategoryModal() {
    editingCategoryId = null;
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModal').classList.add('show');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

function editCategory(id) {
    let cat = categories.find((c) => c.id === id);
    editingCategoryId = id;
    document.getElementById('categoryName').value = cat.name;
    document.getElementById('categoryDescription').value = cat.description;
    document.getElementById('categoryIcon').value = cat.icon;
    document.getElementById('categoryModal').classList.add('show');
}

function saveCategory(e) {
    e.preventDefault();
    let data = {
        name: document.getElementById('categoryName').value,
        description: document.getElementById('categoryDescription').value,
        icon: document.getElementById('categoryIcon').value,
    };

    if (editingCategoryId) {
        let idx = categories.findIndex((c) => c.id === editingCategoryId);
        categories[idx] = { ...data, id: editingCategoryId };
    } else {
        categories.push({ ...data, id: Date.now() });
    }

    saveToLocalStorage();
    closeCategoryModal();
    renderCategories();
    renderOverview();
}

function deleteCategory(id) {
    if (confirm('Delete this category?')) {
        categories = categories.filter((c) => c.id !== id);
        saveToLocalStorage();
        renderCategories();
        renderOverview();
    }
}

function renderStudents() {
    let html =
        '<table><thead><tr><th>Name</th><th>Email</th><th>Enrolled Courses</th></tr></thead><tbody>';
    students.forEach((s) => {
        html += `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.courses.length}</td></tr>`;
    });
    html += '</tbody></table>';
    document.getElementById('studentsTable').innerHTML = html;
}

function renderEnrollments() {
    let html =
        '<table><thead><tr><th>Student</th><th>Course</th><th>Price</th></tr></thead><tbody>';
    students.forEach((s) => {
        s.courses.forEach((cid) => {
            let c = courses.find((x) => x.id === cid);
            if (c) {
                html += `<tr><td>${s.name}</td><td>${c.title}</td><td>${c.price === 0 ? 'Free' : '$' + c.price}</td></tr>`;
            }
        });
    });
    html += '</tbody></table>';
    document.getElementById('enrollmentsTable').innerHTML = html;
}

renderOverview();

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}
