import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  availableQuantity: number = 20;
  cumulativeQuantity: number = 0;
  selectedQuantity: number = 1;
  totalPrice: number = 0;
  pricePerUnit: number = 100;

  constructor(public dialog: MatDialog) {}

  addToCart() {
    if (
      this.selectedQuantity <= 0 ||
      this.selectedQuantity > this.availableQuantity
    ) {
      alert('Error: Requested quantity is not available!');
      return;
    }

    this.cumulativeQuantity += this.selectedQuantity;

    this.totalPrice = this.cumulativeQuantity * this.pricePerUnit;

    this.availableQuantity -= this.selectedQuantity;

    this.openConfirmationDialog();
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        productName: 'Product XYZ',
        cumulativeQuantity: this.cumulativeQuantity,
        totalPrice: this.totalPrice,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
