import React from "react";
import productsData from "../../data/modifiedProductData.json";

const AddProductPage = () => {
  const handleAddProduct = async () => {
    try {
      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productsData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
};

export default AddProductPage;
