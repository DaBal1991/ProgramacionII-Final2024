package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Repositorio.SoldadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SoldadoServicio implements ISoldadoServicio {

    @Autowired
    private SoldadoRepositorio soldadoRepositorio;

    @Override
    public List<Soldado> listarSoldados() {
        return this.soldadoRepositorio.findAll();
    }

    @Override
    public List<Soldado> listarSoldadosActivos() {
        return listarSoldados().stream()
                .filter(Soldado::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public Soldado buscarSoldadoPorId(int codSoldado) {
        return this.soldadoRepositorio.findById(codSoldado)
                .orElseThrow(() -> new NoEncontradoExcepcion("Soldado no encontrado."));
    }

    @Override
    public Soldado registrarSoldado(Soldado soldado) {

        soldado.inicializar();
        soldado.mayusculaNombresPropios();

        return this.soldadoRepositorio.save(soldado);
    }

    @Override
    public Soldado modificarSoldado(int codSoldado, Soldado soldado) {
        Soldado soldadoEncontrado = this.buscarSoldadoPorId(codSoldado);

        soldadoEncontrado.actualizarSoldado(soldado);

        return this.soldadoRepositorio.save(soldadoEncontrado);
    }

    @Override
    public void bajaSoldado(int codSoldado) {
        Soldado soldadoEncontrado = this.buscarSoldadoPorId(codSoldado);

        this.soldadoRepositorio.delete(soldadoEncontrado);
    }

    @Override
    public Soldado buscarSoldadoPorNombreUsuario(String nombreUsuario) {
        return this.soldadoRepositorio.findByNombreUsuario(nombreUsuario);
    }

}
