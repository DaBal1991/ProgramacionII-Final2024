package damian.serviciomilitar.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Asignador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String fechaInicio;
    private String fechaFin;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    @Transient
    private LocalDateTime finDeLosTiempos = LocalDateTime.of(9999, 12, 31, 0, 0, 0);

    @ManyToOne
    @JoinColumn(name = "soldado_id")
    private Soldado soldado;

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    public void iniciarAsignacion() {
        this.fechaInicio = formatter.format(LocalDateTime.now());
        this.fechaFin = "En Servicio";
    }

    public void finalizarAsignacion() {
        this.fechaFin = formatter.format(LocalDateTime.now());
    }

}
