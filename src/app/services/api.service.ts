import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  apiurl = "http://localhost:3000"

   postAppraiser(data : any) {

    return this.http.post<any>("http://localhost:3000/appraisers/",data);
   }

   getAppraiser() {
    return this.http.get<any>("http://localhost:3000/appraisers");
  }

  putAppraiser(data : any, id : number){
    console.log(data);
    console.log(id);

    return this.http.put<any>("http://localhost:3000/appraisers/"+id, data);
  }

  deleteAppraiser(id : number) {
        return this.http.delete<any>("http://localhost:3000/appraisers/"+id);
  }


  // ORDERS
  postOrder(data : any) {
    console.log(data);
    return this.http.post<any>("http://localhost:3000/orders/",data);
   }

   getOrder() {
    return this.http.get<any>("http://localhost:3000/orders");
  }

  putOrder(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/orders/"+id, data);
  }

  deleteOrder(id : number) {
        return this.http.delete<any>("http://localhost:3000/orders/"+id);
  }

// CLIENTS
postClient(data : any) {
  console.log(data);
  return this.http.post<any>("http://localhost:3000/clients/",data);
 }

 getClient() {
  console.log("getClient ApI called");
  return this.http.get<any>("http://localhost:3000/clients");
}

putClient(data : any, id : number){
  return this.http.put<any>("http://localhost:3000/clients/"+id, data);
}

deleteClient(id : number) {
      return this.http.delete<any>("http://localhost:3000/clients/"+id);
}


}
