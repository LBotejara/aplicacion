import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-fact',
  templateUrl: './listado-fact.component.html',
  styleUrls: ['./listado-fact.component.css'],
  animations: [
    trigger('alerta', [ // desencadenante lo llamamos alerta porque así la hemos definido en el html
      state('show', style({opacity: 1})), // aplicamos el estilo definido en este caso para hacerlo visible
      state('hide', style({opacity: 0})), // aplicamos el estilo para hacerlo invisible
      transition('show => hide', animate('500ms ease-out')), // aplicamos la transicion de visible a hide
      transition('hide => show', animate('500ms ease-in')) // aplicamos la transicion de invisible a visible
    ])
  ]
})
export class ListadoFactComponent implements OnInit {

  facturas:any;
  id:string;
  mensaje: string;
  mostrarAlerta:boolean = false;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'; //este metodo evalua este elemento, si mostraAlerta esta true muestra show y si es false muestra hide
  }

  cargarFacturas(){
    this.facturasService.getFacturas()
              .subscribe((resp:any)=>{
                this.facturas = resp.facturas;
              }, error => {
                console.log(error);
              })
  }

  //necesitamos crear esta variable para almacenar la id y volverla a cargar al borrar para solucionar el problema del model
  obtenerId(id){
    this.id = id;
  }

  borrarFactura(){
    this.facturasService.deleteFactura(this.id) // aplicamos aqui la nueva variable de la id para el problema del model
            .subscribe((resp:any)=>{
              this.mensaje = "La factura ha sido eliminado correctmente";
              this.mostrarAlerta = true;
              this.cargarFacturas();
              setTimeout(()=>{            //Este setTimeout para hacer que desaparezca el mensaje tras 2 segundos
                this.mostrarAlerta = false;
              }, 2500);
            },(error:any)=>{
              this.mensaje = 'Error de conexion con el servidor';
              this.mostrarAlerta = true;
              setTimeout(()=>{
                this.mostrarAlerta = false;
              }, 2500)
            })
  }

}

