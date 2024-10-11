package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Compania;
import damian.serviciomilitar.Modelo.Soldado;

import java.util.List;

public interface ICompaniaServicio {

    List<Compania> listarCompanias();

    List<Compania> listarCompaniasActivas();

    List<Soldado> listarSoldadosPorCompania(int codCompania);

    Compania buscarCompaniaPorId(int codCompania);

    Compania registrarCompania(Compania compania);

    Compania modificarCompania(int id, Compania compania);

    void bajaCompania(int codCompania);

    void inicializarCompaniaDefault();

}
