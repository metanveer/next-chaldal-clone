import MultiCarousel from "../common/carousels/multi-carousel";
import Section from "../common/section";
import useGetOffers from "../../hooks/useGetOffers";
import Loader from "../common/loader";

function OfferCarousel() {
  const { data, error } = useGetOffers();

  console.log("error loading offer carousel", error);

  return (
    <Section title="Special Offers">
      {error ? (
        <div>{error}</div>
      ) : !data ? (
        <Loader />
      ) : (
        <MultiCarousel items={data} />
      )}
    </Section>
  );
}

export default OfferCarousel;
