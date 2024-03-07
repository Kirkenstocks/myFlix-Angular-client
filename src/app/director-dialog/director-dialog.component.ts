import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component that displays a dialog with details about the selected movie's director.
 * @selector 'app-director-dialog'
 * @templateUrl './director-dialog.component.html'
 * @styleUrls ['./director-dialog.component.scss']
 */
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit{

  /**
   * @constructor - Passes director data from the movie object to a dialog for display.
   * @param data - Information about the director of the selected movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      name: string,
      bio: string,
      birth: string,
      death: string
    }
  ) { }

  ngOnInit(): void {
    
  }
}
