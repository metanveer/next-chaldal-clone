const logo = "/logo-small.webp";

const oneHour = "/footer/1-hour.webp";
const cashOnDelivery = "/footer/cash-on-delivery.webp";

const amex = "/footer/Amex.webp";
const masterCard = "/footer/mastercard.webp";
const visa = "/footer/VIsa.webp";
const bkash = "/footer/bkash.webp";
const cash = "/footer/COD.webp";

const phoneIcon = "/footer/phone_icon.webp";

const facebook = "/footer/facebook.png";
const youtube = "/footer/youtube.png";
const twitter = "/footer/twitter.png";
const instagram = "/footer/instagram.png";
const whatsapp = "/footer/whatsapp.png";

function addNameImageField(array, context) {
  return array.map((item, index) => ({
    ...item,
    name: `${context} Option #${index + 1} ${item.toString()}`,
  }));
}

const deliMethods = {
  oneHour,
  cashOnDelivery,
};

const payments = [
  { image: amex },
  { image: masterCard },
  { image: visa },
  { image: bkash },
  { image: cash },
];
const socials = [
  { image: facebook, link: "http://facebook.com" },
  { image: youtube, link: "http://youtube.com" },
  { image: twitter, link: "http://twitter.com" },
  { image: instagram, link: "http://instagram.com" },
];

const paymentMethods = addNameImageField(payments, "Payment Method");
const socialMethods = addNameImageField(socials, "Social Share");

export { logo, phoneIcon, deliMethods, paymentMethods, socialMethods };
