import nameToUrl from "../utils/name-to-url";
//import categoriesData from "./chaldalCategories.json";
import categoriesData from "./chaldalCategoriesNewIcon.json";

const categoriesWithSlug = categoriesData.map((item) => ({
  ...item,
  slug: nameToUrl(item.Name),
}));

export default categoriesWithSlug;
