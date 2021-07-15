import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import dbConnect from "../../db/dbConnect";
import { setCategories } from "../../features/category/categorySlice";
import { setSearchInput } from "../../features/searchProduct/searchProductSlice";
import categoryModel from "../../models/categoryModel";
import productModel from "../../models/productModel";
import { getPagedProducts } from "../api/Product/GetPagedProducts";
import { fetchCategories } from "../api/Category/GetAllCategories";
import Loader from "../../components/common/Loader";
import { wrapper } from "../../store";
import css from "./term.module.css";

function SearchResultsPage({ products: data, more }) {
  const [products, setProducts] = useState(data);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(more);

  const router = useRouter();
  const { term } = router.query;
  const termSet = term && term.split(" ");

  const getDataByTerm = (term) => {
    router.replace({
      pathname: "/search/[term]",
      query: {
        term: term,
      },
    });
  };

  useEffect(() => {
    getDataByTerm(term);
    setProducts(data);
    setHasMore(more);
  }, [term]);

  async function fetchNextProducts() {
    setPage((prevPage) => prevPage + 1);
    const res = await fetch(
      `/api/Product/GetPagedProducts?text=${term}&page=${page}&size=30`
    );
    const result = await res.json();
    setProducts([...products, ...result.docs]);
    setHasMore(result.hasNextPage);
  }

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        {!products && <Loader />}

        {products && products.length === 0 && (
          <div className={css.notFoundMsg}>
            Your search <span className={css.notFound}>{term}</span> did not
            match any product
          </div>
        )}
        <div id="scrollableDiv" className={css.scrallableDiv}>
          {products && products.length !== 0 && (
            <p className={css.foundMsg}>
              Search result for: <span className={css.found}>{term}</span>
            </p>
          )}
          <InfiniteScroll
            dataLength={products.length}
            next={fetchNextProducts}
            hasMore={hasMore}
            loader={<Loader />}
            scrollableTarget="scrollableDiv"
          >
            {products &&
              products.length !== 0 &&
              products.map((product, index) => (
                <div className={css.productCardWrapper} key={index}>
                  <ProductCard
                    id={product._id}
                    itemName={product.NameWithoutSubText}
                    searchWords={termSet}
                    image={product.PictureUrls[0]}
                    images={product.PictureUrls}
                    packSize={product.SubText}
                    regPrice={product.Price.Lo}
                    discPrice={product.DiscountedPrice.Lo}
                    description={product.LongDescription}
                    slug={product.Slug}
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
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

      const result = await getPagedProducts(term, 1, 30, productModel);

      return {
        props: {
          products: result.docs,
          more: result.hasNextPage,
        },
      };
    }
);

export default SearchResultsPage;
