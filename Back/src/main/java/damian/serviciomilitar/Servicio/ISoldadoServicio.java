package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Soldado;

import java.util.List;

public interface ISoldadoServicio {

    List<Soldado> listarSoldados();

    List<Soldado> listarSoldadosActivos();

    Soldado buscarSoldadoPorId(int codSoldado);

    Soldado registrarSoldado(Soldado soldado);

    Soldado modificarSoldado(int codSoldado, Soldado soldado);

    void bajaSoldado(int codSoldado);

    Soldado buscarSoldadoPorNombreUsuario(String nombreUsuario);
}
