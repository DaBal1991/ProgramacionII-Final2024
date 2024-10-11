import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {URLbase} from "../_Environment/URLbase";
import {Cuartel} from "../_Modelo/cuartel";
import {HttpClient} from "@angular/common/http";
import {Compania} from "../_Modelo/compania";
import {Soldado} from "../_Modelo/soldado";

@Injectable({
  providedIn: 'root'
})
export class CuartelService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoCuarteles(): Observable<Cuartel[]>{
    return this.http.get<Cuartel[]>(`${URLbase.API_PATH}/gestionCuarteles/listarCuarteles`);
  }

  public obtenerCuartelesActivos(): Observable<Cuartel[]>{
    return this.http.get<Cuartel[]>(`${URLbase.API_PATH}/gestionCuarteles/listarCuartelesActivos`);
  }

  public obtenerSoldadosAsignadosCuartel(id: number): Observable<Soldado[]>{
    return this.http.get<Soldado[]>(`${URLbase.API_PATH}/gestionCuarteles/cuartel/${id}/soldados`);
  }

  public registrarCuartel(cuartel: Cuartel): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionCuarteles/registrarCuartel`, cuartel);
  }

  public obtenerCuartelPorId(id: number) {
    return this.http.get<Cuartel>(`${URLbase.API_PATH}/gestionCuarteles/cuartel/${id}`);
  }

  public modificarCuartel(id: number, cuartel: Cuartel): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionCuarteles/cuartel/${id}`, cuartel);
  }

  public bajaCuartel(id: number): Observable<Object> {
    return this.http.delete(`${URLbase.API_PATH}/gestionCuarteles/cuartel/${id}`);
  }

}
