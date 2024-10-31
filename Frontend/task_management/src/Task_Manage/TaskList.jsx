// TaskList.js
import React, { useState, useEffect } from "react";
import api from "./api";
import { Link } from "react-router-dom";
const TaskList = () => {
  const [addTask,setAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
  });
  const [changepage,setChangepage] = useState(true)

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

  const handTask = () =>{
    setAddTask(!addTask)
  }

  const handleChangepage = () =>{
    setChangepage(!changepage)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <button onClick={handleChangepage} className="bg-blue-600 w-1/4 text-white font-semibold py-2 rounded hover:bg-blue-700 focus:outline-none 
  focus:ring-2 focus:ring-blue-500">
      {changepage ? <Link to="/categorylist">see your category</Link>:<Link to="/tasks">see your task</Link>}
     </button>
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task List</h2>
  <ul className="space-y-4">
    {tasks.map((task) => (
      <li
        key={task.id}
        className="p-4 bg-gray-100 rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-sm text-gray-600">Category: {task.category}</p>
          <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
          <p className={`text-sm font-semibold ${task.completed ? "text-green-500" : "text-yellow-500"}`}>
            Status: {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
        <div className="mt-2 sm:mt-0 sm:flex sm:space-x-4">
          {!task.completed && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => handleComplete(task.id)}
            >
              Mark as Complete
            </button>
          )}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
          
        </div>
      </li>
    ))}
  </ul>
  <button
    onClick={handTask}
      type="submit"
      className="mt-7 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
    >
      {addTask ? 'cancel':'add task'}
    </button>
{addTask &&  
<div>

<h3 className="text-xl font-semibold text-gray-800 mt-6">Create a New Task</h3>
  <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label className="font-medium text-gray-700">Title:</label>
      <input
        type="text"
        name="title"
        className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="font-medium text-gray-700">Description:</label>
      <textarea
        name="description"
        className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
    </div>
    <div className="flex flex-col">
      <label className="font-medium text-gray-700">Deadline:</label>
      <input
        type="date"
        name="deadline"
        className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={newTask.deadline}
        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
      />
    </div>
    <div className="flex flex-col">
      <label className="font-medium text-gray-700">Category:</label>
      <select
        name="category"
        className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
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
    <button
      type="submit"
      className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
    >
      Add Task
    </button>
  </form>
</div> }
</div>

  );
};

export default TaskList;


