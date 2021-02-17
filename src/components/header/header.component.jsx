import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";

import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import {
    selectCartHidden,
    selectCartItems,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

const Header = ({ currentUser, hidden, history }) => {
    const {
        location: { pathname },
    } = history;
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link
                    className={`option ${pathname == "/" ? "active" : ""}`}
                    to="/"
                >
                    CATEGORY
                </Link>
                <Link
                    className={`option ${pathname == "/shop" ? "active" : ""}`}
                    to="/shop"
                >
                    SHOP
                </Link>
                <Link
                    className={`option ${
                        pathname == "/contact" ? "active" : ""
                    }`}
                    to="/contact"
                >
                    CONTACT
                </Link>
                {currentUser ? (
                    <div
                        className={`option ${pathname == "/" ? "active" : ""}`}
                        onClick={() => auth.signOut()}
                    >
                        SIGN OUT
                    </div>
                ) : (
                    <Link
                        className={`option ${
                            pathname == "/signin" ? "active" : ""
                        }`}
                        to="/signin"
                    >
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {hidden ? null : <CartDropDown />}
        </div>
    );
};

// state are root reducer
// const mapStateToProps = (state) => {
// const mapStateToProps = (state) => {
//     return {
//         currentUser: selectCurrentUser(state),
//         hidden: selectCartHidden(state),
//     };
// };

// top level fn will passed state into this slectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

export default withRouter(connect(mapStateToProps)(Header));
