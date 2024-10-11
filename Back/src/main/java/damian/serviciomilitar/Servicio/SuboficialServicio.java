package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Suboficial;
import damian.serviciomilitar.Repositorio.SuboficialRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuboficialServicio implements ISuboficialServicio {

    @Autowired
    private SuboficialRepositorio suboficialRepositorio;

    @Override
    public List<Suboficial> listarSuboficiales() {
        return this.suboficialRepositorio.findAll();
    }

    @Override
    public List<Suboficial> listarSuboficialesActivos() {
        return listarSuboficiales().stream()
                .filter(Suboficial::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public Suboficial buscarSuboficialPorId(int codSuboficial) {
        return this.suboficialRepositorio.findById(codSuboficial)
                .orElseThrow(() -> new NoEncontradoExcepcion("Suboficial no encontrado."));
    }

    @Override
    public Suboficial registrarSuboficial(Suboficial suboficial) {

        suboficial.inicializar();
        suboficial.mayusculaNombresPropios();

        return this.suboficialRepositorio.save(suboficial);
    }

    @Override
    public Suboficial modificarSuboficial(int codSuboficial, Suboficial suboficial) {
        Suboficial suboficialEncontrado = this.buscarSuboficialPorId(codSuboficial);

        suboficialEncontrado.actualizarSuboficial(suboficial);

        return this.suboficialRepositorio.save(suboficialEncontrado);
    }

    @Override
    public void bajaSuboficial(int codSuboficial) {
        Suboficial suboficialEncontrado = this.buscarSuboficialPorId(codSuboficial);

        this.suboficialRepositorio.delete(suboficialEncontrado);
    }

    @Override
    public Suboficial buscarSuboficialPorNombreUsuario(String nombreUsuario) {
        return this.suboficialRepositorio.findByNombreUsuario(nombreUsuario);
    }
}
