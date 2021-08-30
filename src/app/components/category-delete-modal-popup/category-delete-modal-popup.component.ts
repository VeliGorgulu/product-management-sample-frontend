import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-delete-modal-popup',
  templateUrl: './category-delete-modal-popup.component.html',
  styleUrls: ['./category-delete-modal-popup.component.css'],
})
export class CategoryDeleteModalPopupComponent implements OnInit {
  @Input() categoryOld: Category;
  closeModal: string;

  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService
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

  deleteCategory() {
    this.categoryService.delete(this.categoryOld).subscribe((response) => {
      window.location.reload();
    });
  }
}
