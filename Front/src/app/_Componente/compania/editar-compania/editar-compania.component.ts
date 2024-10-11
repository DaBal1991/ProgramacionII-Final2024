import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {Compania} from "../../../_Modelo/compania";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editar-compania',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './editar-compania.component.html',
  styleUrl: './editar-compania.component.css'
})
export class EditarCompaniaComponent {

  compania: Compania = new Compania();
  id: number;

  constructor(
    private companiaService: CompaniaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.companiaService.obtenerCompaniaPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.compania = datos;
          console.log(this.compania);
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
    this.companiaService.modificarCompania(this.id, this.compania).subscribe(
      {
        next: (datos) => this.irListaCompanias(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaCompanias() {
    this.router.navigate(['/listarCompanias']);
  }

}
