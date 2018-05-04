import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  articuloForm: FormGroup;
  articulo: any

  constructor(private fa: FormBuilder) { }

  ngOnInit() {
    this.articuloForm = this.fa.group({
      referencia: null,
      precio: null
    })
  }

  crearArticulo(){
    this.articulo = this.guardarArticulo();
  }

  guardarArticulo(){
    const guardarArticulo = {
      referencia: this.articuloForm.get('referencia').value,
      precio: this.articuloForm.get('precio').value
    }
    return guardarArticulo;
  }

}
