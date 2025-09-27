import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { SpinnerService } from '../service-guard/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  userId!: string;
  orders: any[] = []; 

  constructor(
    private orderService: OrderService,
    private AuthService: AuthService,
        private toaster: ToastrService,
        private modalService: NgbModal,
        private spinner: SpinnerService,
        private location: Location
  ) {}
  
   goBack(){
    this.location.back();
  }
  ngOnInit(): void  {
    this.userId = this.AuthService.getUserIdFromStorage();
    this.getAllOrder();
  }
  getAllOrder() {
    this.spinner.show();
    this.orderService.getAllOrder(this.userId).subscribe((success) => {
      console.log(success.data);
      this.orders = success?.data;
      this.spinner.hide();
    });
  }
  getTotalAmount(): number {
    return this.orders.reduce((sum :any, order:any) => sum + order.productId?.price, 0);
  }

  delete(id: any) {
     this.spinner.show();
     this.orderService.deleteOrder(id).subscribe((success) => {
       this.spinner.hide();
       this.toaster.success(success.message);
       this.getAllOrder();
     });
   }
 
   openConfirmModal(id: any) {
     const modalRef = this.modalService.open(ConfirmDeleteComponent, {
       centered: true,
       size: 'md',
       backdrop: 'static',
       keyboard: false,
     });
     modalRef.componentInstance.heading = 'Do you want to Delete Your Order';
     modalRef.componentInstance.confirmText = `Confirm Deletion ?`;
     modalRef.result.then(
       (success: any) => {
         if (success.title == 'Yes') {
           this.delete(id);
         }
       },
       (reason: any) => {}
     );
   }
}
