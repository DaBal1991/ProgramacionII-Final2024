import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Oficial} from "../_Modelo/oficial";
import {URLbase} from "../_Environment/URLbase";
import {Servicio} from "../_Modelo/servicio";
import {Soldado} from "../_Modelo/soldado";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${URLbase.API_PATH}/gestionServicios/listarServicios`);
  }

  public obtenerListadoServiciosActivos(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${URLbase.API_PATH}/gestionServicios/listarServiciosActivos`);
  }

  public obtenerSoldadosAsignadosServicio(id: number): Observable<Soldado[]>{
    return this.http.get<Soldado[]>(`${URLbase.API_PATH}/gestionServicios/servicio/${id}/soldados`);
  }

  public registrarServicios(servicio: Servicio): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionServicios/registrarServicio`, servicio);
  }

  public obtenerServicioPorId(id: number) {
    return this.http.get<Servicio>(`${URLbase.API_PATH}/gestionServicios/servicio/${id}`);
  }

  public modificarServicio(id: number, servicio: Servicio): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionServicios/servicio/${id}`, servicio);
  }

  public bajaServicio(id: number): Observable<Object> {
    return this.http.delete(`${URLbase.API_PATH}/gestionServicios/servicio/${id}`);
  }

}
