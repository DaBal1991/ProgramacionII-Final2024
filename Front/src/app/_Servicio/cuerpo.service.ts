import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Asignador} from "../_Modelo/asignador";
import {URLbase} from "../_Environment/URLbase";
import {Cuartel} from "../_Modelo/cuartel";
import {Cuerpo} from "../_Modelo/cuerpo";
import {Soldado} from "../_Modelo/soldado";

@Injectable({
  providedIn: 'root'
})
export class CuerpoService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoCuerpos(): Observable<Cuerpo[]>{
    return this.http.get<Cuerpo[]>(`${URLbase.API_PATH}/gestionCuerpos/listarCuerpos`);
  }

  public obtenerCuerposActivos(): Observable<Cuerpo[]>{
    return this.http.get<Cuerpo[]>(`${URLbase.API_PATH}/gestionCuerpos/listarCuerposActivos`);
  }

  public obtenerSoldadosAsignadosCuerpo(id: number): Observable<Soldado[]>{
    return this.http.get<Soldado[]>(`${URLbase.API_PATH}/gestionCuerpos/cuerpo/${id}/soldados`);
  }

  public registrarCuerpo(cuerpo: Cuerpo): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionCuerpos/registrarCuerpo`, cuerpo);
  }

  public obtenerCuerpoPorId(id: number) {
    return this.http.get<Cuerpo>(`${URLbase.API_PATH}/gestionCuerpos/cuerpo/${id}`);
  }

  public modificarCuerpo(id: number, cuerpo: Cuerpo): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionCuerpos/cuerpo/${id}`, cuerpo);
  }

  public bajaCuerpo(id: number): Observable<Object> {
    return this.http.delete(`${URLbase.API_PATH}/gestionCuerpos/cuerpo/${id}`);
  }

}
