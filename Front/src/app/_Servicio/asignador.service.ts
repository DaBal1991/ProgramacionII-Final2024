import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cuartel} from "../_Modelo/cuartel";
import {URLbase} from "../_Environment/URLbase";
import {Asignador} from "../_Modelo/asignador";

@Injectable({
  providedIn: 'root'
})
export class AsignadorService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoAsignaciones(): Observable<Asignador[]>{
    return this.http.get<Asignador[]>(`${URLbase.API_PATH}/gestionAsignaciones/listarAsignaciones`);
  }

  public registrarAsignacion(asignacion: Asignador): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionAsignaciones/asignar`, asignacion);
  }

  public obtenerAsignacionPorId(id: number) {
    return this.http.get<Asignador>(`${URLbase.API_PATH}/gestionAsignaciones/asignacion/${id}`);
  }

  public modificarAsignacion(id: number, asignacion: Asignador): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionAsignaciones/asignacion/${id}`, asignacion);
  }

  public bajaAsignacion(id: number): Observable<Object> {
    return this.http.delete(`${URLbase.API_PATH}/gestionAsignaciones/asignacion/${id}`);
  }

  public finAsignacion(id: number): Observable<any> {
    return this.http.put(`${URLbase.API_PATH}/gestionAsignaciones/finAsignacion/${id}`, {});
  }


}
