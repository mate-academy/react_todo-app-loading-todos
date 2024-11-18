# **Todo App with API ✅**

<p align="center">
  <img src="https://github.com/user-attachments/assets/afdcbbfe-da10-4767-b07a-af8590309687" alt="todo-app-picture-for-readme" />
</p>

# 🗒️ Overview
This project is a simple Todo application that enables users to create, edit, and manage their tasks through an interactive interface. All actions are synced with an API to ensure persistent data storage and real-time updates.
You can try it [**here**](https://mikezhylka.github.io/react_todo-app-with-api/#/)

# ✨ Features
1. **➕ Add a New Todo**  
   At the top of the interface, there is an input form where users can type in a task description. Submitting the form sends a POST request to the API, adding a new task to the list.

2. **🗑️ Delete a Todo**  
   Each todo item has a delete button, allowing users to remove individual tasks. Clicking this button triggers a DELETE request to the API, permanently removing the task.

3. **✅ Mark as Completed/Not Completed**  
   Each task has a checkbox (or label) to mark it as completed or incomplete. Toggling this checkbox sends a PATCH request to the API, updating the task’s status.

4. **✏️ Edit Todo Title**  
   Users can double-click a todo item's title to make it editable. After making changes, pressing Enter (or clicking away) saves the edit by sending a PATCH request with the new title to the API.

5. **🔍 Filter Todos**  
   A filter panel allows users to sort tasks by their status:
   - **All**: Shows all tasks.
   - **Active**: Displays only tasks that are not completed.
   - **Completed**: Displays only tasks marked as completed.

6. **🧹 Clear Completed Todos**  
   The app provides a "Clear Completed" button, which deletes all completed tasks in one action. This sends a DELETE request to the API to remove all tasks marked as completed.

7. **🔄 Toggle All Todos**  
   Users can toggle all tasks between completed and not completed using a "Toggle All" button, which sends a PATCH request to the API to change the status of all tasks.

This Todo app simplifies task management with essential features and real-time API synchronization for a seamless user experience.


