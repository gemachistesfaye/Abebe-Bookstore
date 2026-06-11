import React from 'react';
import { BookOpen } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fdfaf6] flex flex-col items-center justify-center p-4">
          <BookOpen className="w-16 h-16 text-amber-700 mb-6" />
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Something went wrong</h1>
          <p className="text-stone-500 mb-6 text-center max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
