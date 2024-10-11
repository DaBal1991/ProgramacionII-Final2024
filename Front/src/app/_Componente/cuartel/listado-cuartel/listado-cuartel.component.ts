import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {Cuartel} from "../../../_Modelo/cuartel";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listado-cuartel',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        FormsModule
    ],
  templateUrl: './listado-cuartel.component.html',
  styleUrl: './listado-cuartel.component.css'
})
export class ListadoCuartelComponent {

  cuarteles: Cuartel[];
  criterioBusqueda: string = '';
  cuartelesBuscados: Cuartel[] = [];

  constructor(
    private cuartelService: CuartelService,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.obtenerCuarteles();
  }

  private obtenerCuarteles() {
    this.cuartelService.obtenerListadoCuarteles().subscribe(
      (datos => {
        this.cuarteles = datos;
        this.cuartelesBuscados = this.cuarteles;
      })
    );
  }

  buscarCuartel() {
    if (this.criterioBusqueda.trim() === '') {
      this.cuartelesBuscados = this.cuarteles;
    } else {
      this.cuartelesBuscados = this.cuarteles.filter(cuartel =>
        cuartel.id.toString().includes(this.criterioBusqueda) ||
        cuartel.nombreCuartel.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        cuartel.ubicacion.toLowerCase().includes(this.criterioBusqueda.toLowerCase())
      );
    }
  }

  editarCuartel(id: number) {
    this.router.navigate(['/editarCuartel', id]);
  }

  soldadosAsignados(id: number) {
    this.router.navigate(['/soldadosEnCuartel', id]);
  }

  bajaCuartel(id: number) {
    this.cuartelService.bajaCuartel(id).subscribe(
      {
        next: (datos) => this.obtenerCuarteles(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

}
