package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Oficial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OficialRepositorio extends JpaRepository<Oficial, Integer> {

    Oficial findByNombreUsuario(String nombreUsuario);

}
