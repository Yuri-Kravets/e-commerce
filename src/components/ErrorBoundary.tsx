import {Component} from "react";


class ErrorBoundary extends Component {

    state = {hasError: false, errorMessege: ''};

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
        console.error('Error caught in Error Boundary: ', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div className="text-center text-red-500">Something went wrong. Please try again later.</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;