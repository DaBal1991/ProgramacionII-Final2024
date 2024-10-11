import { Component } from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {Cuartel} from "../../../_Modelo/cuartel";
import {Compania} from "../../../_Modelo/compania";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {NgForOf, NgIf} from "@angular/common";
import {LoginService} from "../../../_Servicio/login.service";

@Component({
  selector: 'app-registro-soldado',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './registro-soldado.component.html',
  styleUrl: './registro-soldado.component.css'
})
export class RegistroSoldadoComponent {

  soldado: Soldado = {
    id: 0,
    apellido: '',
    nombrePila: '',
    nombreUsuario: '',
    password: '',
    rolUsuario: '',
    estado: true,
    graduacion: '',
    cuartelAsignado: {
      id: 0,
      nombreCuartel: ''
    },
    companiaAsignada: {
      id: 0,
      actividad: ''
    },
    cuerpoAsignado: {
      id: 0,
      nombreCuerpo: ''
    },
    isPasswordVisible: false
  };

  cuarteles: Cuartel[];
  companias: Compania[];
  cuerpos: Cuerpo[];

  constructor(
    private soldadoService: SoldadoService,
    private companiaService: CompaniaService,
    private cuartelService: CuartelService,
    private cuerpoService: CuerpoService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.traerCuerpos();
    this.traerCompanias();
    this.traerCuarteles();
  }

  onSubmit() {
    this.registrarSoldado();
  }

  registrarSoldado() {
    this.soldadoService.registrarSoldado(this.soldado).subscribe(
      {
        next: (datos) => {
          this.irListaSoldados();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListaSoldados() {
    this.router.navigate(['/listarSoldados']);
  }

  traerCompanias() {
    this.companiaService.obtenerCompaniasActivas().subscribe(
      {
        next: (datos) => {
          this.companias = datos;

          if(this.companias.length > 0) {
            this.soldado.companiaAsignada.id = this.companias[0].id
          }

        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  traerCuerpos() {
    this.cuerpoService.obtenerCuerposActivos().subscribe(
      {
        next: (datos) => {
          this.cuerpos = datos;

          if (this.cuerpos.length > 0) {
            this.soldado.cuerpoAsignado.id = this.cuerpos[0].id;
          }

        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

  traerCuarteles() {
    this.cuartelService.obtenerCuartelesActivos().subscribe(
      {
        next: (datos) => {
          this.cuarteles = datos;

          if(this.cuarteles.length > 0) {
            this.soldado.cuartelAsignado.id = this.cuarteles[0].id;
          }

        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

}
