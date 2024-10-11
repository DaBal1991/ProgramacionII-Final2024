import {Component} from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {Oficial} from "../../../_Modelo/oficial";
import {OficialService} from "../../../_Servicio/oficial.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Suboficial} from "../../../_Modelo/suboficial";

@Component({
  selector: 'app-listado-oficial',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './listado-oficial.component.html',
  styleUrl: './listado-oficial.component.css'
})
export class ListadoOficialComponent {

  oficiales: Oficial[];
  criterioBusqueda: string = '';
  oficialesBuscados: Oficial[] = [];

  isPasswordVisible: boolean = false;

  // ordenAscendente: boolean = true;

  graduacionOficiales: { [rango: string]: string } = {
    'Teniente General': '/assets/imgs/rangosOficial/01.png',
    'General de División': '/assets/imgs/rangosOficial/02.png',
    'General de Brigada': '/assets/imgs/rangosOficial/03.png',
    'Coronel Mayor': '/assets/imgs/rangosOficial/04.png',
    'Coronel': '/assets/imgs/rangosOficial/05.png',
    'Teniente Coronel': '/assets/imgs/rangosOficial/06.png',
    'Mayor': '/assets/imgs/rangosOficial/07.png',
    'Capitán': '/assets/imgs/rangosOficial/08.png',
    'Teniente Primero': '/assets/imgs/rangosOficial/09.png',
    'Teniente': '/assets/imgs/rangosOficial/10.png',
    'Subteniente': '/assets/imgs/rangosOficial/11.png'
  }

  constructor(
    private oficialService: OficialService,
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.obtenerOficiales();
  }

  private obtenerOficiales() {
    this.oficialService.obtenerListadoOficiales().subscribe(
      (datos => {
        this.oficiales = datos.map(oficial => {
            return {...oficial, isPasswordVisible: false};
          }
        );
        this.oficialesBuscados = this.oficiales;
      })
    );
  }

  buscarOficial() {
    if (this.criterioBusqueda.trim() === '') {
      this.oficialesBuscados = this.oficiales;
    } else {
      this.oficialesBuscados = this.oficiales.filter(oficial =>
        oficial.apellido.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        oficial.nombrePila.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        oficial.nombreUsuario.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        oficial.graduacion.toLowerCase().includes(this.criterioBusqueda.toLowerCase()) ||
        oficial.id.toString().includes(this.criterioBusqueda)
      );
    }
  }

  editarOficial(id: number) {
    this.router.navigate(['editarOficial', id]);
  }

  bajaOficial(id: number) {
    this.oficialService.bajaOficial(id).subscribe(
      {
        next: (datos) => this.obtenerOficiales(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

  getImagenGraduacion(graduacion: string): string {
    return this.graduacionOficiales[graduacion];
  }

  visibilidadPassword(oficial: Oficial) {
    oficial.isPasswordVisible = !oficial.isPasswordVisible;
  }
}
