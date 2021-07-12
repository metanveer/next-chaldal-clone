import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { getParentsArray } from "../../utils/get-parent-category";
import css from "./Categories.module.css";
import MenuItem from "./MenuItem";

const Categories = ({ categories }) => {
  const { curCategory } = useSelector((state) => state.categorySlice.server);

  const { value } = useSelector((state) => state.search);

  const searchRgx = new RegExp(value, "i");

  const searchFieldEmpty = value === "";

  const parents = getParentsArray(curCategory, categories);

  const [level, setLevel] = useState(getInitialState());

  function getInitialState() {
    if (parents.length === 3) {
      return {
        one: parents[2].Id,
        two: parents[1].Id,
        three: parents[0].Id,
        four: curCategory.Id,
      };
    }
    if (parents.length === 2) {
      return {
        one: parents[1].Id,
        two: parents[0].Id,
        three: curCategory.Id,
        four: null,
      };
    }
    if (parents.length === 1) {
      return {
        one: parents[0].Id,
        two: curCategory.Id,
        three: null,
        four: null,
      };
    }
    if (parents.length === 0) {
      return {
        one: curCategory.Id,
        two: null,
        three: null,
        four: null,
      };
    }
    return {
      one: null,
      two: null,
      three: null,
      four: null,
    };
  }

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
                        (child) =>
                          child.ParentCategoryId === item.Id &&
                          child.Name.match(searchRgx)
                      )
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
