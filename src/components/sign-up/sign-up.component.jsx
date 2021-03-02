import React, { useState } from "react";

import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { signUpStart } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("password dont matched!!");
            return;
        }

        signUpStart({ displayName, email, password });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="sign-up">
            <h2 className="title">I dont not have a account</h2>
            <span>Signup with your email and password</span>
            <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit"> Signup </CustomButton>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUpStart: (userCredentials) =>
            dispatch(signUpStart(userCredentials)),
    };
};
export default connect(null, mapDispatchToProps)(SignUp);
