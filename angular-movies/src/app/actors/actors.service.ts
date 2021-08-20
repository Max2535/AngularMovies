import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { actorCreationDTO, actorDTO } from './actors.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL+'/actors';

  get(page:number,recordsPerPage:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('page',page.toString());
    params = params.append('recordsPerPage',recordsPerPage.toString());
    return this.http.get<actorDTO[]>(this.apiURL,{observe:'response',params});
  }

  getById(id:number):Observable<actorDTO>{
    return this.http.get<actorDTO>(this.apiURL+'/'+id);
  }

  create(actor:actorCreationDTO){
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiURL,formData);
  }

  edit(id:number,actor:actorCreationDTO){
    const formaData = this.buildFormData(actor);
    return this.http.put<actorDTO>(this.apiURL+'/'+id,formaData);
  }

  delete(id:number){
    return this.http.delete(this.apiURL+'/'+id);
  }

  private buildFormData(actor:actorCreationDTO):FormData{
    const formData = new FormData();

    formData.append('name',actor.name);

    if(actor.biography){
      formData.append('biography',actor.biography);
    }

    if(actor.dateOfBirth){
      formData.append('dateOfBirth',formatDateFormData(actor.dateOfBirth))
    }

    if(actor.picture){
      formData.append('picture',actor.picture);
    }

    return formData;
  }
}
