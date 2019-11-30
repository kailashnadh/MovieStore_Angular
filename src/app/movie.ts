export class Movie {
    _id?: string;
    movieName: string;
    movieDirector: string;
    movieYear: string;
    movieRating: string;
    movieType: string;
    reviews: Review[];
}
export class Review {
    author: string;
    rating: number;
    reviewText: string;
    }
