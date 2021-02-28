import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { createStructuredSelector } from "reselect";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

// import {
//     auth,
//     createUserProfileDocument,
//     // addCollectionAndDocuments,
// } from "./firebase/firebase.utils";

// import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

// import { selectCollectionForPreview } from "./redux/shop/shop.selectors";
class App extends React.Component {
    // no need since we are using redux as a state manager
    // constructor() {
    //     super();

    //     this.state = {
    //         currentUser: null,
    //     };
    // }
    // unsubscribeFromAuth = null;

    // subscribe
    componentDidMount() {
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
    }

    // unsubscribe
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    // collectionArray: selectCollectionForPreview,
});

// a function that dispatch properties and trigger an action, in this case we trigger the set current user
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setCurrentUser: (user) => dispatch(setCurrentUser(user)),
//     };
// };

export default connect(mapStateToProps)(App);
