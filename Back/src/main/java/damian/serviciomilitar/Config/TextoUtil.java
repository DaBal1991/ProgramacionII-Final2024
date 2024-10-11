package damian.serviciomilitar.Config;

import org.springframework.util.StringUtils;

public class TextoUtil {

    public static String mayusculas(String palabras) {

        if(palabras == null || palabras.isEmpty()) {
            return palabras;
        } else {

            String[] palabrasConEspacio = palabras.toLowerCase().split(" ");

            for(int i = 0; i < palabrasConEspacio.length; i++) {
                palabrasConEspacio[i] = StringUtils.capitalize(palabrasConEspacio[i]);
            }

            return String.join(" ", palabrasConEspacio);

        }

    }

}
