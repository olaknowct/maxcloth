import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// const PathNames = ["/shop", "/category", "/contact", "/signin", "/"];
const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        border-top: gold solid 2px;
    }

    &:focus {
        padding-top: 0;
        padding-bottom: 0;
    }
`;

const ActiveSelect = css`
    background-color: gold;
    border-radius: 5%;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    font-size: 19px;
`;
// ${pathname === "/shop" ? "active" : ""}
export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        border-top: gold solid 2px;
    }

    &:focus {
        padding-top: 0;
        padding-bottom: 0;
    }
    ${({ pathname, to }) => (pathname === to ? `${ActiveSelect}` : "")}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
    ${({ pathname, to }) => (pathname === to ? `${ActiveSelect}` : "")}
`;
