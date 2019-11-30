import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent{

  // @Input()
  // movie:Movie;
  public movie:Movie={
    movieName:'',
    movieDirector:'',
    movieRating:'',
    movieType:'',
    movieYear:'',
    reviews:[]
  }
  
  public formError: string;
  public formAdded:string;

  private formIsValid(): boolean { 
    if (this.movie.movieName && this.movie.movieDirector && this.movie.movieRating && this.movie.movieType && this.movie.movieYear) {
      return true;
    } else {
      return false;
    }
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
   
  @Input()
  createHandler:Function
  public addMovie(): void {
    this.formError = ''; 
    this.formAdded='';
    console.log(this.isLoggedIn());
    if(this.isLoggedIn()){
      if (this.formIsValid()) { 
        console.log(this.movie); 
        this.movieService.createMovie(this.movie)
              .then((m: Movie) => {
                console.log("Movie Saved successfully", m);
                this.formAdded='Movie added Successfully';
              });
    } else { 
        this.formError = 'All fields required, please try again'; 
    }
    }
    else{
      this.formError = 'Please Login to Add Movie';
    }
    
  }

  constructor(private movieService: MovieServiceService, private authenticationService:AuthenticationService) { }

  createMovie(movies: Movie) {
    this.movieService.createMovie(movies).then((newMovie: Movie) => {
      this.createHandler(newMovie);
    });
  }

 

}
