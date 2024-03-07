import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

/**
 * Component that displays each movie as a card
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss']
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};

  /**
   * @constructor - For the MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Service that handles API calls. 
   * @param {MatDialog} dialog - Material service used to open dialogs.
   * @param {MatSnackBar} snackBar - Material service that displays notifications via a snackbar.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Function that fetches movies from the database.
   * @returns All movies in the database.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
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
      data: {
        description: description
      },
      width: '400px'
    });
  }

  /**
   * Function that checks if a movie is one of the user's favorites.
   * @param {any} movie - The movie to check.
   * @returns {boolean} - Returns true if the movie is a favorite and false if not.
   */
  isFavorite(movie: any): boolean {
    this.user = this.fetchApiData.getUser();
    if (this.user.FavoriteMovies.includes(movie._id)) {
      return true;
    } else return false;
  }

  /**
   * Function that determines if the favorite or unfavorite button should be displayed for a movie.
   * @param {any} movie - The movie to toggle the favorite button for.
   */
  toggleFavorite(movie: any): void {
    const isFav = this.isFavorite(movie);
    isFav ? this.deleteFavMovie(movie) : this.addFavMovie(movie);
  }

  /**
   * Function that adds a movie to the user's favorites list and updates their data in localStorage.
   * @param {any} movie - The movie to be added to the favorites list.
   * @returns A message indicating that the movie was added to the favorites list.
   */
  addFavMovie(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000
      });
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
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
    });
  }
}
