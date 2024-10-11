package damian.serviciomilitar.Modelo;

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
public class Servicio {

    /*
        Se desea controlar los servicios que realizan los soldados (correr, limpiar, barrer...), y se definen por
        el código de servicio y descripción.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String descripcion;

    @Column(nullable = false)
    private boolean estado;

    @ManyToMany(mappedBy = "serviciosAsignados", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Soldado> soldados;

    public void mayusculaNombrePropio() {
        this.descripcion = TextoUtil.mayusculas(descripcion);
    }

    public void actualizarDatos(Servicio datosRecibidos) {
        this.descripcion = datosRecibidos.getDescripcion();
        this.estado = datosRecibidos.isEstado();

        mayusculaNombrePropio();
    }

}
