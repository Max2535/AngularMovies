import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coordinatesMap } from 'src/app/utilities/map/coordinate';
import { movieTheaterCreationDTO, movieTheaterDTO } from '../movie-theaters.model';

@Component({
  selector: 'app-movie-theater-form',
  templateUrl: './movie-theater-form.component.html',
  styleUrls: ['./movie-theater-form.component.css']
})
export class MovieTheaterFormComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  @Input()
  model!:movieTheaterDTO;

  form!:FormGroup;

  @Output()
  onSaveChanges = new EventEmitter<movieTheaterCreationDTO>();

  initialCoordinates:coordinatesMap[]=[];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['',{
        validators:[Validators.required]
      }],
      longitude:['',{
        validators:[Validators.required]
      }],
      latitude:['',{
        validators:[Validators.required]
      }]
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
      this.initialCoordinates.push({latitude:this.model.latitude,longitude:this.model.longitude});
    }
  }

  onSelectedLocation(coordinate:any){
    this.form.patchValue(coordinate);
  }

  saveChanges(){
    console.log(this.form.value);
    this.onSaveChanges.emit(this.form.value);
  }

}
