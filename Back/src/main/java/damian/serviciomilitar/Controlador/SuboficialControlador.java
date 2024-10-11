package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Excepcion.NoEncontradoExcepcion;
import damian.serviciomilitar.Excepcion.YaExistenteExcepcion;
import damian.serviciomilitar.Modelo.Suboficial;
import damian.serviciomilitar.Servicio.SuboficialServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestionSuboficiales")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SuboficialControlador {

    @Autowired
    private SuboficialServicio suboficialServicio;


    @GetMapping("/listarSuboficiales")
    public List<Suboficial> listarOficiales() {
        return this.suboficialServicio.listarSuboficiales();
    }

    @GetMapping("/listarSuboficialesActivos")
    public List<Suboficial> listarSuboficialesActivos() {
        return this.suboficialServicio.listarSuboficialesActivos();
    }

    @PostMapping("/registrarSuboficial")
    public Suboficial registrarOficial(@RequestBody Suboficial suboficial) {
        return this.suboficialServicio.registrarSuboficial(suboficial);
    }

    @GetMapping("/suboficial/{id}")
    public ResponseEntity<Suboficial> obtenerSuboficial(@PathVariable int id) {
        Suboficial suboficialEncontrado = this.suboficialServicio.buscarSuboficialPorId(id);

        if(suboficialEncontrado != null) {
            return ResponseEntity.ok(suboficialEncontrado);
        } else {
            throw new NoEncontradoExcepcion("Suboficial no encontrado.");
        }
    }

    @PutMapping("/suboficial/{id}")
    public ResponseEntity<Suboficial> modificarSuboficial(@PathVariable int id, @RequestBody Suboficial suboficial) {
        Suboficial suboficialModificado = this.suboficialServicio.modificarSuboficial(id, suboficial);

        return ResponseEntity.ok(suboficialModificado);
    }

    @DeleteMapping("/suboficial/{id}")
    public void bajaSuboficial(@PathVariable int id) {
        this.suboficialServicio.bajaSuboficial(id);
    }

}
