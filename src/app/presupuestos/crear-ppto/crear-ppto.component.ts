import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations'; // animaciones

@Component({
  selector: 'app-crear-ppto',
  templateUrl: './crear-ppto.component.html',
  styleUrls: ['./crear-ppto.component.css'],
  animations: [
    trigger('alerta', [ // desencadenante lo llamamos alerta porque así la hemos definido en el html
      state('show', style({opacity: 1})), // aplicamos el estilo definido en este caso para hacerlo visible
      state('hide', style({opacity: 0})), // aplicamos el estilo para hacerlo invisible
      transition('show => hide', animate('500ms ease-out')), // aplicamos la transicion de visible a hide
      transition('hide => show', animate('500ms ease-in')) // aplicamos la transicion de invisible a visible
    ])
  ]
})
export class CrearPptoComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef; //para enlazarlo con el cif
  @ViewChild('nombre') nombreRef: ElementRef; // para enlazarlo con el #nombre

  PresupuestoForm: FormGroup;

  mensaje: string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;

  presupuesto:any;
  base:number;
  tipo:number;
  importe:number;
  total:number;
  irpf:number;
  retencion:boolean = false;
  cif:boolean;

  constructor(private pf: FormBuilder,
              private presupuestosService: PresupuestosService,
              private router: Router) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.PresupuestoForm = this.pf.group({
      nombre: [ null , Validators.required ],
      cif: [ '' , [Validators.required, Validators.minLength(9)] ], 
      fecha: null,
      concepto: null,
      base: [null, [Validators.required, Validators.max(100000)]],
      retencion: false,
      tipo: 0.21,
      irpf: this.formatearMoneda(0),
      importe: this.formatearMoneda(0),
      total: this.formatearMoneda(0)
    });
    this.detectarCambios();

  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'; //este metodo evalua este elemento, si mostraAlerta esta true muestra show y si es false muestra hide
  }

  crearPpto(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.presupuesto = this.guardarPpto();
    this.presupuestosService.postPresupuesto(this.presupuesto)
                    .subscribe((resp:any)=>{
                      this.router.navigate(['/listado-presupuesto']); //que cuando tenga exito redireccione a listado de facturas
                      this.enviando = false;
                    }, (error:any)=>{
                      this.mostrarAlerta = true;
                      this.enviando = false;
                      if(error.error.errores.errors.cif.message){
                        this.mensaje = error.error.errores.errors.cif.message;
                        this.cifRef.nativeElement.focus(); // focus manda el focus al elemento
                      }
                    })
  }
  guardarPpto(){
    const guardarPpto = {
      nombre: this.PresupuestoForm.get('nombre').value,
      cif: this.PresupuestoForm.get('cif').value,
      fecha: this.PresupuestoForm.get('fecha').value,
      concepto: this.PresupuestoForm.get('concepto').value,
      base: this.PresupuestoForm.get('base').value,
      retencion: this.PresupuestoForm.get('retencion').value,
      tipo: this.PresupuestoForm.get('tipo').value,
      irpf: this.PresupuestoForm.get('irpf').value,
      importe: this.PresupuestoForm.get('importe').value,
      total: this.PresupuestoForm.get('total').value,
      fechaRegistro: new Date()
    }
    return guardarPpto;
  }

  redondear(valor){
    var valor;
    if(valor <0) { // Redondea negativos correctamente
      var resultado = Math.round(-valor*100)/100 * -1;
  } else { // Redondea positivos correctamente
      var resultado = Math.round(valor*100)/100;
  }
  return resultado;
  }

  formatearMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES",{style: "currency", currency: "EUR"})
                            .format(valor);
    return resultado;
}

  detectarCambios(){ 
    this.PresupuestoForm.valueChanges.subscribe(valorForm=>{// Detecta los cambios que se produzcan dentro del formulario
      this.cif = valorForm.cif.startsWith('A') || valorForm.cif.startsWith('B');
      this.base = this.redondear(valorForm.base);
      this.retencion = valorForm.retencion;
      this.tipo = valorForm.tipo;
      if(this.retencion){this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf = 0;
      }
      this.importe  = this.redondear(this.base * this.tipo);
      this.total = this.redondear(this.base + this.irpf + this.importe);
      this.PresupuestoForm.value.irpf = this.formatearMoneda(this.irpf);
      this.PresupuestoForm.value.importe = this.formatearMoneda(this.importe);
      this.PresupuestoForm.value.total = this.formatearMoneda(this.total);
    }) 
  }

  registrarFact(){
    this.presupuesto = this.guardarPpto();
    this.iniciarFormulario(); // para reiniciar el contenido del formulario al pulsar el botón para completarlo
    this.nombreRef.nativeElement.focus(); // focus manda el focus al elemento
  }



}
