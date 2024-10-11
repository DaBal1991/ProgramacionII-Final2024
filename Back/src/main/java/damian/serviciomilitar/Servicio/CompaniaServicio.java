package damian.serviciomilitar.Servicio;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Compania;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Repositorio.CompaniaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompaniaServicio implements ICompaniaServicio {

    @Autowired
    private CompaniaRepositorio companiaRepositorio;

    @Override
    public List<Compania> listarCompanias() {
        return this.companiaRepositorio.findAll();
    }

    @Override
    public List<Compania> listarCompaniasActivas() {
        return listarCompanias().stream()
                .filter(Compania::isEstado)
                .collect(Collectors.toList());
    }

    @Override
    public List<Soldado> listarSoldadosPorCompania(int codCompania) {
        Compania companiaEncontrada = this.companiaRepositorio.findById(codCompania)
                .orElseThrow(() -> new NoEncontradoExcepcion("Compania no encontrada."));

        return companiaEncontrada.getSoldados();
    }

    @Override
    public Compania buscarCompaniaPorId(int codCompania) {
        return this.companiaRepositorio.findById(codCompania)
                .orElseThrow(() -> new NoEncontradoExcepcion("Compañia no encontrada."));
    }

    @Override
    public Compania registrarCompania(Compania compania) {

        compania.setEstado(true);
        compania.mayusculaNombrePropio();

        return this.companiaRepositorio.save(compania);
    }

    @Override
    public Compania modificarCompania(int id, Compania compania) {
        Compania companiaEncontrada = this.buscarCompaniaPorId(id);

        companiaEncontrada.actualizarEstado(compania);

        return this.companiaRepositorio.save(companiaEncontrada);
    }

    @Override
    public void bajaCompania(int codCompania) {

        Compania companiaEncontrada = this.buscarCompaniaPorId(codCompania);

        this.companiaRepositorio.delete(companiaEncontrada);
    }

    @Override
    public void inicializarCompaniaDefault() {
        Optional<Compania> companiaEncontrada = this.companiaRepositorio.findById(1);

        if (companiaEncontrada.isEmpty()) {
            Compania companiaDefault = new Compania();
            companiaDefault.crearCompaniaDefault(companiaDefault);

            this.companiaRepositorio.save(companiaDefault);
        }

    }
}
