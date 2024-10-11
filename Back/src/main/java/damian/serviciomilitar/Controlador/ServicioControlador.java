package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Excepcion.YaExistenteExcepcion;
import damian.serviciomilitar.Modelo.Servicio;
import damian.serviciomilitar.Modelo.Soldado;
import damian.serviciomilitar.Servicio.ServicioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionServicios")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ServicioControlador {

    @Autowired
    private ServicioServicio servicioServicio;

    @GetMapping("/listarServicios")
    public List<Servicio> listarServicios() {
        return this.servicioServicio.listarServicios();
    }

    @GetMapping("/listarServiciosActivos")
    public List<Servicio> listarServiciosActivos() {
        return this.servicioServicio.listarServiciosActivos();
    }

    @GetMapping("/servicio/{id}/soldados")
    public ResponseEntity<List<Soldado>> listarSoldadosPorServicio(@PathVariable int id) {
        List<Soldado> soldados = this.servicioServicio.listarSoldadosPorServicio(id);

        return ResponseEntity.ok(soldados);
    }

    @PostMapping("/registrarServicio")
    public Servicio registrarServicio(@RequestBody Servicio servicio) {
        return this.servicioServicio.registrarServicio(servicio);
    }

    @GetMapping("/servicio/{id}")
    public ResponseEntity<Servicio> obtenerServicio(@PathVariable int id) {
        Servicio servicioEncontrado = this.servicioServicio.buscarServicioPorId(id);

        return ResponseEntity.ok(servicioEncontrado);
    }

    @PutMapping("/servicio/{id}")
    public ResponseEntity<Servicio> modificarServicio(@PathVariable int id,@RequestBody Servicio servicio) {
        Servicio servicioModificado = this.servicioServicio.modificarServicio(id, servicio);

        return ResponseEntity.ok(servicioModificado);
    }

    @DeleteMapping("/servicio/{id}")
    public void eliminarServicio(@PathVariable int id) {
        this.servicioServicio.bajaServicio(id);
    }
}
