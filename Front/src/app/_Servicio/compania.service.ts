import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cuartel} from "../_Modelo/cuartel";
import {URLbase} from "../_Environment/URLbase";
import {Compania} from "../_Modelo/compania";
import {Soldado} from "../_Modelo/soldado";

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoCompania(): Observable<Compania[]>{
    return this.http.get<Compania[]>(`${URLbase.API_PATH}/gestionCompanias/listarCompanias`);
  }

  public obtenerCompaniasActivas(): Observable<Compania[]>{
    return this.http.get<Compania[]>(`${URLbase.API_PATH}/gestionCompanias/listarCompaniasActivas`);
  }

  public obtenerSoldadosAsignadosCompania(id: number): Observable<Soldado[]>{
    return this.http.get<Soldado[]>(`${URLbase.API_PATH}/gestionCompanias/compania/${id}/soldados`);
  }

  public registrarCompania(compania: Compania): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionCompanias/registrarCompania`, compania);
  }

  public obtenerCompaniaPorId(id: number) {
    return this.http.get<Compania>(`${URLbase.API_PATH}/gestionCompanias/compania/${id}`);
  }

  public modificarCompania(id: number, compania: Compania): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionCompanias/compania/${id}`, compania);
  }

  public bajaCompania(id: number): Observable<Object> {
    return this.http.delete(`${URLbase.API_PATH}/gestionCompanias/compania/${id}`);
  }


}
