var name;
var email;
var password;
var confirmpassword;

let users = JSON.parse(localStorage.getItem('users')) || [];

// Check if user already logged in - Redirect to home
function checkIfLoggedIn() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Check if currentUser is valid JSON
        try {
            JSON.parse(currentUser);
            location.href = '../index.html';
        } catch (e) {
            // Invalid currentUser, remove it
            localStorage.removeItem('currentUser');
        }
    }
}

// Call this function when page loads
window.onload = function () {
    checkIfLoggedIn();
};

function generateId() {
    return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

// login
function login(event) {
    // Prevent form refresh
    if (event) {
        event.preventDefault();
    }

    email = document.getElementById('email').value.trim();
    password = document.getElementById('password').value;

    // Validate email format only
    if (!validateemail()) {
        return;
    }

    // Reload users from localStorage
    users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user by email
    let foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
        document.getElementById('emailmsg').innerHTML = 'Account not found';
        return;
    }

    // Check password
    if (password !== foundUser.password) {
        document.getElementById('passmsg').innerHTML = 'Wrong password';
        return;
    }

    // Clear error messages
    document.getElementById('emailmsg').innerHTML = '';
    document.getElementById('passmsg').innerHTML = '';

    // Success message
    document.getElementById('emailmsg').innerHTML = 'Login successfully';
    document.getElementById('emailmsg').style.color = 'green';

    // Save currentUser in localStorage
    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    setTimeout(() => {
        location.href = '../index.html';
    }, 800);
}

function loginpassword() {
    // This function is no longer needed for login
    // Kept for backward compatibility
    let passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordregex.test(password)) {
        document.getElementById('passmsg').innerHTML =
            '*Password must be 8+ characters include uppercase lowercase and a number';
        return false;
    }
    document.getElementById('passmsg').innerHTML = '';
    return true;
}

// signup validation functions
function validatename() {
    let username = document.getElementById('username');
    name = username.value.trim();
    let nameregex = /^[A-Za-z\s]+$/;

    if (name.length < 3) {
        document.getElementById('namemsg').innerHTML =
            '*Username must be at least 3 characters';
        return false;
    } else if (!nameregex.test(name)) {
        document.getElementById('namemsg').innerHTML =
            '*Name must contain letters only';
        return false;
    }
    document.getElementById('namemsg').innerHTML = '';
    return true;
}

function validateemail() {
    email = document.getElementById('email').value.trim();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
        document.getElementById('emailmsg').innerHTML = '*not valid email';
        return false;
    }
    document.getElementById('emailmsg').innerHTML = '';
    return true;
}

function validatepassword() {
    password = document.getElementById('password').value;
    confirmpassword = document.getElementById('confirmpassword').value;

    let passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (
        password == '' ||
        confirmpassword == '' ||
        password !== confirmpassword ||
        !passwordregex.test(password)
    ) {
        document.getElementsByClassName('passmsg')[0].innerHTML =
            '*Password must be 8+ characters include uppercase lowercase and a number';
        document.getElementsByClassName('passmsg')[1].innerHTML =
            '*Password must be 8+ characters include uppercase lowercase and a number';
        return false;
    }

    document.getElementsByClassName('passmsg')[0].innerHTML = '';
    document.getElementsByClassName('passmsg')[1].innerHTML = '';
    return true;
}

// signup
function signup(event) {
    // Prevent form refresh
    if (event) {
        event.preventDefault();
    }

    if (validatename() && validateemail() && validatepassword()) {
        // Check if Email already exists
        if (users.some((u) => u.email === email)) {
            document.getElementById('emailmsg').innerHTML =
                'Email is already exist';
            return;
        }

        // Create NEW USER with role = student
        let newUser = {
            id: generateId(),
            name: name,
            email: email,
            password: password,
            role: 'student',
            courses: [],
        };

        // Add user to users array
        users.push(newUser);

        // Save users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Save new user as currentUser in localStorage
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Redirect to home page
        setTimeout(() => {
            location.href = '../index.html';
        }, 500);
    }
}
