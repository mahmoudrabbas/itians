var name;
var email;
var password;
var confirmpassword;

let users = JSON.parse(localStorage.getItem('users')) || [];

function checkIfLoggedIn() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);

            if (user.role === 'admin') {
                location.href = '../admin/dashboard.html';
            } else {
                location.href = '../index.html';
            }
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
}

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

    if (!validateemail()) {
        return;
    }

    users = JSON.parse(localStorage.getItem('users')) || [];

    let foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
        document.getElementById('emailmsg').innerHTML = 'Account not found';
        return;
    }

    if (password !== foundUser.password) {
        document.getElementById('passmsg').innerHTML = 'Wrong password';
        return;
    }

    document.getElementById('emailmsg').innerHTML = '';
    document.getElementById('passmsg').innerHTML = '';

    // login success message
    document.getElementById('emailmsg').innerHTML = 'Login successfully';
    document.getElementById('emailmsg').style.color = 'green';

    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    setTimeout(() => {
        if (foundUser.role === 'admin') {
            location.href = '../admin/dashboard.html';
        } else {
            location.href = '../index.html';
        }
    }, 500);
}

// function loginpassword() {
//     let passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//     if (!passwordregex.test(password)) {
//         document.getElementById('passmsg').innerHTML =
//             '*Password must be 8+ characters include uppercase lowercase and a number';
//         return false;
//     }
//     document.getElementById('passmsg').innerHTML = '';
//     return true;
// }

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
        if (users.some((u) => u.email === email)) {
            document.getElementById('emailmsg').innerHTML =
                'Email is already exist';
            return;
        }

        let newUser = {
            id: generateId(),
            name: name,
            email: email,
            password: password,
            role: 'student',
            courses: [],
        };

        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem('currentUser', JSON.stringify(newUser));

        setTimeout(() => {
            location.href = '../index.html';
        }, 500);
    }
}
