import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../service-guard/form-validation';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { PRODUCT_FORM } from '../all-validation';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../service-guard/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  form = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    des: new FormControl('good', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
  });

  product: any = [];
  constructor(
    private validationService: ValidationService,
    private toaster: ToastrService,
    private productService: ProductService,
    private AuthService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: SpinnerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const userId = this.AuthService.getUserIdFromStorage();
    this.form.controls['userId'].setValue(userId);
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.getByIdProduct(params['id']);
      }
    });
  }
  submit() {
    this.form.enable;
    if (this.validationService.checkErrors(this.form, PRODUCT_FORM)) {
      return;
    }
    let formData: any = this.form.value;
    if (formData._id) {
      this.update(formData._id, formData);
    } else {
      delete formData._id;
      this.createProd(formData);
    }
  }

  // createProd for product 
  createProd(formData: any) {
    this.spinner.show();
    this.productService.createProd(formData).subscribe((success) => {
      this.spinner.hide();
      this.toaster.success(success.message);
      this.router.navigate(['/product_list']);
    });
  }

  // getById for product 
  getByIdProduct(id: any) {
    this.productService.getByIdProd(id).subscribe((success) => {
      this.form.patchValue(success.data);
      this.product = success.data;
    });
  }

  // updatetById for product 
  update(id: any, formData: any) {
    this.spinner.show();
    this.productService
      .updateProd(formData._id, formData)
      .subscribe((success) => {
        this.spinner.hide();
        this.toaster.success(success.message);
        this.router.navigate(['/product_list']);
      });
  }
   goBack(){
    this.location.back();
  }
}
