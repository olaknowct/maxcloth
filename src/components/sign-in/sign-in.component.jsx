import React, { useState } from "react";

import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import {
    googleSignInStart,
    emailSignInStart,
} from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const { email, password } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();

        emailSignInStart(email, password);
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({ email: "", password: "" });
        // } catch (err) {
        //     console.log(err);
        // }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="sign-in">
            <h2>I have already account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    value={email}
                    handleChange={handleChange}
                    required
                    label="email"
                    type="email"
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit"> Sign in </CustomButton>
                    <CustomButton
                        type="button"
                        onClick={googleSignInStart}
                        isGoogleSignin
                    >
                        Sign in
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        googleSignInStart: () => dispatch(googleSignInStart()),
        emailSignInStart: (email, password) =>
            dispatch(emailSignInStart({ email, password })),
    };
};
export default connect(null, mapDispatchToProps)(SignIn);
