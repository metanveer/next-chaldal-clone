import Section from "../common/Section";
import Card from "../common/Card";
import categories from "../../data/categoriesData";

function ProductCategories() {
  return (
    <Section type="category" title="Our Product Categories">
      {categories.map((category) => (
        <Card key={category.id} name={category.name} image={category.icon} />
      ))}
    </Section>
  );
}

export default ProductCategories;
