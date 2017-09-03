import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) {}

  getData(topic:string){
    return this.http.get('http://localhost:3000/'+encodeURIComponent(topic))
    .map(response => response.json());
  }

}
