import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Soldado} from "../_Modelo/soldado";
import {URLbase} from "../_Environment/URLbase";
import {Oficial} from "../_Modelo/oficial";

@Injectable({
  providedIn: 'root'
})
export class OficialService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoOficiales(): Observable<Oficial[]>{
    return this.http.get<Oficial[]>(`${URLbase.API_PATH}/gestionOficiales/listarOficiales`);
  }

  public registrarOficial(oficial: Oficial): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionOficiales/registrarOficial`, oficial);
  }

  public obtenerOficialPorId(id: number) {
    return this.http.get<Oficial>(`${URLbase.API_PATH}/gestionOficiales/oficial/${id}`);
  }

  public modificarOficial(id: number, oficial: Oficial): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionOficiales/oficial/${id}`, oficial);
  }

  public bajaOficial(id: number): Observable<Object> {
    return  this.http.delete(`${URLbase.API_PATH}/gestionOficiales/oficial/${id}`);
  }

}
