package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Modelo.Asignador;
import damian.serviciomilitar.Modelo.Servicio;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Servicio.AsignadorServicio;
import damian.serviciomilitar.Servicio.ServicioServicio;
import damian.serviciomilitar.Servicio.SoldadoServicio;
import org.hibernate.internal.util.StringHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionAsignaciones")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AsignadorControlador {

    @Autowired
    private AsignadorServicio asignadorServicio;

    @GetMapping("/listarAsignaciones")
    public List<Asignador> listaAsignaciones() {
        return asignadorServicio.listarAsignaciones();
    }

    @PostMapping("/asignar")
    public Asignador registrarAsignacion(@RequestBody Asignador asignador) {
        return this.asignadorServicio.registrarAsignacion(asignador);
    }

    @PutMapping("/finAsignacion/{id}")
    public Asignador finalizarAsignacion(@PathVariable int id) {
        return this.asignadorServicio.registrarFinalizacion(id);
    }

    @GetMapping("/asignacion/{id}")
    public ResponseEntity<Asignador> obtenerAsignacion(@PathVariable int id) {
        Asignador asignacionEncontrada = asignadorServicio.buscarAsignacionPorId(id);

        return ResponseEntity.ok(asignacionEncontrada);
    }

    @DeleteMapping("/asignacion/{id}")
    public void bajaAsignacion(@PathVariable int id) {
        this.asignadorServicio.eliminarAsignacion(id);
    }
}
