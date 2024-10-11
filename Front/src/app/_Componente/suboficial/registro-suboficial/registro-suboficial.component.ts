import { Component } from '@angular/core';
import {Oficial} from "../../../_Modelo/oficial";
import {OficialService} from "../../../_Servicio/oficial.service";
import {Router} from "@angular/router";
import {Suboficial} from "../../../_Modelo/suboficial";
import {SuboficialService} from "../../../_Servicio/suboficial.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-registro-suboficial',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './registro-suboficial.component.html',
  styleUrl: './registro-suboficial.component.css'
})
export class RegistroSuboficialComponent {

  suboficial: Suboficial = {
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
    private suboficialService: SuboficialService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.registrarSuboficial();
  }

  registrarSuboficial() {
    this.suboficialService.registrarSuboficial(this.suboficial).subscribe(
      {
        next: (datos) => {
          this.irListaSuboficiales();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  irListaSuboficiales() {
    this.router.navigate(['/listarSuboficiales']);
  }

}
