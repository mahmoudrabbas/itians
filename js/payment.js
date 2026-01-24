// Get course ID from URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get('courseId'));

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert('Please login to enroll in courses!');
    window.location.href = 'login.html';
}

// Load course data
let course = null;
let selectedPaymentMethod = 'paypal';

function loadCourseData() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    course = courses.find((c) => c.id === courseId);

    if (!course) {
        alert('Course not found!');
        window.location.href = 'courses.html';
        return;
    }

    // Check if course is free (shouldn't be on payment page)
    if (course.price === 0) {
        alert('This course is free! Redirecting to enrollment...');
        enrollDirectly();
        return;
    }

    // Check if already enrolled
    if (currentUser.courses.includes(courseId)) {
        alert('You are already enrolled in this course!');
        window.location.href = 'student/profile.html';
        return;
    }

    // Populate course information
    document.getElementById('courseImage').src = course.image;
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('courseCategory').textContent = course.category;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('coursePrice').textContent = `$${course.price}`;
    document.getElementById('totalPrice').textContent = `$${course.price}`;

    // Update user name in navbar
    document.getElementById('userNameNav').textContent = currentUser.name;
}

// Payment method selection
document.querySelectorAll('.payment-option').forEach((option) => {
    option.addEventListener('click', function () {
        // Remove selected from all
        document.querySelectorAll('.payment-option').forEach((opt) => {
            opt.classList.remove('selected');
        });

        // Add selected to clicked
        this.classList.add('selected');

        // Check the radio button
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPaymentMethod = radio.value;

        // Show/hide Stripe form
        const stripeForm = document.getElementById('stripeForm');
        if (selectedPaymentMethod === 'stripe') {
            stripeForm.style.display = 'block';
        } else {
            stripeForm.style.display = 'none';
        }

        // Update button text
        updatePaymentButton();
    });
});

function updatePaymentButton() {
    const btnText = document.getElementById('payBtnText');
    if (selectedPaymentMethod === 'paypal') {
        btnText.textContent = `Pay $${course.price} with PayPal`;
    } else {
        btnText.textContent = `Pay $${course.price} with Card`;
    }
}

// Format card number input
document.getElementById('cardNumber')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Format expiry date input
document.getElementById('expiryDate')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// CVV only numbers
document.getElementById('cvv')?.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Process Payment
function processPayment() {
    if (selectedPaymentMethod === 'stripe') {
        if (!validateCardForm()) {
            return;
        }
    }

    // Show loading modal
    document.getElementById('loadingModal').style.display = 'block';

    // Simulate payment processing
    setTimeout(() => {
        // In real app, you would call PayPal/Stripe API here
        completeEnrollment();
    }, 2500);
}

function validateCardForm() {
    const cardNumber = document
        .getElementById('cardNumber')
        .value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardholderName = document
        .getElementById('cardholderName')
        .value.trim();

    if (!cardNumber || cardNumber.length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }

    if (!expiryDate || expiryDate.length !== 5) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    // Validate expiry date is not in the past
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
        alert('Card has expired');
        return false;
    }

    if (!cvv || cvv.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return false;
    }

    if (!cardholderName || cardholderName.length < 3) {
        alert('Please enter the cardholder name');
        return false;
    }

    return true;
}

function completeEnrollment() {
    // Add course to user's enrolled courses
    currentUser.courses.push(courseId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update user in users array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Save payment record (optional - for admin tracking)
    savePaymentRecord();

    // Hide loading, show success
    document.getElementById('loadingModal').style.display = 'none';
    document.getElementById('successModal').style.display = 'block';
}

function savePaymentRecord() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];

    const payment = {
        id: 'payment_' + Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        courseId: course.id,
        courseTitle: course.title,
        amount: course.price,
        method: selectedPaymentMethod,
        status: 'completed',
        date: new Date().toISOString(),
    };

    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));
}

function enrollDirectly() {
    // For free courses, enroll directly without payment
    currentUser.courses.push(courseId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert('Successfully enrolled in this free course!');
    window.location.href = 'student/profile.html';
}

function goToCourse() {
    window.location.href = 'student/profile.html';
}

// Initialize on page load
loadCourseData();
