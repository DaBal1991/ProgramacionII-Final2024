export class Soldado {
  id: number;
  apellido: string;
  nombrePila: string;
  nombreUsuario: string;
  password: string;
  rolUsuario: string;
  estado: boolean;
  graduacion: string;
  cuartelAsignado: {
    id: number | null;
    nombreCuartel: string;
  };
  companiaAsignada: {
    id: number | null;
    actividad: string;
  };
  cuerpoAsignado: {
    id: number | null;
    nombreCuerpo: string;
  };
  isPasswordVisible: boolean;
}
