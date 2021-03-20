import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "./App.css";
import { GlobalStyle } from "./global.styles";
import { createStructuredSelector } from "reselect";

// import Homepage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

// import {
//     auth,
//     createUserProfileDocument,
//     // addCollectionAndDocuments,
// } from "./firebase/firebase.utils";

// import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

const Homepage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
    import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

// import { selectCollectionForPreview } from "./redux/shop/shop.selectors";
// class App extends React.Component {
const App = ({ checkUserSession, currentUser }) => {
    // no need since we are using redux as a state manager
    // constructor() {
    //     super();

    //     this.state = {
    //         currentUser: null,
    //     };
    // }
    // unsubscribeFromAuth = null;

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    // subscribe
    // componentDidMount() {
    // const { checkUserSession } = this.props;
    // checkUserSession();
    // const { setCurrentUser, collectionArray } = this.props;
    // const { setCurrentUser } = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //     if (userAuth) {
    //         const userRef = await createUserProfileDocument(userAuth);
    //         userRef.onSnapshot((snapShot) => {
    //             setCurrentUser({
    //                 id: snapShot.id,
    //                 ...snapShot.data(),
    //             });
    //         });
    //     } else {
    // setCurrentUser(userAuth);
    // addCollectionAndDocuments(
    //     "collections",
    //     collectionArray.map(({ title, items }) => ({
    //         title,
    //         items,
    //     }))
    // );
    //     }
    // });
    // }

    // unsubscribe
    // componentWillUnmount() {
    //     this.unsubscribeFromAuth();
    // }

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Switch>
                <Suspense fallback={<Spinner />}>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Suspense>
            </Switch>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    // collectionArray: selectCollectionForPreview,
});

// a function that dispatch properties and trigger an action, in this case we trigger the set current user
const mapDispatchToProps = (dispatch) => {
    return {
        checkUserSession: () => dispatch(checkUserSession()),
        //         setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
