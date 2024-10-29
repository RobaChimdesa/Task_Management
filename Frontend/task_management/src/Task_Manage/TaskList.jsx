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
        console.error("Error creating task:", error);
        console.log('not')
      });
  };

  // Mark task as completed
  const handleComplete = (id) => {
    api.put(`/tasks/${id}/`, { completed: true })
      .then(() => {
        fetchTasks(); // Refresh the task list
      })
      .catch((error) => {
        console.error(`Error marking task ${id} as complete:`, error);
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