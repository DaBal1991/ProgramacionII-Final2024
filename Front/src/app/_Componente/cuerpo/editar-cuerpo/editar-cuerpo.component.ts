import { Component } from '@angular/core';
import {Compania} from "../../../_Modelo/compania";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editar-cuerpo',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './editar-cuerpo.component.html',
  styleUrl: './editar-cuerpo.component.css'
})
export class EditarCuerpoComponent {

  cuerpo: Cuerpo = new Cuerpo();
  id: number;

  constructor(
    private cuerpoService: CuerpoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.cuerpoService.obtenerCuerpoPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.cuerpo = datos;
          console.log(this.cuerpo);
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
    this.cuerpoService.modificarCuerpo(this.id, this.cuerpo).subscribe(
      {
        next: (datos) => this.irListaCompanias(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaCompanias() {
    this.router.navigate(['/listarCuerpos']);
  }

}
