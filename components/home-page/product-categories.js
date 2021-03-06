import Section from "../common/section";
import Card from "../common/card";

import Loader from "../common/loader";

function ProductCategories({ categories }) {
  return (
    <Section type="category" title="Our Product Categories">
      {categories.length === 0 && <Loader />}
      {categories.length !== 0 &&
        categories
          .slice(91, 103)
          .map((category) => (
            <Card
              key={category._id}
              name={category.Name}
              image={category.Picture.ImageUrl}
            />
          ))}
    </Section>
  );
}

export default ProductCategories;
