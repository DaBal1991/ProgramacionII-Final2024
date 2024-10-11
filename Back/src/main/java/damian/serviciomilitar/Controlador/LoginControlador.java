package damian.serviciomilitar.Controlador;

import damian.serviciomilitar.Modelo.*;
import damian.serviciomilitar.Servicio.OficialServicio;
import damian.serviciomilitar.Servicio.SoldadoServicio;
import damian.serviciomilitar.Servicio.SuboficialServicio;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "${allowed.origin}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class LoginControlador {

    @Autowired
    private OficialServicio oficialServicio;

    @Autowired
    private SuboficialServicio suboficialServicio;

    @Autowired
    private SoldadoServicio soldadoServicio;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        Soldado soldadoEncontrado = this.soldadoServicio.buscarSoldadoPorNombreUsuario(loginRequest.getNombreUsuario());
        if(soldadoEncontrado != null && loginRequest.getPassword().equals(soldadoEncontrado.getPassword())) {
            LoginResponse soldadoLogueado = new LoginResponse(
                    soldadoEncontrado.getId(),
                    "Conectado.",
                    soldadoEncontrado.getRolUsuario(),
                    soldadoEncontrado.getNombrePila(),
                    soldadoEncontrado.getApellido(),
                    soldadoEncontrado.getNombreUsuario(),
                    soldadoEncontrado.isEstado()
            );
            return ResponseEntity.ok(soldadoLogueado);
        }

        Suboficial suboficialEncontrado = this.suboficialServicio.buscarSuboficialPorNombreUsuario(loginRequest.getNombreUsuario());
        if(suboficialEncontrado != null && loginRequest.getPassword().equals(suboficialEncontrado.getPassword())) {
            LoginResponse suboficialLogueado = new LoginResponse(
                    suboficialEncontrado.getId(),
                    "Conectado.",
                    suboficialEncontrado.getRolUsuario(),
                    suboficialEncontrado.getNombrePila(),
                    suboficialEncontrado.getApellido(),
                    suboficialEncontrado.getNombreUsuario(),
                    suboficialEncontrado.isEstado()
            );
            return ResponseEntity.ok(suboficialLogueado);
        }

        Oficial oficialEncontrado = this.oficialServicio.buscarOficialPorNombreUsuario(loginRequest.getNombreUsuario());
        if(oficialEncontrado != null && loginRequest.getPassword().equals(oficialEncontrado.getPassword())) {
            LoginResponse oficialLogueado = new LoginResponse(
                    oficialEncontrado.getId(),
                    "Conectado.",
                    oficialEncontrado.getRolUsuario(),
                    oficialEncontrado.getNombrePila(),
                    oficialEncontrado.getApellido(),
                    oficialEncontrado.getNombreUsuario(),
                    oficialEncontrado.isEstado()
            );
            return ResponseEntity.ok(oficialLogueado);
        }

        LoginResponse logueoFallido = new LoginResponse(
                0,
                "Login fallido.",
                null,
                null,
                null,
                null,
                false
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(logueoFallido);
    }

}
