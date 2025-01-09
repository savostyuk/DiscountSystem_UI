import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cloneDeep, forEach, isEqual } from 'lodash';
import { CategoriesTagsService } from '../../../../services/categories-tags-service/categories-tags.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDiscount } from '../../../../models/discount.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-discount-modal',
  imports: [MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDateFnsModule],
    providers: [provideNativeDateAdapter()],
  templateUrl: './add-discount-modal.component.html',
  styleUrl: './add-discount-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddDiscountModalComponent {
  form: FormGroup;
  discountDetail: IDiscount;
  pristineDiscountDetail: any;
  categoriesAll: any;
  tagsByCategory: any;

  constructor(private categoryService: CategoriesTagsService,
    private toaster: ToasterService,
    private matDialogRef: MatDialogRef<any>,
    private modalService: ModalService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.discountDetail = data.discount;
    this.pristineDiscountDetail = cloneDeep(this.discountDetail);
    this.categoriesAll = [];
    this.tagsByCategory = [];
    this.form = new FormGroup({
      promocode: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      condition: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      tag: new FormControl()
    });
  }

  
  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });
    this.getAllCategoriesAndTags();
    this.showTagList();
  }

  checkChanges(): any {
    if (!this.data.discount.id) {
      this.pristineDiscountDetail = {
        promocode: undefined,
        condition: undefined,
        startDate: undefined,
        endDate: undefined,
        phone: undefined,
        categoryId: undefined,
        tags: undefined,
      };
    }
    const isChanged = isEqual(this.discountDetail, this.pristineDiscountDetail);

    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (!isChanged) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.discountDetail = cloneDeep(this.pristineDiscountDetail);
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  canNotBeSaved(): boolean {
    return isEqual(this.discountDetail, this.pristineDiscountDetail);
  }

  showTagList(): void {
    console.log(this.discountDetail.tags);
    this.tagsByCategory = [];
    forEach(this.categoriesAll, (category: any) => {
      if (isEqual(this.discountDetail.categoryId, category.id)) {
        this.tagsByCategory = category.tags;
      }
    });
  }

  getAllCategoriesAndTags(): void {
    this.categoryService.getCategoriesTags().subscribe(
      (data) => {
        this.categoriesAll = data;
        this.showTagList();
      },
      () => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }
}
