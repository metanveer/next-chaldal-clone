import MultiCarousel from "../common/Carousels/MultiCarousel";
import Section from "../common/Section";

function OffersCarousel({ products }) {
  return (
    <Section title="Special Offers">
      <MultiCarousel items={products} />
    </Section>
  );
}

export default OffersCarousel;
