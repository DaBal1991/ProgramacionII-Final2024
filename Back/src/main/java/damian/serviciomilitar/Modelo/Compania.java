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
public class Compania {

    /*
        Los soldados están agrupados en compañías, siendo significativa para cada una de éstas, el número
        de compañía y la actividad principal que realiza.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String actividad;
    private boolean estado;

    @OneToMany(mappedBy = "companiaAsignada", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Soldado> soldados;

    public void mayusculaNombrePropio() {
        this.actividad = TextoUtil.mayusculas(actividad);
    }

    public void actualizarEstado(Compania datosRecibidos) {

        this.actividad = datosRecibidos.getActividad();
        this.estado = datosRecibidos.isEstado();

        mayusculaNombrePropio();
    }

    public Compania crearCompaniaDefault(Compania companiaDefault) {

        companiaDefault.setActividad("Sin Asignar");
        companiaDefault.setEstado(true);

        return companiaDefault;
    }

}
