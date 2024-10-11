package damian.serviciomilitar.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import damian.serviciomilitar.Config.TextoUtil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.util.StringUtils;

import java.util.List;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Cuerpo {

    /*
        Hay que tener en cuenta que existen diferentes Cuerpos del Ejército (Infantería, Artillería,
        Caballería...), y cada uno se define por un código de Cuerpo y denominación.
    */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String nombreCuerpo;

    @Column(nullable = false)
    private boolean estado;

    @OneToMany(mappedBy = "cuerpoAsignado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Soldado> soldados;

    public void mayusculaNombrePropio() {
        this.nombreCuerpo = TextoUtil.mayusculas(this.nombreCuerpo);
    }

    public void actualizarDatos(Cuerpo datosRecibidos) {
        this.nombreCuerpo = datosRecibidos.getNombreCuerpo();
        this.estado = datosRecibidos.isEstado();

        mayusculaNombrePropio();
    }

    public Cuerpo crearCuerpoDefault(Cuerpo cuerpoDefault) {
        cuerpoDefault.setNombreCuerpo("Sin Asignar");
        cuerpoDefault.setEstado(true);

        return cuerpoDefault;
    }

}
