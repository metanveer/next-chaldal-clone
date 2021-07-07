import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Header from "../components/common/Header";
import Children from "../components/slug-page/Children";
import ProductDetail from "../components/common/ProductDetail";
import Loader from "../components/common/Loader";

import dbConnect from "../db/dbConnect";
import Product from "../models/productModel";
import Category from "../models/categoryModel";

function SlugDetailsPage({
  category: categoryFromDb,
  products: productsFromDb,
  product: productFromDb,
  categories: categoriesFromDb,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const product = JSON.parse(productFromDb);
  const products = JSON.parse(productsFromDb);
  const category = JSON.parse(categoryFromDb);
  const categories = JSON.parse(categoriesFromDb);

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

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  await dbConnect();

  const categories = await Category.find({});
  const categoriesToJson = JSON.stringify(categories);

  const category = categories.find((item) => item.slug === slug) || {};
  const categoryToJson = JSON.stringify(category);

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
      product: productToJson,
      category: categoryToJson,
      products: productsToJson,
      categories: categoriesToJson,
    },
    revalidate: 1000,
  };
}

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
