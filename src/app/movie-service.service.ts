import { Injectable ,Inject} from '@angular/core';
import { Movie, Review } from './movie'
import { Http, Response,Headers } from '@angular/http';
import { User } from './user';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private movieUrl = 'http://localhost:3000/api/movies';

  constructor(private http: Http,@Inject(BROWSER_STORAGE) private storage: Storage) { }
  //get(api/movies)
  getAllMovies(): Promise<void | Movie[]> {
    return this.http.get(this.movieUrl).toPromise().then(response => response.json() as Movie[]).catch(this.handleError);
  }
  //post(api/movies)
  createMovie(movie: Movie): Promise<void | Movie> {
    return this.http.post(this.movieUrl, movie).toPromise().then(response => response.json() as Movie).catch(this.handleError);
  }
  getSingleMovie(movie: string): Promise<void | Movie> {
    var singleUrl = this.movieUrl + '/' + movie;
    return this.http.get(singleUrl).toPromise().then(response => response.json() as Movie).catch(this.handleError);
  }
  //put(api/Movies/:id)
  updateMovie(movie: Movie): Promise<void | Movie> {
    var finalurl = this.movieUrl + '/' + movie._id;
    return this.http.put(finalurl, movie).toPromise().then(response => response.json() as Movie).catch(this.handleError);
  }
  //delete(api/Movie/:id)

  deleteMovie(movieid: string): Promise<void | string> {
    var deleteurl = this.movieUrl + '/' + movieid;
    console.log(deleteurl);
    return this.http.delete(deleteurl).toPromise().then(response => response.json() as string).catch(this.handleError);
  }
  private makeAuthApiCall(urlPath: string, user: User): Promise<void | Authresponse> {
    const url: string = this.movieUrl + '/' + urlPath;
    return this.http.post(url, user).toPromise().then(response => response.json() as Authresponse).catch(this.handleError);
  }
  public login(user: User): Promise<void | Authresponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<void | Authresponse> {
    return this.makeAuthApiCall('register', user);
  }
  public addReviewByLocationId(movieid: string, formData: Review): Promise<void|Review> {
    
    const url: string = this.movieUrl + '/' + movieid+'/reviews';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('Movie-token')}` });
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //   'Authorization': `Bearer ${this.storage.getItem('Movie-token')}`
    //   })
    //   };
    return this.http
    .post(url, formData,{ headers: headers })
    .toPromise()
    .then(response => response.json() as Review)
    .catch(this.handleError);
    }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
