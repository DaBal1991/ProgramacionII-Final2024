import { Component } from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {Cuartel} from "../../../_Modelo/cuartel";
import {Compania} from "../../../_Modelo/compania";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {Router} from "@angular/router";
import {OficialService} from "../../../_Servicio/oficial.service";
import {Oficial} from "../../../_Modelo/oficial";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-oficial',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './registro-oficial.component.html',
  styleUrl: './registro-oficial.component.css'
})
export class RegistroOficialComponent {

  oficial: Oficial = {
    id: 0,
    nombrePila: '',
    apellido: '',
    nombreUsuario: '',
    password: '',
    rolUsuario: '',
    estado: true,
    graduacion: '',
    isPasswordVisible: false
  };

  constructor(
    private oficialService: OficialService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.registrarOficial();
  }

  registrarOficial() {
    this.oficialService.registrarOficial(this.oficial).subscribe(
      {
        next: (datos) => {
          this.irListaOficiales();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListaOficiales() {
    this.router.navigate(['/listarOficiales']);
  }

}
