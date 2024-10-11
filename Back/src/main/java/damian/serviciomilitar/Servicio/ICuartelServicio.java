package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Cuartel;
import damian.serviciomilitar.Modelo.Soldado;

import java.util.List;

public interface ICuartelServicio {

    List<Cuartel> listarCuarteles();

    List<Cuartel> listarCuartelesActivos();

    List<Soldado> listarSoldadosPorCuartel(int codCuartel);

    Cuartel buscarCuartelPorId(int codCuartel);

    Cuartel buscarCuartelPorNombre(String nombre);

    Cuartel registrarCuartel(Cuartel cuartel);

    Cuartel modificarCuartel(int codCuartel, Cuartel cuartel);

    void inicializarCuartelDefault();

    void bajaCuartel(int codCuartel);

}
