package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Excepcion.YaExistenteExcepcion;
import damian.serviciomilitar.Modelo.Oficial;
import damian.serviciomilitar.Servicio.OficialServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionOficiales")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class OficialControlador {

    @Autowired
    private OficialServicio oficialServicio;

    @GetMapping("/listarOficiales")
    public List<Oficial> listarOficiales() {
        return this.oficialServicio.listarOficiales();
    }

    @GetMapping("/listarOficialesActivos")
    public List<Oficial> listarOficialesActivos() {
        return this.oficialServicio.listarOficialesActivos();
    }

    @PostMapping("/registrarOficial")
    public Oficial registrarOficial(@RequestBody Oficial oficial) {
        return this.oficialServicio.registrarOficial(oficial);
    }

    @GetMapping("/oficial/{id}")
    public ResponseEntity<Oficial> obtenerOficial(@PathVariable int id) {
        Oficial oficialEncontrado = this.oficialServicio.buscarOficialPorId(id);

        return ResponseEntity.ok(oficialEncontrado);
    }

    @PutMapping("/oficial/{id}")
    public ResponseEntity<Oficial> modificarOficial(@PathVariable int id, @RequestBody Oficial oficial) {
        Oficial oficialModificado = this.oficialServicio.modificarOficial(id, oficial);

        return ResponseEntity.ok(oficialModificado);
    }

    @DeleteMapping("/oficial/{id}")
    public void bajaOficial(@PathVariable int id) {
        this.oficialServicio.bajaOficial(id);
    }

}
