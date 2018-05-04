import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';


@Component({
  selector: 'app-crear-pres',
  templateUrl: './crear-pres.component.html',
  styleUrls: ['./crear-pres.component.css']
})
export class CrearPresComponent implements OnInit {

  formPre: FormGroup;
  presupuesto:any;
  clientes:any;


  constructor(private fp: FormBuilder,
              private presupuestosService: PresupuestosService,
              private clientesService: ClientesService) { }

  ngOnInit() {
    this.cargarClientes();
    this.formPre = this.fp.group({
      cliente: null,
      fecha: null,
      items: this.fp.array([
        this.initItem()
      ]),
      suma: null
    })
    this.detectarCambios();
  }

  initItem(){
    return this.fp.group({
      articulo: null,
      importe: null,
      cantidad: null,
      precio: null
    })
  }

  addItem(){
    const control = <FormArray>this.formPre.controls['items'];
    control.push(this.initItem());
  }

  removeItem(i){
    const control = <FormArray>this.formPre.controls['items'];
    control.removeAt(i);
  }

  cargarClientes(){
    this.clientesService.getTodosClientes()
                .subscribe((resp:any)=>{
                  this.clientes = resp.clientes
                }, (error)=>{
                  console.log(error)
                })
  }

  detectarCambios(){
    this.formPre.valueChanges
            .subscribe(valor=>{
              var importe = 0;
              var j;
              for(j=0; j < valor.items.length; j++){
                var cantidad = valor.items[j].cantidad;
                var precio = valor.items[j].precio;
                this.formPre.value.items[j].importe = cantidad * precio;               
              }
              var suma = 0;
              var i;
              for(i=0; i < valor.items.length; i++){
                suma = suma + valor.items[i].importe;
              }
              this.formPre.value.suma = suma;
            })
  }

}