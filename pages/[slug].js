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
import { setCategoriesFromDB } from "../features/categorySlice/categoryActions";
import { setCurCategoryAtServer } from "../features/categorySlice/categorySlice";

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
      const categoriesToJson = JSON.stringify(categories);
      await store.dispatch(setCategoriesFromDB(JSON.parse(categoriesToJson)));

      const category = categories.find((item) => item.slug === slug) || {};
      const categoryToJson = JSON.stringify(category);
      store.dispatch(setCurCategoryAtServer(JSON.parse(categoryToJson)));

      const product = await Product.findOne({ Slug: slug }).exec();
      const productToJson = JSON.stringify(product);

      const products = await Product.find({
        AllCategoryIds: category.Id,
      });
      const productsToJson = JSON.stringify(products);

      // console.log("curCat", currentCategory);
      // console.log("productsfromDb", currentProducts);

      return {
        props: {
          product: JSON.parse(productToJson),
          category: JSON.parse(categoryToJson),
          products: JSON.parse(productsToJson),
          categories: JSON.parse(categoriesToJson),
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
