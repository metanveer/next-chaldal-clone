import React, { Fragment } from "react";
import { useRouter } from "next/router";

import categoriesWithSlug from "../data/categoriesWithSlug";
import productsData from "../data/__data__Popular_products.json";

import Header from "../components/common/Header";
import Children from "../components/slug-page/Children";
import ProductDetail from "../components/common/ProductDetail";

function SlugDetailsPage({ category, products, product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log("product", product);
  console.log("category", category);
  console.log("products", products);

  const productDetailAvailable = product && Object.keys(product).length > 0;
  const subCategoryiesAvailable = category && Object.keys(category).length > 0;
  const nothingAvailable = !productDetailAvailable && !subCategoryiesAvailable;

  if (productDetailAvailable) {
    return (
      <>
        <Header type="product-detail-page" />
        <ProductDetail product={product} />
      </>
    );
  }

  if (subCategoryiesAvailable) {
    return (
      <>
        <Header category={category} allCategories={categoriesWithSlug} />
        {category.ContainsProducts ? (
          <Children type="products" products={products} />
        ) : (
          <Children
            type="categories"
            categories={categoriesWithSlug}
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

  const currentProduct = productsData.find((item) => item.Slug === slug) || {};
  const currentCategory =
    categoriesWithSlug.find((item) => item.slug === slug) || {};
  const currentProducts = currentCategory.ContainsProducts
    ? productsData.filter((item) =>
        item.AllCategoryIds.includes(currentCategory.Id)
      )
    : [];

  return {
    props: {
      product: currentProduct,
      category: currentCategory,
      products: currentProducts,
    },
    revalidate: 1000,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default SlugDetailsPage;
