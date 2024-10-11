package damian.serviciomilitar.Modelo;

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
public class Cuartel {

    // Existen varios cuarteles, cada uno se define por su código de cuartel, nombre y ubicación.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String nombreCuartel;

    @Column(nullable = false)
    private String ubicacion;

    @Column(nullable = false)
    private boolean estado;

    @OneToMany(mappedBy = "cuartelAsignado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Soldado> soldados;

    public void mayusculaNombrePropio() {
        this.nombreCuartel = TextoUtil.mayusculas(this.nombreCuartel);
        this.ubicacion = TextoUtil.mayusculas(this.ubicacion);
    }

    public void actualizarDatos(Cuartel datosRecibidos) {
        this.nombreCuartel = datosRecibidos.getNombreCuartel();
        this.ubicacion = datosRecibidos.getUbicacion();
        this.estado = datosRecibidos.isEstado();

        mayusculaNombrePropio();
    }

    public Cuartel crearCuartelDefault(Cuartel cuartelDefault) {
        cuartelDefault.setNombreCuartel("Sin Asignar");
        cuartelDefault.setUbicacion("-");
        cuartelDefault.setEstado(true);

        return cuartelDefault;
    }

}
