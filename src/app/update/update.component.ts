import { Component, OnInit ,Input} from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

 
  @Input()
  movie:Movie;
  @Input()
  showform:any;
  
  // public movie:Movie={
  //   movieName:'',
  //   movieDirector:'',
  //   movieRating:'',
  //   movieType:'',
  //   movieYear:''
  // }
  
  public formError: string;
  public formAdded:string;
  

  private formIsValid(): boolean { 
    if (this.movie.movieName && this.movie.movieDirector && this.movie.movieRating && this.movie.movieType && this.movie.movieYear) {
      return true;
    } else {
      return false;
    }
  }
   

 // public showform=true;
  public updateMovie(): void {
    this.formError = ''; 
    this.formAdded='';
    if (this.formIsValid()) { 
        console.log(this.movie); 
        this.movieService.updateMovie(this.movie)
              .then((m: Movie) => {
                console.log("Movie Saved successfully", m);
                this.formAdded='Movie updated Successfully';
              });
    } else { 
        this.formError = 'All fields required, please try again'; 
    }
  }
  oncancel():void{
    this.showform=false;
  }

  constructor(private movieService: MovieServiceService) { 
  }

  ngOnInit() {
    this.showform=true
  }

}
