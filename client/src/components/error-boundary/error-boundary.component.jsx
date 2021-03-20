import React from "react";
import {
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText,
} from "./error-boundary.styles";
class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasErrored: false,
        };
    }
    // life cycle  unique to error boundary
    // cathes the error any thrown in the cihildren
    static getDerivedStateFromError(error) {
        // process error
        return { hasErrored: true };
    }

    componentDidCatch(error, info) {
        // log it, send it ,
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
                    <ErrorImageText>This Page is lost in space</ErrorImageText>
                </ErrorImageOverlay>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
