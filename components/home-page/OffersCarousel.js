import MultiCarousel from "../common/Carousels/MultiCarousel";
import Section from "../common/Section";

import useSWR from "swr";

function OffersCarousel() {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR("/api/Product/GetProductsOnOffer", fetcher);

  console.log("data", data);

  const items = [
    { name: "Item 0" },
    { name: "Item 1" },
    { name: "Item 2" },
    { name: "Item 3" },
    { name: "Item 4" },
    { name: "Item 5" },
    { name: "Item 6" },
    { name: "Item 7" },
    { name: "Item 8" },
    { name: "Item 9" },
    { name: "Item 10" },
    { name: "Item 11" },
    { name: "Item 12" },
    { name: "Item 13" },
    { name: "Item 14" },
    { name: "Item 15" },
    { name: "Item 16" },
  ];

  return (
    <Section title="Special Offers">
      <MultiCarousel items={items} />
    </Section>
  );
}

export default OffersCarousel;
