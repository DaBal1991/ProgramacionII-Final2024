package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Compania;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Servicio.CompaniaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionCompanias")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CompaniaControlador {

    @Autowired
    private CompaniaServicio companiaServicio;

    @GetMapping("/listarCompanias")
    public List<Compania> listarCompanias() {
        return this.companiaServicio.listarCompanias();
    }

    @GetMapping("/listarCompaniasActivas")
    public List<Compania> listarCompaniasActivas() {
        return this.companiaServicio.listarCompaniasActivas();
    }

    @GetMapping("/compania/{id}/soldados")
    public ResponseEntity<List<Soldado>> listarSoldadosPorCompania(@PathVariable int id) {
        List<Soldado> soldados = this.companiaServicio.listarSoldadosPorCompania(id);

        return ResponseEntity.ok(soldados);
    }

    @PostMapping("/registrarCompania")
    public Compania registrarCompania(@RequestBody Compania compania) {
        return this.companiaServicio.registrarCompania(compania);
    }

    @GetMapping("/compania/{id}")
    public ResponseEntity<Compania> obtenerCompania(@PathVariable int id) {
        Compania companiaEncontrada = this.companiaServicio.buscarCompaniaPorId(id);

        return ResponseEntity.ok(companiaEncontrada);
    }

    @PutMapping("/compania/{id}")
    public ResponseEntity<Compania> modificarCompania(@PathVariable int id, @RequestBody Compania compania) {
        Compania companiaModificada = this.companiaServicio.modificarCompania(id, compania);

        return ResponseEntity.ok(companiaModificada);
    }

    @DeleteMapping("/compania/{id}")
    public void bajaCompania(@PathVariable int id) {
        this.companiaServicio.bajaCompania(id);
    }

}
