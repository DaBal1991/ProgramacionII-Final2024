export class Asignador {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  soldado: {
    id: number,
    nombrePila: string,
    apellido: string
  };
  servicio: {
    id: number,
    descripcion: string
  }
}
