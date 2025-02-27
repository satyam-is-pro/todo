# To-Do List Web Application

## Overview
This is a simple and interactive To-Do List web application that allows users to add, edit, delete, and filter their tasks. The application supports task scheduling with due dates and stores data in local storage.

## Features
- Add new tasks with an optional due date
- Edit existing tasks
- Mark tasks as completed or pending
- Delete individual tasks or clear all tasks
- Filter tasks (All, Pending, Completed)
- Stores tasks in local storage
- Responsive design with a modern UI using Tailwind CSS and DaisyUI

## Technologies Used
- **HTML**: Structure of the application
- **CSS (Tailwind CSS & DaisyUI)**: Styling and layout
- **JavaScript**: Functionality and local storage management

## Project Structure
```
├── index.html      # Main HTML file
├── styles.css      # Stylesheet
├── script.js       # JavaScript logic
└── README.md       # Project documentation
```

## Installation & Usage
1. Clone the repository or download the files.
2. Open `index.html` in a web browser.
3. Start adding tasks and managing them easily.

## How It Works
1. **Adding a Task**:
   - Type a task in the input field.
   - Select an optional due date.
   - Click the add button (+) to save the task.

2. **Editing a Task**:
   - Click the edit button next to a task.
   - Modify the task in the prompt and save changes.

3. **Marking a Task as Completed/Pending**:
   - Click the check button to toggle between completed and pending states.

4. **Deleting Tasks**:
   - Click the trash button to remove a single task.
   - Click "Delete All" to clear all tasks.

5. **Filtering Tasks**:
   - Use the filter dropdown to view All, Pending, or Completed tasks.

## Local Storage
The application saves all tasks in the browser's local storage, so they remain available even after refreshing the page.

## Responsive Design
The UI is fully responsive and optimized for both desktop and mobile screens.

## Future Improvements
- Implement user authentication for personalized task lists.
- Add category-based task organization.
- Include notifications for due dates.

## License
This project is open-source and free to use under the MIT License.

