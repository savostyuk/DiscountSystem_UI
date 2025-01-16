import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { DiscountsService } from '../../services/discounts-service/discounts.service';
import { IDiscount } from '../../models/discount.interface';
import { DiscountCardComponent } from '../../components/discount-card/discount-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [DiscountCardComponent, MatGridListModule, CommonModule],
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly discountsService = inject(DiscountsService);
  private readonly toaster = inject(ToasterService);
  private readonly modalService = inject(ModalService);
  discounts: Array<IDiscount> = [];

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): void {
    this.discountsService.getDiscounts().pipe(
      tap((data: any) => this.discounts = data),
      catchError(() => of(this.toaster.open('Сan not get discounts')))
    ).subscribe();
  }

  openDiscountDetails(discount: IDiscount): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(discount.id);
    dialogRef.afterClosed().subscribe(() => {
      this.discounts = [];
      this.getDiscounts();
    })
  }
}
