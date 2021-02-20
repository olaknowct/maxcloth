import React from "react";

// import "./custom-button.styles.scss";
// import { CustomButtonContainer } from "./custom-button.styles";

// const CustomButton = ({ children, ...Props }) => {
//     return <CustomButtonContainer {...Props}>{children}</CustomButtonContainer>;
// };

// scss
import "./custom-button.styles.scss";

const CustomButton = ({
    children,
    isGoogleSignin,
    inverted,
    ...otherProps
}) => {
    return (
        <button
            className={`${inverted ? "inverted" : ""} ${
                isGoogleSignin ? "google-sign-in" : ""
            } custom-button`}
            {...otherProps}
        >
            {children}
        </button>
    );
};
export default CustomButton;
