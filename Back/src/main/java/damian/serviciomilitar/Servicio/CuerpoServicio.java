package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Cuerpo;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Repositorio.CuerpoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CuerpoServicio implements ICuerpoServicio{

    @Autowired
    private CuerpoRepositorio cuerpoRepositorio;

    @Override
    public List<Cuerpo> listarCuerpos() {
        return this.cuerpoRepositorio.findAll();
    }

    @Override
    public List<Cuerpo> listarCuerposActivos() {
        return listarCuerpos().stream()
                .filter(Cuerpo::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public List<Soldado> listarSoldadosPorCuerpo(int codCuerpo) {
        Cuerpo cuerpoEncontrado = this.buscarCuerpoPorId(codCuerpo);

        return cuerpoEncontrado.getSoldados();
    }

    @Override
    public Cuerpo buscarCuerpoPorId(int codCuerpo) {
        return this.cuerpoRepositorio.findById(codCuerpo).orElseThrow(() -> new NoEncontradoExcepcion("Cuerpo no encontrado."));
    }

    @Override
    public Cuerpo buscarCuerpoPorNombre(String nombre) {
        return this.cuerpoRepositorio.findByNombreCuerpo(nombre);
    }

    @Override
    public Cuerpo modificarCuerpo(int codCuerpo, Cuerpo cuerpo) {

        Cuerpo cuerpoEncontrado = this.buscarCuerpoPorId(codCuerpo);

        cuerpoEncontrado.actualizarDatos(cuerpo);

        return this.cuerpoRepositorio.save(cuerpoEncontrado);
    }

    @Override
    public Cuerpo registrarCuerpo(Cuerpo cuerpo) {

        cuerpo.setEstado(true);

        return this.cuerpoRepositorio.save(cuerpo);
    }

    @Override
    public void inicializarCuerpoDefault() {
        Optional<Cuerpo> cuerpoEncontrado = this.cuerpoRepositorio.findById(1);

        if(cuerpoEncontrado.isEmpty()) {
            Cuerpo cuerpoDefault = new Cuerpo();
            cuerpoDefault.crearCuerpoDefault(cuerpoDefault);

            this.cuerpoRepositorio.save(cuerpoDefault);
        }
    }

    @Override
    public void bajaCuerpo(int codCuerpo) {
        Cuerpo cuerpoEncontrado = this.buscarCuerpoPorId(codCuerpo);

        this.cuerpoRepositorio.delete(cuerpoEncontrado);
    }
}
