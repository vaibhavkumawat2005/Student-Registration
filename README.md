<h1>Student Registration App</h1>
    <p>A simple React application for registering and managing student information.</p>

   <h2>Overview</h2>
    <p>
        This project is a React-based web application that allows users to register students by providing details such as name, email, phone, city, gender, and hobbies. It includes features like form validation, local storage persistence, sorting of student data, and the ability to edit or delete student records.
    </p>

   <h2>Features</h2>
    <ul>
        <li><strong>Form Submission:</strong> Add new students or update existing ones with required field validation.</li>
        <li><strong>Local Storage:</strong> Student data is saved in the browser's local storage and persists across page reloads.</li>
        <li><strong>Sorting:</strong> Sort the student list by name, email, phone, city, or gender in ascending or descending order.</li>
        <li><strong>Edit & Delete:</strong> Modify or remove existing student records.</li>
        <li><strong>Hobbies Selection:</strong> Choose multiple hobbies (reading, gaming, football) via checkboxes.</li>
    </ul>


  <h2>Screenshot  and video</h2>

  


https://github.com/user-attachments/assets/30d9f2f5-b5bc-4571-b6be-635a06e36250





  
![Screenshot 2025-03-19 154859](https://github.com/user-attachments/assets/12ea5ce6-c088-4b83-9502-c8f58b2b31bf)
![Screenshot 2025-03-19 154911](https://github.com/user-attachments/assets/49dda4bc-4e88-4bfc-ab79-80e111c425b8)
![Screenshot 2025-03-19 154920](https://github.com/user-attachments/assets/48298d80-ee4e-445d-80d4-13e100b8a138)


  <h2>Project Structure</h2>
    <pre>
src/
├── components/
│   └── StudentRegistration.jsx   // Main component with form and student list
├── App.jsx                      // Root component
└── index.jsx                    // Entry point for React rendering
    </pre>

   <h2>Installation</h2>
    <p>Follow these steps to set up and run the project locally:</p>
    <ol>
        <li>Clone the repository: <code>git clone &lt;repository-url&gt;</code></li>
        <li>Navigate to the project directory: <code>cd student-registration-app</code></li>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Start the development server: <code>npm start</code></li>
        <li>Open your browser and visit: <code>http://localhost:3000</code></li>
    </ol>

   <h2>Dependencies</h2>
    <ul>
        <li><strong>React:</strong> JavaScript library for building user interfaces.</li>
        <li><strong>React Icons:</strong> Used for icons in the form and table (e.g., FaUser, FaEnvelope).</li>
    </ul>

   <h2>Usage</h2>
    <p>
        - Fill out the form with student details (all fields are required).<br>
        - Select hobbies using checkboxes.<br>
        - Submit the form to add or update a student.<br>
        - Use the table below to view, sort, edit, or delete student records.
    </p>

   <h2>Notes</h2>
    <ul>
        <li>The app uses Tailwind CSS classes in the code, so ensure Tailwind is configured if modifying styles.</li>
        <li>Data is stored in local storage under the key <code>"students"</code>.</li>
    </ul>

   <h2>License</h2>
    <p>This project is unlicensed unless specified otherwise in the repository.</p>
