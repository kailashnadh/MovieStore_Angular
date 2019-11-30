import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FrameworkComponent } from './framework/framework.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddComponent } from './add/add.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { UpdateComponent } from './update/update.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalBasic} from './modal-basic';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { AboutComponent } from './about/about.component';
import { AppPasswordDirective } from './app-password.directive';


@NgModule({
  declarations: [
    AppComponent,
    FrameworkComponent,
    HomepageComponent,
    PageHeaderComponent,
    MovieListComponent,
    AddComponent,
    MovieDetailsComponent,
    UpdateComponent,
    RegisterComponent,
    LoginComponent,
    RatingStarsComponent,
    NgbdModalBasic,
    HtmlLineBreaksPipe,
    MostRecentFirstPipe,
    AboutComponent,
    AppPasswordDirective
  ],
  imports: [
    BrowserModule,NgbModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'movie/:movieId',
        component: MovieDetailsComponent
      }
      ,
      {
        path: "movieupdate/:movieId",
        component: UpdateComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      },{
        path:"about",
        component:AboutComponent
      }
    ]),
    FormsModule,
    HttpModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
