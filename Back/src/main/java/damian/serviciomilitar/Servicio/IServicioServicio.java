package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Servicio;
import damian.serviciomilitar.Modelo.Soldado;

import java.util.List;

public interface IServicioServicio {

    List<Servicio> listarServicios();

    List<Servicio> listarServiciosActivos();

    List<Soldado> listarSoldadosPorServicio(int codServicio);

    Servicio buscarServicioPorId(int codServicio);

    Servicio buscarServicioPorDescripcion(String descripcion);

    Servicio registrarServicio(Servicio servicio);

    Servicio modificarServicio(int codServicio, Servicio servicio);

    void bajaServicio(int codServicio);

}
