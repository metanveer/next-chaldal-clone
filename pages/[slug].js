import React, { Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import css from "../styles/slug.module.css";
import InfiniteScroll from "react-infinite-scroller";
import Header from "../components/common/Header";
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
import ProductCard from "../components/common/ProductCard";
import Card from "../components/common/Card";
import { useInfiniteQuery } from "react-query";
import { getProductsByCatId } from "./api/products/category";

function SlugDetailsPage({ category, product, categories, result }) {
  const hasProduct = product && Object.keys(product).length > 0;
  const hasCategories = category && Object.keys(category).length > 0;
  const hasNothing = !hasProduct && !hasCategories;

  const router = useRouter();
  const headerRef = useRef();

  const { slug } = router.query;
  const currentPath = router.asPath;

  useEffect(() => {
    if (hasCategories) {
      headerRef.current.scrollIntoView();
    }
  }, [currentPath, hasCategories]);

  const startPage = 0;

  const fetchProducts = async ({ pageParam = startPage }) => {
    const res = await fetch(
      `/api/products/category?id=${category.Id}&page=${pageParam}&size=30`
    );
    const result = await res.json();
    return result;
  };

  const queryRes = useInfiniteQuery(["products", slug], fetchProducts, {
    enabled: hasCategories,
    initialData: { pages: [result], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  console.log("slug query", queryRes);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    queryRes;

  console.log("product", product);
  console.log("category", category);

  if (hasProduct) {
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

  if (hasCategories) {
    return (
      <>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : (
          <div className={css.wrapper}>
            <div className={css.container}>
              <div className={css.scrallableDiv}>
                <div ref={headerRef}>
                  <Header category={category} allCategories={categories} />
                </div>
                {category.ContainsProducts ? (
                  <InfiniteScroll
                    pageStart={startPage}
                    loadMore={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={
                      <div key={0}>
                        <Loader />
                      </div>
                    }
                    useWindow={false}
                  >
                    {data.pages.map((page, index) => (
                      <Fragment key={index}>
                        {page.totalDocs === 0 ? (
                          <div className={css.childCategories}>
                            No product found under this category
                          </div>
                        ) : (
                          page.docs.map((product, index) => (
                            <div className={css.productCardWrapper} key={index}>
                              <ProductCard
                                id={product._id}
                                itemName={product.NameWithoutSubText}
                                image={product.PictureUrls[0]}
                                images={product.PictureUrls}
                                packSize={product.SubText}
                                regPrice={product.Price.Lo}
                                discPrice={product.DiscountedPrice.Lo}
                                description={product.LongDescription}
                                slug={product.Slug}
                              />
                            </div>
                          ))
                        )}
                      </Fragment>
                    ))}
                  </InfiniteScroll>
                ) : (
                  <div className={css.childCategories}>
                    {categories &&
                      categories
                        .filter((item) => item.ParentCategoryId === category.Id)
                        .map((item) => (
                          <div
                            className={css.categoriesCardWrapper}
                            key={item.Id}
                          >
                            <Card
                              type="category"
                              name={item.Name}
                              image={item.Picture.ImageUrl}
                              slug={item.slug}
                            />
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (hasNothing) {
    return <h1>Noting Found</h1>;
  }

  return (
    <Fragment>
      <h1>Loading...</h1>
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { slug } = params;

      await dbConnect();

      const categories = await Category.find({});
      store.dispatch(setCategories(JSON.parse(JSON.stringify(categories))));

      const category = categories.find((item) => item.slug === slug) || {};
      store.dispatch(setCurrentCategory(JSON.parse(JSON.stringify(category))));

      const product = await Product.findOne({ Slug: slug }).exec();

      const result = await getProductsByCatId(Product, category.Id, 1, 30);

      return {
        props: {
          product: JSON.parse(JSON.stringify(product)),
          category: JSON.parse(JSON.stringify(category)),
          result: result,
          categories: JSON.parse(JSON.stringify(categories)),
        },
      };
    }
);

export default SlugDetailsPage;
