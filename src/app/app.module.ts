import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { ListadoFactComponent } from './facturas/listado-fact/listado-fact.component';
import { CrearFactComponent } from './facturas/crear-fact/crear-fact.component';
import { EditarFactComponent } from './facturas/editar-fact/editar-fact.component';
import { FacturasService } from './servicios/facturas.service';
import { RegistroComponent } from './auntetificacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { ClientesService } from './servicios/clientes.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { CrearPptoComponent } from './presupuestos/crear-ppto/crear-ppto.component';
import { EditarPptoComponent } from './presupuestos/editar-ppto/editar-ppto.component';
import { ListadoPptoComponent } from './presupuestos/listado-ppto/listado-ppto.component';
import { CrearClientesComponent } from './clientes/crear-clientes/crear-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { SesionesComponent } from './autenticacion/sesiones/sesiones.component';
import { VentasComponent } from './ventas/ventas.component';


const rutas:Routes = [
  {path: '' , component: InicioComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [AutenticacionGuard]},
  {path: 'sesiones/:nombre', component: SesionesComponent, canActivate: [AutenticacionGuard]},
  {path: 'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path: 'ventas', component: VentasComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-proveedor', component: CrearProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-clientes', component: ListadoClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-cliente', component: CrearClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-cliente/:id', component: EditarClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-facturas', component: ListadoFactComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-factura', component: CrearFactComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-factura/:id', component: EditarFactComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-presupuestos', component: ListadoPptoComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-presupuesto', component: CrearPptoComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-presupuesto/:id', component: EditarPptoComponent},
  {path: '**', component: InicioComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFactComponent,
    CrearFactComponent,
    EditarFactComponent,
    RegistroComponent,
    LoginComponent,
    CrearPptoComponent,
    EditarPptoComponent,
    ListadoPptoComponent,
    CrearClientesComponent,
    EditarClientesComponent,
    ListadoClientesComponent,
    ListadoUsuariosComponent,
    SesionesComponent,
    VentasComponent,
   

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService, FacturasService, AutenticacionService, ClientesService, PresupuestosService, AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
