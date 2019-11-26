import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: import('@angular/common/http').HttpRequest<any>,
            next: import('@angular/common/http').HttpHandler):
    import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {

    // throw new Error('Method not implemented.');

    return next.handle(req).pipe(
      catchError(errorDetails => {

        if (errorDetails.status === 40) {
          return throwError(errorDetails.statusText);
        }

        if (errorDetails instanceof HttpErrorResponse) {
          const applicationError = errorDetails.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }

          const serverError = errorDetails.error;
          let modelStateError = '';
          if (serverError.errors && typeof serverError === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modelStateError += serverError.errors[key] + '\n';

              }
            }
          }

          return throwError(modelStateError || serverError || 'server Error occured.');

        }
      })
    );

  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
