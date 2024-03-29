import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => {
    return {
        type: CartActionTypes.TOGGLE_CART_HIDDEN,
    };
};

export const addItem = (item) => {
    // action
    return {
        type: CartActionTypes.ADD_ITEM,
        payload: item,
    };
};

export const removeItem = (item) => {
    return {
        type: CartActionTypes.REMOVE_ITEM,
        payload: item,
    };
};

export const clearItemFromCart = (item) => {
    return {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: item,
    };
};

export const clearCart = () => {
    return {
        type: CartActionTypes.CLEAR_CART,
    };
};
