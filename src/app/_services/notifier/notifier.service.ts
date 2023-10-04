import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * common method for showing notification popup.
   * @param message is the message showing inside notification.
   *  @param message is the message showing inside notification.
   */
  notify(
    message: string,
    succesOrError: string,
    duration: number = 2000
  ): void {
    this.snackBar.open(message, '', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['mat-toolbar', succesOrError, 'txt-bold-white'],
    });
  }
  notifyCenter(message: string, succesOrError: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['mat-toolbar', succesOrError, 'txt-bold-white'],
    });
  }
}
