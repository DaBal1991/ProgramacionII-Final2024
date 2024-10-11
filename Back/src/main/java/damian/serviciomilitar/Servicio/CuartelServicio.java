package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Cuartel;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Repositorio.CuartelRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CuartelServicio implements ICuartelServicio {

    @Autowired
    private CuartelRepositorio cuartelRepositorio;


    @Override
    public List<Cuartel> listarCuarteles() {
        return this.cuartelRepositorio.findAll();
    }

    @Override
    public List<Cuartel> listarCuartelesActivos() {
        return listarCuarteles().stream()
                .filter(Cuartel::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public Cuartel buscarCuartelPorId(int codCuartel) {
        return this.cuartelRepositorio.findById(codCuartel)
                .orElseThrow(() -> new NoEncontradoExcepcion("Cuartel no encontrado."));
    }

    @Override
    public Cuartel buscarCuartelPorNombre(String nombre) {
        return this.cuartelRepositorio.findByNombreCuartel(nombre);
    }

    @Override
    public Cuartel registrarCuartel(Cuartel cuartel) {

        cuartel.setEstado(true);
        cuartel.mayusculaNombrePropio();

        return this.cuartelRepositorio.save(cuartel);
    }

    @Override
    public Cuartel modificarCuartel(int codCuartel, Cuartel cuartel) {

        Cuartel cuartelEncontrado = this.buscarCuartelPorId(codCuartel);

        cuartelEncontrado.actualizarDatos(cuartel);

        return this.cuartelRepositorio.save(cuartelEncontrado);
    }

    @Override
    public void inicializarCuartelDefault() {
        Optional<Cuartel> cuartelEncontrado = this.cuartelRepositorio.findById(1);

        if(cuartelEncontrado.isEmpty()) {
            Cuartel cuartelDefault = new Cuartel();
            cuartelDefault.crearCuartelDefault(cuartelDefault);

            this.cuartelRepositorio.save(cuartelDefault);
        }
    }

    @Override
    public void bajaCuartel(int codCuartel) {
        Cuartel cuartelEncontrado = this.buscarCuartelPorId(codCuartel);

        this.cuartelRepositorio.delete(cuartelEncontrado);
    }

    @Override
    public List<Soldado> listarSoldadosPorCuartel(int codCuartel) {
        Cuartel cuartelEncontrado = this.buscarCuartelPorId(codCuartel);

        return cuartelEncontrado.getSoldados();
    }
}
