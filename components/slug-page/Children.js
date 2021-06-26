import React, { Fragment, useState } from "react";
import Card from "../common/Card";
import Modal from "../common/Modal";
import css from "./Children.module.css";
import ProductDetail from "./ProductDetail";

const Children = ({ type, categories, products, currentCategory }) => {
  const [clickedId, setClickedId] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null);

  function handleShowModal(id) {
    setClickedId(id);
  }

  function handleCloseModal() {
    setClickedId(null);
    history.pushState({}, null, `${prevLocation}`);
  }

  // let catNames = ["Baby Care", "Diaper & Wipes", "Wipes"];

  if (type === "categories") {
    return (
      <div className={css.childCategories}>
        {categories &&
          categories
            .filter((item) => item.ParentCategoryId === currentCategory.Id)
            .map((item) => (
              <Fragment key={item.Id}>
                <Card
                  type="category"
                  name={item.Name}
                  image={item.Picture.ImageUrl}
                />
              </Fragment>
            ))}
      </div>
    );
  }
  if (type === "products") {
    if (products.length === 0) {
      return (
        <div className={css.childCategories}>
          No products found under this category
        </div>
      );
    }
    return (
      <div className={css.childCategories}>
        {products.map((item) => (
          <Fragment key={item.ProductVariantId}>
            <Card
              type="product"
              productId={item.ProductVariantId}
              name={item.NameWithoutSubText}
              image={item.PictureUrls[0]}
              subText={item.SubText}
              price={item.Price.Lo}
              discPrice={item.DiscountedPrice.Lo}
              slug={item.Slug}
              onClickDetail={handleShowModal}
              setPrevLocation={setPrevLocation}
            />
            {clickedId === item.ProductVariantId && (
              <Modal type="product-detail" handleCloseModal={handleCloseModal}>
                <ProductDetail product={item} />
              </Modal>
            )}
          </Fragment>
        ))}
      </div>
    );
  }
};

export default Children;
