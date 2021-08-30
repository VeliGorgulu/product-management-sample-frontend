import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete-modal-popup',
  templateUrl: './product-delete-modal-popup.component.html',
  styleUrls: ['./product-delete-modal-popup.component.css'],
})
export class ProductDeleteModalPopupComponent implements OnInit {
  @Input() productOld: Product;
  closeModal: string;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteProduct() {
    this.productService.delete(this.productOld).subscribe((response) => {
      window.location.reload();
    });
  }
}
