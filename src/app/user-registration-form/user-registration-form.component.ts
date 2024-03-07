import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component that displays the user registration form.
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @stylesUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor - For the UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service that handles API calls.
   * @param {MatDialogRef} dialogRef - Material service to open and close a dialog.
   * @param {MatSnackBar} snackBar - Material service that displays notifications via a snackbar.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) { }
  
  ngOnInit(): void {}

  /**
   * Function that registers a new user.
   * @returns A message indicating if the user account was created successfully or not.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      console.log(response);
      this.dialogRef.close();
      this.snackBar.open('Account created successfully, log in to continue', 'OK', {
        duration: 5000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open('Registration failed', 'OK', {
        duration: 3000
      });
    });
  }
}
