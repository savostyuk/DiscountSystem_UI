import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor( private readonly snackBar : MatSnackBar) { }

  open(message: string, type?: string): void {
    this.snackBar.open(
      message,
      'Close',
      {
        verticalPosition: 'bottom',
        duration: 3000,
        panelClass: type || ''
      }
    );
  }
}
