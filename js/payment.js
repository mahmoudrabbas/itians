//getting courseId from url
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get('courseId'));

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert('Please login to enroll in courses!');
    window.location.href = 'login.html';
}

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

    if (course.price === 0) {
        alert('This course is free! Redirecting to enrollment...');
        enrollDirectly();
        return;
    }

    if (currentUser.courses.includes(courseId)) {
        alert('You are already enrolled in this course!');
        window.location.href = '../student/profile.html';
        return;
    }

    document.getElementById('courseImage').src = course.image;
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('courseCategory').textContent = course.category;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('coursePrice').textContent = `$${course.price}`;
    document.getElementById('totalPrice').textContent = `$${course.price}`;

    document.getElementById('userNameNav').textContent = currentUser.name;
}

// payment method selection
document.querySelectorAll('.payment-option').forEach((option) => {
    option.addEventListener('click', function () {
        // remove selected from all
        document.querySelectorAll('.payment-option').forEach((opt) => {
            opt.classList.remove('selected');
        });

        // adding selected to clicked
        this.classList.add('selected');

        // check the radio button
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPaymentMethod = radio.value;

        // show/hide stripe form
        const stripeForm = document.getElementById('stripeForm');
        if (selectedPaymentMethod === 'stripe') {
            stripeForm.style.display = 'block';
        } else {
            stripeForm.style.display = 'none';
        }

        // update button text
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

// format card number input
document.getElementById('cardNumber')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// format expiry date input
document.getElementById('expiryDate')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// cvv only numbers
document.getElementById('cvv')?.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// process Payment
function processPayment() {
    if (selectedPaymentMethod === 'stripe') {
        if (!validateCardForm()) {
            return;
        }
    }

    // show loading modal
    document.getElementById('loadingModal').style.display = 'block';

    setTimeout(() => {
        //
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

    // validate expiry date is not in the past
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

    // save payment record (optional - for admin tracking)
    savePaymentRecord();

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
    currentUser.courses.push(courseId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert('Successfully enrolled in this free course!');
    window.location.href = '../student/profile.html';
}

function goToCourse() {
    window.location.href = '../student/profile.html';
}

loadCourseData();
