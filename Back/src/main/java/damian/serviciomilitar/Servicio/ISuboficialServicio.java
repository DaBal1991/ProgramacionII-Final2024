package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Modelo.Suboficial;

import java.util.List;

public interface ISuboficialServicio {

    List<Suboficial> listarSuboficiales();

    List<Suboficial> listarSuboficialesActivos();

    Suboficial buscarSuboficialPorId(int codSuboficial);

    Suboficial registrarSuboficial(Suboficial suboficial);

    Suboficial modificarSuboficial(int codSuboficial, Suboficial suboficial);

    void bajaSuboficial(int codSuboficial);

    Suboficial buscarSuboficialPorNombreUsuario(String nombreUsuario);
}
