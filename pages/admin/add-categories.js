import React from "react";
import categoriesWithSlug from "../../data/categoriesWithSlug";

function AddCategoriesPage() {
  async function handleAddCategories() {
    const data = categoriesWithSlug;

    fetch("/api/Category/AddNewCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <button onClick={handleAddCategories}>
        Press here to add categories
      </button>
    </div>
  );
}

export default AddCategoriesPage;
