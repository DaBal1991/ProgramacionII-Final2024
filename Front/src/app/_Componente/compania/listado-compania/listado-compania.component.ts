import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {Compania} from "../../../_Modelo/compania";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listado-compania',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './listado-compania.component.html',
  styleUrl: './listado-compania.component.css'
})
export class ListadoCompaniaComponent {

  companias: Compania[];
  criterioBusqueda: string = '';
  companiasBuscadas: Compania[] = [];

  constructor(
    private companiaService: CompaniaService,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.obtenerCompanias();
  }

  private obtenerCompanias() {
    this.companiaService.obtenerListadoCompania().subscribe(
      (datos => {
        this.companias = datos;
        this.companiasBuscadas = this.companias;
      })
    );
  }

  buscarCompania() {
    if (this.criterioBusqueda.trim() === '') {
      this.companiasBuscadas = this.companias;
    } else {
      this.companiasBuscadas = this.companias.filter(compania =>
        compania.id.toString().includes(this.criterioBusqueda) ||
        compania.actividad.toLowerCase().includes(this.criterioBusqueda.toLowerCase())
      );
    }
  }

  editarCuartel(id: number) {
    this.router.navigate(['/editarCompania', id]);
  }

  soldadosAsignados(id: number) {
    this.router.navigate(['/soldadosEnCompania', id]);
  }

  bajaCompania(id: number) {
    this.companiaService.bajaCompania(id).subscribe(
      {
        next: (datos) => this.obtenerCompanias(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

}
