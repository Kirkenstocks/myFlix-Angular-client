import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component that displays a dialog with details about the selected movie's genre.
 * @selector 'app-genre-dialog'
 * @templateUrl './genre-dialog.component.html'
 * @styleUrls ['./genre-dialog.component.scss']
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit{

  /**
   * @constructor - Passes genre data from the movie object to a dialog for display.
   * @param data - Information about the genre of the selected movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      name: string,
      description: string,
    }
  ) { }

  ngOnInit(): void {
    
  }
}
