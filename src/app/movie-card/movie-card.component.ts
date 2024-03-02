import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  // favoriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }
  
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

  public openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: name,
        description: description
      },
      width: '400px'
    });
  }

  public openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        description: description
      },
      width: '400px'
    });
  }

  isFavorite(movie: any): boolean {
    this.user = this.fetchApiData.getLocalUser();
    if (this.user.FavoriteMovies.includes(movie._id)) {
      return true;
    } else return false;
  }

  toggleFavorite(movie: any): void {
    const isFav = this.isFavorite(movie);
    isFav ? this.deleteFavMovie(movie) : this.addFavMovie(movie);
  }

  addFavMovie(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000
      });
    });
  }

  deleteFavMovie(movie: any): void {
    this.fetchApiData.removeFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
    });
  }
}
