package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Asignador;
import damian.serviciomilitar.Modelo.Servicio;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Repositorio.AsignadorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsignadorServicio implements IAsignadorServicio {

    @Autowired
    private AsignadorRepositorio asignadorRepositorio;

    @Autowired
    private SoldadoServicio soldadoServicio;

    @Autowired
    private ServicioServicio servicioServicio;

    @Override
    public List<Asignador> listarAsignaciones() {
        return this.asignadorRepositorio.findAll();
    }

    @Override
    public Asignador buscarAsignacionPorId(int codAsignador) {
        return this.asignadorRepositorio.findById(codAsignador)
                .orElseThrow(() -> new NoEncontradoExcepcion("Asignación no encontrada."));
    }

    @Override
    public Asignador registrarAsignacion(Asignador asignador) {

        Soldado soldadoEncontrado = this.soldadoServicio.buscarSoldadoPorId(asignador.getSoldado().getId());
        Servicio servicioEncontrado = this.servicioServicio.buscarServicioPorId(asignador.getServicio().getId());

        asignador.setSoldado(soldadoEncontrado);
        soldadoEncontrado.getServiciosAsignados().add(servicioEncontrado);

        asignador.setServicio(servicioEncontrado);
        servicioEncontrado.getSoldados().add(soldadoEncontrado);

        asignador.iniciarAsignacion();

        return this.asignadorRepositorio.save(asignador);
    }

    @Override
    public Asignador registrarFinalizacion(int codAsignador) {
        Asignador asignacionEncontrada = this.buscarAsignacionPorId(codAsignador);

        asignacionEncontrada.finalizarAsignacion();

        return this.asignadorRepositorio.save(asignacionEncontrada);
    }

    @Override
    public void eliminarAsignacion(int codAsignador) {

        Asignador asignacionEncontrada = this.buscarAsignacionPorId(codAsignador);

        if(asignacionEncontrada.getSoldado() != null) {
            asignacionEncontrada.getSoldado().getServiciosAsignados().remove(asignacionEncontrada.getServicio());
        }

        if(asignacionEncontrada.getServicio() != null) {
            asignacionEncontrada.getServicio().getSoldados().remove(asignacionEncontrada.getSoldado());
        }

        this.asignadorRepositorio.delete(asignacionEncontrada);
    }

}
