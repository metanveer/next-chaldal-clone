import { useRouter } from "next/dist/client/router";
import React from "react";
import ProductCard from "../../components/common/ProductCard";
import dbConnect from "../../db/dbConnect";
import { setCategories } from "../../features/category/categorySlice";
import { setSearchInput } from "../../features/searchProduct/searchProductSlice";
import categoryModel from "../../models/categoryModel";
import productModel from "../../models/productModel";
import { wrapper } from "../../store";
import css from "./term.module.css";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { term } = params;

      console.log("term", term);

      store.dispatch(setSearchInput({ name: "searchTerm", value: term }));

      await dbConnect();

      const categories = await categoryModel.find({});
      const categoriesToJson = JSON.stringify(categories);
      store.dispatch(setCategories(JSON.parse(categoriesToJson)));

      if (term === "") {
        return {
          props: { products: [] },
        };
      }

      const rgxSearchSet = term.split(" ").map((word) => new RegExp(word, "i"));

      console.log("rgxSet", rgxSearchSet);

      const products = await productModel.find({
        NameWithoutSubText: rgxSearchSet,
      });
      const productsToJson = JSON.stringify(products);

      return {
        props: { products: JSON.parse(productsToJson) },
      };
    }
);

function SearchResultsPage({ products }) {
  const router = useRouter();
  const { term } = router.query;

  const termSet = term.split(" ");

  console.log("found", products);

  return (
    <div className={css.container}>
      {products.length !== 0 && (
        <p className={css.foundMsg}>
          Search result for: <span className={css.found}>{term}</span>
        </p>
      )}

      {products.length === 0 && (
        <div className={css.notFoundMsg}>
          Your search <span className={css.notFound}>{term}</span> did not match
          any product
        </div>
      )}
      {products.length !== 0 &&
        products.map((product) => (
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
