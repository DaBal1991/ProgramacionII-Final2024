package damian.serviciomilitar.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.util.StringUtils;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Soldado extends PersonalMilitar{

    /*
        Un soldado se define por su código de soldado (único), su nombre y apellidos, y su graduación.
        Un soldado pertenece a un único cuerpo y a una única compañía...
        Un soldado realiza varios servicios...
        ... un soldado, soló está en un cuartel.
    */

    @Column(nullable = false)
    private String graduacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cuartel_id")
    @JsonIgnoreProperties("soldados")
    private Cuartel cuartelAsignado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "compania_id")
    @JsonIgnoreProperties("soldados")
    private Compania companiaAsignada;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cuerpo_id")
    @JsonIgnoreProperties("soldados")
    private Cuerpo cuerpoAsignado;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "soldados_servicios",
            joinColumns = @JoinColumn(name = "id_soldado"),
            inverseJoinColumns = @JoinColumn(name = "id_servicio")
    )
    @JsonIgnore
    private List<Servicio> serviciosAsignados;


    @Override
    public void inicializar() {
        this.rolUsuario = "SOLDADO";
        this.estado = true;
        this.nombreUsuario = generarNombreUsuario(nombrePila, apellido);
    }

    public void actualizarSoldado(PersonalMilitar personalMilitar) {
        super.actualizarDatos(personalMilitar);

        if (personalMilitar instanceof Soldado soldado) {
            this.cuerpoAsignado = soldado.getCuerpoAsignado();
            this.companiaAsignada = soldado.getCompaniaAsignada();
            this.cuartelAsignado = soldado.getCuartelAsignado();
        }
    }
}
