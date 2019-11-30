import { Component, OnInit } from '@angular/core';
import {MovieServiceService} from '../movie-service.service';
import {Movie} from '../movie';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movie: Movie[]
  selectedMovie: Movie
  message:String

  constructor(private movieService: MovieServiceService,private authenticationService: AuthenticationService) { }
  private getMovies(): void{
    this.movieService.getAllMovies().then((movies:Movie[])=>{
      this.message=movies.length>0?'':'No Movies Found';
      this.movie=movies.map(m=>{
        return m;
      })
      console.log(movies);
    })
  }

  private showError(error: any): void { 
    this.message = error.message; 
  };

  ngOnInit() {
    this.getMovies();
  }

}
