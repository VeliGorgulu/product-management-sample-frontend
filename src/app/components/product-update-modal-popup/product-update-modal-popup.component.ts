import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update-modal-popup',
  templateUrl: './product-update-modal-popup.component.html',
  styleUrls: ['./product-update-modal-popup.component.css'],
})
export class ProductUpdateModalPopupComponent implements OnInit {
  @Input() productOld: Product;
  closeModal: string;
  productUpdateForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductUpdateForm();
  }

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
  createProductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  update() {
    if (this.productUpdateForm.valid) {
      let productModel = Object.assign({}, this.productUpdateForm.value);
      productModel.id = this.productOld.id;
      productModel.categoryId = this.productOld.categoryId;
      this.productService.update(productModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          window.location.reload();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error();
    }
  }
}
