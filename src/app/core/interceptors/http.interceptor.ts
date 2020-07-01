import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResp: Error) => {
        let httpEx = errorResp as HttpErrorResponse;
        let httpErrorStatus = httpEx.status;
        let errorMessage = "";

        switch (httpErrorStatus) {
          case 400: {
            errorMessage = httpEx.error;
            break;
          }
          case 500: {
            errorMessage = httpEx.error;
            break;
          }
          default: {
            errorMessage = "The server is not responding. Try again later...";
            break;
          }
        }
        this.toastrService.error(errorMessage, "Error");
        return throwError(errorMessage);
      })
    );
  }
}
