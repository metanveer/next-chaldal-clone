import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Header from "../components/common/Header";
import Children from "../components/slug-page/Children";
import ProductDetail from "../components/common/ProductDetail";
import Loader from "../components/common/Loader";

import dbConnect from "../db/dbConnect";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import { wrapper } from "../store";
import {
  setCategories,
  setCurrentCategory,
} from "../features/category/categorySlice";

function SlugDetailsPage({ category, products, product, categories }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  // console.log("product", product);
  // console.log("category", category);
  // console.log("productsClient", products);

  const productDetailAvailable = product && Object.keys(product).length > 0;
  const subCategoriesAvailable = category && Object.keys(category).length > 0;
  const nothingAvailable = !productDetailAvailable && !subCategoriesAvailable;

  if (productDetailAvailable) {
    return (
      <>
        <Header type="product-detail-page" />
        <ProductDetail
          id={product._id}
          image={product.PictureUrls[0]}
          images={product.PictureUrls}
          itemName={product.NameWithoutSubText}
          packSize={product.SubText}
          discPrice={product.DiscountedPrice.Lo}
          regPrice={product.Price.Lo}
          description={product.LongDescription}
        />
      </>
    );
  }

  if (subCategoriesAvailable) {
    return (
      <>
        <Header category={category} allCategories={categories} />
        {category.ContainsProducts ? (
          <Children type="products" products={products} />
        ) : (
          <Children
            type="categories"
            categories={categories}
            currentCategory={category}
          />
        )}
      </>
    );
  }

  if (nothingAvailable) {
    return <h1>Noting Found</h1>;
  }

  return (
    <Fragment>
      <h1>Loading...</h1>
    </Fragment>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const { slug } = params;

      await dbConnect();

      const categories = await Category.find({});
      store.dispatch(setCategories(JSON.parse(JSON.stringify(categories))));

      const category = categories.find((item) => item.slug === slug) || {};
      store.dispatch(setCurrentCategory(JSON.parse(JSON.stringify(category))));

      const product = await Product.findOne({ Slug: slug }).exec();

      const products = await Product.find({
        AllCategoryIds: category.Id,
      });

      // console.log("curCat", currentCategory);
      // console.log("productsfromDb", currentProducts);

      return {
        props: {
          product: JSON.parse(JSON.stringify(product)),
          category: JSON.parse(JSON.stringify(category)),
          products: JSON.parse(JSON.stringify(products)),
          categories: JSON.parse(JSON.stringify(categories)),
        },
        revalidate: 3600,
      };
    }
);

export async function getStaticPaths() {
  await dbConnect();

  const categories = await Category.find({});
  const categoriesPaths = categories.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths: categoriesPaths,
    fallback: true,
  };
}

export default SlugDetailsPage;
