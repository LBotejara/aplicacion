import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit {

  buscador: FormControl;
  buscadorLocalidad: FormControl;
  buscadorLocalidadNombre: FormGroup;
  consulta:any;
  clientes:any;
  mensaje:boolean;
  buscando:boolean = false;
  verBuscadorNombre:boolean = true;
  verBuscadorLocalidad:boolean = false;
  verBuscadorNombreLocalidad:boolean = false;

  constructor(private clientesService: ClientesService, 
              private fb: FormBuilder) { }
  

  ngOnInit() {
    this.buscador = new FormControl();
    this.buscador.valueChanges
            .subscribe(nombre=>{
              this.buscando = true;
              if( nombre.length !== 0){
                this.clientesService.getClientes(nombre)
                .subscribe((res:any)=>{
                  this.buscando = false;
                  this.clientes = res.clientes;
                  if (this.clientes.length === 0){
                    this.mensaje = true;
                  } else {
                  this.mensaje = false;
                  }
                },(error)=>{
                  this.buscando = false;
                  console.log(error)
                })
              } else {
                this.buscando = false;
                this.clientes = [];
                this.mensaje = false;
              }              
            })
    this.buscadorLocalidad = new FormControl();
        this.buscadorLocalidad.valueChanges
                .subscribe(localidad=>{
                  this.buscando = true;
                  if( localidad.length !== 0){
                    this.clientesService.getClientesLocalidad(localidad)
                    .subscribe((res:any)=>{
                      this.buscando = false;
                      this.clientes = res.clientes;
                      if (this.clientes.length === 0){
                        this.mensaje = true;
                      } else {
                      this.mensaje = false;
                      }
                    },(error)=>{
                      this.buscando = false;
                      console.log(error)
                    })
                  } else {
                    this.buscando = false;
                    this.clientes = [];
                    this.mensaje = false;
                  }              
                })
    this.buscadorLocalidadNombre = this.fb.group({
      nombre: null,
      localidad: null
    })
  }

  crearConsulta(){
    this.mensaje = false;
    this.buscando = true;
    this.consulta = this.guardarConsulta();
    this.clientesService.getClientesNombreLocalidad(this.consulta)
                .subscribe((resp:any)=>{
                  this.buscando = false;
                  this.clientes = resp.clientes;
                  if(this.clientes.length === 0){
                    this.mensaje = true;
                  }
                  this.buscadorLocalidadNombre.reset();
                },(error)=>{
                  this.buscando = false;
                  console.log(error);
                })
  }

  guardarConsulta(){
    const guardarConsulta = {
      nombre:this.buscadorLocalidadNombre.get('nombre').value,
      localidad:this.buscadorLocalidadNombre.get('localidad').value,
    }
    return guardarConsulta;
  }

  buscarPorNombre(){
    this.verBuscadorNombre = true;
    this.verBuscadorLocalidad = false;
    this.verBuscadorNombreLocalidad = false;
    this.clientes = [];
    this.buscador.setValue('');      //Para que se vacíe el campo al cambiar la selección
  }

  buscarPorLocalidad(){
    this.verBuscadorNombre = false;
    this.verBuscadorLocalidad = true;
    this.verBuscadorNombreLocalidad = false;
    this.clientes = [];
    this.buscadorLocalidad.setValue('');    //Para que se vacíe el campo al cambiar la selección
  }

  buscarPorLocalidadNombre(){
    this.verBuscadorNombre = false;
    this.verBuscadorLocalidad = false;
    this.verBuscadorNombreLocalidad = true;
    this.clientes = [];
  }

}

