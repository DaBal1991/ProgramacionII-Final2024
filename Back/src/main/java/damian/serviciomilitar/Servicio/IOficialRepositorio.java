package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Oficial;

import java.util.List;

public interface IOficialRepositorio {

    List<Oficial> listarOficiales();

    List<Oficial> listarOficialesActivos();

    Oficial buscarOficialPorId(int codOficial);

    Oficial registrarOficial(Oficial oficial);

    Oficial modificarOficial(int codOficial, Oficial oficial);

    void bajaOficial(int codOficial);

    void inicializarAdmin();

    Oficial buscarOficialPorNombreUsuario(String nombreUsuario);
}
