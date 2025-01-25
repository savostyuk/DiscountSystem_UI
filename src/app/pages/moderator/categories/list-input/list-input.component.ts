import { Component, ViewEncapsulation, inject, input, output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-input',
  imports: [MatFormFieldModule, MatChipsModule, TranslateModule, FormsModule, MatIconModule, MatButtonModule, MatInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-input.component.html',
  styleUrl: './list-input.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListInputComponent {
  private modalService = inject(ModalService);
  private translateService = inject(TranslateService);

  readonly label = input<string>('');
  readonly options = input<any[]>([]);
  readonly addElement = input<any>();
  readonly editElement = input<any>();
  readonly deleteElement = input<any>();
  readonly isDisabled = input<any>();
  readonly activeCategoryId = input<string>();
  readonly changeData = output<string>();

  newItem: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  previousName: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.previousName = '';
  }

  add(item: string): void {
    this.addElement()(item, this.changeData);
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
      this.editElement()(item, this.changeData);
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
        this.deleteElement()(item.id, this.changeData);
      }
    });
  }
}
