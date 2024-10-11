package damian.serviciomilitar.Config;

import damian.serviciomilitar.Modelo.Compania;
import damian.serviciomilitar.Modelo.Cuartel;
import damian.serviciomilitar.Modelo.Cuerpo;
import damian.serviciomilitar.Modelo.Oficial;
import damian.serviciomilitar.Servicio.CompaniaServicio;
import damian.serviciomilitar.Servicio.CuartelServicio;
import damian.serviciomilitar.Servicio.CuerpoServicio;
import damian.serviciomilitar.Servicio.OficialServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DefaultInicializador implements CommandLineRunner {

    @Autowired
    private OficialServicio oficialServicio;

    @Autowired
    private CuartelServicio cuartelServicio;

    @Autowired
    private CuerpoServicio cuerpoServicio;

    @Autowired
    private CompaniaServicio companiaServicio;

    @Override
    public void run(String... args) throws Exception {

        oficialServicio.inicializarAdmin();
        cuartelServicio.inicializarCuartelDefault();
        companiaServicio.inicializarCompaniaDefault();
        cuerpoServicio.inicializarCuerpoDefault();

    }
}
