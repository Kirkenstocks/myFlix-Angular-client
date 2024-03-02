import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) { }
  
    ngOnInit(): void {
    }

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
