import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Oficial} from "../_Modelo/oficial";
import {URLbase} from "../_Environment/URLbase";
import {Suboficial} from "../_Modelo/suboficial";

@Injectable({
  providedIn: 'root'
})
export class SuboficialService {

  constructor
  (
    private http: HttpClient
  ) { }

  public obtenerListadoSuboficiales(): Observable<Suboficial[]>{
    return this.http.get<Suboficial[]>(`${URLbase.API_PATH}/gestionSuboficiales/listarSuboficiales`);
  }

  public registrarSuboficial(suboficial: Suboficial): Observable<Object>{
    return this.http.post(`${URLbase.API_PATH}/gestionSuboficiales/registrarSuboficial`, suboficial);
  }

  public obtenerSuboficialPorId(id: number) {
    return this.http.get<Oficial>(`${URLbase.API_PATH}/gestionSuboficiales/suboficial/${id}`);
  }

  public modificarSuboficial(id: number, suboficial: Suboficial): Observable<Object> {
    return this.http.put(`${URLbase.API_PATH}/gestionSuboficiales/suboficial/${id}`, suboficial);
  }

  public bajaSuboficial(id: number): Observable<Object> {
    return  this.http.delete(`${URLbase.API_PATH}/gestionSuboficiales/suboficial/${id}`);
  }

}
