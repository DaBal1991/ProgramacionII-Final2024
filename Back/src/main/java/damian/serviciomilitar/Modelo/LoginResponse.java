package damian.serviciomilitar.Modelo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private int idUsuario;
    private String mensajeLogin;
    private String rolUsuario;
    private String nombrePila;
    private String apellido;
    private String nombreUsuario;
    private boolean estado;

}
