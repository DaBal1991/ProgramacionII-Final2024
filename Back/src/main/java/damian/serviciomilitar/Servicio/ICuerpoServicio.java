package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Cuerpo;
import damian.serviciomilitar.Modelo.Soldado;

import java.util.List;

public interface ICuerpoServicio {

    List<Cuerpo> listarCuerpos();

    List<Cuerpo> listarCuerposActivos();

    List<Soldado> listarSoldadosPorCuerpo(int codCuerpo);

    Cuerpo buscarCuerpoPorId(int codCuerpo);

    Cuerpo buscarCuerpoPorNombre(String nombre);

    Cuerpo modificarCuerpo(int codCuerpo, Cuerpo cuerpo);

    Cuerpo registrarCuerpo(Cuerpo cuerpo);

    void inicializarCuerpoDefault();

    void bajaCuerpo(int codCuerpo);

}
