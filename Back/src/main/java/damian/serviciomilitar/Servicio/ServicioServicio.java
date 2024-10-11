package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Servicio;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Repositorio.ServicioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioServicio implements IServicioServicio{

    @Autowired
    private ServicioRepositorio servicioRepositorio;

    @Override
    public List<Servicio> listarServicios() {
        return this.servicioRepositorio.findAll();
    }

    @Override
    public List<Servicio> listarServiciosActivos() {
        return listarServicios().stream()
                .filter(Servicio::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public List<Soldado> listarSoldadosPorServicio(int codServicio) {
        Servicio servicioEncontrado = this.buscarServicioPorId(codServicio);

        return servicioEncontrado.getSoldados();
    }

    @Override
    public Servicio buscarServicioPorId(int codServicio) {
        return this.servicioRepositorio.findById(codServicio)
                .orElseThrow(() -> new NoEncontradoExcepcion("Servicio no encontrado."));
    }

    @Override
    public Servicio buscarServicioPorDescripcion(String descripcion) {
        return this.servicioRepositorio.findByDescripcion(descripcion);
    }

    @Override
    public Servicio registrarServicio(Servicio servicio) {

        servicio.setEstado(true);
        servicio.mayusculaNombrePropio();

        return this.servicioRepositorio.save(servicio);
    }

    @Override
    public Servicio modificarServicio(int codServicio, Servicio servicio) {
        Servicio servicioEncontrado = this.buscarServicioPorId(codServicio);

        servicioEncontrado.actualizarDatos(servicio);

        return this.servicioRepositorio.save(servicioEncontrado);
    }

    @Override
    public void bajaServicio(int codServicio) {
        Servicio servicioEncontrado = this.buscarServicioPorId(codServicio);

        this.servicioRepositorio.delete(servicioEncontrado);
    }
}
