// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert('Please login to view your wishlist!');
    window.location.href = 'login.html';
}

// Initialize wishlist
if (!currentUser.wishlist) {
    currentUser.wishlist = [];
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInStorage();
}

let selectedCourseId = null;

// Load wishlist courses
function loadWishlist() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const wishlistCourses = courses.filter((c) =>
        currentUser.wishlist.includes(c.id)
    );

    updateWishlistCount();

    if (wishlistCourses.length === 0) {
        document.getElementById('emptyWishlist').style.display = 'block';
        document.getElementById('wishlistGrid').style.display = 'none';
        return;
    }

    document.getElementById('emptyWishlist').style.display = 'none';
    document.getElementById('wishlistGrid').style.display = 'grid';

    displayWishlistCourses(wishlistCourses);
}

// Display wishlist courses
function displayWishlistCourses(courses) {
    const grid = document.getElementById('wishlistGrid');
    grid.innerHTML = '';

    courses.forEach((course) => {
        const card = document.createElement('div');
        card.className = 'course-card';

        const priceHTML =
            course.price === 0
                ? '<span class="course-price free">Free</span>'
                : `<span class="course-price">$${course.price}</span>`;

        card.innerHTML = `
            <div class="wishlist-icon active" onclick="removeFromWishlist(${course.id}, event)">
                ❤️
            </div>
            <img src="${course.image}" alt="${course.title}" class="course-image" onclick="showCourseDetails(${course.id})">
            <div class="course-body" onclick="showCourseDetails(${course.id})">
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

// Update wishlist count
function updateWishlistCount() {
    const count = currentUser.wishlist.length;
    const badge = document.getElementById('wishlistCount');

    if (badge) {
        badge.textContent = count;
        if (count === 0) {
            badge.classList.add('zero');
        } else {
            badge.classList.remove('zero');
        }
    }
}

// Remove from wishlist
function removeFromWishlist(courseId, event) {
    if (event) {
        event.stopPropagation();
    }

    currentUser.wishlist = currentUser.wishlist.filter((id) => id !== courseId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInStorage();

    showToast('Removed from wishlist', 'error');
    loadWishlist();
}

// Show course details modal
function showCourseDetails(courseId) {
    selectedCourseId = courseId;
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find((c) => c.id === courseId);

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

// Remove from wishlist (from modal)
function removeFromWishlistModal() {
    removeFromWishlist(selectedCourseId);
    document.getElementById('courseModal').style.display = 'none';
}

// Enroll in course
function enrollCourse() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find((c) => c.id === selectedCourseId);

    // Check if already enrolled
    if (currentUser.courses.includes(selectedCourseId)) {
        alert('You are already enrolled in this course!');
        return;
    }

    // Close modal
    document.getElementById('courseModal').style.display = 'none';

    // Remove from wishlist
    currentUser.wishlist = currentUser.wishlist.filter(
        (id) => id !== selectedCourseId
    );
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInStorage();

    // Check if course is paid or free
    if (course.price > 0) {
        window.location.href = `payment.html?courseId=${selectedCourseId}`;
    } else {
        enrollFreeCourse(selectedCourseId);
    }
}

// Enroll in free course
function enrollFreeCourse(courseId) {
    currentUser.courses.push(courseId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInStorage();

    alert('Successfully enrolled in this free course!');
    loadWishlist();
}

// Update user in users array
function updateUserInStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : '✕';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
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

if (currentUser) {
    const aboutLink = navLinks.querySelector('a[href="about.html"]');
    const contactLink = navLinks.querySelector('a[href="contact.html"]');

    if (aboutLink) aboutLink.parentElement.style.display = 'none';
    if (contactLink) contactLink.parentElement.style.display = 'none';

    loginBtn.style.display = 'none';

    const profileLi = document.createElement('li');
    profileLi.innerHTML = '<a href="student/profile.html">Profile</a>';
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

// Load wishlist on page load
loadWishlist();
