package damian.serviciomilitar.Modelo;

import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@ToString
@NoArgsConstructor
public class Suboficial extends PersonalMilitar {

    @Override
    public void inicializar() {
        this.rolUsuario = "SUBOFICIAL";
        this.estado = true;
        this.nombreUsuario = generarNombreUsuario(nombrePila, apellido);
    }

    public void actualizarSuboficial(PersonalMilitar personalMilitar) {
        super.actualizarDatos(personalMilitar);
    }
}
