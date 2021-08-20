import { Component, OnInit } from '@angular/core';
import { genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genre',
  templateUrl: './index-genre.component.html',
  styleUrls: ['./index-genre.component.css']
})
export class IndexGenreComponent implements OnInit {

  genres:genreDTO[]=[];
  columnsToDisplay =['name','actions'];

  constructor(private genresService:GenresService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(){
    this.genresService.getAll().subscribe(genres=>{
      this.genres=genres;
    });
  }

  delete(id:number){
    this.genresService.delete(id)
    .subscribe(()=>{
      this.loadGenres();
    });
  }

}
