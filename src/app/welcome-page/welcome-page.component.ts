import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * Component that contains buttons to open the user login and registration components.
 * @selector 'app-welcome-page'
 * @templateUrl './welcome-page.component.html'
 * @styleUrls ['./welcome-page.component.scss']
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * @constructor
   * @param {MatDialog} dialog - Material service used to open dialogs.
   */
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {}

  /**
  * Function that opens the UserRegistrationFormComponent on click.
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '350px'
    });
  }

   /**
   * Function that opens the UserLoginrFormComponent on click.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '350px'
    });
  }
}
