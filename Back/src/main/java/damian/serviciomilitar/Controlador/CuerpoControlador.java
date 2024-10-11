package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Excepcion.YaExistenteExcepcion;
import damian.serviciomilitar.Modelo.Cuerpo;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Servicio.CuerpoServicio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionCuerpos")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CuerpoControlador {

    @Autowired
    private CuerpoServicio cuerpoServicio;

    @GetMapping("/listarCuerpos")
    public List<Cuerpo> listarCuerpos() {
        return this.cuerpoServicio.listarCuerpos();
    }

    @GetMapping("/listarCuerposActivos")
    public List<Cuerpo> listarCuerposActivos() {
        return this.cuerpoServicio.listarCuerposActivos();
    }

    @GetMapping("/cuerpo/{id}/soldados")
    public ResponseEntity<List<Soldado>> listarSoldadosPorCuerpo(@PathVariable int id) {
        List<Soldado> soldados = this.cuerpoServicio.listarSoldadosPorCuerpo(id);

        return ResponseEntity.ok(soldados);
    }

    @PostMapping("/registrarCuerpo")
    public Cuerpo registrarCuerpo(@RequestBody Cuerpo cuerpo) {
        return this.cuerpoServicio.registrarCuerpo(cuerpo);
    }

    @GetMapping("/cuerpo/{id}")
    public ResponseEntity<Cuerpo> obtenerCuerpo(@PathVariable int id) {
        Cuerpo cuerpoEncontrado = this.cuerpoServicio.buscarCuerpoPorId(id);

        return ResponseEntity.ok(cuerpoEncontrado);
    }

    @PutMapping("/cuerpo/{id}")
    public ResponseEntity<Cuerpo> modificarCuerpo(@PathVariable int id, @RequestBody Cuerpo cuerpo) {
        Cuerpo cuerpoModificado = this.cuerpoServicio.modificarCuerpo(id, cuerpo);

        return ResponseEntity.ok(cuerpoModificado);
    }

    @DeleteMapping("/cuerpo/{id}")
    public void bajaCuerpo(@PathVariable int id) {
        this.cuerpoServicio.bajaCuerpo(id);
    }



}
