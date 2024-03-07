import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

/**
 * Component that displays the user's profile page.
 * @selector 'app-profile-page'
 * @templateUrl './profile-page.component.html'
 * @styleUrls ['./profile-page.component.scss']
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  /**
   * @constructor - For the ProfilePageComponent.
   * @param {FetchApiDataService} fetchApiData - Service that handles API calls.
   * @param {Router} router - Service that handles routing within the app.
   * @param {MatSnackBar} snackBar - Material service that displays notifications via a snackbar.
   * @param {MatDialog} dialog - Material service used to open dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  /**
   * Function for getting the user's profile data.
   * @returns The user's username, hashed password, email, birthday, and favorite movies.
   */
  public loadProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.favoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Function that deletes a movie from the user's favorites list and updates their data in localStorage.
   * @param {any} movie - The movie to be deleted from the favorites list.
   * @returns A message indicating that the movie was deleted from the favorites list.
   */
  deleteFavMovie(movie: any): void {
    this.fetchApiData.removeFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.loadProfile();
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Function that deletes the user's account after their confirmation.
   * @returns A message indicating that the user's account was deleted.
   */
  deleteUser(): void {
    if(confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
      });
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Your account has been deleted', 'OK', {
        duration: 5000
      });
    }
  }

  /**
   * Function that opens the UpdateUserFormComponent on click.
   */
  public openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserFormComponent, { width: '350px' });
  }

  /**
   * Function that opens the DirectorDialogComponent on click.
   * @param {string} name - The director's name.
   * @param {string} bio - The director's biography.
   * @param {string} birth - The director's birth year.
   * @param {string} death - The director's death year.
   * @returns The director's name, bio, birth and death years.
   */
  public openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        name: name,
        bio: bio,
        birth: birth,
        death: death
      },
      width: '400px'
    });
  }

  /**
   * Function that opens the GenreDialogComponent on click.
   * @param {string} name - The genre's name.
   * @param {string} description - The genre's description.
   * @returns The genre's name and description.
   */
  public openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: name,
        description: description
      },
      width: '400px'
    });
  }

  /**
   * Function that opens the SynopsisDialogComponent on click.
   * @param {string} description - The description of the selected movie.
   * @returns The description of the movie.
   */
  public openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: { description: description },
      width: '400px'
    });
  }
}
