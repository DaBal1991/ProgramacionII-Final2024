package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Soldado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoldadoRepositorio extends JpaRepository<Soldado, Integer> {

    Soldado findByNombreUsuario(String nombreUsuario);

}
