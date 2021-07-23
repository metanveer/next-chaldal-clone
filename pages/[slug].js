import React, { Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import css from "../styles/slug.module.css";
import InfiniteScroll from "react-infinite-scroller";
import Header from "../components/common/header";
import ProductDetail from "../components/common/product-detail";
import Loader from "../components/common/loader";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import { wrapper } from "../store";
import { setCurrentCategory } from "../features/category/categorySlice";
import ProductCard from "../components/common/product-card";
import Card from "../components/common/card";
import { useInfiniteQuery } from "react-query";
import { getProductsByCatId } from "./api/products/category";
import { useSelector } from "react-redux";
//import dbConnect from "../db/dbConnect";
import { getCategoryBySlug } from "./api/category/[catSlug]";
import { getProductBySlug } from "./api/product/[prodSlug]";

const SlugDetailsPage = ({ category, product, result }) => {
  const { categories } = useSelector((state) => state.category);

  const hasProduct = product && Object.keys(product).length > 0;
  const hasCategory = category && Object.keys(category).length > 0;
  const hasNothing = !hasProduct && !hasCategory;

  const router = useRouter();
  const headerRef = useRef();

  const { slug } = router.query;
  const currentPath = router.asPath;

  useEffect(() => {
    if (hasCategory) {
      headerRef.current.scrollIntoView();
    }
  }, [currentPath, hasCategory]);

  const startPage = 0;

  const fetchProducts = async ({ pageParam = startPage }) => {
    if (category) {
      const res = await fetch(
        `/api/products/category?id=${category.Id}&page=${pageParam}&size=30`
      );
      const result = await res.json();
      return result;
    }
  };

  const queryRes = useInfiniteQuery(["products", slug], fetchProducts, {
    enabled: hasCategory,
    initialData: { pages: [result], pageParams: [] },
    getNextPageParam: (lastPage) => (lastPage ? lastPage.nextPage : 0),
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

  if (hasCategory) {
    return (
      <>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : (
          <div className={css.wrapper}>
            <div className={css.container}>
              <div className={css.scrollContainer}>
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
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { slug } = params;

      const category = await getCategoryBySlug(Category, slug);
      store.dispatch(setCurrentCategory(category));

      const product = await getProductBySlug(Product, slug);

      if (!category) {
        return {
          props: {
            product: product,
          },
        };
      }

      const result = await getProductsByCatId(Product, category.Id, 1, 30);

      return {
        props: {
          product: product,
          category: category,
          result: result,
        },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       const { slug } = params;

//       await dbConnect();

//       const categories = await Category.find({});
//       store.dispatch(setCategories(JSON.parse(JSON.stringify(categories))));

//       const category = categories.find((item) => item.slug === slug) || {};
//       store.dispatch(setCurrentCategory(JSON.parse(JSON.stringify(category))));

//       const product = await Product.findOne({ Slug: slug }).exec();

//       const result = await getProductsByCatId(Product, category.Id, 1, 30);

//       return {
//         props: {
//           product: JSON.parse(JSON.stringify(product)),
//           category: JSON.parse(JSON.stringify(category)),
//           result: result,
//           categories: JSON.parse(JSON.stringify(categories)),
//         },
//       };
//     }
// );

export default SlugDetailsPage;
