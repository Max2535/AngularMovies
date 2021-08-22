import { Component, OnInit } from '@angular/core';
import { homeDTO } from '../movies/movies.model';
import { MoviesService } from '../movies/movies.service';

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

  constructor(private moviesService:MoviesService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.moviesService.getHomePageMovies().subscribe(homeDTO =>{
      this.moviesFutureReleases=homeDTO.upcomingReleases;
      this.moviesInTheaters=homeDTO.inTheaters;
    });
  }

  handleRating(rate: number) {
    alert("The user selected " + rate);
  }

  onChange(event: any) {
    console.log(event.target.value);
    this.title = event.target.value;
  }
  onDelete(){
    this.loadData();
  }

}
