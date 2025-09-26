import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ValidationService {
    constructor(private toastService: ToastrService) {}
    checkErrors(form: any, findFormErrors: any) {
       
        let keys = Object.keys(form.controls);
      
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if (form.controls[element].status == "INVALID") {
                this.toastService.warning(
                    (findFormErrors.find((x: any) => x.key == element)?.message) ??
                        "Please fill all required field !"
                );
                return true;
            }
        }
        return false;
    }
}