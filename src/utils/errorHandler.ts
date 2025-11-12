import * as ErrorBoundary from 'react-native';

class ErrorHandler {
  private errorLog: Array<{ message: string; timestamp: number }> = [];

  initialize(): void {
    ErrorBoundary.LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);

    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      this.logError(String(args[0]));
      originalError.apply(console, args);
    };
  }

  logError(message: string): void {
    this.errorLog.push({
      message,
      timestamp: Date.now(),
    });

    // Keep only last 100 errors
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100);
    }
  }

  getErrors(): Array<{ message: string; timestamp: number }> {
    return [...this.errorLog];
  }

  clearErrors(): void {
    this.errorLog = [];
  }
}

export const errorHandler = new ErrorHandler();
