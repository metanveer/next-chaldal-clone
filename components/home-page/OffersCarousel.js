import MultiCarousel from "../common/Carousels/MultiCarousel";
import Section from "../common/Section";

import useSWR from "swr";

function OffersCarousel() {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR("/api/Product/GetProductsOnOffer", fetcher);

  console.log("data", data);

  return (
    <Section title="Special Offers">
      {error && <div>Error: {error}</div>}
      {data ? <MultiCarousel items={data.data} /> : <div>Loading...</div>}
    </Section>
  );
}

export default OffersCarousel;
