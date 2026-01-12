# 🎓 E-Learning System – JavaScript Project

An **E-Learning System** built using **JavaScript**, with support for **Local Storage** or **Firebase Realtime Database**.  
The project includes a full authentication system for both **Admins** and **Students**, with separate permissions and features.

---

## 🚀 Features

### 👥 User Types

- **Admin**
- **Student**

### 🔐 Authentication

- Login
- Registration
- Logout
- Full form validation
- Clear and user-friendly error messages

---

## 📚 Course Information Structure

Each course contains:

- **ID**
- **Title**
- **Image**
- **Category**
- **Instructor Name**
- **Description**
- **Price** (if applicable)
- **Duration**
- **Content** (Videos, PDFs, Materials)

---

## 🛠️ Admin Features

Admins can:

- 🔧 Perform full **CRUD operations** on Courses
- 🔧 Perform full **CRUD operations** on Categories
- 👨‍🎓 View and manage student progress
- 👍/👎 Approve or reject course enrollment requests (if required)

---

## 🎓 Student Features

Students can:

- 👀 View all available courses
- 🔍 Use filtering and search options
- 🤍 Add courses to wishlist (via Local Storage or Cookies)
- 📝 Enroll in courses
- ▶️ View course content (videos, quizzes, materials)
- 📊 Track learning progress
- ✅ View completed courses
- 🏅 Access learning history and certificates (if available)
- 💳 Make online payments using PayPal or Stripe (for paid courses)

---

## 🗄️ Database Options

You can choose one of the following:

### 1. **Local Storage**

- Simple and easy to implement
- Suitable for training projects

### 2. **Firebase Realtime Database**

- Real-time data syncing
- More professional and scalable

---

## 🎨 User Interface Requirements

- **No premade themes allowed**
- Use clean and readable fonts
- Suitable colors and basic layout
- UI should be simple, acceptable, and user-friendly

---

## 📁 Suggested Project Structure

/itians
│── index.html
│── login.html
│── register.html
│── admin/
│ ├── dashboard.html
│ ├── courses.html
│ └── categories.html
│── student/
│ ├── home.html
│ ├── course.html
│ └── wishlist.html
│── css/
│ └── style.css
│── js/
├── auth.js
├── courses.js
├── categories.js
├── wishlist.js
├── admin.js
└── utils.js

---

## ☁️ Deployment

- Upload the entire project to **GitHub**
- Ensure all pages work without errors
- Optional: Host using **GitHub Pages**

---

## 👨‍💻 Developers

- **Mahmoud Ramadan Abbas**
- **Mokhtar Mohamed Mokhtar**
- **Wafaey Khaled Mohamed**
