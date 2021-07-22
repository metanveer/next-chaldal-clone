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
import { useSelector } from "react-redux";
import useGetOffers from "../hooks/useGetOffers";
import Loader from "../components/common/Loader";

const HomePage = () => {
  const { categories } = useSelector((state) => state.category);

  const { data } = useGetOffers();

  return (
    <>
      <Hero />
      <OfferBanners />
      <ProductCategories categories={categories} />
      <OrderCarousel />
      {data ? <OffersCarousel products={data} /> : <Loader />}
      <Features />
      <Review />
      <Corporate />
      <GetApp />
      <Stats />
      <Footer />
    </>
  );
};

export default HomePage;
