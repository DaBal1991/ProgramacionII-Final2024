import { Component } from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-soldado-listado',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgClass,
    FormsModule
  ],
  templateUrl: './listado-soldado.component.html',
  styleUrl: './listado-soldado.component.css'
})
export class SoldadoListadoComponent {

  soldados: Soldado[];
  criterioBusqueda: string = '';
  soldadosBuscados: Soldado[] = [];

  graduacionSoldados: { [rango: string]: string } = {
    'Voluntario de Primera': '/assets/imgs/rangoSoldado/19.png',
    'Voluntario de Segunda': '/assets/imgs/rangoSoldado/20.png',
    'Voluntario de Segunda en Comisión': '/assets/imgs/rangoSoldado/21.png',
  }

  isPasswordVisible: boolean = false;

  // ordenAscendente: boolean = true;

  constructor(
    private soldadoService: SoldadoService,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.obtenerSoldados();
  }

  private obtenerSoldados() {
    this.soldadoService.obtenerListadoSoldados().subscribe(
      (datos => {
        this.soldados = datos.map(
          soldado => {
            return {...soldado, isPasswordVisible: false};
          }
        );
        this.soldadosBuscados = this.soldados;
      })
    );
  }

  buscarSoldado() {
    if(this.criterioBusqueda.trim() === '') {
      this.soldadosBuscados = this.soldados;
    } else {
      this.soldadosBuscados = this.soldados.filter(soldado =>
        soldado.apellido.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        soldado.id.toString().includes(this.criterioBusqueda.toLowerCase()) ||
        soldado.graduacion.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        soldado.nombreUsuario.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        soldado.cuartelAsignado.nombreCuartel.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        soldado.companiaAsignada.actividad.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        soldado.cuerpoAsignado.nombreCuerpo.toLowerCase().includes(this.criterioBusqueda.toLowerCase())
      );
    }
  }

  editarSoldado(id: number) {
    this.router.navigate(['editarSoldado', id]);
  }

  bajaSoldado(id: number) {
    this.soldadoService.bajaSoldado(id).subscribe(
      {
        next: (datos) => this.obtenerSoldados(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

  getImagenGraduacion(graduacion: string): string {
    return this.graduacionSoldados[graduacion];
  }

  visibilidadPassword(soldado: Soldado) {
    soldado.isPasswordVisible = !soldado.isPasswordVisible;
  }

  /*
  ordernarPorApellido() {
    this.soldados.sort((a,b) => {
      const apellidoA = a.apellido.toLowerCase();
      const apellidoB = b.apellido.toLowerCase();

      if(apellidoA < apellidoB) return this.ordenAscendente ? -1 : 1;
      if(apellidoA > apellidoB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    this.ordenAscendente = !this.ordenAscendente;
  }

  ordernarPorNomUsuario() {
    this.soldados.sort((a,b) => {
      const nomUsuarioA = a.apellido.toLowerCase();
      const nomUsuarioB = b.apellido.toLowerCase();

      if(nomUsuarioA < nomUsuarioB) return this.ordenAscendente ? -1 : 1;
      if(nomUsuarioA > nomUsuarioB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    this.ordenAscendente = !this.ordenAscendente;
  }

  */

}
