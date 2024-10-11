import { Component } from '@angular/core';
import {Compania} from "../../../_Modelo/compania";
import {CompaniaService} from "../../../_Servicio/compania.service";
import {Router} from "@angular/router";
import {Cuerpo} from "../../../_Modelo/cuerpo";
import {CuerpoService} from "../../../_Servicio/cuerpo.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-cuerpo',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './registro-cuerpo.component.html',
  styleUrl: './registro-cuerpo.component.css'
})
export class RegistroCuerpoComponent {

  cuerpo: Cuerpo = {
    id: 0,
    nombreCuerpo: '',
    estado: true
  };

  constructor(
    private cuerpoService: CuerpoService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.registrarCuerpo();
  }

  registrarCuerpo() {
    this.cuerpoService.registrarCuerpo(this.cuerpo).subscribe(
      {
        next: (datos) => {
          this.irListadoCuerpos();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListadoCuerpos() {
    this.router.navigate(['/listarCuerpos']);
  }



}
