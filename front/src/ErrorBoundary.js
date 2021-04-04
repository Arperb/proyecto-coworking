import React from 'react';

class Pure extends React.PureComponent {
    render() {
        console.log('render PureComponent');
        return <p>{this.props.nice}</p>;
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            // Puedes renderizar cualquier interfaz de repuesto
            return <h1>Oops! Esto no funciona...</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary
