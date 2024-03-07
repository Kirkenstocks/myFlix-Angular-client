import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component that displays the user login form.
 * @selector 'app-user-login-form'
 * @templatUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor - For the UserLoginFormComponent
   * @param {FetchApiDataService} fetchApiData - Service that handles API calls.
   * @param {MatDialogRef} dialogRef - Material service to open and close a dialog.
   * @param {Router} router - Service that handles routing within the app.
   * @param {MatSnackBar} snackBar - Material service that displays notifications via a snackbar.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar) { }
  
  ngOnInit(): void {}

  /**
   * Function that handles user login and sets the user object in localStorage.
   * @returns A message indicating if login was successful or not.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log(response);

      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      this.dialogRef.close();
      this.router.navigate(['movies']);
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open('Unable to log in', 'OK', {
        duration: 2000
      });
    });
  }
}