import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class ListadoProvComponent implements OnInit {

  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  proveedores:any;
  id:string;
  desde:number = 0;
  totales:number;

  constructor(private proveedoresService: ProveedoresService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores(this.desde)
               .subscribe((resp:any)=>{
                  this.proveedores = resp.proveedores;
                  this.totales = resp.totales;
               }, error => {
                 console.log(error);
               })
  }

  setDesde(valor){
    var desde = this.desde + valor;
    if (desde >= this.totales){
      return;
    } else if (desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarProveedores();   // sumando el valor para pasar hacia delante
    }
  }

  obtenerId(id){
    this.id = id;
  }

  borrarProveedor(){
    this.proveedoresService.deleteProveedor(this.id)
                .subscribe((resp:any)=>{
                  this.mensaje = "El proveedor ha sido eliminado correctamente";
                  this.mostrarAlerta = true;
                  this.cargarProveedores();
                  setTimeout(()=>{
                      this.mostrarAlerta = false;
                  }, 2500);
                },(error:any)=>{
                  if(error.error.mensaje === 'token incorrecto'){
                    this.mensaje = "Su sesión ha caducado, reinicie sesión."
                  }
                  this.mostrarAlerta = true;
                  setTimeout(()=>{
                    this.mostrarAlerta = false;
                  }, 2500);
                })
    setTimeout(()=>{
      this.mensaje = 'Error de conexión con el servidor';
    })
  }

}
