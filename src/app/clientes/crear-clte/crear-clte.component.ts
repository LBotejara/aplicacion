import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-clte',
  templateUrl: './crear-clte.component.html',
  styleUrls: ['./crear-clte.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class CrearClteComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  clienteForm: FormGroup;
  cliente:any;
  provincias:string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ]
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;

  constructor(private pf: FormBuilder,
              private clientesService: ClientesService,
              private router: Router) { }

  ngOnInit() {
    this.clienteForm = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null
    })
  }
  
 get estadoAlerta(){
   return this.mostrarAlerta ? 'show' : 'hide';
 }

 crearClte(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.cliente = this.guardarClte();
    this.clientesService.postCliente(this.cliente)
                    .subscribe((resp:any)=>{
                      this.router.navigate(['/listado-clientes']);
                      this.enviando = false;
                    }, (error:any)=>{
                      this.mostrarAlerta = true;
                      this.enviando = false;
                      if(error.error.errores.errors.cif.message){
                        this.mensaje = error.error.errores.errors.cif.message;
                        this.cifRef.nativeElement.focus();
                      }
                    });
  }
  guardarClte(){
    const guardarClte = {
      nombre: this.clienteForm.get('nombre').value,
      cif: this.clienteForm.get('cif').value,
      domicilio: this.clienteForm.get('domicilio').value,
      cp: this.clienteForm.get('cp').value,
      localidad: this.clienteForm.get('localidad').value,
      provincia: this.clienteForm.get('provincia').value,
      telefono: this.clienteForm.get('telefono').value,
      email: this.clienteForm.get('email').value,
      contacto: this.clienteForm.get('contacto').value
    }
    return guardarClte;
  }


}

