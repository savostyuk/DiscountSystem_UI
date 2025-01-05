import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-input',
  imports: [MatFormFieldModule,
    MatChipsModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-input.component.html',
  styleUrl: './list-input.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListInputComponent {
  @Input() label: string;
  @Input() options: any[] = [];
  @Input() addElement: any;
  @Input() editElement: any;
  @Input() deleteElement: any;
  @Input() isDisabled?: any;
  @Input() activeCategoryId?: string;
  @Output() changeData = new EventEmitter<string>();

  newItem: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  previousName: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private modalService: ModalService,
    private translateService: TranslateService) {
    this.label = '';
    this.previousName = '';
    this.options = [];
  }

  add(item: string): void {
    this.addElement(item, this.changeData);
    this.newItem = '';
  }

  changeItem(item: any): void {
    this.previousName = item.name;
    item.isChanged = true;
  }

  cancelChange(item: any): void {
    item.name = this.previousName;
    item.isChanged = false;
    this.previousName = '';
  }

  edit(item: any): void {
    if (item.name === this.previousName) {
      item.isChanged = false;
      this.previousName = '';
    } else {
      this.editElement(item, this.changeData);
    }
  }

  remove(item: any): void {
    const confirmData = {
      message: this.translateService.instant('confirmation.delete.message'),
      buttonPositive: this.translateService.instant('confirmation.delete.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.deleteElement(item.id, this.changeData);
      }
    });
  }
}
