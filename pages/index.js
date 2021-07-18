import Hero from "../components/home-page/Hero";
import OfferBanners from "../components/home-page/OfferBanners";
import OrderCarousel from "../components/home-page/OrderCarousel";
import OffersCarousel from "../components/home-page/OffersCarousel";
import ProductCategories from "../components/home-page/ProductCategories";
import Features from "../components/home-page/Features";
import Review from "../components/home-page/Review";
import Corporate from "../components/home-page/Corporate";
import GetApp from "../components/home-page/GetApp";
import Stats from "../components/home-page/Stats";
import Footer from "../components/common/Footer";
import dbConnect from "../db/dbConnect";
import categoryModel from "../models/categoryModel";
import { wrapper } from "../store";
import productModel from "../models/productModel";
import { setCategories } from "../features/category/categorySlice";
import { fetchOffers } from "./api/products/offers-available";
import { fetchCategories } from "./api/categories";

export default function HomePage({ categories, offers }) {
  return (
    <>
      <Hero />
      <OfferBanners />
      <ProductCategories categories={categories} />
      <OrderCarousel />
      <OffersCarousel products={offers} />
      <Features />
      <Review />
      <Corporate />
      <GetApp />
      <Stats />
      <Footer />
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await dbConnect();

  const categories = await fetchCategories(categoryModel);

  store.dispatch(setCategories(categories));

  const offers = await fetchOffers(productModel);

  return {
    props: {
      categories,
      offers,
    },
    revalidate: 3600,
  };
});
