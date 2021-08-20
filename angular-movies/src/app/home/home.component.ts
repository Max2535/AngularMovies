import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  moviesInTheaters: any;
  moviesFutureReleases: any;
  display=true;
  title = 'angular-movies';
  constructor() { }

  ngOnInit(): void {
    this.moviesInTheaters = [{
      title: 'Spider-Man',
      releaseDate: new Date(),
      price: 1400.99,
      poster:'https://images-na.ssl-images-amazon.com/images/I/51kzFX8Zr8L._AC_.jpg'
    },
    {
      title: 'Moana',
      releaseDate: new Date('2016-11-14'),
      price: 300.99,
      poster:'https://www.matichon.co.th/wp-content/uploads/2016/12/moana-poster-alt.jpg'
    }];
    this.moviesFutureReleases = [];
  }

  handleRating(rate: number) {
    alert("The user selected " + rate);
  }

  onChange(event: any) {
    console.log(event.target.value);
    this.title = event.target.value;
  }

}
