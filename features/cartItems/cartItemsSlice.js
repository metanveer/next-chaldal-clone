import { createSlice } from "@reduxjs/toolkit";

function getItemsTotalPrice(itemsArray, desiredProperty) {
  if (desiredProperty === "discPrice") {
    const itemsDiscPriceTotal = itemsArray.reduce(
      (total, currItem) => total + currItem.qty * currItem.discPrice,
      0
    );
    return itemsDiscPriceTotal;
  }
  if (desiredProperty === "regPrice") {
    const itemsRegPriceTotal = itemsArray.reduce(
      (total, currItem) => total + currItem.qty * currItem.regPrice,
      0
    );
    return itemsRegPriceTotal;
  }
}

// function saveItemsToLs(state) {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("cart", JSON.stringify(state));
//   }
// }

// const cartState =
//   typeof window !== "undefined" && localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : {};

const initialState = {
  items: [],
  totalItemsPriceDisc: 0,
  totalItemsPriceReg: 0,
  msg: "",
};

const cartItemsSlice = createSlice({
  name: "cart-items",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const itemToAdd = action.payload;
      const itemExistsInCart = state.items.find(
        (item) => item.id === itemToAdd.id
      );
      if (!itemExistsInCart) {
        state.items.push({
          id: itemToAdd.id,
          qty: 1,
          packSize: itemToAdd.packSize,
          image: itemToAdd.image,
          itemName: itemToAdd.itemName,
          discPrice: itemToAdd.discPrice,
          regPrice: itemToAdd.regPrice,
        });
      } else {
        itemExistsInCart.qty++;
      }
      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");

      state.msg = "item-added";
    },
    removeItem(state, action) {
      const id = action.payload;

      state.items = state.items.filter((item) => item.id !== id);

      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");

      state.msg = "item-removed";
    },
    increaseQty(state, action) {
      const id = action.payload;
      const itemExisted = state.items.find((item) => item.id === id);
      if (itemExisted) {
        itemExisted.qty++;
        state.msg = "qty-increased";
      } else {
        state.msg = "item-not-in-cart";
      }
      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");
    },
    decreaseQty(state, action) {
      const id = action.payload;
      const itemExisted = state.items.find((item) => item.id === id);
      if (itemExisted && itemExisted.qty > 1) {
        itemExisted.qty--;
        state.msg = "qty-decreased";
      } else {
        state.items = state.items.filter((item) => item.id !== id);
        state.msg = "item-removed";
      }
      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");
    },
  },
});

export const { addItemToCart, removeItem, decreaseQty, increaseQty } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
