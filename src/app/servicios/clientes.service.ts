import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientesService {

  token:string;
  
    constructor(private http: HttpClient) {
                 
                }

  getClientes(nombre){
    let url = 'http://localhost:3000/clientes/nombre/' + nombre;
    return this.http.get(url)
                  .map( (resp:any) => {
                    return resp;
                  });
  }

  getClientesLocalidad(localidad){
    let url = 'http://localhost:3000/clientes/localidad/' + localidad;
    return this.http.get(url)
                  .map( (resp:any) => {
                    return resp;
                  });
  }
  
  getClientesId(id){
    let url = 'http://localhost:3000/clientes/';
    return this.http.get(url + id)
                      .map( (resp:any) => {
                        return resp;
                      });
  }

  postCliente(cliente){
    let url = "http://localhost:3000/clientes";
    return this.http.post(url, cliente)
                  .map( (resp:any) => {
                    console.log(resp)
                    return resp;
                  });
  }

  putCliente(id, cliente){
    let url = 'http://localhost:3000/clientes/';
    return this.http.put(url+id, cliente)
                  .map( (resp:any) => {
                    return resp;
                  });
  }

  deleteCliente(id){
    let url = 'http://localhost:3000/clientes/';
    return this.http.delete(url+id)
                    .map( (resp:any) => {
                      return resp;
                    });
  }


}
