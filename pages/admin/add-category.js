import React from "react";
import categoriesWithSlug from "../../data/categoriesWithSlug";

const AddCategoriesPage = () => {
  async function handleAddCategories() {
    const url = "/api/Category/AddNewCategory";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriesWithSlug),
    };
    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  async function handleGetCategories() {
    const url = "/api/Category/GetAllCategories";
    const config = {
      method: "GET",
    };
    try {
      const res = await fetch(url, config);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <button onClick={handleAddCategories}>
        Press here to add categories
      </button>
      <button onClick={handleGetCategories}>Get Categories</button>
    </div>
  );
};

export default AddCategoriesPage;
