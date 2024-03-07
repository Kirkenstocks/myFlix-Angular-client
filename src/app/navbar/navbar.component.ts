import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component that displays a navbar at the top of the view.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  /**
   * @constructor - For the NavbarComponent.
   * @param {Router} router - Service that handles routing within the app.
   */
  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Function that navigates to the home page.
   */
  navigateHome(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function that navigates to the profile page.
   */
  navigateProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Function that logouts the user and navigates to the welcome page.
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
