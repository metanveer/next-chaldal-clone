import { useRouter } from "next/dist/client/router";
import React, { Fragment, useEffect, useRef } from "react";
import ProductCard from "../../components/common/ProductCard";
import InfiniteScroll from "react-infinite-scroller";
import dbConnect from "../../db/dbConnect";
import { setCategories } from "../../features/category/categorySlice";
import { setSearchInput } from "../../features/searchProduct/searchProductSlice";
import categoryModel from "../../models/categoryModel";
import productModel from "../../models/productModel";
import { getProducts } from "../api/products";
import { fetchCategories } from "../api/categories";
import Loader from "../../components/common/Loader";
import { wrapper } from "../../store";
import css from "../../styles/term.module.css";
import { useInfiniteQuery } from "react-query";

function SearchResultsPage({ result }) {
  const {
    query: { term },
  } = useRouter();
  const searchHeadRef = useRef();

  const startPage = 0;

  const fetchSearched = async ({ pageParam = startPage }) => {
    const res = await fetch(
      `/api/product/search?q=${term}&page=${pageParam}&size=30`
    );
    const result = await res.json();
    return result;
  };

  const queryRes = useInfiniteQuery(["search", term], fetchSearched, {
    initialData: {
      pages: [result],
      pageParams: [],
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  console.log("search query", queryRes);

  useEffect(() => {
    searchHeadRef.current.scrollIntoView();
  }, [term]);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    queryRes;

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : isError ? (
        <div>Error : {error.message}</div>
      ) : (
        <div className={css.wrapper}>
          <div className={css.container}>
            <div className={css.scrallableDiv}>
              <p ref={searchHeadRef} className={css.foundMsg}>
                Search result for: <span className={css.found}>{term}</span>
              </p>
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
                      <div className={css.notFoundMsg}>
                        Your search <span className={css.notFound}>{term}</span>{" "}
                        did not match any product
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { term } = params;
      store.dispatch(setSearchInput({ name: "searchTerm", value: term }));

      await dbConnect();

      const categories = await fetchCategories(categoryModel);
      store.dispatch(setCategories(categories));

      const result = await getProducts(productModel, term, 1, 30);

      return {
        props: {
          result,
        },
      };
    }
);

export default SearchResultsPage;
