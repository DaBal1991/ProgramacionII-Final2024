package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Cuerpo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuerpoRepositorio extends JpaRepository<Cuerpo, Integer> {

    Cuerpo findByNombreCuerpo(String nombreCuerpo);

}
