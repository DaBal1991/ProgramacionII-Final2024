import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../_Modelo/loginRequest";
import {LoginResponse} from "../_Modelo/loginResponse";
import {Observable} from "rxjs";
import {URLbase} from "../_Environment/URLbase";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor
  (
    private http: HttpClient,
  ) { }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${URLbase.API_PATH}/auth/login`, loginRequest);
  }

  public isConectado(): boolean {
    return localStorage.getItem('mensaje') === "Conectado." && localStorage.getItem('rolUsuario') !== null && localStorage.getItem('estado') === "true";
  }

  public isRolPermitido(rol: string): boolean {
    const rolUsuario: string | null = localStorage.getItem('rolUsuario');
    return rol === rolUsuario;
  }

  public limpiarDatos() {
    localStorage.clear();
  }

}
