import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

function getItemsTotalPrice(itemsArray, desiredProperty) {
  if (desiredProperty === "discPrice") {
    const itemsDiscPriceTotal = itemsArray?.reduce(
      (total, currItem) => total + currItem.qty * currItem.discPrice,
      0
    );
    return itemsDiscPriceTotal;
  }
  if (desiredProperty === "regPrice") {
    const itemsRegPriceTotal = itemsArray?.reduce(
      (total, currItem) => total + currItem.qty * currItem.regPrice,
      0
    );
    return itemsRegPriceTotal;
  }
}

const initialState = {
  items: [],
  totalItemsPriceDisc: 0,
  totalItemsPriceReg: 0,
  deliveryChargeReg: 29,
  promoAmount: 10,
  minAmountForPromo: 400,
  isPromoApply: false,
  promoDeliveryCharge: null,
  msg: "Initial state",
  status: "initial",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      const itemExistsInCart = state.items.find(
        (item) => item._id === itemToAdd.id
      );

      console.log("addItem", itemExistsInCart);
      if (!itemExistsInCart) {
        state.items.push({
          _id: itemToAdd.id,
          qty: 1,
          packSize: itemToAdd.packSize,
          image: itemToAdd.image,
          itemName: itemToAdd.itemName,
          discPrice: itemToAdd.discPrice,
          regPrice: itemToAdd.regPrice,
          hasVisited: itemToAdd.hasVisited,
        });
        state.msg = "Item added";
      } else {
        itemExistsInCart.qty++;
        state.msg = "Quantity increased";
      }
      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");
      state.isPromoApply = state.totalItemsPriceDisc >= state.minAmountForPromo;
      state.promoDeliveryCharge = state.isPromoApply
        ? state.deliveryChargeReg - state.promoAmount
        : null;
    },
    removeItem: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter((item) => item._id !== id);

      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");

      state.isPromoApply = state.totalItemsPriceDisc >= state.minAmountForPromo;
      state.promoDeliveryCharge = state.isPromoApply
        ? state.deliveryChargeReg - state.promoAmount
        : null;

      state.msg = "Item removed";
    },

    decreaseQty: (state, action) => {
      const id = action.payload;

      const itemExisted = state.items.find((item) => item._id === id);

      if (itemExisted && itemExisted.qty !== 0) {
        itemExisted.hasVisited = false;
        itemExisted.qty--;
        state.msg = "Quantity decreased";
      }

      if (itemExisted && itemExisted.qty === 0) {
        state.items = state.items.filter((item) => item._id !== id);
        state.msg = "Item removed";
      }

      state.msg = "Item not in cart";
      state.totalItemsPriceDisc = getItemsTotalPrice(state.items, "discPrice");
      state.totalItemsPriceReg = getItemsTotalPrice(state.items, "regPrice");

      state.isPromoApply = state.totalItemsPriceDisc >= state.minAmountForPromo;
      state.promoDeliveryCharge = state.isPromoApply
        ? state.deliveryChargeReg - state.promoAmount
        : null;
    },

    setItemSeenStatus: (state, action) => {
      const status = action.payload;
      const itemInCart = state.items.find((item) => item._id === status._id);
      if (itemInCart) {
        itemInCart.hasVisited = status.cartStatus;
      }
      state.msg = `Items being watched`;
    },
    setAllItemsSeen: (state) => {
      state.items = state.items.map((item) => ({ ...item, hasVisited: true }));
      state.msg = `All items seen`;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCartItems: (state, action) => {
      const { items, totalItemsPriceDisc, totalItemsPriceReg } = action.payload;
      state.items = items;
      state.totalItemsPriceDisc = totalItemsPriceDisc;
      state.totalItemsPriceReg = totalItemsPriceReg;

      state.isPromoApply = state.totalItemsPriceDisc >= state.minAmountForPromo;
      state.promoDeliveryCharge = state.isPromoApply
        ? state.deliveryChargeReg - state.promoAmount
        : null;
    },
    resetCart: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      };
    },
  },
});

export const addItemToCart = ({
  packSize,
  image,
  itemName,
  discPrice,
  regPrice,
  id,
  hasVisited,
}) => {
  console.log("cartSlice", cartSlice);
  return async (dispatch) => {
    dispatch(
      cartSlice.actions.addItem({
        packSize,
        image,
        itemName,
        discPrice,
        regPrice,
        id,
        hasVisited,
      })
    );
    const url = "/api/cart/increase-qty";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          _id: id,
          packSize,
          image,
          itemName,
          discPrice,
          regPrice,
          hasVisited,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.message) {
        dispatch(cartSlice.actions.setStatus("success"));
      }
    } catch (error) {
      console.log("Error updating qty in server", error);
    }
  };
};
export const decreaseQty = (id) => {
  console.log("decreasQtyAction", id);
  return async (dispatch) => {
    dispatch(cartSlice.actions.decreaseQty(id));
    const url = "/api/cart/decrease-qty";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          _id: id,
          qty: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.message) {
        dispatch(cartSlice.actions.setStatus("success"));
      }
    } catch (error) {
      console.log("Error decreasing qty in server", error);
    }
  };
};
export const removeItem = (id) => {
  return async (dispatch) => {
    dispatch(cartSlice.actions.removeItem(id));
    const url = "/api/cart/decrease-qty";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          _id: id,
          qty: 0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.message) {
        dispatch(cartSlice.actions.setStatus("success"));
      }
    } catch (error) {
      console.log("Error decreasing qty in server", error);
    }
  };
};
export const resetCart = () => {
  return async (dispatch) => {
    dispatch(cartSlice.actions.resetCart());
    const url = "/api/cart/reset-cart";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.message) {
        dispatch(cartSlice.actions.setStatus("success"));
      }
    } catch (error) {
      console.log("Error reseting cart", error);
    }
  };
};

export const { setItemSeenStatus, setAllItemsSeen, setCartItems, setStatus } =
  cartSlice.actions;

export default cartSlice;
