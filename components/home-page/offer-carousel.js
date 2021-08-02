import MultiCarousel from "../common/carousels/multi-carousel";
import Section from "../common/section";
import useGetOffers from "../../hooks/useGetOffers";
import Loader from "../common/loader";

function OfferCarousel() {
  const { data, error } = useGetOffers();

  return (
    <Section title="Special Offers">
      {error ? (
        <div>
          {console.log(error)}
          {"Something unexpected happened while loading offers!"}
        </div>
      ) : !data ? (
        <Loader />
      ) : (
        <MultiCarousel items={data} />
      )}
    </Section>
  );
}

export default OfferCarousel;
