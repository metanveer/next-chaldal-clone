import urlSlug from "url-slug";

export default function nameToUrl(itemName) {
  return urlSlug(itemName);
}
