import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  apiurl = "http://localhost:3000/appraisers"

   postAppraiser(data : any) {
    return this.http.post<any>("http://localhost:3000/appraisers/",data);
   }

   getAppraiser() {
    return this.http.get<any>("http://localhost:3000/appraisers");
  }

  putAppraiser(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/appraisers/"+id, data);
  }

  deleteAppraiser(id : number) {
    return this.http.delete<any>("http://localhost:3000/appraisers/"+id);
  }



}
