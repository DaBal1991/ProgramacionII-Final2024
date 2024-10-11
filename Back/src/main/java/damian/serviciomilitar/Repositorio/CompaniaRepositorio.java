package damian.serviciomilitar.Repositorio;

import damian.serviciomilitar.Modelo.Compania;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompaniaRepositorio extends JpaRepository<Compania, Integer> {


}
