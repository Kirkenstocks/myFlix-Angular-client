import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component that displays a dialog with the selected movie's synopsis.
 * @selector 'app-synopsis-dialog'
 * @templateUrl './synopsis-dialog.component.html'
 * @styleUrls ['./synopsis-dialog.component.scss']
 */
@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss']
})
export class SynopsisDialogComponent implements OnInit {

  /**
   * @constructor - Passes data from the movie object to a dialog for display.
   * @param data - Synopsis data of the selected movie.
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
