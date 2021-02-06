// actual base object that represents all of the state of our application
// actual vcode the combines all other state together
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
});
