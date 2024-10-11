package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Cuartel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuartelRepositorio extends JpaRepository<Cuartel, Integer> {

    Cuartel findByNombreCuartel(String nombreCuartel);

}
