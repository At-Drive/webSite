import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../service-guard/form-validation';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  userId!: string;
  products: any;
  constructor(
    private router: Router,
    private validationService: ValidationService,
    private toaster: ToastrService,
    private productService: ProductService,
    private AuthService: AuthService,
    private orderService: OrderService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.userId = this.AuthService.getUserIdFromStorage();
    this.getAll();
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }

// getAll logic 
  getAll() {
    this.productService.getAllProd(this.userId).subscribe((success) => {
      console.log(success.data);
      this.products = success.data;
    });
  }
  editProd(path: any, u: any) {
    this.router.navigate([path], { queryParams: { id: u?._id } });
  }


// delete Product logic 
  delete(id: any) {
    this.productService.deleteProd(id).subscribe((success) => {
      this.toaster.success(success.message);
      this.getAll();
    });
  }

  openConfirmModal(id: any) {
    const modalRef = this.modalService.open(ConfirmDeleteComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.heading = 'Delete product';
    modalRef.componentInstance.confirmText = `Confirm Deletion product ?`;
    modalRef.result.then(
      (success: any) => {
        if (success.title == 'Yes') {
          this.delete(id);
        }
      },
      (reason: any) => {}
    );
  }


// createOrder logic 
 createOrder(product:any) {
     const payload = {
      userId: this.userId,
      productId: product._id,
    };
    this.orderService.createOrder(payload).subscribe((success) => {
      this.toaster.success(success.message);
    });
  }

  logOut(){
    this.AuthService.logout()
  }

 logOutConfirmModal() {
    const modalRef = this.modalService.open(ConfirmDeleteComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.heading = 'LogOut application';
    modalRef.componentInstance.confirmText = `Confirm LogOut application ?`;
    modalRef.result.then(
      (success: any) => {
        if (success.title == 'Yes') {
          this.logOut();
        }
      },
      (reason: any) => {}
    );
  }

}
