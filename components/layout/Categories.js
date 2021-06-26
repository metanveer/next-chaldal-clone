import { Fragment, useState } from "react";
import css from "./Categories.module.css";

import MenuItem from "./MenuItem";

const Categories = ({ categories }) => {
  const [firstChildId, setFirstChildId] = useState(null);
  const [secondChildId, setSecondChildId] = useState(null);
  const [thirdChildId, setThirdChildId] = useState(null);
  const [fourthChildId, setFourthChildId] = useState(null);

  // console.log("first child", firstChildId);
  // console.log("sec child", secondChildId);
  // console.log("third child", thirdChildId);
  // console.log("forth child", thirdChildId);

  function handleFirstChildId(id) {
    setFirstChildId(id);
    setSecondChildId(null);
    setThirdChildId(null);
    setFourthChildId(null);
  }
  function handleSecondChildId(id) {
    setSecondChildId(id);
    setThirdChildId(null);
    setFourthChildId(null);
  }
  function handleThirdChildId(id) {
    setThirdChildId(id);
    setFourthChildId(null);
  }
  function handleFourthChildId(id) {
    setFourthChildId(id);
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
                activeId={firstChildId}
                containsProducts={item.ContainsProducts}
                setActiveId={() => handleFirstChildId(item.Id)}
              />
              <div className={css.firstChild}>
                {item.Id === firstChildId &&
                  categories
                    .filter((item) => item.ParentCategoryId === firstChildId)
                    .map(function (item) {
                      return (
                        <Fragment key={item.Id}>
                          <MenuItem
                            name={item.Name}
                            slug={item.slug}
                            id={item.Id}
                            activeId={secondChildId}
                            containsProducts={item.ContainsProducts}
                            setActiveId={() => handleSecondChildId(item.Id)}
                          />
                          <div className={css.nestedChild}>
                            {item.Id === secondChildId &&
                              categories
                                .filter(
                                  (item) =>
                                    item.ParentCategoryId === secondChildId
                                )
                                .map(function (item) {
                                  return (
                                    <Fragment key={item.Id}>
                                      <MenuItem
                                        name={item.Name}
                                        slug={item.slug}
                                        id={item.Id}
                                        activeId={thirdChildId}
                                        containsProducts={item.ContainsProducts}
                                        setActiveId={() =>
                                          handleThirdChildId(item.Id)
                                        }
                                      />
                                      <div className={css.nestedChild}>
                                        {item.Id === thirdChildId &&
                                          categories
                                            .filter(
                                              (item) =>
                                                item.ParentCategoryId ===
                                                thirdChildId
                                            )
                                            .map(function (item) {
                                              return (
                                                <Fragment key={item.Id}>
                                                  <MenuItem
                                                    name={item.Name}
                                                    slug={item.slug}
                                                    id={item.Id}
                                                    activeId={fourthChildId}
                                                    containsProducts={
                                                      item.ContainsProducts
                                                    }
                                                    setActiveId={() =>
                                                      handleFourthChildId(
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
              </div>
            </Fragment>
          );
        })}
    </Fragment>
  );
};

export default Categories;
