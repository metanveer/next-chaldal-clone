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
import { setCategoriesFromDB } from "../features/categorySlice/categoryActions";
import productModel from "../models/productModel";

export default function HomePage({ categories, productsOnOffer }) {
  return (
    <>
      <Hero />
      <OfferBanners />
      <ProductCategories categories={categories} />
      <OrderCarousel />
      <OffersCarousel products={productsOnOffer} />
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

  const categories = await categoryModel.find({});
  const categoriesToJson = JSON.stringify(categories);
  await store.dispatch(setCategoriesFromDB(JSON.parse(categoriesToJson)));

  const productsOnOffer = await productModel.find({
    OfferPictureUrls: { $exists: true, $not: { $size: 0 } },
  });
  const productsToJson = JSON.stringify(productsOnOffer);

  return {
    props: {
      categories: JSON.parse(categoriesToJson),
      productsOnOffer: JSON.parse(productsToJson),
    },
    revalidate: 3600,
  };
});
