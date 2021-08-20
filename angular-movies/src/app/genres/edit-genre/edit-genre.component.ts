import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private router:Router,
    private activateRoute:ActivatedRoute,
    private genresService:GenresService) { }
  
  model!:genreDTO;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.genresService.getById(params.id).subscribe(genre =>{
        this.model = genre;
      });
    });
  }

  saveChanges(genreCreationDTO:genreCreationDTO){
    this.genresService.edit(this.model.id,genreCreationDTO)
    .subscribe(()=>{
      this.router.navigate(['/genres']);
    });

  }

}
