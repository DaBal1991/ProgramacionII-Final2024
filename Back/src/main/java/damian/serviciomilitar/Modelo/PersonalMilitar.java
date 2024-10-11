package damian.serviciomilitar.Modelo;

import damian.serviciomilitar.Config.TextoUtil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.util.StringUtils;

@Data
@MappedSuperclass
@ToString
@AllArgsConstructor
@NoArgsConstructor
public abstract class PersonalMilitar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    @Column(nullable = false)
    protected String nombrePila;

    @Column(nullable = false)
    protected String apellido;

    @Column(unique = true, nullable = false)
    protected String nombreUsuario;

    @Column(nullable = false)
    protected String password;

    @Column(nullable = false)
    protected String rolUsuario;

    @Column(nullable = false)
    protected boolean estado;

    @Column(nullable = false)
    public String graduacion;

    public void mayusculaNombresPropios() {
        this.nombrePila = TextoUtil.mayusculas(nombrePila);
        this.apellido = TextoUtil.mayusculas(apellido);
    }

    public abstract void inicializar();

    public String generarNombreUsuario(String nombrePila, String apellido) {
        if(nombrePila == null && apellido == null) {
            return "";
        } else {
            String nombreUsuario = nombrePila.substring(0,1).toLowerCase() + apellido.toLowerCase();

            return nombreUsuario;
        }
    }

    public void actualizarDatos(PersonalMilitar personalMilitar) {
        this.nombrePila = personalMilitar.getNombrePila();
        this.apellido = personalMilitar.getApellido();
        this.nombreUsuario = personalMilitar.getNombreUsuario();
        this.password = personalMilitar.getPassword();
        this.estado = personalMilitar.isEstado();
        this.graduacion = personalMilitar.getGraduacion();

        mayusculaNombresPropios();
    }

}
