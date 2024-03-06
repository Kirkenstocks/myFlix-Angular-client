import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  public loadProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.favoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  deleteFavMovie(movie: any): void {
    this.fetchApiData.removeFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.loadProfile();
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
    });
  }

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

  public openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserFormComponent, { width: '350px' });
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
      data: { description: description },
      width: '400px'
    });
  }
}
