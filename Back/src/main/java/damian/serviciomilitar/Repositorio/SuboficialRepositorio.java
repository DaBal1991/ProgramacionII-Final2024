package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Suboficial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuboficialRepositorio extends JpaRepository<Suboficial, Integer> {

    Suboficial findByNombreUsuario(String nombreUsuario);

}
