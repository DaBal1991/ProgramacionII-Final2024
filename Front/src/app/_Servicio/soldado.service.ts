import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Soldado} from "../_Modelo/soldado";
import {URLbase} from "../_Environment/URLbase";

@Injectable({
  providedIn: 'root'
})
export class SoldadoService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerListadoSoldados(): Observable<Soldado[]>{
    return this.http.get<Soldado[]>(`${URLbase.API_PATH}/gestionSoldados/listarSoldados`);
  }

  public obtenerListadoSoldadosActivos(): Observable<Soldado[]>{
    return this.http.get<Soldado[]>(`${URLbase.API_PATH}/gestionSoldados/listarSoldadosActivos`);
  }

  public registrarSoldado(soldado: Soldado): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionSoldados/registrarSoldado`, soldado);
  }

  public obtenerSoldadoPorId(id: number) {
    return this.http.get<Soldado>(`${URLbase.API_PATH}/gestionSoldados/soldado/${id}`);
  }

  public modificarSoldado(id: number, soldado: Soldado): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionSoldados/soldado/${id}`, soldado);
  }

  public bajaSoldado(id: number): Observable<Object> {
    return  this.http.delete(`${URLbase.API_PATH}/gestionSoldados/soldado/${id}`);
  }
}
