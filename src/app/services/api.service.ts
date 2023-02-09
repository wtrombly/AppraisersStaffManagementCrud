import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// use the following command in terminal to start server
// json-server --watch db.json

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  apiurl = "http://localhost:3000/appraiserList"

   postAppraiser(data : any) {
    return this.http.post<any>("http://localhost:3000/appraiserList/",data);
   }

   getAppraiser() {
    return this.http.get<any>("http://localhost:3000/appraiserList/");
  }

  putAppraiser(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/appraiserList/"+id, data);
  }

  deleteAppraiser(id : number) {
    return this.http.delete<any>("http://localhost:3000/appraiserList/"+id);
  }

  postOrder(data : any) {
    return this.http.post<any>("http://localhost:3000/orders/",data);
   }

   getOrder() {
    return this.http.get<any>("http://localhost:3000/orders/");
  }

  putOrder(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/orders/"+id, data);
  }

  deleteOrder(id : number) {
    return this.http.delete<any>("http://localhost:3000/orders/"+id);
  }



}
