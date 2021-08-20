import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form!:FormGroup;

  genres =[{id:1,name:'Drama'},{id:2,name:'Action'}];

  movies = [
    {title:'Spider-Man',poster:'https://images-na.ssl-images-amazon.com/images/I/51kzFX8Zr8L._AC_.jpg'},
    {title:'Moana',poster:'https://www.matichon.co.th/wp-content/uploads/2016/12/moana-poster-alt.jpg'},
    {title:'Inception',poster:'https://images-na.ssl-images-amazon.com/images/I/611ixoDpRLL._AC_.jpg'}
  ];

  originalMovies = this.movies;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        title:'',
        genreId:0,
        upcomingReleases:false,
        inTheaters:false
    });

    this.form.valueChanges.subscribe(values=>{
     this.movies=this.originalMovies;
     this.filterMovies(values);
    });
  }

  filterMovies(values:any){
    if(values.title){
      this.movies = this.movies.filter(movie => movie.title.indexOf(values.title) !== -1);
    }
  }

  clearForm(){
    this.form.reset();
  }

}
