// TaskList.js
import React, { useState, useEffect } from "react";
import api from "./api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = () => {
    api.get("/tasks/")
      .then((response) => {
        setTasks(response.data);
        console.log(response.data)
        console.log('connected')
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  // Fetch categories from the backend
  const fetchCategories = () => {
    api.get("/categories") 
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  // Handle new task submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDeadline = newTask.deadline ? new Date(newTask.deadline).toISOString().split("T")[0]:null
    console.log(newTask); 
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      deadline: formattedDeadline,  // Send the correctly formatted deadline
      category: newTask.category,    // Ensure category is the ID
      completed: false,      
         };
    api.post("/tasks/", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask({
          title: "",
          description: "",
          deadline: "",
          category: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response from server:", error.response.data); // Log the error from the backend
        } else if (error.request) {
          console.error("Error: No response received from server", error.request); // No response was received
        } else {
          console.error("Error setting up request:", error.message); // Error during request setup
        }
        });
  };

  // Mark task as completed
  const handleComplete = (id) => {
    const updatedTaskData = {  
      title: "Updated Task Title",  
      description: "Updated Task Description",};
    api.put(`/tasks/${id}/`, updatedTaskData)
      .then((response) => {

        fetchTasks(); // Refresh the task list
        console.log("Task updated successfully:", response.data);  
        
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response from server:", error.response.data); // Log the error from the backend
        } else if (error.request) {
          console.error("Error: No response received from server", error.request); // No response was received
        } else {
          console.error("Error setting up request:", error.message); // Error during request setup
        }
      });
  };

  // Delete task
  const handleDelete = (id) => {
    api.delete(`/tasks/${id}/`)
      .then(() => {
        fetchTasks(); // Refresh the task list
      })
      .catch((error) => {
        console.error(`Error deleting task ${id}:`, error);
      });
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
            {!task.completed && (
              <button onClick={() => handleComplete(task.id)}>Mark as Complete</button>
            )}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Create a New Task</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskList;