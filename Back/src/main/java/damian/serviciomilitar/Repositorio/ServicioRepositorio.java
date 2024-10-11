package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepositorio extends JpaRepository<Servicio, Integer> {

    Servicio findByDescripcion(String descripcion);

}
