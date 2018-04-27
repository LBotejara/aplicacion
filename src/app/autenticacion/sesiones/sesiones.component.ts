import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css'],
})
export class SesionesComponent implements OnInit {

  sesiones:any;
  nombre:string;

  constructor(private autenticacionService: AutenticacionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.nombre = this.route.snapshot.params['nombre'];
    this.cargarSesiones();
  }

  cargarSesiones(){
    this.autenticacionService.getSesiones(this.nombre)
            .subscribe((resp:any)=>{
              this.sesiones = resp.sesiones;
            }, (error) =>{
              console.log(error);
            })
          }
}