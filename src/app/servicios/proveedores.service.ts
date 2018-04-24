import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AutenticacionService } from './autenticacion.service';

@Injectable()
export class ProveedoresService {

  token:string;

  constructor(private http: HttpClient,
              private autenticacionService: AutenticacionService) {
                this.token = autenticacionService.token;
              }

  getProveedores(){
    let url = 'http://localhost:3000/proveedor';
    return this.http.get(url)
                  .map( (resp:any) => {
                    return resp;
                  });
  }
  
  getProveedorId(id){
    let url = 'http://localhost:3000/proveedor/';
    return this.http.get(url + id)
                      .map( (resp:any) => {
                        return resp;
                      });
  }

  postProveedor(proveedor){
    let url = 'http://localhost:3000/proveedor';
    return this.http.post(url, proveedor)
                  .map( (resp:any) => {
                    console.log(resp)
                    return resp;
                  });
  }

  putProveedor(id, proveedor){
    let url = 'http://localhost:3000/proveedor/';
    return this.http.put(url+id, proveedor)
                  .map( (resp:any) => {
                    return resp;
                  });
  }

  deleteProveedor(id){
    this.token = this.autenticacionService.token;
    console.log(this.token);
    let url = 'http://localhost:3000/proveedor/' + id + '?token=' + this.token;
    return this.http.delete(url)
                    .map( (resp:any) => {
                      return resp;
                    });
  }


}
