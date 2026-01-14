/**
 * ErrorBoundary Component
 *
 * Production-ready error boundary that catches React errors gracefully.
 * Displays user-friendly error UI suitable for medical office staff.
 * Logs errors to console in development mode.
 *
 * Features:
 * - Catches errors in child component tree
 * - User-friendly error message for production
 * - Detailed error information in development
 * - Reset button to recover from errors
 * - TypeScript with strict typing
 *
 * @component
 */

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

/**
 * Props for ErrorBoundary component
 */
interface Props {
  /**
   * Child components to render
   */
  children: ReactNode;
}

/**
 * State for ErrorBoundary component
 */
interface State {
  /**
   * Whether an error has been caught
   */
  hasError: boolean;

  /**
   * The caught error object (null if no error)
   */
  error: Error | null;

  /**
   * Additional error information (stack trace, component stack)
   */
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary class component
 *
 * Note: Error Boundaries must be class components as there is no
 * hook equivalent for componentDidCatch yet in React 19.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error is caught
   * This method is called during the render phase
   */
  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error information after an error is caught
   * This method is called during the commit phase
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
    }

    // Update state with error information
    this.setState({
      errorInfo,
    });

    // TODO: In production, log to error reporting service (e.g., Sentry)
    // Example: logErrorToService(error, errorInfo);
  }

  /**
   * Reset error boundary state and attempt to recover
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Reload the page as a fallback recovery option
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center min-h-screen bg-[var(--color-background)] p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg border border-[var(--color-border)] p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                Something went wrong
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-2">
                We encountered an unexpected error while loading the calendar.
                This has been logged and will be reviewed by our team.
              </p>
              <p className="text-[var(--color-text-secondary)]">
                Please try resetting the calendar or reloading the page.
                If the problem persists, contact technical support.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                aria-label="Reset calendar"
              >
                Reset Calendar
              </button>
              <button
                onClick={this.handleReload}
                className="px-6 py-2.5 bg-white text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md hover:bg-gray-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                aria-label="Reload page"
              >
                Reload Page
              </button>
            </div>

            {/* Development-only error details */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <summary className="cursor-pointer font-medium text-[var(--color-text-primary)] mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm text-red-600 mb-1">
                      Error Message:
                    </h3>
                    <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto text-red-600">
                      {this.state.error.message}
                    </pre>
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <h3 className="font-semibold text-sm text-red-600 mb-1">
                        Stack Trace:
                      </h3>
                      <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto text-gray-600 max-h-48 overflow-y-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <h3 className="font-semibold text-sm text-red-600 mb-1">
                        Component Stack:
                      </h3>
                      <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto text-gray-600 max-h-48 overflow-y-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
