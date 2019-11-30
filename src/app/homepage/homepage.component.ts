import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  public pageContent = { 
    header: {
      title: 'Kailash\'s Movie Store',
      strapline: 'Have a Glance of Movies'
    },
    sidebar : 'Kailash\'s Movie Store app helps you to find the Movie\'.'
  };

  ngOnInit() {
  }

}
