import { Component } from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {Compania} from "../../../_Modelo/compania";
import {Cuartel} from "../../../_Modelo/cuartel";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {OficialService} from "../../../_Servicio/oficial.service";
import {Oficial} from "../../../_Modelo/oficial";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../../../_Servicio/login.service";

@Component({
  selector: 'app-editar-oficial',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './editar-oficial.component.html',
  styleUrl: './editar-oficial.component.css'
})
export class EditarOficialComponent {

  oficial: Oficial = new Oficial();
  id: number;

  constructor(
    private oficialService: OficialService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.oficialService.obtenerOficialPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.oficial = datos;
          console.log(this.oficial);
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  onSubmit() {
    this.confirmarEdicion();
  }

  confirmarEdicion() {
    this.oficialService.modificarOficial(this.id, this.oficial).subscribe(
      {
        next: (datos) => this.irListaOficiales(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaOficiales() {
    this.router.navigate(['/listarOficiales']);
  }

  public isPermitido(rol: string) {
    return this.loginService.isRolPermitido(rol);
  }
}
