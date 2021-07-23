import Hero from "../components/home-page/Hero";
import OrderCarousel from "../components/home-page/order-carousel";
import OfferBanner from "../components/home-page/offer-banner";
import ProductCategories from "../components/home-page/product-categories";
import Features from "../components/home-page/features";
import Review from "../components/home-page/review";
import Corporate from "../components/home-page/corporate";
import GetApp from "../components/home-page/get-app";
import Stats from "../components/home-page/stats";
import Footer from "../components/common/main-footer";
import OfferCarousel from "../components/home-page/offer-carousel";
import { useSelector } from "react-redux";
// import { wrapper } from "../store";
// import dbConnect from "../db/dbConnect";
// import productModel from "../models/productModel";
// import categoryModel from "../models/categoryModel";
// import { fetchCategories } from "./api/categories";
// import { setCategories } from "../features/category/categorySlice";
// import { fetchOffers } from "./api/products/offers-available";

const HomePage = () => {
  const { categories } = useSelector((state) => state.category);

  return (
    <div>
      <Hero />
      <OfferBanner />
      <ProductCategories categories={categories} />
      <OrderCarousel />
      <OfferCarousel />
      <Features />
      <Review />
      <Corporate />
      <GetApp />
      <Stats />
      <Footer />
    </div>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     await dbConnect();

//     const categories = await fetchCategories(categoryModel);

//     store.dispatch(setCategories(categories));

//     const offers = await fetchOffers(productModel);

//     return {
//       props: {
//         products: offers,
//         categories: categories,
//       },
//     };
//   }
// );

export default HomePage;
