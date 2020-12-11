import React from 'react';

export default class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log("error>>" + error);
        console.log("errorInfo>>" + errorInfo);
    }

    render() {

        if (this.state.hasError) {
            return (<div><h5>SomeThing went Wrong!</h5></div>);
        }
        else {
            return this.props.children
        };

    }
}