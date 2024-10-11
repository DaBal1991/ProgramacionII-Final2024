import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../_Servicio/login.service";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listado-cuerpo',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './listado-cuerpo.component.html',
  styleUrl: './listado-cuerpo.component.css'
})
export class ListadoCuerpoComponent {

  cuerpos: Cuerpo[];
  cuerposBuscados: Cuerpo[] = [];
  criterioBusqueda: string = '';

  constructor(
    private cuerpoService: CuerpoService,
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.obtenerCuerpos();
  }

  private obtenerCuerpos() {
    this.cuerpoService.obtenerListadoCuerpos().subscribe(
      (datos => {
          this.cuerpos = datos;
          this.cuerposBuscados = this.cuerpos;
        }
      )
    );
  }

  buscarCuerpo() {
    if (this.criterioBusqueda.trim() === '') {
      this.cuerposBuscados = this.cuerpos;
    } else {
      this.cuerposBuscados = this.cuerpos.filter(cuerpo =>
        cuerpo.id.toString().includes(this.criterioBusqueda) ||
        cuerpo.nombreCuerpo.toLowerCase().includes(this.criterioBusqueda.toLowerCase())
      );
    }
  }

  editarCuerpo(id: number) {
    this.router.navigate(['/editarCuerpo', id]);
  }

  bajaCuerpo(id: number) {
    this.cuerpoService.bajaCuerpo(id).subscribe(
      {
        next: (datos) => this.obtenerCuerpos(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }

  soldadosAsignados(id: number) {
    this.router.navigate(['/soldadosEnCuerpo', id]);
  }

}
