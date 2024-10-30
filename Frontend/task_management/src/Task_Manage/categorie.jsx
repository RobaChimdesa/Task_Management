import React,{useState,useEffect} from "react";
import api from "./api";

const CategoryList = () =>{
    const [categories, setCategories] = useState([]);
    const [newCategory,setNewCategory] = useState("");

    const fetchCategories = () =>{
        api.get("/categories")
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.error("Error fetxhing categories:",error);
        });
    };
    useEffect(() => {
        fetchCategories();
    },[])

    // handle category submision

    const handleSubmit = (e) =>{
        e.preventDefault();
        api.post("/categories",{name:newCategory})

        .then((response) => {
            setCategories([...categories, response.data]);
            setNewCategory("");
            console.log('category is succesfuly added')
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

      return (
        <div>
          <h2>Category List</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
    
          <h3>Create a New Category</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Category Name:</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Category</button>
          </form>
        </div>
      );

}
export default CategoryList