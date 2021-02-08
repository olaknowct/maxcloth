import { createSelector } from "reselect";

// input selector
const selectCart = (state) => state.cart;

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

// output selector
// 1st argument : collection of input selector, function that gets the output of the input
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    // .map((cartItem) => cartItem.quantity)
    [selectCartItems],
    (cartItems) => cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
);
