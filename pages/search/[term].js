import { useRouter } from "next/dist/client/router";
import React, { Fragment, useEffect, useRef } from "react";
import ProductCard from "../../components/common/product-card";
import InfiniteScroll from "react-infinite-scroller";
import { setSearchInput } from "../../features/searchProduct/searchProductSlice";
import { getPaginatedDocs } from "../api/products";
import Loader from "../../components/common/loader";
import { wrapper } from "../../store";
import css from "../../styles/term.module.css";
import { useInfiniteQuery } from "react-query";
import dbConnect from "../../db/dbConnect";
import { serialize } from "../../utils/serialize";

const SearchResultsPage = ({ result }) => {
  const {
    query: { term },
  } = useRouter();
  const searchHeadRef = useRef();

  const startPage = 1;

  const fetchSearched = async ({ pageParam = startPage }) => {
    const res = await fetch(
      `/api/products/search?q=${term}&page=${pageParam}&size=30`
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
                            stock={product.ExpressQuantitiesByWarehouseId}
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
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { term } = params;
      store.dispatch(setSearchInput({ name: "searchTerm", value: term }));

      const client = await dbConnect();
      const Product = client.db().collection("products");

      const rgxSearchSet = term
        ?.split(" ")
        .map((word) => new RegExp(word, "i"));
      const queryTerms = { NameWithoutSubText: { $in: rgxSearchSet } };

      const result = await getPaginatedDocs(Product, queryTerms, 1, 30);

      client.close();
      return {
        props: {
          result: serialize(result),
        },
      };
    }
);

export default SearchResultsPage;
