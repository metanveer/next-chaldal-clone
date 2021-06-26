import { nanoid } from "nanoid";

export default function addItemsId(items) {
  return items.map((item) => ({ ...item, id: nanoid(15) }));
}
