import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss']
})
export class UpdateUserFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }
  
  ngOnInit(): void {
  }

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
