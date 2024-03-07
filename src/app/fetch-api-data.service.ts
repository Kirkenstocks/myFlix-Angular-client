import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://myflixapi-3voc.onrender.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**
   * @constructor
   * @param {HttpClient} http - for making HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Makes API call to the user registration endpoint.
   * @param {any} userDetails - Provided user data for registration.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userRegistration(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to the user login endpoint.
   * @param {any} userDetails - Provided user data for login.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userLogin(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Makes API call to the get all movies endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to the get one movie endpoint.
   * @param {string} title - Title of the selcted movie.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to the get director endpoint.
   * @param {string} directorName - Name of the director for the selcted movie.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to get genre endpoint.
   * @param {string} genreName - Name of the genre for the selected movie.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to add a movie at the favorite movies endpoint.
   * @param {any} movie - The movie to be added to the favorite movies list.
   * @returns {Observable<any>} - Observable for the API response.
   */
  addFavoriteMovie(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to delete a movie at the favorite movies endpoint.
   * @param {any} movie - The movie to be removed from the favorite movies list.
   * @returns {Observable<any>} - Observable for the API response.
   */
  removeFavoriteMovie(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Loads user data from localStorage.
   * @returns {Observable<any>} - Observable for the user data from localStorage.
   */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  /**
   * Makes API call to the update user endpoint.
   * @param {any} userChanges - The new data submitted by the user.
   * @returns {Observable<any>} - Observable for the API response.
   */
  updateUser(userChanges: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.put(apiUrl + 'users/' + user.Username, userChanges, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes API call to delete user endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles HTTP request errors.
   * @param {HttpErrorResponse} error - HTTP error response. 
   * @returns {any} - Error information.
   * @throws {error} - If the HTTP call to the API fails.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code: ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened. Try again later.'
    );
  }
}