import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SoldadoListadoComponent} from "./_Componente/soldado/listado-soldado/listado-soldado.component";
import {NavbarComponent} from "./_Componente/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SoldadoListadoComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'servicioMilitar-app';
}
