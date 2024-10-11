import { Component } from '@angular/core';
import {Soldado} from "../../../_Modelo/soldado";
import {SoldadoService} from "../../../_Servicio/soldado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CuartelService} from "../../../_Servicio/cuartel.service";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {Compania} from "../../../_Modelo/compania";
import {Cuartel} from "../../../_Modelo/cuartel";
import {Cuerpo} from "../../../_Modelo/cuerpo";

@Component({
  selector: 'app-editar-soldado',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './editar-soldado.component.html',
  styleUrl: './editar-soldado.component.css'
})
export class EditarSoldadoComponent {

  soldado: Soldado = new Soldado();
  id: number;

  companias: Compania[];
  cuarteles: Cuartel[];
  cuerpos: Cuerpo[];


  constructor(
    private soldadoService: SoldadoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cuartelService: CuartelService,
    private cuerpoService: CuerpoService,
    private companiaService: CompaniaService
  ) { }

  ngOnInit() {
    this.soldado.cuartelAsignado = new Cuartel();
    this.soldado.companiaAsignada = new Compania();
    this.soldado.cuerpoAsignado = new Cuerpo();
    this.traerCuarteles();
    this.traerCuerpos();
    this.traerCompanias();

    this.id = this.activatedRoute.snapshot.params['id'];
    this.soldadoService.obtenerSoldadoPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.soldado = datos;
          console.log(this.soldado);
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
    this.soldadoService.modificarSoldado(this.id, this.soldado).subscribe(
      {
        next: (datos) => this.irListaSoldados(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaSoldados() {
    this.router.navigate(['listarSoldados']);
  }

  traerCompanias() {
    this.companiaService.obtenerCompaniasActivas().subscribe(
      {
        next: (datos) => {
          this.companias = datos;
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
          console.log(datos)
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

}
