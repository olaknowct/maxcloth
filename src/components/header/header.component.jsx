import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";

import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import {
    selectCartHidden,
    // selectCartItems,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

import { signOutStart } from "../../redux/user/user.actions";

import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionDiv,
    OptionLink,
} from "./header.styles";
const Header = ({ currentUser, hidden, history, signOutStart }) => {
    const {
        location: { pathname },
    } = history;
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink pathname={pathname} to="/">
                    CATEGORY
                </OptionLink>
                <OptionLink pathname={pathname} to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink pathname={pathname} to="/contact">
                    CONTACT
                </OptionLink>
                {currentUser ? (
                    <OptionLink
                        as="div"
                        pathname={pathname}
                        onClick={signOutStart}
                    >
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink pathname={pathname} to="/signin">
                        SIGN IN
                    </OptionLink>
                )}
                <CartIcon />
            </OptionsContainer>
            {hidden ? null : <CartDropDown />}
        </HeaderContainer>
    );
};

/* <Link
className={`option ${pathname === "/shop" ? "active" : ""}`}
to="/shop"
> */
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

const mapDispatchToProps = (dispatch) => {
    return {
        signOutStart: () => dispatch(signOutStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
