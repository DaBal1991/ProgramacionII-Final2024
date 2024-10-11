package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Oficial;
import damian.serviciomilitar.Repositorio.OficialRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OficialServicio implements IOficialRepositorio{

    @Autowired
    private OficialRepositorio oficialRepositorio;


    @Override
    public List<Oficial> listarOficiales() {
        return this.oficialRepositorio.findAll();
    }

    @Override
    public List<Oficial> listarOficialesActivos() {
        return listarOficiales().stream()
                .filter(Oficial::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public Oficial buscarOficialPorId(int codOficial) {
        return this.oficialRepositorio.findById(codOficial)
                .orElseThrow(() -> new NoEncontradoExcepcion("Oficial no encontrado."));
    }

    @Override
    public Oficial registrarOficial(Oficial oficial) {

        oficial.inicializar();
        oficial.mayusculaNombresPropios();

        return this.oficialRepositorio.save(oficial);
    }

    @Override
    public Oficial modificarOficial(int codOficial, Oficial oficial) {
        Oficial oficialEncontrado = this.buscarOficialPorId(codOficial);

        oficialEncontrado.actualizarOficial(oficial);

        return this.oficialRepositorio.save(oficialEncontrado);
    }

    @Override
    public void bajaOficial(int codOficial) {
        Oficial oficialEncontrado = this.buscarOficialPorId(codOficial);

        this.oficialRepositorio.delete(oficialEncontrado);
    }

    @Override
    public void inicializarAdmin() {
        Optional<Oficial> oficialEncontrado = this.oficialRepositorio.findById(1);

        if(oficialEncontrado.isEmpty()) {
            Oficial admin = new Oficial();

            admin.crearAdmin(admin);
            this.oficialRepositorio.save(admin);
        }

    }

    @Override
    public Oficial buscarOficialPorNombreUsuario(String nombreUsuario) {
        return this.oficialRepositorio.findByNombreUsuario(nombreUsuario);
    }
}
