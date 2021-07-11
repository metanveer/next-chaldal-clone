import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import Loader from "../../components/common/Loader";
import ProductCard from "../../components/common/ProductCard";
import css from "./term.module.css";

const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getServerSideProps({ params }) {
  const { term } = params;

  const data = await fetcher(
    `http://localhost:3000/api/Product/Search/${term}`
  );

  return {
    props: { data },
  };
}

function SearchResultsPage(props) {
  const router = useRouter();
  const { term } = router.query;

  const { data } = useSWR(`/api/Product/Search/${term}`, fetcher, {
    initialData: props.data,
  });

  const termSet = term.split(" ");

  return (
    <div className={css.container}>
      {data && data.data.length !== 0 && (
        <p className={css.foundMsg}>
          Search result for: <span className={css.found}>{term}</span>
        </p>
      )}
      {!data && <Loader />}
      {data && data.data.length === 0 && (
        <div className={css.notFoundMsg}>
          Your search <span className={css.notFound}>{term}</span> did not match
          any product
        </div>
      )}
      {data &&
        data.data.length !== 0 &&
        data.data.map((product) => (
          <div className={css.productCardWrapper} key={product._id}>
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
    </div>
  );
}

export default SearchResultsPage;
