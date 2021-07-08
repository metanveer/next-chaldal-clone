import categorySlice, {
  setCategoriesAtServer,
  setCurCategoryAtServer,
} from "./categorySlice";

export const fetchCategories = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/Category/GetAllCategories"
      );
      if (!response.ok) {
        throw new Error("Couldn't fetch categories");
      }
      const data = await response.json();
      return data;
    };

    try {
      const categoriesData = await fetchData();
      dispatch(setCategoriesAtServer(categoriesData.data));
    } catch (error) {
      console.log("Error setting categories", error);
    }
  };
};

export const setCategoriesFromDB = (categories) => {
  return async (dispatch) => {
    try {
      dispatch(setCategoriesAtServer(categories));
    } catch (error) {
      console.log("Error setting categories", error);
    }
  };
};
