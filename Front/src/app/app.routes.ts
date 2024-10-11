import { Routes } from '@angular/router';
import {SoldadoListadoComponent} from "./_Componente/soldado/listado-soldado/listado-soldado.component";
import {InicioComponent} from "./_Componente/inicio/inicio.component";
import {RegistroSoldadoComponent} from "./_Componente/soldado/registro-soldado/registro-soldado.component";
import {EditarSoldadoComponent} from "./_Componente/soldado/editar-soldado/editar-soldado.component";
import {MenuPrincipalComponent} from "./_Componente/menu/menu-principal/menu-principal.component";
import {LoginComponent} from "./_Componente/login/login/login.component";
import {ListadoCuartelComponent} from "./_Componente/cuartel/listado-cuartel/listado-cuartel.component";
import {RegistroCuartelComponent} from "./_Componente/cuartel/registro-cuartel/registro-cuartel.component";
import {EditarCuartelComponent} from "./_Componente/cuartel/editar-cuartel/editar-cuartel.component";
import {ListadoCompaniaComponent} from "./_Componente/compania/listado-compania/listado-compania.component";
import {RegistroCompaniaComponent} from "./_Componente/compania/registro-compania/registro-compania.component";
import {EditarCompaniaComponent} from "./_Componente/compania/editar-compania/editar-compania.component";
import {ListadoCuerpoComponent} from "./_Componente/cuerpo/listado-cuerpo/listado-cuerpo.component";
import {RegistroCuerpoComponent} from "./_Componente/cuerpo/registro-cuerpo/registro-cuerpo.component";
import {EditarCuerpoComponent} from "./_Componente/cuerpo/editar-cuerpo/editar-cuerpo.component";
import {ListadoServicioComponent} from "./_Componente/servicio/listado-servicio/listado-servicio.component";
import {RegistroServicioComponent} from "./_Componente/servicio/registro-servicio/registro-servicio.component";
import {EditarServicioComponent} from "./_Componente/servicio/editar-servicio/editar-servicio.component";
import {ListadoAsignadorComponent} from "./_Componente/asignador/listado-asignador/listado-asignador.component";
import {RegistroAsignadorComponent} from "./_Componente/asignador/registro-asignador/registro-asignador.component";
import {ListadoOficialComponent} from "./_Componente/oficial/listado-oficial/listado-oficial.component";
import {RegistroOficialComponent} from "./_Componente/oficial/registro-oficial/registro-oficial.component";
import {EditarOficialComponent} from "./_Componente/oficial/editar-oficial/editar-oficial.component";
import {ListadoSuboficialComponent} from "./_Componente/suboficial/listado-suboficial/listado-suboficial.component";
import {RegistroSuboficialComponent} from "./_Componente/suboficial/registro-suboficial/registro-suboficial.component";
import {EditarSuboficialComponent} from "./_Componente/suboficial/editar-suboficial/editar-suboficial.component";
import {AccesoRestringidoComponent} from "./_Componente/acceso-restringido/acceso-restringido.component";
import {authGuard} from "./auth.guard";
import {CompaniaSoldadosComponent} from "./_Componente/compania/compania-soldados/compania-soldados.component";
import {CuartelSoldadosComponent} from "./_Componente/cuartel/cuartel-soldados/cuartel-soldados.component";
import {CuerpoSoldadosComponent} from "./_Componente/cuerpo/cuerpo-soldados/cuerpo-soldados.component";
import {ServicioSoldadosComponent} from "./_Componente/servicio/servicio-soldados/servicio-soldados.component";

export const routes: Routes = [
  // Uso General
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'menuPrincipal',
    component: MenuPrincipalComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  { path: 'accesoRestringido', component: AccesoRestringidoComponent },

  // Soldados
  {
    path: 'listarSoldados',
    component: SoldadoListadoComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  {
    path: 'registrarSoldado',
    component: RegistroSoldadoComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  {
    path: 'editarSoldado/:id',
    component: EditarSoldadoComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  // Oficiales
  {
    path: 'listarOficiales',
    component: ListadoOficialComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  {
    path: 'registrarOficial',
    component: RegistroOficialComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN'] }
  },

  {
    path: 'editarOficial/:id',
    component: EditarOficialComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN'] }
  },

  // Suboficiales
  {
    path: 'listarSuboficiales',
    component: ListadoSuboficialComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  { path: 'registrarSuboficial',
    component: RegistroSuboficialComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  {
    path: 'editarSuboficial/:id',
    component: EditarSuboficialComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  // Cuarteles
  {
    path: 'listarCuarteles',
    component: ListadoCuartelComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  {
    path: 'registrarCuartel',
    component: RegistroCuartelComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  { path: 'editarCuartel/:id',
    component: EditarCuartelComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  {
    path: 'soldadosEnCuartel/:id',
    component: CuartelSoldadosComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  // Companias
  {
    path: 'listarCompanias',
    component: ListadoCompaniaComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  {
    path: 'registrarCompania',
    component: RegistroCompaniaComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  {
    path: 'soldadosEnCompania/:id',
    component: CompaniaSoldadosComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  {
    path: 'editarCompania/:id',
    component: EditarCompaniaComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  // Cuerpos
  {
    path: 'listarCuerpos',
    component: ListadoCuerpoComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  { path: 'registrarCuerpo',
    component: RegistroCuerpoComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  {
    path: 'soldadosEnCuerpo/:id',
    component: CuerpoSoldadosComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  {
    path: 'editarCuerpo/:id',
    component: EditarCuerpoComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL'] }
  },

  // Servicios
  {
    path: 'listarServicios',
    component: ListadoServicioComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  {
    path: 'registrarServicio',
    component: RegistroServicioComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  {
    path: 'editarServicio/:id',
    component: EditarServicioComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  {
    path: 'soldadosEnServicio/:id',
    component: ServicioSoldadosComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  },

  // Asignaciones
  {
    path: 'listarAsignaciones',
    component: ListadoAsignadorComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL', 'SOLDADO'] }
  },

  {
    path: 'registrarAsignacion',
    component: RegistroAsignadorComponent,
    canActivate: [authGuard],
    data: { rolesPermitidos: ['ADMIN', 'OFICIAL', 'SUBOFICIAL'] }
  }

];
