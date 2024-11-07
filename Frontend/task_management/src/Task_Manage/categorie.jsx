import React, { useState, useEffect } from "react";
import api from "./api";
import { Link, useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [addCategoy, setAddCategory] = useState(false);
  // const [changepage,setChangepage] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // If no token, redirect to login page
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCategories();
  }, [navigate]);

  const fetchCategories = () => {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetxhing categories:", error);
      });
  };

  // handle category submision

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/categories", { name: newCategory })

      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategory("");
        console.log("category is succesfuly added");
        setAddCategory(!addCategoy);
      })

      .catch((error) => {
        if (error.response) {
          console.error("Error response from server:", error.response.data); // Log the error from the backend
        } else if (error.request) {
          console.error(
            "Error: No response received from server",
            error.request
          ); // No response was received
        } else {
          console.error("Error setting up request:", error.message); // Error during request setup
        }
      });
  };

  const handleAddCategory = () => {
    setAddCategory(!addCategoy);
  };
  // const handleChangepage = () =>{
  //   setChangepage(!changepage)
  // }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Category List</h2>
      <ul className="list-disc list-inside mb-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="text-gray-900 mb-5 flex items-center justify-between"
          >
            <span>{category.name}</span>
            <div>
              <button className="ml-2 text-white px-4 py-1 rounded-2xl bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Edit
              </button>
              <button className="ml-2 text-white px-4 py-1 rounded-2xl bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setAddCategory(!addCategoy)}
        className="bg-blue-600 w-1/3 text-white font-semibold py-2 rounded hover:bg-blue-700 focus:outline-none 
  focus:ring-2 focus:ring-blue-500"
      >
        {addCategoy ? "cancel" : "Add Category"}
      </button>
      {addCategoy && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Create a New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name:
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CategoryList;
