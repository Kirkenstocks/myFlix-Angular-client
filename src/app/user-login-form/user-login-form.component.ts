import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar) { }
  
    ngOnInit(): void {
    }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log(response);

      localStorage.setItem('user', JSON.stringify(this.userData));
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
