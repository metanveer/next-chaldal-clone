import addItemsId from "../utils/add-items-id";

const babyItems = addItemsId([
  { name: "Newborn Essentials" },
  {
    name: "Diapers & Wipes",
    children: addItemsId([{ name: "Wipes" }, { name: "Diapers" }]),
  },
  { name: "Feeders" },
  {
    name: "Fooding",
    children: addItemsId([
      { name: "Formula" },
      { name: "Baby & Toddler Food" },
      { name: "Milk, Juice & Drinks" },
    ]),
  },
  { name: "Bath & Skincare" },
  { name: "Baby Accessories" },
  { name: "Baby Oral Care" },
]);

const petCareItems = addItemsId([
  { name: "Kitten Food" },
  { name: "Cat Food" },
  { name: "Dog Food" },
  { name: "Other Pet Food" },
  { name: "Pet Accessories" },
]);

const foodItems = addItemsId([
  {
    name: "Fruits & Vegetables",
    children: addItemsId([
      { name: "Fresh Fruit" },
      { name: "Fresh Vegetables" },
    ]),
  },
  {
    name: "Breakfast",
    children: addItemsId([
      { name: "Local Breakfast" },
      { name: "Energy Booster" },
      { name: "Cereals" },
      { name: "Jam & Spreads" },
    ]),
  },
  {
    name: "Beverages",
    children: addItemsId([
      { name: "Tea" },
      { name: "Coffee" },
      { name: "Juice" },
      { name: "Soft Drinks" },
      { name: "Water" },
      { name: "Syrups & Powder Drinks" },
    ]),
  },
  {
    name: "Meat & Fish",
    children: addItemsId([
      { name: "Meat" },
      { name: "Fresh Fish" },
      { name: "Dried Fish" },
      { name: "Tofu & Meat Alternatives" },
    ]),
  },
  {
    name: "Snacks",
    children: addItemsId([
      { name: "Noodles" },
      { name: "Soups" },
      { name: "Pasta & Macaroni" },
      { name: "Candy & Chocolate" },
      { name: "Local Snacks" },
      { name: "Chips & Pretzels" },
      { name: "Popcorn & Nuts" },
      { name: "Biscuits" },
      { name: "Salad Dressing" },
      { name: "Sauces" },
    ]),
  },
  {
    name: "Dairy",
    children: addItemsId([
      { name: "Liquid & UHT Milk" },
      { name: "Butter & Sour Cream" },
      { name: "Cheese" },
      { name: "Eggs" },
      { name: "Powder Milk & Cream" },
      { name: "Yogurt & Sweets" },
    ]),
  },
  {
    name: "Frozen & Canned",
    children: addItemsId([{ name: "Frozen Snacks" }, { name: "Canned Food" }]),
  },
  {
    name: "Bread & Bakery",
    children: addItemsId([
      { name: "Cookies" },
      { name: "Bakery Snacks" },
      { name: "Breads" },
      { name: "Dips & Spreads" },
      { name: "Honey" },
      { name: "Cakes" },
    ]),
  },
  {
    name: "Baking Needs",
    children: addItemsId([
      { name: "Nuts & Dried Fruits" },
      { name: "Baking Tools" },
      { name: "Baking & Dessert Mixes" },
      { name: "Baking Ingredients" },
      { name: "Flour" },
    ]),
  },
  {
    name: "Cooking",
    children: addItemsId([
      { name: "Rice" },
      { name: "Premium Ingredients" },
      { name: "Colors & Flavours" },
      { name: "Pickles" },
      { name: "Spices" },
      { name: "Oil" },
      { name: "Ghee" },
      { name: "Ready Mix" },
      { name: "Salt & Sugar" },
      { name: "Dal or Lentil" },
      { name: "Special Ingredients" },
      { name: "Shemai & Suji" },
    ]),
  },
  { name: "Diabetic Food" },
]);

const homeCleaningItems = addItemsId([
  { name: "Air Fresheners" },
  { name: "Dish Detergents" },
  { name: "Cleaning Supplies" },
  { name: "Kitchen Accessories" },
  { name: "Laundry" },
  { name: "Napkins & Paper Products" },
  { name: "Pest Control" },
  { name: "Shoe Care" },
  { name: "Tableware  & Trash Bags" },
  { name: "Food Storage" },
  { name: "Cleaning Accessories" },
]);

const officeItems = addItemsId([
  { name: "Batteries" },
  {
    name: "Writing & Drawing",
    children: addItemsId([
      { name: "Colours" },
      { name: "Pens" },
      { name: "Pencils" },
      { name: "Highlighters & Markers" },
      { name: "Erasers & Correction Fluids" },
      { name: "Notebooks" },
    ]),
  },
  {
    name: "Organizing",
    children: addItemsId([
      { name: "Glue & Tapes" },
      { name: "Hardware" },
      { name: "Files & Folders" },
      { name: "Cutting" },
      { name: "Envelopes & Stickers" },
    ]),
  },
  {
    name: "Printing",
    children: addItemsId([{ name: "Paper" }, { name: "Toner & Ink" }]),
  },
]);

const beautyHealthItems = addItemsId([
  {
    name: "Health Care",
    children: addItemsId([
      { name: "Food Supplements" },
      { name: "Herbal & Digestive Aids" },
      { name: "First Aid" },
      { name: "Family Planning" },
      { name: "Antiseptics" },
      { name: "Adult Diapers" },
      { name: "Keto Food" },
    ]),
  },
  {
    name: "Personal Care",
    children: addItemsId([
      { name: "Clothing Essentials" },
      {
        name: "Female Care",
        children: addItemsId([
          { name: "Facial Care" },
          { name: "Female Bath" },
          { name: "Female Moisturizer" },
          { name: "Female Deo" },
          { name: "Female Shampoo" },
          { name: "Hair Care" },
          { name: "Feminine Care" },
        ]),
      },
      {
        name: "Male Care",
        children: addItemsId([
          { name: "Bath" },
          { name: "Cream & Lotion" },
          { name: "Beard Grooming" },
          { name: "Men's Facewash" },
          { name: "Men's Hair Care" },
          { name: "Deodorants" },
          { name: "Shaving Needs" },
          { name: "Shampoo" },
        ]),
      },
      { name: "Hair Color" },
      { name: "Oral Care" },
      { name: "Skin Care" },
      { name: "Handwash" },
      { name: "Tissue & Wipes" },
      { name: "Talcom Powder" },
    ]),
  },
]);

const homeAppliancesItems = addItemsId([
  { name: "Lights & Electrical" },
  { name: "Tools & Hardware" },
  { name: "Kitchen Appliances" },
]);

const categories = addItemsId([
  {
    name: "Popular",
    type: "category",
    icon: "/categories/icons/popular.svg",
  },
  {
    name: "Hygiene",
    type: "category",
    icon: "/categories/icons/hygiene.svg",
  },
  {
    name: "Flash Sales",
    type: "category",
    icon: "/categories/icons/flash.svg",
  },
  {
    name: "Baby Care",
    type: "group",
    children: babyItems,
    icon: "/categories/icons/baby.svg",
  },
  {
    name: "Pet Care",
    type: "group",
    children: petCareItems,
    icon: "/categories/icons/petCare.svg",
  },
  {
    name: "Food",
    type: "group",
    children: foodItems,
    icon: "/categories/icons/food.svg",
  },
  {
    name: "Home & Cleaning",
    type: "group",
    children: homeCleaningItems,
    icon: "/categories/icons/homeCleaning.svg",
  },
  {
    name: "Office Products",
    type: "group",
    children: officeItems,
    icon: "/categories/icons/office.svg",
  },
  {
    name: "Beauty & Health",
    type: "group",
    children: beautyHealthItems,
    icon: "/categories/icons/beautyHealth.svg",
  },
  {
    name: "Home Appliances",
    type: "group",
    children: homeAppliancesItems,
    icon: "/categories/icons/homeAppliances.svg",
  },
  {
    name: "Vehicle Essentials",
    type: "category",
    icon: "/categories/icons/vehicleEssentials.svg",
  },
  {
    name: "Pest Control",
    type: "category",
    icon: "/categories/icons/fly.svg",
  },
]);

export default categories;
