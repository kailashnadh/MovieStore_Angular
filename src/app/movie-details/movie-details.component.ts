import { Component, OnInit } from '@angular/core';
import { Movie,Review } from '../movie';
import { MovieServiceService } from '../movie-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {NgbdModalBasic} from '../modal-basic';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  constructor(private movieService: MovieServiceService,
    private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private modalService: NgbModal) {
    //console.log(this.movies);
  }
  user:User=this.authenticationService.getCurrentUser();
  modalReference: any;

  public newReview:Review = {
    author: '',
    rating: 5,
    reviewText: ''
    };
    
    public modalError: string;
    public modalAdded:string;
    public loginError:string;
   
  movies: Movie;
  update = false;
  public redirect = false;
  open(content) {
    this.modalReference =  this.modalService.open(content, {size: 'sm'});
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  private formIsValid(): boolean {
    if (this.newReview.rating && this.newReview.reviewText) {
    return true;
    } else {
    return false;
    }
    }
  public onReviewSubmit(): void {
    this.modalError = '';
    this.modalAdded='';
    if (this.formIsValid()) {
      this.newReview.author=this.user.name;
      this.movieService.addReviewByLocationId(this.movies._id,this.newReview)
        .then((review:Review) => {      
         let reviews = this.movies.reviews.slice(0);
            reviews.unshift(review);
            this.movies.reviews = reviews;
        console.log('Review saved', review);
        });
    console.log(this.newReview);
    this.modalAdded='Successfully Added';
    this.modalService.dismissAll();
    } else {
    this.modalError = 'All fields required, please try again';
    }
    this.modalReference.close();
  }
  close():void{
    this.modalService.dismissAll();
  }
  showUpdate(): void {
    this.loginError = ''; 
    if(this.isLoggedIn())
    {
      this.update = true;
    }
    else{
      this.loginError = 'Please Login to Update Movie'; 
    }
    
  }
  public popoverTitle: string = "Delete Confirmation";
  public popoverMessage: string = "Are you sure to delete";
  public cancelCliked: boolean = false;
  public deletemovie(id): void {
    if(this.isLoggedIn()){
      this.movieService.deleteMovie(id)
      .then((m: string) => {
        this.redirect = true;
        //Window.location.href = '/index.html';
        this.router.navigate(['']);
        console.log("Movie deleted successfully", m);
      }
      )
    }
    else{
      this.loginError = 'Please Login to Delete Movie'; 
    }
    
  };

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }
  public back(): void {
    this.router.navigate(['']);
  }
  public showform = true;
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('movieId');
          return this.movieService.getSingleMovie(id);
        })
      )
      .subscribe((newMovie: Movie) => {
        console.log(newMovie);
        this.movies = newMovie;
      });

  }


}
