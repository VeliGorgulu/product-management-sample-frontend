import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update-modal-popup',
  templateUrl: './category-update-modal-popup.component.html',
  styleUrls: ['./category-update-modal-popup.component.css'],
})
export class CategoryUpdateModalPopupComponent implements OnInit {
  @Input() categoryOld: Category;
  closeModal: string;
  categoryUpdateForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCategoryUpdateForm();
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
  createCategoryUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  update() {
    if (this.categoryUpdateForm.valid) {
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value);
      categoryModel.id = this.categoryOld.id;
      this.categoryService.update(categoryModel).subscribe(
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
