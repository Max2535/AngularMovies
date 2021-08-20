import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorModel } from '../actors.model';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  constructor() { }

  control:FormControl = new FormControl();;
  actors:actorModel[]=[
    {id:1,name:'Tom Holland',picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg'},
    {id:2,name:'Tom Hanks',picture:'https://upload.wikimedia.org/wikipedia/commons/f/fb/Tom_Hanks_2016.jpg'},
    {id:3,name:'Samuel L. Jackson',picture:'https://upload.wikimedia.org/wikipedia/commons/1/15/Samuel_L._Jackson_SDCC_2014_%28cropped%29.jpg'},
  ];

  selectActors:actorModel[]=[];

  originalActors = this.actors;

  columnsToDisplay=['picture','name','character','actions'];

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value =>{
      this.actors = this.originalActors;
      this.actors = this.actors.filter(actor=>actor.name.indexOf(value) !== -1);
    });
  }

  optionSelected(event:any){

      this.selectActors.push(event.option.value);
      this.control.patchValue('');
      if(this.table !== undefined){
        this.table.renderRows();
      }
  }

  remove(actor:any){
    const index = this.selectActors.findIndex(a =>a.name == actor.name);
    this.selectActors.splice(index,1);
    this.table.renderRows();
  }

  dropped(event:CdkDragDrop<any[]>){
    const previousIndex = this.selectActors.findIndex(actor=>actor === event.item.data);
    moveItemInArray(this.selectActors,previousIndex,event.currentIndex);
    this.table.renderRows();
  }

}
