import {Component} from '@angular/core';
import {Oficial} from "../../../_Modelo/oficial";
import {OficialService} from "../../../_Servicio/oficial.service";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {Suboficial} from "../../../_Modelo/suboficial";
import {SuboficialService} from "../../../_Servicio/suboficial.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listado-suboficial',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgClass,
    FormsModule
  ],
  templateUrl: './listado-suboficial.component.html',
  styleUrl: './listado-suboficial.component.css'
})
export class ListadoSuboficialComponent {

  suboficiales: Suboficial[];
  criterioBusqueda: string = '';
  suboficialesBuscados: Suboficial[] = [];

  isPasswordVisible: boolean = false;

  ordenAscendente: boolean = true;

  graduacionSuboficiales: { [rango: string]: string } = {
    'Suboficial Mayor': '/assets/imgs/rangosSuboficial/12.png',
    'Suboficial Principal': '/assets/imgs/rangosSuboficial/13.png',
    'Sargento Ayudante': '/assets/imgs/rangosSuboficial/14.png',
    'Sargento Primero': '/assets/imgs/rangosSuboficial/15.png',
    'Sargento': '/assets/imgs/rangosSuboficial/16.png',
    'Cabo Primero': '/assets/imgs/rangosSuboficial/17.png',
    'Cabo': '/assets/imgs/rangosSuboficial/18.png'
  }


  constructor(
    private suboficialService: SuboficialService,
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.obtenerSuboficiales();
  }

  private obtenerSuboficiales() {
    this.suboficialService.obtenerListadoSuboficiales().subscribe(
      (datos => {
        this.suboficiales = datos.map(
          suboficial => {
            return {...suboficial, isPasswordVisible: false};
          }
        );
        this.suboficialesBuscados = this.suboficiales;
      })
    );
  }

  buscarSuboficial() {
    if(this.criterioBusqueda.trim() === '') {
      this.suboficialesBuscados = this.suboficiales;
    } else {
      this.suboficialesBuscados = this.suboficiales.filter(suboficial =>
        suboficial.apellido.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        suboficial.nombrePila.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        suboficial.nombreUsuario.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        suboficial.graduacion.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        suboficial.id.toString().includes(this.criterioBusqueda)
      );
    }
  }

  editarSubficial(id: number) {
    this.router.navigate(['editarSuboficial', id]);
  }

  bajaSuboficial(id: number) {
    this.suboficialService.bajaSuboficial(id).subscribe(
      {
        next: (datos) => this.obtenerSuboficiales(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

  getImagenGraduacion(graduacion: string): string {
    return this.graduacionSuboficiales[graduacion];
  }

  visibilidadPassword(suboficial: Suboficial) {
    suboficial.isPasswordVisible = !suboficial.isPasswordVisible;
  }

  /*
  ordernarPorApellido() {
    this.suboficiales.sort((a, b) => {
      const apellidoA = a.apellido.toLowerCase();
      const apellidoB = b.apellido.toLowerCase();

      if (apellidoA < apellidoB) return this.ordenAscendente ? -1 : 1;
      if (apellidoA > apellidoB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    this.ordenAscendente = !this.ordenAscendente;
  }

  ordernarPorNomUsuario() {
    this.suboficiales.sort((a, b) => {
      const nomUsuarioA = a.apellido.toLowerCase();
      const nomUsuarioB = b.apellido.toLowerCase();

      if (nomUsuarioA < nomUsuarioB) return this.ordenAscendente ? -1 : 1;
      if (nomUsuarioA > nomUsuarioB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    this.ordenAscendente = !this.ordenAscendente;
  }
   */

}
