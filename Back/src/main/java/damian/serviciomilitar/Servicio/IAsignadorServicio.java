package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Asignador;

import java.util.List;

public interface IAsignadorServicio {

    List<Asignador> listarAsignaciones();

    Asignador buscarAsignacionPorId(int codAsignador);

    Asignador registrarAsignacion(Asignador asignador);

    Asignador registrarFinalizacion(int codAsignador);

    void eliminarAsignacion(int codAsignador);

}
