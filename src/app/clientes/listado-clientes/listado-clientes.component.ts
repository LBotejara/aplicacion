import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class ListadoClientesComponent implements OnInit {

  mensaje:string;
  mostrarAlerta:boolean = false;
  clientes:any;
  id:string;

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarClientes(){
    this.clientesService.getClientes()
               .subscribe((resp:any)=>{
                  this.clientes = resp.clientes;
               }, error => {
                 console.log(error);
               })
  }

  obtenerId(id){
    this.id = id;
  }

  borrarCliente(){
    this.clientesService.deleteCliente(this.id)
                .subscribe((resp:any)=>{
                  this.mensaje = "El cliente ha sido eliminado correctamente";
                  this.mostrarAlerta = true;
                  this.cargarClientes();
                  setTimeout(()=>{
                      this.mostrarAlerta = false;
                  }, 2500);
                },(error:any)=>{
                  this.mensaje = 'Error de conexión con el servidor';
                  this.mostrarAlerta = true;
                  setTimeout(()=>{
                    this.mostrarAlerta = false;
                  }, 2500);
                })
  }

}
