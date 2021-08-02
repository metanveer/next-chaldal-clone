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

export default HomePage;
