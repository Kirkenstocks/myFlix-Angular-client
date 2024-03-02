import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public router: Router
  ) {}

  navigateHome(): void {
    this.router.navigate(['movies']);
  }

  navigateProfile(): void {
    this.router.navigate(['profile']);
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  ngOnInit(): void {

  }
}
