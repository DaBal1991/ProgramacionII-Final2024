package damian.serviciomilitar.Excepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class YaExistenteExcepcion extends RuntimeException {

    public YaExistenteExcepcion(String mensaje) {
        super(mensaje);
    }


}
