import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ email: "", password: "" });
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="sign-in">
                <h2>I have already account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        value={this.state.email}
                        handleChange={this.state.handleChange}
                        required
                        label="email"
                        type="email"
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.email}
                        handleChange={this.state.handleChange}
                        label="password"
                        required
                    />
                    <CustomButton type="submit"> Sign in </CustomButton>
                    <CustomButton onClick={signInWithGoogle}>
                        Sign in
                    </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;
