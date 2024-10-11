package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Excepcion.YaExistenteExcepcion;
import damian.serviciomilitar.Modelo.Cuartel;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Servicio.CuartelServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionCuarteles")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CuartelControlador {

    @Autowired
    private CuartelServicio cuartelServicio;

    @GetMapping("/listarCuarteles")
    public List<Cuartel> listarCuarteles() {
        return this.cuartelServicio.listarCuarteles();
    }

    @GetMapping("/listarCuartelesActivos")
    public List<Cuartel> listarCuartelesActivos() {
        return this.cuartelServicio.listarCuartelesActivos();
    }

    @GetMapping("/cuartel/{id}/soldados")
    public ResponseEntity<List<Soldado>> listarSoldadosPorCuartel(@PathVariable int id) {
        List<Soldado> soldados = this.cuartelServicio.listarSoldadosPorCuartel(id);

        return ResponseEntity.ok(soldados);
    }

    @PostMapping("/registrarCuartel")
    public Cuartel registrarCuartel(@RequestBody Cuartel cuartel) {
        return this.cuartelServicio.registrarCuartel(cuartel);
    }

    @GetMapping("/cuartel/{id}")
    public ResponseEntity<Cuartel> obtenerCuartel(@PathVariable int id) {
        Cuartel cuartelEncontrado = this.cuartelServicio.buscarCuartelPorId(id);

        return ResponseEntity.ok(cuartelEncontrado);
    }

    @PutMapping("/cuartel/{id}")
    public ResponseEntity<Cuartel> modificarCuartel(@PathVariable int id, @RequestBody Cuartel cuartel) {
        Cuartel cuartelModificado = this.cuartelServicio.modificarCuartel(id, cuartel);

        return ResponseEntity.ok(cuartelModificado);
    }

    @DeleteMapping("/cuartel/{id}")
    public void bajaCuartel(@PathVariable int id) {
        this.cuartelServicio.bajaCuartel(id);
    }

}
