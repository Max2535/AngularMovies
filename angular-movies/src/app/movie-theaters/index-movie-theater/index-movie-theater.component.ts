import { Component, OnInit } from '@angular/core';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-index-movie-theater',
  templateUrl: './index-movie-theater.component.html',
  styleUrls: ['./index-movie-theater.component.css']
})
export class IndexMovieTheaterComponent implements OnInit {

  movieTheaters:any;
  columnsToDisplay =['name','actions'];
  constructor(private movieTheaterService:MovieTheatersService) { }

  ngOnInit(): void {
   this.loadData();
  }

  loadData() {
    this.movieTheaterService.get().subscribe(movieTheaters => this.movieTheaters = movieTheaters);
  }

  delete(id:number){  
      this.movieTheaterService.delete(id).subscribe(()=>{
          this.loadData();
      });
  }

}
