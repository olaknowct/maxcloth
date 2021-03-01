// issue and call all sagas
import { all, call } from "redux-saga/effects";

import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
// we use this instead of adding a lot of .run middleware saga
export default function* rootSaga() {
    // initialize concurently, like takes every
    yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}
