package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Excepcion.YaExistenteExcepcion;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Servicio.CompaniaServicio;
import damian.serviciomilitar.Servicio.CuartelServicio;
import damian.serviciomilitar.Servicio.CuerpoServicio;
import damian.serviciomilitar.Servicio.SoldadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionSoldados")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SoldadoControlador {

    @Autowired
    private SoldadoServicio soldadoServicio;

    @Autowired
    private CompaniaServicio companiaServicio;

    @Autowired
    private CuerpoServicio cuerpoServicio;

    @Autowired
    private CuartelServicio cuartelServicio;

    @GetMapping("/listarSoldados")
    public List<Soldado> listarSoldados() {
        return this.soldadoServicio.listarSoldados();
    }

    @GetMapping("/listarSoldadosActivos")
    public List<Soldado> listarSoldadosActivos() {
        return this.soldadoServicio.listarSoldadosActivos();
    }

    @PostMapping("/registrarSoldado")
    public Soldado registrarSoldado(@RequestBody Soldado soldado) {
        return this.soldadoServicio.registrarSoldado(soldado);
    }

    @GetMapping("/soldado/{id}")
    public ResponseEntity<Soldado> obtenerSoldado(@PathVariable int id) {
        Soldado soldadoEncontrado = this.soldadoServicio.buscarSoldadoPorId(id);

        return ResponseEntity.ok(soldadoEncontrado);
    }

    @PutMapping("/soldado/{id}")
    public ResponseEntity<Soldado> modificarSoldado(@PathVariable int id, @RequestBody Soldado soldado) {
        Soldado soldadoModificado = this.soldadoServicio.modificarSoldado(id, soldado);

        return ResponseEntity.ok(soldadoModificado);
    }

    @DeleteMapping("/soldado/{id}")
    public void bajaSoldado(@PathVariable int id) {
        this.soldadoServicio.bajaSoldado(id);
    }

}
