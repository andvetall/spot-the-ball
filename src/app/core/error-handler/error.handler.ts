import { ErrorHandler } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

export class ErrorService implements ErrorHandler {

  constructor(
    private toastr: ToastrService,
    ) {}

  handleError(error) {
    this.toastr.error(error, 'Error')
  }

}