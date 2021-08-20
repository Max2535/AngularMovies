import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  @Input()
  movies: any;
  constructor() { }
  ngOnInit(): void {
  }

  remove(index:number): void {
    this.movies.splice(index,1);
  }

}
