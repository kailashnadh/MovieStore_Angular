import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { Authresponse } from './authresponse';
import { MovieServiceService } from './movie-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private movieService: MovieServiceService) { }
  public getToken(): string {
    return this.storage.getItem('Movie-token');
  }
  public saveToken(token: string): void {
    this.storage.setItem('Movie-token', token);
  }
  public logout(): void {
    this.storage.removeItem('Movie-token');
  }
  public login(user: User): Promise<any> {
    return this.movieService.login(user)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }
  public register(user: User): Promise<any> {
    return this.movieService.register(user)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
  }
}