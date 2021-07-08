import Section from "../common/Section";
import Card from "../common/Card";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

function ProductCategories() {
  const { categories } = useSelector((state) => state.categorySlice.server);

  // const length = categories.length;
  // const visible = 12;

  // console.log(length);

  // const sliceFrom = +(Math.random() * (length - visible)).toFixed();
  // const sliceTo = sliceFrom + visible;

  // console.log(`${sliceFrom} to ${sliceTo}`);

  return (
    <Section type="category" title="Our Product Categories">
      {!categories && <Loader />}
      {categories &&
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
