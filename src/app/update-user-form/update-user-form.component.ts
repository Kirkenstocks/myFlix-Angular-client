import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component form that allows the user to update their account information.
 * @selector 'app-update-user-form'
 * @templateUrl './update-user-form.component.html'
 * @styleUrls ['./update-user-form.component.scss']
 */
@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss']
})
export class UpdateUserFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service that handles API calls.
   * @param {MatDialogRef} dialogRef - Material service to open and close a dialog.
   * @param {Router} router - Service that handles routing within the app.
   * @param {MatSnackBar} snackBar - Material service that displays notifications via a snackbar.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }
  
  ngOnInit(): void {}

  /**
   * Function that updates the user's information in localStorage and the database.
   * @returns A message indicating if the account was updated successfully or not.
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Account update successful', 'OK', {
        duration: 2000
      });
      this.dialogRef.close();
      window.location.reload();
    }, (error) => {
      console.error('Error:' + error);
      this.snackBar.open('Unable to update account information. Must fill in username, password, and email.', 'OK', {
        duration: 7000
      });
    });
  }
}
