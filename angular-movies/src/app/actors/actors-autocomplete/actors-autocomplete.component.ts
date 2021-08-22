import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorsMovieDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css'],
})
export class ActorsAutocompleteComponent implements OnInit {
  constructor(private actorsService: ActorsService) { }

  control: FormControl = new FormControl();

  @Input()
  selectActors: actorsMovieDTO[] = [];
  actorsToDisplay: actorsMovieDTO[] = [];

  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.actorsService.searchByName(value).subscribe((actors) => {
        this.actorsToDisplay = actors;
      });
    });
  }

  optionSelected(event: any) {
    console.log(event.option.value);
    this.control.patchValue('');
    if (this.selectActors.findIndex((x) => x.id == event.option.value.id) !== -1) {
      return;
    }

    this.selectActors.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(actor: any) {
    const index = this.selectActors.findIndex((a) => a.name == actor.name);
    this.selectActors.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectActors.findIndex(
      (actor) => actor === event.item.data
    );
    moveItemInArray(this.selectActors, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
