import { setCategories } from "./categorySlice";

export const setFetchedCategories = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch categories");
      }
      const data = await response.json();

      return data;
    };

    try {
      const categories = await fetchData();
      dispatch(setCategories(categories));
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
