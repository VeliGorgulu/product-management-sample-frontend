import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add-modal-popup',
  templateUrl: './category-add-modal-popup.component.html',
  styleUrls: ['./category-add-modal-popup.component.css'],
})
export class CategoryAddModalPopupComponent implements OnInit {
  closeModal: string;
  categoryAddForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCategoryAddForm();
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
  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  add() {
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({}, this.categoryAddForm.value);
      this.categoryService.add(categoryModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          window.location.reload();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                
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
