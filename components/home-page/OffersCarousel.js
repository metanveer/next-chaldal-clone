import MultiCarousel from "../common/Carousels/MultiCarousel";
import Section from "../common/Section";

import Loader from "../common/Loader";
import useGetOffers from "../../hooks/useGetOffers";

function OffersCarousel() {
  const { data, error } = useGetOffers();

  return (
    <>
      {!data && <Loader />}
      {error && console.log("Error getting offer products", error)}
      {data && data.data.length > 0 && (
        <Section title="Special Offers">
          <MultiCarousel items={data.data} />
        </Section>
      )}
    </>
  );
}

export default OffersCarousel;
