import { from, Observable, of, throwError } from "rxjs";
import { retry, catchError, delay } from "rxjs/operators";

export interface RetryConfig {
  maxRetries?: number;
  delayMs?: number;
  shouldRetry?: (error: any) => boolean;
}

export function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = {}
): Observable<T> {
  const {
    maxRetries = 3,
    delayMs = 1000,
    shouldRetry = (error) => error?.isAcquireTimeout === true,
  } = config;

  return from(operation()).pipe(
    retry({
      count: maxRetries,
      delay: (error) => {
        if (shouldRetry(error)) {
          console.log(`Retrying operation after ${delayMs}ms...`);
          return of(error).pipe(delay(delayMs));
        }
        return throwError(() => error);
      },
    }),
    catchError((error) => {
      console.error("Operation failed after retries:", error);
      return throwError(() => error);
    })
  );
}
