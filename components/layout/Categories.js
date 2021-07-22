import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getActiveCategory } from "../../utils/get-active-category";
import { getParentsArray } from "../../utils/get-parent-category";
import css from "./Categories.module.css";
import MenuItem from "./MenuItem";

const Categories = ({ categories }) => {
  const { currentCategory } = useSelector((state) => state.category);
  const { value } = useSelector((state) => state.search);
  const [level, setLevel] = useState(getInitialState());
  const router = useRouter();

  const searchRgx = new RegExp(value, "i");
  const searchFieldEmpty = value === "";
  const categoryPage =
    router.asPath === `/${currentCategory ? currentCategory.slug : null}`;

  useEffect(() => {
    if (!categoryPage) {
      setLevel({
        one: null,
        two: null,
        three: null,
        four: null,
      });
    }
  }, [categoryPage]);

  function setActiveLevelOne(id) {
    setLevel({
      one: id,
      two: null,
      three: null,
      four: null,
    });
  }
  function setActiveLevelTwo(id) {
    setLevel({
      ...level,
      two: id,
      three: null,
      four: null,
    });
  }
  function setActiveLevelThree(id) {
    setLevel({
      ...level,
      three: id,
      four: null,
    });
  }
  function setActiveLevelFour(id) {
    setLevel({
      ...level,
      four: id,
    });
  }

  function setActiveFromSearch(item) {
    const id = item.Id;
    const parents = getParentsArray(item, categories).map((p) => p.Id);

    if (parents.length === 3) {
      setLevel(getActiveCategory(parents, 3, id));
    }
    if (parents.length === 2) {
      setLevel(getActiveCategory(parents, 2, id));
    }
    if (parents.length === 1) {
      setLevel(getActiveCategory(parents, 1, id));
    }
    if (parents.length === 0) {
      setLevel(getActiveCategory(parents, 0, id));
    }
  }

  function getInitialState() {
    if (currentCategory) {
      const id = currentCategory.Id;
      const parents = getParentsArray(currentCategory, categories).map(
        (p) => p.Id
      );

      if (parents.length === 3) {
        return getActiveCategory(parents, 3, id);
      }
      if (parents.length === 2) {
        return getActiveCategory(parents, 2, id);
      }
      if (parents.length === 1) {
        return getActiveCategory(parents, 1, id);
      }
      if (parents.length === 0) {
        return getActiveCategory(parents, 0, id);
      }
    } else {
      return {
        one: null,
        two: null,
        three: null,
        four: null,
      };
    }
  }

  return (
    <Fragment>
      {categories
        .filter(
          (item) =>
            item.ParentCategoryId === 0 && item.CategoryType !== "BrandCategory"
        )
        .sort((a, b) => {
          if (a.DisplayOrder > b.DisplayOrder) {
            return 1;
          }
          if (a.DisplayOrder < b.DisplayOrder) {
            return -1;
          }
          return 0;
        })
        .map(function (item) {
          return (
            <Fragment key={item.Id}>
              <MenuItem
                name={item.Name}
                slug={item.slug}
                id={item.Id}
                icon={item.Picture ? item.Picture.ImageUrl : null}
                activeId={level.one}
                containsProducts={item.ContainsProducts}
                setActiveId={() => setActiveLevelOne(item.Id)}
              />
              <div className={css.subCategories}>
                {searchFieldEmpty ? (
                  <>
                    {item.Id === level.one &&
                      categories
                        .filter((item) => item.ParentCategoryId === level.one)
                        .map(function (item) {
                          return (
                            <Fragment key={item.Id}>
                              <MenuItem
                                name={item.Name}
                                slug={item.slug}
                                id={item.Id}
                                activeId={level.two}
                                containsProducts={item.ContainsProducts}
                                setActiveId={() => setActiveLevelTwo(item.Id)}
                              />

                              <div className={css.nestedLevel}>
                                {item.Id === level.two &&
                                  categories
                                    .filter(
                                      (item) =>
                                        item.ParentCategoryId === level.two
                                    )
                                    .map(function (item) {
                                      return (
                                        <Fragment key={item.Id}>
                                          <MenuItem
                                            name={item.Name}
                                            slug={item.slug}
                                            id={item.Id}
                                            activeId={level.three}
                                            containsProducts={
                                              item.ContainsProducts
                                            }
                                            setActiveId={() =>
                                              setActiveLevelThree(item.Id)
                                            }
                                          />
                                          <div className={css.nestedLevel}>
                                            {item.Id === level.three &&
                                              categories
                                                .filter(
                                                  (item) =>
                                                    item.ParentCategoryId ===
                                                    level.three
                                                )
                                                .map(function (item) {
                                                  return (
                                                    <Fragment key={item.Id}>
                                                      <MenuItem
                                                        name={item.Name}
                                                        slug={item.slug}
                                                        id={item.Id}
                                                        activeId={level.four}
                                                        containsProducts={
                                                          item.ContainsProducts
                                                        }
                                                        setActiveId={() =>
                                                          setActiveLevelFour(
                                                            item.Id
                                                          )
                                                        }
                                                      />
                                                    </Fragment>
                                                  );
                                                })}
                                          </div>
                                        </Fragment>
                                      );
                                    })}
                              </div>
                            </Fragment>
                          );
                        })}
                  </>
                ) : (
                  <>
                    {categories
                      .filter(
                        (category) =>
                          category.Name.match(searchRgx) &&
                          getParentsArray(category, categories)
                            .map((p) => p.Id)
                            .includes(item.Id)
                      )
                      .map(function (item) {
                        return (
                          <Fragment key={item.Id}>
                            <MenuItem
                              name={item.Name}
                              slug={item.slug}
                              id={item.Id}
                              activeId={item.Id}
                              containsProducts={item.ContainsProducts}
                              setActiveId={() => setActiveFromSearch(item)}
                            />
                          </Fragment>
                        );
                      })}
                  </>
                )}
              </div>
            </Fragment>
          );
        })}
    </Fragment>
  );
};

export default Categories;
