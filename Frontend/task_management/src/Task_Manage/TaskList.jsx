// // TaskList.js
// import React, { useState, useEffect } from "react";
// import api from "./api";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const TaskList = () => {
//   const navigate = useNavigate();
//   const [addTask,setAddTask] = useState(false)
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     deadline: "",
//     category: "",
//   });
//   const [changepage,setChangepage] = useState(true)

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//      console.log(token)
//     // If no token, redirect to login
//     if (!token) {
//       // navigate("/about");
//       console.log("not connected");
//       return;
//     }

//     fetchTasks();
//     fetchCategories();
//   }, [navigate]);

//   // Fetch tasks from the backend
//   const fetchTasks = () => {
//     api.get("/tasks/")
//       .then((response) => {
//         setTasks(response.data);
//         console.log(response.data)
//         console.log('connected')
//       })
//       .catch((error) => {
//         console.error("Error fetching tasks:", error);
//       });
//   };

//   // Fetch categories from the backend
//   const fetchCategories = () => {
//     api.get("/categories") 
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   };


//   // Handle new task submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formattedDeadline = newTask.deadline ? new Date(newTask.deadline).toISOString().split("T")[0]:null
//     console.log(newTask); 
//     const taskData = {
//       title: newTask.title,
//       description: newTask.description,
//       deadline: formattedDeadline,  // Send the correctly formatted deadline
//       category: newTask.category,    // Ensure category is the ID
//       completed: false,      
//          };
//     api.post("/tasks/", newTask)
//       .then((response) => {
//         setTasks([...tasks, response.data]);
//         setNewTask({
//           title: "",
//           description: "",
//           deadline: "",
//           category: "",
//         });
//         setAddTask(false)
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.error("Error response from server:", error.response.data); // Log the error from the backend
//         } else if (error.request) {
//           console.error("Error: No response received from server", error.request); // No response was received
//         } else {
//           console.error("Error setting up request:", error.message); // Error during request setup
//         }
//         });
//   };

//   // Mark task as completed
//   const handleComplete = (id) => {
//     const updatedTaskData = {  
//       title: "Updated Task Title",  
//       description: "Updated Task Description",};
//     api.put(`/tasks/${id}/`, updatedTaskData)
//       .then((response) => {

//         fetchTasks(); // Refresh the task list
//         console.log("Task updated successfully:", response.data);  
        
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.error("Error response from server:", error.response.data); // Log the error from the backend
//         } else if (error.request) {
//           console.error("Error: No response received from server", error.request); // No response was received
//         } else {
//           console.error("Error setting up request:", error.message); // Error during request setup
//         }
//       });
//   };

//   // Delete task
//   const handleDelete = (id) => {
//     api.delete(`/tasks/${id}/`)
//       .then(() => {
//         fetchTasks(); // Refresh the task list
//       })
//       .catch((error) => {
//         console.error(`Error deleting task ${id}:`, error);
//       });
//   };

//   const handTask = () =>{
//     setAddTask(!addTask)
//   }

//   const handleChangepage = () =>{
//     setChangepage(!changepage)
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//       {/* <Dashboard/> */}
//       <button onClick={handleChangepage} className="bg-blue-600 w-1/4 text-white font-semibold py-2 rounded hover:bg-blue-700 focus:outline-none 
//   focus:ring-2 focus:ring-blue-500">
//       {changepage ? <Link to="/categorylist">see your category</Link>:<Link to="/tasks">see your task</Link>}
//      </button>
//   <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task List</h2>
//   <ul className="space-y-4">
//     {tasks.map((task) => (
//       <li
//         key={task.id}
//         className="p-4 bg-gray-100 rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
//       >
//         <div>
//           <h2 className="text-xl font-bold text-black">{task.title}</h2>
//           <p className="text-gray-700 ">{task.description}</p>
//           <p className="text-sm text-gray-600">Category: {task.category}</p>
//           <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
//           <p className={`text-sm font-semibold ${task.completed ? "text-green-500" : "text-yellow-500"}`}>
//             Status: {task.completed ? "Completed" : "Pending"}
//           </p>
//         </div>
//         <div className="mt-2 sm:mt-0 sm:flex sm:space-x-4">
//           {!task.completed && (
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               onClick={() => handleComplete(task.id)}
//             >
//               Mark as Complete
//             </button>
//           )}
//           <button
//             className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             onClick={() => handleDelete(task.id)}
//           >
//             Delete
//           </button>
          
//         </div>
//       </li>
//     ))}
//   </ul>
//   <button
//     onClick={handTask}
//       type="submit"
//       className="mt-7 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
//     >
//       {addTask ? 'cancel':'add task'}
//     </button>
// {addTask &&  
// <div>

// <h3 className="text-xl font-semibold text-gray-800 mt-6">Create a New Task</h3>
//   <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
//     <div className="flex flex-col">
//       <label className="font-medium text-gray-700">Title:</label>
//       <input
//         type="text"
//         name="title"
//         className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//         value={newTask.title}
//         onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//         required
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="font-medium text-gray-700">Description:</label>
//       <textarea
//         name="description"
//         className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//         value={newTask.description}
//         onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="font-medium text-gray-700">Deadline:</label>
//       <input
//         type="date"
//         name="deadline"
//         className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//         value={newTask.deadline}
//         onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="font-medium text-gray-700">Category:</label>
//       <select
//         name="category"
//         className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//         value={newTask.category}
//         onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
//       >
//         <option value="">Select Category</option>
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//     </div>
//     <button
//       type="submit"
//       className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
//     >
//       Add Task
//     </button>
//   </form>
// </div> }
// </div>

//   );
// };

// export default TaskList;

import React, { useState, useEffect } from "react";
import api from "./api";
import { Link, useNavigate } from "react-router-dom";

// TaskList component serves as the main dashboard for the user
const TaskList = () => {
  const navigate = useNavigate();
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
  });
  const [page, setPage] = useState("tasks"); // controls the page view (tasks or categories)

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // If no token, redirect to login page
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch tasks and categories on component mount
    fetchTasks();
    fetchCategories();
  }, [navigate]);

  // Fetch tasks from the API (for the logged-in user)
  const fetchTasks = () => {
    api.get("/tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  // Fetch categories from the API
  const fetchCategories = () => {
    api.get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        console.log('why')
      });
  };


  //const fetchCategories = () => {
    //     api.get("/categories") 
    //       .then((response) => {
    //         setCategories(response.data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching categories:", error);
    //       });
    //   };

  // Handle new task submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDeadline = newTask.deadline ? new Date(newTask.deadline).toISOString().split("T")[0] : null;
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      deadline: formattedDeadline,
      category: newTask.category,
      completed: false,
    };

    api.post("/tasks/", taskData)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask({
          title: "",
          description: "",
          deadline: "",
          category: "",
        });
        setAddTask(false); // Hide the add task form after submission
      })
      .catch((error) => {
        console.error("Error creating task:", error.response?.data || error.message);
      });
  };

  // Mark task as complete
  const handleComplete = (id) => {
    api.put(`/tasks/${id}/`, { completed: true })
      .then(() => {
        fetchTasks(); // Reload tasks after marking as complete
      })
      .catch((error) => {
        console.error("Error updating task:", error.response?.data || error.message);
      });
  };

  // Delete a task
  const handleDelete = (id) => {
    api.delete(`/tasks/${id}/`)
      .then(() => {
        fetchTasks(); // Reload tasks after deletion
      })
      .catch((error) => {
        console.error(`Error deleting task ${id}:`, error);
      });
  };

  // Logout function to clear tokens and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="mb-6">
        <button
          onClick={() => setPage("tasks")}
          className={`px-4 py-2 mr-2 ${page === "tasks" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded`}
        >
          Tasks
        </button>
        <button
          onClick={() => setPage("categories")}
          className={`px-4 py-2 ${page === "categories" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded`}
        >
          Categories
        </button>
      </div>

      {/* Task List View */}
      {page === "tasks" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task List</h2>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-gray-100 rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold">{task.title}</h3>
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
                      onClick={() => handleComplete(task.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Mark as Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Add Task Button */}
          <button
            onClick={() => setAddTask(!addTask)}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {addTask ? "Cancel" : "Add Task"}
          </button>

          {/* Add Task Form */}
          {addTask && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Create a New Task</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-medium text-gray-700">Title:</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Description:</label>
                  <textarea
                    name="description"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Deadline:</label>
                  <input
                    type="date"
                    name="deadline"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Category:</label>
                  <select
                    name="category"
                    className="w-full mt-1 p-2 border rounded-md"
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
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Task
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Category List View */}
      {page === "categories" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <h3 className="font-bold text-xl">{category.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;
