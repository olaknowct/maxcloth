import React from "react";

import Directory from "../../components/directory/directory.component.jsx";

// import "./homepage.styles.scss";

import { HomePageContainer } from "./homepage.styles";

const Homepage = () => {
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    );
};

export default Homepage;
