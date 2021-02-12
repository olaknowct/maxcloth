// actual base object that represents all of the state of our application
// actual vcode the combines all other state together
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// actual local storage, you can also use session storage
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

// persist config = json object that represent configuration we want
const persistConfig = {
    key: "root", //at what point isnide of our reducer object do we want to store  evernything
    storage,
    whitelist: ["cart"], // containing string name of any reducer we want to store, persist only what is need, cart
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
