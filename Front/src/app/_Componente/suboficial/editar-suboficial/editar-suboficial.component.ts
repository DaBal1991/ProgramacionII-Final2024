import { Component } from '@angular/core';
import {Oficial} from "../../../_Modelo/oficial";
import {OficialService} from "../../../_Servicio/oficial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Suboficial} from "../../../_Modelo/suboficial";
import {SuboficialService} from "../../../_Servicio/suboficial.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editar-suboficial',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './editar-suboficial.component.html',
  styleUrl: './editar-suboficial.component.css'
})
export class EditarSuboficialComponent {

  suboficial: Suboficial = new Suboficial();
  id: number;

  constructor(
    private suboficialService: SuboficialService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.suboficialService.obtenerSuboficialPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.suboficial = datos;
          console.log(this.suboficial);
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
    this.suboficialService.modificarSuboficial(this.id, this.suboficial).subscribe(
      {
        next: (datos) => this.irListaSuboficiales(),
        error: (err: any) => console.log(err),
      }
    );
  }

  irListaSuboficiales() {
    this.router.navigate(['/listarSuboficiales']);
  }

}
