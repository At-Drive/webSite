import {Component, Input, OnInit,} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-confirm-delete",
    templateUrl: "./confirm-delete.component.html"
})
export class ConfirmDeleteComponent implements OnInit {
    @Input() heading: string = "";
    @Input() confirmText: string = "";
    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {}
    dismissModal(action: string) {
        let payload: any = {
            title: action
        };
        this.activeModal.close(payload);
    }
}
