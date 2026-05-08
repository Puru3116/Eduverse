# EduVerse – Game-Based Learning Platform

EduVerse is a state-of-the-art, game-based learning platform designed to revolutionize education for students in rural India. By blending curriculum-aligned content with interactive gameplay, EduVerse makes learning engaging, accessible, and measurable.

---

## 🌟 Key Features

### 👨‍🎓 Student Experience
- **Adaptive Learning Paths**: Students are categorized into three levels based on their grade:
  - **Explorer**: Foundational learning for younger students.
  - **Builder**: Intermediate challenges and skill-building.
  - **Achiever**: Advanced assessments and complex problem-solving.
- **Gamified Modules**:
  - **Math Bazaar**: Real-world shopping simulations and logic puzzles.
  - **Shabd Quest**: Multilingual vocabulary building and audio recognition.
  - **Rural Quest**: General knowledge and social scenarios tailored for rural contexts.
- **Progress Tracking**: Real-time feedback and visual progress reports.
- **Multilingual Support**: Fully localized interface supporting English, Hindi, and more.

### 👩‍🏫 Teacher Dashboard
- **Class Management**: Easily manage multiple classes and student enrollments.
- **Analytics & Insights**: Track student performance, attendance, and progress through intuitive charts.
- **Announcements**: Send real-time updates and notifications to students.
- **Report Generation**: Export comprehensive student progress reports as professional PDFs.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS & Framer Motion (Animations)
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API
- **Internationalization**: i18next
- **PDF Generation**: jsPDF & html2canvas

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & Google OAuth
- **Security**: Bcrypt.js for password hashing

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- **Node.js**: Version 18.x or higher
- **MongoDB**: A local instance or a MongoDB Atlas URI

### 2. Clone the Repository
```bash
git clone <repository-url>
cd Eduversee
```

### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (Optional - defaults are provided in code):
   ```env
   PORT=5005
   MONGO_URI=mongodb://localhost:27017/eduverse
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *The API will be available at `http://localhost:5005`.*

### 4. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173`.*

### 5. Data Initialization (Optional)
To populate the database with a large bank of assessment questions, run the generator scripts in the root directory:
```bash
node generateMathQuestions.js
node generateScienceQuestions.js
```

---

## 📂 Project Structure

```
Eduversee/
├── backend/                # Express API & MongoDB Models
│   ├── models/             # Database Schemas (Student, Teacher, Grade, etc.)
│   ├── routes/             # API Endpoints
│   ├── middleware/         # Auth & Validation Middleware
│   └── server.js           # Entry point
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Main Views (Home, Login, Dashboard)
│   │   ├── modules/        # Game-specific logic (Math, Shabd, Rural)
│   │   ├── utils/          # API helpers & Constants
│   │   └── i18n.js         # Localization Config
│   └── public/             # Static Assets
└── README.md               # You are here!
```

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the ISC License.
