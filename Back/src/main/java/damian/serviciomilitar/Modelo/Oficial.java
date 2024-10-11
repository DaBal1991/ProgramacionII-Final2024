package damian.serviciomilitar.Modelo;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@ToString
@NoArgsConstructor
public class Oficial extends PersonalMilitar{

    @Override
    public void inicializar() {
        this.rolUsuario = "OFICIAL";
        this.estado = true;
        this.nombreUsuario = generarNombreUsuario(nombrePila, apellido);
    }

    public void actualizarOficial(PersonalMilitar personalMilitar) {
        super.actualizarDatos(personalMilitar);

        if(graduacion.equals("Teniente General")) {
            this.rolUsuario = "ADMIN";
        } else {
            this.rolUsuario = "OFICIAL";
        }
    }

    public Oficial crearAdmin(Oficial admin) {
        admin.setNombrePila("Default");
        admin.setApellido("Default");
        admin.setGraduacion("Teniente General");
        admin.setRolUsuario("ADMIN");
        admin.setEstado(true);
        admin.setNombreUsuario("admin");
        admin.setPassword("admin");

        return admin;
    }
}
