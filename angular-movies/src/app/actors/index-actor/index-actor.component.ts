import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-index-actor',
  templateUrl: './index-actor.component.html',
  styleUrls: ['./index-actor.component.css']
})
export class IndexActorComponent implements OnInit {

  actors:any;
  columnsToDisplay =['name','actions'];
  totalAmountOfRecords:any;
  currentPage = 1;
  pageSize = 5;

  constructor(private actorsService:ActorsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.actorsService.get(this.currentPage,this.pageSize).subscribe((response:HttpResponse<actorDTO[]>)=>{
      this.actors = response.body;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  updatePagination(event:PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id:number){
    this.actorsService.delete(id).subscribe(()=>{
        this.loadData();
    });
  }

}
