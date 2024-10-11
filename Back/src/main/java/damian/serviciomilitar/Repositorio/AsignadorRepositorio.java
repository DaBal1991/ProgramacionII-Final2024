package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Asignador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignadorRepositorio extends JpaRepository<Asignador, Integer> {
}
