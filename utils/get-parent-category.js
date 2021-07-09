export function getParentsArray(curCategory, allCategories) {
  const levelOne =
    allCategories.find((item) => item.Id === curCategory.ParentCategoryId) ||
    null;
  if (!levelOne) return [];
  const levelTwo =
    allCategories.find((item) => item.Id === levelOne.ParentCategoryId) || null;
  if (!levelTwo) return [levelOne];
  const levelThree =
    allCategories.find((item) => item.Id === levelTwo.ParentCategoryId) || null;
  if (!levelThree) return [levelOne, levelTwo];
  return [levelOne, levelTwo, levelThree];
}
