import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PresupuestosService {

  constructor(private http: HttpClient) { }

  getPresupuestos(){
    let url = 'http://localhost:3000/presupuesto';
    return this.http.get(url)
                  .map( (resp:any) => {
                    return resp;
                  });
  }
  
  getPresupuestoId(id){
    let url = 'http://localhost:3000/presupuesto/';
    return this.http.get(url + id)
                      .map( (resp:any) => {
                        return resp;
                      });
  }

  postPresupuesto(presupuesto){
    let url = "http://localhost:3000/presupuesto";
    return this.http.post(url, presupuesto)
                  .map( (resp:any) => {
                    return resp;
                  });
  }

  putPresupuesto(id, presupuesto){
    let url = 'http://localhost:3000/presupuesto/';
    return this.http.put(url+id, presupuesto)
                  .map( (resp:any) => {
                    return resp;
                  });
  }

  deletePresupuesto(id){
    let url = 'http://localhost:3000/presupuesto/';
    return this.http.delete(url+id)
                    .map( (resp:any) => {
                      return resp;
                    });
  }


}
