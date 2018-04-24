import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class RegistroComponent implements OnInit {
  
  registroForm: FormGroup;
  usuario: any;
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;

  constructor(private fr: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router) { }

  ngOnInit() {
    this.registroForm = this.fr.group({
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required]],
      //  Validators.pattern("(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$")]],
      confirma: ''
    })
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  registroUsuario(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.usuario = this.guardarUsuario();
    this.autenticacionService.postUsuario(this.usuario)
          .subscribe((res:any)=>{
          this.router.navigate(['/']);
          this.enviando = false;
        },(error:any)=>{
          this.mostrarAlerta = true;
          this.enviando = false;
          if(error.error.errores.errors.email.message){
            this.mensaje = error.error.errores.errors.email.message;
          }
        })
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value.toLowerCase(), // lowerCarse para que lo pase a minusculas al guardarlo
      password: this.registroForm.get('password').value
    }
    return guardarUsuario;
  }

}
