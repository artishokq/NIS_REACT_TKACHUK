import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.css";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  fallbackRetry?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2 className="error-boundary__title">
              {this.props.fallbackTitle || "Something went wrong"}
            </h2>
            <p className="error-boundary__message">
              {this.props.fallbackMessage ||
                "An unexpected error occurred. Please try refreshing the page."}
            </p>
            {this.state.error && (
              <pre className="error-boundary__details">
                {this.state.error.message}
              </pre>
            )}
            <button
              className="error-boundary__retry"
              onClick={this.handleRetry}
            >
              {this.props.fallbackRetry || "Try again"}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
